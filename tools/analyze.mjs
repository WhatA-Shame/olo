// 分析 bundle 的顶层结构：语句、绑定、初始化期依赖、跨语句写引用
import fs from 'node:fs';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default ?? traverseModule;

const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');
const ast = parse(src, { sourceType: 'module', errorRecovery: false });

// ---- 1. 顶层语句与声明 ----
const stmts = [];
const declOwner = new Map(); // 绑定名 -> 语句索引

function collectPatternNames(node, out) {
  if (!node) return;
  switch (node.type) {
    case 'Identifier':
      out.push(node.name);
      break;
    case 'ObjectPattern':
      for (const p of node.properties)
        collectPatternNames(p.type === 'RestElement' ? p.argument : p.value, out);
      break;
    case 'ArrayPattern':
      for (const el of node.elements) collectPatternNames(el, out);
      break;
    case 'RestElement':
      collectPatternNames(node.argument, out);
      break;
    case 'AssignmentPattern':
      collectPatternNames(node.left, out);
      break;
  }
}

ast.program.body.forEach((node, i) => {
  const names = [];
  if (node.type === 'VariableDeclaration') {
    for (const d of node.declarations) collectPatternNames(d.id, names);
  } else if (
    (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration') &&
    node.id
  ) {
    names.push(node.id.name);
  }
  const rec = {
    i,
    type: node.type,
    start: node.start,
    end: node.end,
    line: node.loc.start.line,
    endLine: node.loc.end.line,
    names,
    initDeps: new Set(),
    allDeps: new Set(),
    writes: new Set(),
  };
  stmts.push(rec);
  for (const n of names) declOwner.set(n, i);
});

// ---- 2. 遍历引用 ----
const stmtByIndex = stmts;

function topLevelStmtIndex(path) {
  let p = path;
  while (p && p.parentPath && p.parentPath.node.type !== 'Program') p = p.parentPath;
  if (!p || !p.node || p.parentPath?.node.type !== 'Program') return -1;
  return ast.program.body.indexOf(p.node);
}

function isDeferred(path) {
  // 位于函数体内部 => 延迟执行
  let p = path.parentPath;
  while (p && p.node.type !== 'Program') {
    const t = p.node.type;
    if (
      t === 'FunctionDeclaration' ||
      t === 'FunctionExpression' ||
      t === 'ArrowFunctionExpression' ||
      t === 'ObjectMethod' ||
      t === 'ClassMethod' ||
      t === 'ClassPrivateMethod'
    )
      return true;
    p = p.parentPath;
  }
  return false;
}

traverse(ast, {
  Identifier(path) {
    const name = path.node.name;
    if (!declOwner.has(name)) return;
    if (!path.isReferencedIdentifier()) return;
    const idx = topLevelStmtIndex(path);
    if (idx < 0) return;
    const rec = stmtByIndex[idx];
    if (rec.names.includes(name) && !isDeferred(path)) {
      // 自引用（如 const f = () => f()）忽略
    }
    rec.allDeps.add(name);
    if (!isDeferred(path)) rec.initDeps.add(name);
  },
  AssignmentExpression(path) {
    const left = path.node.left;
    const targets = [];
    if (left.type === 'Identifier') targets.push(left.name);
    else if (left.type === 'ObjectPattern' || left.type === 'ArrayPattern')
      collectPatternNames(left, targets);
    for (const name of targets) {
      if (!declOwner.has(name)) continue;
      const idx = topLevelStmtIndex(path);
      if (idx < 0) continue;
      stmtByIndex[idx].writes.add(name);
    }
  },
  UpdateExpression(path) {
    const arg = path.node.argument;
    if (arg.type !== 'Identifier') return;
    if (!declOwner.has(arg.name)) return;
    const idx = topLevelStmtIndex(path);
    if (idx < 0) return;
    stmtByIndex[idx].writes.add(arg.name);
  },
  ForInStatement(path) {
    const left = path.node.left;
    const targets = [];
    if (left.type === 'Identifier') targets.push(left.name);
    else if (left.type === 'VariableDeclaration') return; // 局部声明
    else collectPatternNames(left, targets);
    for (const name of targets) {
      if (!declOwner.has(name)) continue;
      const idx = topLevelStmtIndex(path);
      if (idx < 0) continue;
      stmtByIndex[idx].writes.add(name);
    }
  },
});

// ---- 3. 统计 ----
const total = src.length;
const sizes = stmts.map((s) => s.end - s.start);
const sorted = [...stmts].sort((a, b) => b.end - b.start - (a.end - a.start));
const crossWrites = stmts.flatMap((s) =>
  [...s.writes].filter((n) => declOwner.get(n) !== s.i).map((n) => ({ from: s.i, name: n, owner: declOwner.get(n) })),
);

console.log('字符数:', total, '| 行数:', src.split('\n').length);
console.log('顶层语句数:', stmts.length);
console.log('顶层绑定数:', declOwner.size);
console.log('跨语句写引用数:', crossWrites.length);
console.log('初始化期依赖边数:', stmts.reduce((a, s) => a + s.initDeps.size, 0));
console.log('\n最大的 15 个顶层语句:');
for (const s of sorted.slice(0, 15)) {
  console.log(
    `  #${String(s.i).padStart(4)} L${String(s.line).padStart(6)}-${s.endLine} ${String(s.end - s.start).padStart(7)}B ${s.type} [${s.names.slice(0, 3).join(',')}]`,
  );
}

const report = {
  file,
  totalChars: total,
  stmts: stmts.map((s) => ({
    i: s.i,
    type: s.type,
    start: s.start,
    end: s.end,
    line: s.line,
    endLine: s.endLine,
    names: s.names,
    initDeps: [...s.initDeps],
    allDeps: [...s.allDeps],
    writes: [...s.writes],
  })),
  declOwner: Object.fromEntries(declOwner),
};
fs.writeFileSync('report.json', JSON.stringify(report));
console.log('\n报告写入 report.json');
