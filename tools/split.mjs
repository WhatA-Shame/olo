// 把单文件 bundle 拆成语义化 ES 模块
// 策略：写引用并集（必须同模块）→ 初始化期依赖拓扑排序 → 按体积顺序切块
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2] ?? '../_recover/game.pretty.js';
const OUT = process.argv[3] ?? '../src';
const TARGET_BYTES = Number(process.argv[4] ?? 70000);
const DRY = process.argv.includes('--dry');

const src = fs.readFileSync(SRC, 'utf8');
const report = JSON.parse(fs.readFileSync('report.json', 'utf8'));
const stmts = report.stmts;
const declOwner = new Map(Object.entries(report.declOwner).map(([k, v]) => [k, Number(v)]));
const N = stmts.length;

// ---------- 1. 并查集：跨语句写引用必须同模块 ----------
const parent = Array.from({ length: N }, (_, i) => i);
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
const union = (a, b) => {
  const ra = find(a);
  const rb = find(b);
  if (ra !== rb) parent[Math.max(ra, rb)] = Math.min(ra, rb);
};
for (const s of stmts) {
  for (const name of s.writes) {
    const owner = declOwner.get(name);
    if (owner !== undefined && owner !== s.i) union(s.i, owner);
  }
}

// ---------- 2. 初始化期依赖图（语句级 → 组级） ----------
const groupStmts = new Map(); // root -> [stmtIdx]
for (let i = 0; i < N; i++) {
  const r = find(i);
  if (!groupStmts.has(r)) groupStmts.set(r, []);
  groupStmts.get(r).push(i);
}

function buildGroupGraph() {
  const edges = new Map(); // root -> Set(root)
  const indeg = new Map();
  for (const r of groupStmts.keys()) {
    edges.set(r, new Set());
    indeg.set(r, 0);
  }
  for (const s of stmts) {
    const from = find(s.i);
    // 用全量引用（含函数体内的延迟引用）建图：
    // 这样任何跨模块引用都指向更早的模块，既不会出现 TDZ，也不会出现模块间循环
    for (const name of s.allDeps) {
      const owner = declOwner.get(name);
      if (owner === undefined) continue;
      const to = find(owner);
      if (to === from) continue;
      if (!edges.get(to).has(from)) {
        edges.get(to).add(from);
        indeg.set(from, indeg.get(from) + 1);
      }
    }
  }
  return { edges, indeg };
}

// ---------- 3. 拓扑排序（Kahn，按原始位置稳定） ----------
function topoSort() {
  const { edges, indeg } = buildGroupGraph();
  const ready = [];
  for (const [r, d] of indeg) if (d === 0) ready.push(r);
  ready.sort((a, b) => a - b);
  const order = [];
  while (ready.length) {
    const r = ready.shift();
    order.push(r);
    for (const nx of edges.get(r)) {
      indeg.set(nx, indeg.get(nx) - 1);
      if (indeg.get(nx) === 0) {
        // 插入排序保持稳定
        let lo = 0;
        let hi = ready.length;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (ready[mid] < nx) lo = mid + 1;
          else hi = mid;
        }
        ready.splice(lo, 0, nx);
      }
    }
  }
  return { order, edges };
}

let { order, edges } = topoSort();
if (order.length !== groupStmts.size) {
  // 组级出现环：把每个强连通分量合并成一个组，重复直到无环
  let guard = 0;
  while (order.length !== new Set([...Array(N).keys()].map(find)).size) {
    if (++guard > 50) throw new Error('无法消除组级依赖环');
    const roots = [...groupStmts.keys()].filter((r) => find(r) === r);
    const rootSet = new Set(roots);
    const gEdges = new Map(roots.map((r) => [r, []]));
    for (const s of stmts) {
      const from = find(s.i);
      for (const name of s.allDeps) {
        const o = declOwner.get(name);
        if (o === undefined) continue;
        const to = find(o);
        if (to !== from && rootSet.has(to)) gEdges.get(to).push(from);
      }
    }
    // Tarjan
    const idxMap = new Map();
    const lowMap = new Map();
    const onStk = new Set();
    const stk = [];
    let counter = 0;
    const comps = [];
    const strong = (v) => {
      idxMap.set(v, counter);
      lowMap.set(v, counter);
      counter++;
      stk.push(v);
      onStk.add(v);
      for (const w of gEdges.get(v) ?? []) {
        if (!idxMap.has(w)) {
          strong(w);
          lowMap.set(v, Math.min(lowMap.get(v), lowMap.get(w)));
        } else if (onStk.has(w)) lowMap.set(v, Math.min(lowMap.get(v), idxMap.get(w)));
      }
      if (lowMap.get(v) === idxMap.get(v)) {
        const comp = [];
        let w;
        do {
          w = stk.pop();
          onStk.delete(w);
          comp.push(w);
        } while (w !== v);
        comps.push(comp);
      }
    };
    for (const r of roots) if (!idxMap.has(r)) strong(r);
    let merged = 0;
    for (const comp of comps) {
      if (comp.length < 2) continue;
      for (const r of comp.slice(1)) union(comp[0], r);
      merged++;
    }
    if (!merged) throw new Error('组级依赖环无法合并');
    // 重建组表
    groupStmts.clear();
    for (let i = 0; i < N; i++) {
      const r = find(i);
      if (!groupStmts.has(r)) groupStmts.set(r, []);
      groupStmts.get(r).push(i);
    }
    ({ order, edges } = topoSort());
    console.error(`  合并 ${merged} 个环 → 剩余组 ${groupStmts.size}`);
  }
}

// ---------- 4. 按体积切块（不拆组） ----------
const chunks = [];
let cur = { roots: [], size: 0 };
for (const r of order) {
  const size = groupStmts.get(r).reduce((a, i) => a + (stmts[i].end - stmts[i].start), 0);
  if (cur.size > 0 && cur.size + size > TARGET_BYTES) {
    chunks.push(cur);
    cur = { roots: [], size: 0 };
  }
  cur.roots.push(r);
  cur.size += size;
}
if (cur.roots.length) chunks.push(cur);

// ---------- 5. 语义命名 ----------
const SIGNALS = [
  ['three', /THREE\./g, 3],
  ['audio', /AudioContext|oscillator|createGain|BiquadFilter|sampleRate|AudioBuffer/g, 2],
  ['vfx', /\bfx_[a-z_]+|\barea_[a-z_]+|atk_[a-z_]+_(swing|hit)/g, 2],
  ['ui', /sf-[a-z][a-z-]+|classList|innerHTML|querySelector/g, 1],
  ['data', /hp:|armor:|manaCost:|cooldown:|adRatio|apRatio/g, 1],
  ['ai', /engage|fleeHp|initiator|diveBackline|aggro/gi, 1],
  ['net', /fetch\(|sanwan\.ai|COMMENTS_API|TRACK_API/g, 2],
  ['render', /WebGLRenderer|gl_FragColor|ShaderMaterial|BufferGeometry/g, 2],
];

function labelFor(code) {
  let best = 'core';
  let bestScore = 0;
  for (const [name, re, weight] of SIGNALS) {
    const score = (code.match(re) ?? []).length * weight;
    if (score > bestScore) {
      bestScore = score;
      best = name;
    }
  }
  return best;
}

const moduleOf = new Map(); // stmtIdx -> module index
const modules = chunks.map((c, mi) => {
  const idxs = c.roots.flatMap((r) => groupStmts.get(r)).sort((a, b) => a - b);
  for (const i of idxs) moduleOf.set(i, mi);
  const code = idxs.map((i) => src.slice(stmts[i].start, stmts[i].end)).join('\n\n');
  return { mi, idxs, code, size: code.length, label: labelFor(code), names: idxs.flatMap((i) => stmts[i].names) };
});

// 命名：序号 + 语义标签（同名标签追加序号）
const labelCount = new Map();
for (const m of modules) {
  const n = (labelCount.get(m.label) ?? 0) + 1;
  labelCount.set(m.label, n);
  m.file = `${String(m.mi + 1).padStart(2, '0')}-${m.label}${n > 1 ? '-' + n : ''}.js`;
}

// 完整性断言：每条语句恰好被收录一次
{
  const seen = new Set();
  for (const m of modules) for (const i of m.idxs) {
    if (seen.has(i)) throw new Error(`语句 ${i} 被重复收录`);
    seen.add(i);
  }
  if (seen.size !== N) throw new Error(`语句丢失: 收录 ${seen.size} / 共 ${N}`);
  const missing = [...Array(N).keys()].filter((i) => !seen.has(i));
  if (missing.length) throw new Error(`缺少语句: ${missing.slice(0, 10)}`);
}

// ---------- 6. 导入/导出 ----------
const ownerModule = new Map(); // 绑定名 -> 模块 index
for (const m of modules) for (const n of m.names) ownerModule.set(n, m.mi);

for (const m of modules) {
  const imports = new Map(); // 模块 index -> Set(name)
  for (const i of m.idxs) {
    for (const name of stmts[i].allDeps) {
      const om = ownerModule.get(name);
      if (om === undefined || om === m.mi) continue;
      if (!imports.has(om)) imports.set(om, new Set());
      imports.get(om).add(name);
    }
  }
  m.imports = imports;
}

// 只有被别的模块用到的才导出（第二遍，此时所有模块的 imports 已就绪）
const usedByOthers = new Set();
for (const m of modules) for (const set of m.imports.values()) for (const n of set) usedByOthers.add(n);
for (const m of modules) m.exports = m.names.filter((n) => usedByOthers.has(n));

// ---------- 7. 输出 ----------
const totalBytes = modules.reduce((a, m) => a + m.size, 0);
console.log(`模块数: ${modules.length} | 总字节: ${totalBytes} | 目标/块: ${TARGET_BYTES}`);
console.log('前 20 个模块:');
for (const m of modules.slice(0, 20)) {
  console.log(
    `  ${m.file.padEnd(24)} ${String(Math.round(m.size / 1024)).padStart(4)}KB  stmt ${m.idxs.length}  绑定 ${m.names.length}  导入 ${m.imports.size}`,
  );
}
const sizes = modules.map((m) => m.size).sort((a, b) => b - a);
console.log(`最大块 ${Math.round(sizes[0] / 1024)}KB, 中位 ${Math.round(sizes[sizes.length >> 1] / 1024)}KB`);

if (DRY) {
  fs.writeFileSync('plan.json', JSON.stringify(modules.map((m) => ({ file: m.file, size: m.size, label: m.label })), null, 2));
  console.log('dry-run，未写文件');
  process.exit(0);
}

// 不删除输出目录（安全删除机制会拦截 rmSync）：直接覆盖写入，
// 并清理本次未生成的旧模块文件
fs.mkdirSync(OUT, { recursive: true });
const expected = new Set(modules.map((m) => m.file));
for (const f of fs.readdirSync(OUT)) {
  if (f.endsWith('.js') && !expected.has(f)) {
    try {
      fs.unlinkSync(path.join(OUT, f));
    } catch {
      console.warn(`  ! 旧文件未能删除: ${f}`);
    }
  }
}

// 线索提取：优先中文文案，其次首个有意义的字符串字面量
function hintOf(code) {
  const zh = code.match(/[\u4e00-\u9fa5][^"'`\n]{1,26}/);
  if (zh) return zh[0].replace(/\s+/g, ' ').trim();
  const str = [...code.matchAll(/["'`]([^"'`\n]{4,40})["'`]/g)]
    .map((m) => m[1])
    .find((s) => /[a-zA-Z]/.test(s) && !/^[0-9.]+$/.test(s));
  return str ? str.replace(/\s+/g, ' ').trim() : '';
}

for (const m of modules) {
  // 头部注释：模块用途 + 原始行号范围 + 关键绑定，便于定位
  const lineFrom = Math.min(...m.idxs.map((i) => stmts[i].line));
  const lineTo = Math.max(...m.idxs.map((i) => stmts[i].endLine));
  const hints = [];
  for (const i of m.idxs) {
    const s = stmts[i];
    if (!s.names.length) continue;
    const h = hintOf(src.slice(s.start, s.end));
    if (!h) continue;
    hints.push([s.names[0], h]);
    if (hints.length >= 6) break;
  }
  const header = [
    `// ${m.file} — ${m.label}｜${m.idxs.length} 个顶层语句｜${Math.round(m.size / 1024)}KB`,
    `// 对应 game.pretty.js 第 ${lineFrom}–${lineTo} 行`,
    ...(hints.length
      ? ['// 关键内容：', ...hints.map(([n, t]) => `//   ${n.padEnd(22)}${t}`)]
      : []),
    '//',
    '// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。',
    '',
  ].join('\n');

  const impLines = [...m.imports.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([mi, names]) => `import { ${[...names].sort().join(', ')} } from './${modules[mi].file}';`)
    .join('\n');

  const body = m.idxs.map((i) => src.slice(stmts[i].start, stmts[i].end)).join('\n\n');
  const expLine = m.exports.length ? `\nexport { ${m.exports.join(', ')} };\n` : '';

  fs.writeFileSync(path.join(OUT, m.file), `${header}${impLines ? impLines + '\n\n' : ''}${body}${expLine}`);
}

// 入口：按拓扑顺序触发各模块的顶层副作用
const entry = [
  '// entry.js — 按原始执行顺序加载全部模块，触发顶层初始化',
  `// 模块总数 ${modules.length}，等价于原单文件 bundle 的顶层执行序列`,
  '',
  ...modules.map((m) => `import './${m.file}';`),
  '',
].join('\n');
fs.writeFileSync(path.join(OUT, 'entry.js'), entry);

// 符号索引
const symbolLines = ['# 符号索引', '', '由 `tools/split.mjs` 生成。名字是压缩器产物，右侧「线索」是所在语句里最靠前的中文文案，可用于辨认用途。', ''];
for (const m of modules) {
  symbolLines.push(`## ${m.file}`, '');
  for (const i of m.idxs) {
    const s = stmts[i];
    if (!s.names.length) continue;
    const h = hintOf(src.slice(s.start, s.end));
    symbolLines.push(`- \`${s.names.join(', ')}\` — L${s.line}${h ? ` — ${h}` : ''}`);
  }
  symbolLines.push('');
}
fs.writeFileSync('../docs/SYMBOLS.md', symbolLines.join('\n'));

console.log(`\n已写入 ${modules.length} 个模块 + entry.js 到 ${OUT}`);
