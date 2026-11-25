// 原版模型 vs 我们转出来的 .bin —— 同机位并排渲染。
// 步进逻辑和 glbExporter.烘焙单动作动画 一致：更新(秒, 步长, 速度, 转向)。
import * as THREE from 'three';
import { 所有预设模型 } from './src/core/baseEntities.ts';
import { 获取动作预览配置 } from './src/core/glbExporter.ts';
import { kartDecode } from '../src/47-kart-decode.js';

const W = 420, H = 520;
// 原版中文动作名 → .bin 里的英文名（和 tools/glb2kart.mjs 的 ANIM_ALIAS 一致）
const ALIAS = { 待机: 'walk', 行走: 'walk', 嘲讽: 'taunt', 笑话: 'joke', 跳舞: 'dance', 左拐: 'turnL', 右拐: 'turnR',
  急停: 'stop', 眩晕: 'stun', 小加速: 'accelS', 中加速: 'accelM', 大加速: 'accelL', 失控: 'spin',
  庆祝: 'cheer', 滞空: 'air', 左攻击: 'attackL', 右攻击: 'attackR', 普通攻击: 'attack',
  复活: 'revive', 死亡: 'die', 吟唱: 'chant', 跑起来: 'run', 撞车震飞: 'fall', 起步抖动: 'start' };
const ourClipName = (a) => ALIAS[a] || a;

function 建渲染器() {
  const r = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  r.setSize(W, H);
  r.setClearColor(0x101018, 1);
  return r;
}
function 灯光(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 2.2));
  const dl = new THREE.DirectionalLight(0xffffff, 2.4);
  dl.position.set(3, 6, 5);
  scene.add(dl);
  const dl2 = new THREE.DirectionalLight(0xffffff, 1.0);
  dl2.position.set(-4, 2, -5);
  scene.add(dl2);
}
// 用整体包围盒取景，和原版一致
function 取景(scene, obj, fixedBB) {
  const bb = fixedBB || new THREE.Box3().setFromObject(obj);
  const c = bb.getCenter(new THREE.Vector3());
  const size = Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y, bb.max.z - bb.min.z);
  const cam = new THREE.PerspectiveCamera(28, W / H, 0.1, 500);
  cam.position.set(c.x, c.y + size * 0.05, c.z + size * 2.6);
  cam.lookAt(c);
  scene.fog = null;
  return cam;
}

// 原版：步进到指定帧
function 原版组(i, action, frame) {
  const 模型 = 所有预设模型[i]();
  模型.设置动作(action);
  const 配置 = 获取动作预览配置(action);
  const 帧数 = Math.max(8, Math.round(配置.时长 * 配置.采样帧率) + 1);
  const 步长 = 配置.时长 / (帧数 - 1);
  const 环境 = 配置.环境 ? { ...配置.环境 } : undefined;
  模型.更新(0, 0.016, 配置.速度, 配置.转向角, 环境);
  for (let f = 1; f <= frame; f++) 模型.更新(f * 步长, 步长, 配置.速度, 配置.转向角, 环境);
  模型.模型组.updateMatrixWorld(true);
  return 模型.模型组;
}

// 我们：按 .bin 的 FK + 单骨 LBS 直接算出每个顶点的世界坐标，拼一个静态网格
function 我们组(d, clipName, frame) {
  const N = d.rig.names.length;
  const order = [];
  {
    const kids = Array.from({ length: N }, () => []);
    const rs = [];
    for (let j = 0; j < N; j++) (d.rig.parent[j] < 0 ? rs : kids[d.rig.parent[j]]).push(j);
    const st = [...rs], seen = new Uint8Array(N);
    while (st.length) { const j = st.pop(); if (seen[j]) continue; seen[j] = 1; order.push(j); for (const c of kids[j]) st.push(c); }
  }
  const qrot = (q, qi, x, y, z, o, oi) => {
    const qx = q[qi], qy = q[qi + 1], qz = q[qi + 2], qw = q[qi + 3];
    const tx = 2 * (qy * z - qz * y), ty = 2 * (qz * x - qx * z), tz = 2 * (qx * y - qy * x);
    o[oi] = x + qw * tx + (qy * tz - qz * ty);
    o[oi + 1] = y + qw * ty + (qz * tx - qx * tz);
    o[oi + 2] = z + qw * tz + (qx * ty - qy * tx);
  };
  const qmul = (a, ai, b, bi, o, oi) => {
    const ax = a[ai], ay = a[ai + 1], az = a[ai + 2], aw = a[ai + 3];
    const bx = b[bi], by = b[bi + 1], bz = b[bi + 2], bw = b[bi + 3];
    o[oi] = aw * bx + ax * bw + ay * bz - az * by;
    o[oi + 1] = aw * by - ax * bz + ay * bw + az * bx;
    o[oi + 2] = aw * bz + ax * by - ay * bx + az * bw;
    o[oi + 3] = aw * bw - ax * bx - ay * by - az * bz;
  };
  const clip = d.anim[clipName];
  const fr = Math.min(clip.frames - 1, frame);
  const wp = new Float64Array(N * 3), wq = new Float64Array(N * 4), ws = new Float64Array(N * 3), tmp = [0, 0, 0];
  for (const j of order) {
    const o = (fr * N + j) * 10, p = d.rig.parent[j];
    const t3 = [d.rig.localPos[j * 3] + clip.data[o], d.rig.localPos[j * 3 + 1] + clip.data[o + 1], d.rig.localPos[j * 3 + 2] + clip.data[o + 2]];
    const s3 = [clip.data[o + 7], clip.data[o + 8], clip.data[o + 9]];
    if (p < 0) {
      for (let k = 0; k < 3; k++) { wp[j * 3 + k] = t3[k]; ws[j * 3 + k] = s3[k]; }
      for (let k = 0; k < 4; k++) wq[j * 4 + k] = clip.data[o + 3 + k];
    } else {
      const kx = ws[p * 3], ky = ws[p * 3 + 1], kz = ws[p * 3 + 2];
      qrot(wq, p * 4, t3[0] * kx, t3[1] * ky, t3[2] * kz, tmp, 0);
      for (let k = 0; k < 3; k++) wp[j * 3 + k] = wp[p * 3 + k] + tmp[k];
      qmul(wq, p * 4, clip.data, o + 3, wq, j * 4);
      ws[j * 3] = kx * s3[0]; ws[j * 3 + 1] = ky * s3[1]; ws[j * 3 + 2] = kz * s3[2];
    }
  }
  const P = d.mesh.pos, C = d.mesh.col, I = d.mesh.idx;
  const BW = d.rig.bindWorld, BQ = d.rig.bindWQ, SK = d.mesh.skin, BIND = d.rig.bindSpace;
  const out = new Float32Array(P.length);
  const cq = [0, 0, 0, 0], t1 = [0, 0, 0], t2 = [0, 0, 0];
  for (let v = 0; v < P.length / 3; v++) {
    const jA = SK[v * 3], jB = SK[v * 3 + 1], wA = SK[v * 3 + 2];
    const vx = P[v * 3], vy = P[v * 3 + 1], vz = P[v * 3 + 2];
    const one = (j, o) => {
      // d.mesh.pos 永远是**烘焙后的世界坐标**；引擎在加载时把它预变换到骨骼局部空间
      // （BIND=true 时不做，留给着色器里的 q2 处理）。这里要和引擎一致。
      cq[0] = -BQ[j * 4]; cq[1] = -BQ[j * 4 + 1]; cq[2] = -BQ[j * 4 + 2]; cq[3] = BQ[j * 4 + 3];
      qrot(cq, 0, vx - BW[j * 3], vy - BW[j * 3 + 1], vz - BW[j * 3 + 2], t1, 0);
      const lx = t1[0], ly = t1[1], lz = t1[2];
      t1[0] = lx * ws[j * 3]; t1[1] = ly * ws[j * 3 + 1]; t1[2] = lz * ws[j * 3 + 2];
      qrot(wq, j * 4, t1[0], t1[1], t1[2], t2, 0);
      o[0] = wp[j * 3] + t2[0]; o[1] = wp[j * 3 + 1] + t2[1]; o[2] = wp[j * 3 + 2] + t2[2];
    };
    const a3 = [0, 0, 0], b3 = [0, 0, 0];
    one(jA, a3);
    if (wA < 0.999) { one(jB, b3); for (let k = 0; k < 3; k++) a3[k] = b3[k] + (a3[k] - b3[k]) * wA; }
    out[v * 3] = a3[0]; out[v * 3 + 1] = a3[1]; out[v * 3 + 2] = a3[2];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(out, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(C, 3));
  geo.setIndex(new THREE.BufferAttribute(I, 1));
  geo.computeVertexNormals();
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  return new THREE.Mesh(geo, mat);
}

window.__cmp = async (i, action, frame, side) => {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:0;font:14px sans-serif;color:#fff';
  document.body.innerHTML = '';
  document.body.style.margin = '0';

  const g1 = 原版组(i, action, frame);
  let nMesh1 = 0, nVert1 = 0;
  g1.traverse((n) => { if (n instanceof THREE.Mesh && n.geometry?.attributes?.position) { nMesh1++; nVert1 += n.geometry.attributes.position.count; } });
  window.__counts = JSON.stringify({ nMesh1, nVert1 });
  const d = kartDecode(new Uint8Array(await (await fetch('./frog.bin')).arrayBuffer()));
  window.__d = d;
  const g2 = 我们组(d, ourClipName(action), frame);

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:8px;background:#101018';
  document.body.appendChild(wrap);

  // 两边共用同一个相机（按原版的包围盒），否则各自 fit 会让差异看起来比实际大
  const sharedBB = new THREE.Box3().setFromObject(g1);
  for (const [obj, label, key] of [[g1, `原版 ${action} f${frame}  网格${nMesh1}/顶点${nVert1}`, 'orig'], [g2, `我们 ${ourClipName(action)} f${frame}`, 'ours']]) {
    if (side && side !== key) continue;
    const cell = document.createElement('div');
    cell.style.cssText = 'position:relative;width:420px;height:520px';
    const r = 建渲染器();
    const scene = new THREE.Scene();
    灯光(scene);
    scene.add(obj);
    const cam = 取景(scene, obj, sharedBB);
    r.render(scene, cam);
    cell.appendChild(r.domElement);
    const t = document.createElement('div');
    t.textContent = label;
    t.style.cssText = 'position:absolute;left:8px;top:6px;color:#fff;font:14px sans-serif';
    cell.appendChild(t);
    wrap.appendChild(cell);
  }
  document.title = 'READY';
  return true;
};
// 列出原版所有网格的名字（用来和 GLB 的节点名对差集）
window.__dumpNames = (i, action, frame) => {
  const g = 原版组(i, action, frame);
  const out = [];
  g.traverse((n) => {
    if (!(n instanceof THREE.Mesh) || !n.geometry?.attributes?.position) return;
    const bb = new THREE.Box3().setFromObject(n);
    out.push({ name: n.name, v: n.geometry.attributes.position.count, vis: n.visible,
      type: n.type, mat: n.material && n.material.type,
      blending: n.material && n.material.blending, transparent: n.material && n.material.transparent,
      c: [+bb.getCenter(new THREE.Vector3()).x.toFixed(2), +bb.getCenter(new THREE.Vector3()).y.toFixed(2), +bb.getCenter(new THREE.Vector3()).z.toFixed(2)] });
  });
  document.body.innerHTML = '<pre id="dump">' + JSON.stringify(out) + '</pre>';
  document.title = 'DUMP';
  return out.length;
};
// 红绿差分：原版染红、我们染绿，additive 叠加 —— 重合=黄，只有一边=纯红/纯绿
window.__diff = (i, action, frame) => {
  const g1 = 原版组(i, action, frame);
  document.body.innerHTML = '';
  document.body.style.margin = '0';
  const W = 640, H = 640;
  const r = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  r.setSize(W, H);
  r.setClearColor(0x000000, 1);
  document.body.appendChild(r.domElement);
  const scene = new THREE.Scene();
  const matR = new THREE.MeshBasicMaterial({ color: 0xff0000, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true });
  const matG = new THREE.MeshBasicMaterial({ color: 0x00ff00, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true });
  g1.traverse((n) => { if (n instanceof THREE.Mesh) n.material = matR; });
  scene.add(g1);
  const bb = new THREE.Box3().setFromObject(g1);
  const c = bb.getCenter(new THREE.Vector3());
  const size = Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y, bb.max.z - bb.min.z);
  const cam = new THREE.PerspectiveCamera(28, W / H, 0.1, 500);
  cam.position.set(c.x, c.y + size * 0.05, c.z + size * 2.6);
  cam.lookAt(c);
  r.render(scene, cam);
  // 第二次：只画我们，绿色，清深度
  const g2 = 我们组(window.__d, ourClipName(action), frame);
  g2.material = matG;
  scene.add(g2);
  r.clearDepth();
  r.render(scene, cam);
  document.title = 'READY';
  return true;
};
window.__kartShotReady = true;
