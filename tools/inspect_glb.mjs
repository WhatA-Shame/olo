// 检查一个 GLB：节点树、蒙皮、动画、网格规模、材质/贴图
import fs from 'fs';
const file = process.argv[2];
if (!file) { console.error('用法: node tools/inspect_glb.mjs <file.glb>'); process.exit(1); }
const buf = fs.readFileSync(file);
let off = 12, json = null, bin = null;
while (off < buf.length) {
  const len = buf.readUInt32LE(off);
  const type = buf.toString('ascii', off + 4, off + 8);
  if (type === 'JSON') json = JSON.parse(buf.toString('utf8', off + 8, off + 8 + len));
  else if (type.startsWith('BIN')) bin = buf.subarray(off + 8, off + 8 + len);
  off += 8 + len;
}
const acc = (i) => json.accessors[i];
console.log('=== 基本 ===');
console.log('节点', (json.nodes || []).length, '| 网格', (json.meshes || []).length, '| 蒙皮', (json.skins || []).length, '| 动画', (json.animations || []).length, '| 材质', (json.materials || []).length, '| 贴图', (json.images || []).length);

let tris = 0, verts = 0;
for (const m of json.meshes || [])
  for (const p of m.primitives) {
    verts += acc(p.attributes.POSITION).count;
    if (p.indices != null) tris += acc(p.indices).count / 3;
  }
console.log('顶点', verts, '| 三角', tris);

if (json.skins && json.skins.length) {
  const s = json.skins[0];
  console.log('\n=== 骨骼 ===', s.joints.length, '根');
  const jset = new Set(s.joints);
  const parentOf = new Map();
  json.nodes.forEach((n, i) => (n.children || []).forEach((c) => parentOf.set(c, i)));
  s.joints.forEach((j, k) => {
    let p = parentOf.get(j);
    let pj = -1;
    while (p != null && !jset.has(p)) p = parentOf.get(p);
    if (p != null) pj = s.joints.indexOf(p);
    const nm = json.nodes[j].name || `n${j}`;
    const t = json.nodes[j].translation || [0, 0, 0];
    console.log(`  ${String(k).padStart(2)} ${nm.padEnd(22)} p=${String(pj).padStart(2)} t=[${t.map((v) => v.toFixed(2)).join(',')}]`);
  });
}

if (json.animations) {
  console.log('\n=== 动画 ===');
  for (const a of json.animations) {
    let dur = 0;
    for (const ch of a.channels) {
      const sm = a.samplers[ch.sampler];
      const inp = acc(sm.input);
      if (inp.max) dur = Math.max(dur, inp.max[0]);
    }
    console.log(`  ${(a.name || '(无名)').padEnd(20)} ${a.channels.length} 通道  ${dur.toFixed(2)}s`);
  }
}

console.log('\n=== 材质 ===');
for (const m of json.materials || []) {
  const p = m.pbrMetallicRoughness || {};
  console.log('  ', m.name || '(无名)', 'baseColor', p.baseColorFactor || '-', 'tex', p.baseColorTexture ? 'yes' : 'no');
}
for (const img of json.images || []) console.log('   image', img.name || '', img.mimeType || '', img.bufferView != null ? acc ? '' : '' : '');
