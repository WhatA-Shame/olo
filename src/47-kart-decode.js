// 原版模型（卡丁车那批）的二进制解码器。
// 所有 dist/kart/*.bin 共用这一份：量化打包的顶点/骨架/动画在这里还原成引擎要的 Float32Array。
//
// 格式（小端）：
//   u32 magic 'KART' | u32 nV | u32 nI | u32 nJ | u32 nameLen | names(utf8, \0 分隔)
//   u32 texW | u32 texH   ← 贴图图集尺寸（0 = 没贴图；图集是同目录下的同名 .png）
//   u32 flags             ← bit0 = 有蒙皮顶点（顶点留在绑定世界空间）
//   i32 parent[nJ]
//   顶点：i16 pos*2000 ×3 | i8 nor*127 ×3 | u8 col*255 ×3 | u16 uv ×2
//         | u16 骨A | u16 骨B | u16 骨C | u16 骨D | u8 权重A..D
//   （骨索引用 u16：盒人（多脚纸箱）有 304 根骨，u8 会截断到 255，那些零件会绑错骨）
//   （骨B 的权重不存，引擎按 1−wA−wC−wD 反推；非蒙皮顶点就是 wA=1、其余 0）
//   u32 idx[nI]
//   骨架：i16 bindWorld*2000 ×3 | i16 bindQ*32767 ×4 | i16 bindWQ*32767 ×4 | i16 localPos*2000 ×3
//   u32 nAnim | [ u32 frames | f32 dur | u32 nameLen | name(utf8) | i16 data[frames*nJ*10] ]
//                                                                  ← 平移 ×1000，四元数 ×32767，三轴缩放 ×10000

function toBuf(src) {
  if (src instanceof ArrayBuffer) return src;
  if (ArrayBuffer.isView(src)) return src.buffer.slice(src.byteOffset, src.byteOffset + src.byteLength);
  const s = atob(src);
  const u8 = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
  return u8.buffer;
}

export function kartDecode(src) {
  const buf = toBuf(src);
  const dv = new DataView(buf);
  const u8 = new Uint8Array(buf);
  const td = new TextDecoder();
  let o = 0;
  const rU32 = () => {
    const v = dv.getUint32(o, true);
    o += 4;
    return v;
  };
  const rI32 = () => {
    const v = dv.getInt32(o, true);
    o += 4;
    return v;
  };
  const rI16 = () => {
    const v = dv.getInt16(o, true);
    o += 2;
    return v;
  };
  const rF32 = () => {
    const v = dv.getFloat32(o, true);
    o += 4;
    return v;
  };
  const magic = rU32();
  if (magic !== 0x4b415254) throw new Error('不是 KART 数据块');
  const nV = rU32(),
    nI = rU32(),
    nJ = rU32(),
    nameLen = rU32();
  const names = td.decode(u8.subarray(o, o + nameLen)).split('\u0000');
  o += nameLen;
  // 贴图图集尺寸（0 = 这个模型没有贴图，颜色全在顶点色里）
  const texW = rU32(),
    texH = rU32(),
    // bit0 = 有蒙皮顶点 → 顶点在绑定世界空间，运行时不能再预变换到骨骼局部空间
    flags = rU32();

  const parent = new Int32Array(nJ);
  for (let j = 0; j < nJ; j++) parent[j] = rI32();

  const pos = new Float32Array(nV * 3),
    nor = new Float32Array(nV * 3),
    col = new Float32Array(nV * 3),
    uv = new Float32Array(nV * 2),
    // 骨A/骨B/权重A —— 老的三元组，原生网格和两骨蒙皮都够用
    skin = new Float32Array(nV * 3),
    // 骨C/骨D/权重C/权重D —— 四骨蒙皮才用得上（大肥蛆肚子那种三骨分布）
    skin2 = new Float32Array(nV * 4);
  for (let v = 0; v < nV; v++) {
    pos[v * 3] = rI16() / 2000;
    pos[v * 3 + 1] = rI16() / 2000;
    pos[v * 3 + 2] = rI16() / 2000;
    nor[v * 3] = dv.getInt8(o) / 127;
    nor[v * 3 + 1] = dv.getInt8(o + 1) / 127;
    nor[v * 3 + 2] = dv.getInt8(o + 2) / 127;
    o += 3;
    col[v * 3] = u8[o] / 255;
    col[v * 3 + 1] = u8[o + 1] / 255;
    col[v * 3 + 2] = u8[o + 2] / 255;
    o += 3;
    uv[v * 2] = dv.getUint16(o, true) / 65535;
    uv[v * 2 + 1] = dv.getUint16(o + 2, true) / 65535;
    o += 4;
    skin[v * 3] = dv.getUint16(o, true);
    skin[v * 3 + 1] = dv.getUint16(o + 2, true);
    skin2[v * 4] = dv.getUint16(o + 4, true);
    skin2[v * 4 + 1] = dv.getUint16(o + 6, true);
    o += 8;
    skin[v * 3 + 2] = u8[o] / 255;
    skin2[v * 4 + 2] = u8[o + 2] / 255;
    skin2[v * 4 + 3] = u8[o + 3] / 255;
    o += 4;
  }
  const idx = new Uint32Array(nI);
  for (let k = 0; k < nI; k++) idx[k] = rU32();

  const bindWorld = new Float32Array(nJ * 3),
    bindQ = new Float32Array(nJ * 4),
    bindWQ = new Float32Array(nJ * 4),
    localPos = new Float32Array(nJ * 3);
  for (let j = 0; j < nJ; j++) {
    bindWorld[j * 3] = rI16() / 2000;
    bindWorld[j * 3 + 1] = rI16() / 2000;
    bindWorld[j * 3 + 2] = rI16() / 2000;
    for (let k = 0; k < 4; k++) bindQ[j * 4 + k] = rI16() / 32767;
    for (let k = 0; k < 4; k++) bindWQ[j * 4 + k] = rI16() / 32767;
    localPos[j * 3] = rI16() / 2000;
    localPos[j * 3 + 1] = rI16() / 2000;
    localPos[j * 3 + 2] = rI16() / 2000;
  }

  const nA = rU32();
  const anim = {};
  for (let a = 0; a < nA; a++) {
    const frames = rU32(),
      dur = rF32(),
      nl = rU32();
    const key = td.decode(u8.subarray(o, o + nl)) || `a${a}`;
    o += nl;
    const data = new Float32Array(frames * nJ * 10);
    for (let k = 0; k < frames * nJ; k++) {
      const b = k * 10;
      data[b] = rI16() / 1000;
      data[b + 1] = rI16() / 1000;
      data[b + 2] = rI16() / 1000;
      for (let q = 3; q < 7; q++) data[b + q] = rI16() / 32767;
      // 三轴缩放，1 = 静置大小（存的是 animScale / restScale）
      data[b + 7] = rI16() / 10000;
      data[b + 8] = rI16() / 10000;
      data[b + 9] = rI16() / 10000;
    }
    anim[key] = { frames, dur, fps: 24, data };
  }

  return {
    mesh: { pos, nor, uv, col, idx, skin, skin2 },
    rig: { names, parent, bindWorld, bindQ, bindWQ, localPos, bindSpace: (flags & 1) !== 0 },
    tex: { w: texW, h: texH },
    anim,
  };
}
