import fs from 'fs';
const f = process.argv[2] || 'src/45-niuwei-mesh.js';
const s = fs.readFileSync(f, 'utf8');
const grab = (k) => {
  const i = s.indexOf(k + ': "') + k.length + 3;
  const j = s.indexOf('"', i);
  const b = Buffer.from(s.slice(i, j), 'base64');
  return new Float32Array(b.buffer, b.byteOffset, b.length / 4);
};
const pos = grab('pos');
const bw = grab('bindWorld');
const names = JSON.parse(/names:\s*(\[[^\]]+\])/.exec(s)[1]);
let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, z0 = 1e9, z1 = -1e9;
for (let i = 0; i < pos.length / 3; i++) {
  const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
  x0 = Math.min(x0, x); x1 = Math.max(x1, x);
  y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  z0 = Math.min(z0, z); z1 = Math.max(z1, z);
}
console.log('bbox  x[%s, %s]  y[%s, %s]  z[%s, %s]', x0.toFixed(3), x1.toFixed(3), y0.toFixed(3), y1.toFixed(3), z0.toFixed(3), z1.toFixed(3));
console.log('高 %s  宽 %s  厚 %s', (y1 - y0).toFixed(3), (x1 - x0).toFixed(3), (z1 - z0).toFixed(3));
for (const k of ['Root', 'Hip', 'Head', 'R_Hand', 'L_Hand', 'R_Forearm', 'R_Upperarm', 'R_Clavicle', 'R_Foot', 'L_Foot']) {
  const i = names.indexOf(k);
  if (i < 0) continue;
  console.log(`${k.padEnd(12)} [${bw[i * 3].toFixed(3)}, ${bw[i * 3 + 1].toFixed(3)}, ${bw[i * 3 + 2].toFixed(3)}]`);
}
