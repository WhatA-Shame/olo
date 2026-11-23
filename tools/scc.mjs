// 统计全量依赖图的 SCC 规模，判断能否按「全量依赖拓扑」切分
import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('report.json', 'utf8'));
const stmts = report.stmts;
const declOwner = new Map(Object.entries(report.declOwner).map(([k, v]) => [k, Number(v)]));
const N = stmts.length;

// Tarjan（迭代版）
const adj = Array.from({ length: N }, () => []);
for (const s of stmts) {
  for (const name of s.allDeps) {
    const o = declOwner.get(name);
    if (o !== undefined && o !== s.i) adj[s.i].push(o);
  }
}

const index = new Int32Array(N).fill(-1);
const low = new Int32Array(N).fill(0);
const onStack = new Uint8Array(N);
const stack = [];
let idx = 0;
const comps = [];

for (let v = 0; v < N; v++) {
  if (index[v] !== -1) continue;
  const work = [[v, 0]];
  while (work.length) {
    const frame = work[work.length - 1];
    const node = frame[0];
    if (frame[1] === 0) {
      index[node] = low[node] = idx++;
      stack.push(node);
      onStack[node] = 1;
    }
    let recursed = false;
    while (frame[1] < adj[node].length) {
      const w = adj[node][frame[1]++];
      if (index[w] === -1) {
        work.push([w, 0]);
        recursed = true;
        break;
      } else if (onStack[w]) {
        low[node] = Math.min(low[node], index[w]);
      }
    }
    if (recursed) continue;
    if (low[node] === index[node]) {
      const comp = [];
      let w;
      do {
        w = stack.pop();
        onStack[w] = 0;
        comp.push(w);
      } while (w !== node);
      comps.push(comp);
    }
    work.pop();
    if (work.length) {
      const parent = work[work.length - 1][0];
      low[parent] = Math.min(low[parent], low[node]);
    }
  }
}

const sizes = comps
  .map((c) => ({ n: c.length, bytes: c.reduce((a, i) => a + (stmts[i].end - stmts[i].start), 0) }))
  .sort((a, b) => b.bytes - a.bytes);

console.log('SCC 总数:', comps.length);
console.log('最大 10 个 SCC（字节 / 语句数）:');
for (const s of sizes.slice(0, 10)) console.log(`  ${Math.round(s.bytes / 1024)}KB  ${s.n} 条`);
console.log('单语句 SCC 数:', sizes.filter((s) => s.n === 1).length);
console.log('总字节:', Math.round(sizes.reduce((a, s) => a + s.bytes, 0) / 1024), 'KB');
