// 45-slime-mesh.js — 黄色史莱姆程序化 3D 骨架、模型与弹性形变动画
import { K, Wa } from './25-render-9.js';
import { Ls } from './26-core-5.js';

function bSlime() {
  const rig = new Wa(),
    root = rig.add("root", -1, 0, 0, 0),
    skirt = rig.add("skirt", root, 0, 0.04, 0),
    body = rig.add("body", root, 0, 0.08, 0),
    core = rig.add("core", body, 0, 0.56, 0),
    crown = rig.add("crown", body, 0, 1.06, 0);

  const b = new Ls();
  b.crease = 52;

  // 1. 底部扩散的果冻裙边（贴地，匹配立绘底部波浪裙摆）
  b.bone(skirt).paint(0xdca010, { c2: 0xf6cf24, mat: K.crystal, gloss: 0.82, line: 0.7, ao: 0.72 });
  b.lathe(
    [
      [0.0, 0.86, 0.86, 0, 0],
      [0.02, 1.02, 1.02, 0, 0],
      [0.06, 1.05, 1.05, 0, 0],
      [0.12, 0.96, 0.96, 0, 0],
      [0.2, 0.82, 0.82, 0, 0],
    ],
    { seg: 18, cap0: !0, cap1: !1 },
  );
  // 周围一圈圆润波浪果冻滴褶，让贴地边缘更有流动感
  b.paint(0xe6ae16, { c2: 0xffdf42, mat: K.crystal, gloss: 0.84, line: 0.6, ao: 0.65 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2,
      r = 0.88 + (i % 2) * 0.08,
      sx = 0.24 + (i % 2) * 0.05;
    b.ball(Math.cos(a) * r, 0.085, Math.sin(a) * r, sx, 0.095, sx, 1);
  }

  // 2. 主体圆润果冻钟形穹顶（纯亮黄到暖琥珀渐变，高光泽果冻质感）
  b.bone(body).paint(0xe9b618, { c2: 0xfff058, mat: K.crystal, gloss: 0.88, line: 0.85, ao: 0.62 });
  b.lathe(
    [
      [0.06, 0.9, 0.9, 0, 0],
      [0.18, 0.84, 0.84, 0, 0],
      [0.34, 0.78, 0.78, 0, 0],
      [0.54, 0.77, 0.77, 0, 0],
      [0.76, 0.74, 0.74, 0, 0],
      [0.98, 0.65, 0.65, 0, 0],
      [1.18, 0.5, 0.5, 0, 0],
      [1.33, 0.3, 0.3, 0, 0],
      [1.42, 0.12, 0.12, 0, 0],
      [1.45, 0.01, 0.01, 0, 0],
    ],
    { seg: 20, cap0: !0, cap1: !0 },
  );

  // 3. 内部琥珀果冻核与悬浮亮气泡（透过果冻顶部的柔和光泽层次）
  b.bone(core).paint(0xffc928, { c2: 0xfff898, mat: K.crystal, gloss: 0.94, line: 0.2, ao: 0.35 });
  b.ball(0, 0.52, 0, 0.4, 0.34, 0.4, 2);
  b.paint(0xfff9b8, { c2: 0xffffff, mat: K.crystal, gloss: 0.98, line: 0.0, ao: 0.15 });
  b.ball(0.24, 0.82, 0.52, 0.13, 0.09, 0.08, 1);
  b.ball(-0.28, 0.64, 0.48, 0.09, 0.07, 0.07, 1);
  b.ball(0.18, 0.44, -0.42, 0.1, 0.08, 0.08, 1);

  // 4. 顶部高光柔弹果冻帽（让高光与顶点有延迟弹性晃动）
  b.bone(crown).paint(0xfff478, { c2: 0xffffca, mat: K.crystal, gloss: 0.96, line: 0.15, ao: 0.2 });
  b.ball(0, 1.18, 0, 0.46, 0.26, 0.46, 2);
  b.paint(0xffffff, { c2: 0xfffce0, mat: K.crystal, gloss: 1.0, line: 0.0, ao: 0.1 });
  b.ball(-0.18, 1.24, 0.24, 0.16, 0.07, 0.1, 1);
  b.ball(-0.04, 1.32, 0.14, 0.08, 0.04, 0.06, 1);

  const animate = (R, I, P) => {
    R.reset();
    const st = I.anim,
      time = I.time || 0,
      mode = I.mode || 0,
      puddle = (mode & 134217728) !== 0,
      puddleT = I.slimePuddleT ?? (puddle ? 1 : 0),
      ballMode = (mode & 268435456) !== 0,
      wallBounce = (mode & 536870912) !== 0,
      cling = (mode & 1073741824) !== 0,
      chargeP = I.slimeChargeP ?? 0;

    P.glow = 1.05;
    P.tint = 0;

    // 死亡：彻底融化成一滩黯淡的扁果冻
    if (st === "dead") {
      const p = Math.min(1, I.p || (I.t || 0) * 1.4),
        e = 1 - (1 - p) * (1 - p);
      R.scale3(body, 1 + 0.72 * e, Math.max(0.08, 1 - 0.9 * e), 1 + 0.72 * e);
      R.scale3(skirt, 1 + 0.85 * e, Math.max(0.12, 1 - 0.82 * e), 1 + 0.85 * e);
      R.scale3(crown, 1 + 0.5 * e, Math.max(0.05, 1 - 0.92 * e), 1 + 0.5 * e);
      P.glow = Math.max(0.15, 1 - e * 0.85);
      return;
    }

    // 大招【化整为零】：摊平在地、体积扩张为 4 倍的大滩流动果冻
    if (puddleT > 0.01) {
      const e = puddleT * puddleT * (3 - 2 * puddleT),
        w1 = Math.sin(time * 7.5) * 0.06 * e,
        w2 = Math.cos(time * 6.2) * 0.06 * e,
        sx = 1 + 1.42 * e + w1,
        sz = 1 + 1.42 * e + w2,
        sy = 1 - 0.8 * e + Math.sin(time * 9.0) * 0.025 * e;
      R.scale3(skirt, sx * 1.06, Math.max(0.22, 1 - 0.7 * e), sz * 1.06);
      R.scale3(body, sx, Math.max(0.16, sy), sz);
      R.scale3(core, 1 + 0.65 * e, Math.max(0.25, 1 - 0.65 * e), 1 + 0.65 * e);
      R.scale3(crown, 1 + 0.55 * e, Math.max(0.18, 1 - 0.75 * e), 1 + 0.55 * e);
      R.rot(skirt, 0, Math.sin(time * 2.8) * 10 * e, 0);
      R.move(body, 0, -0.04 * e, 0);
      P.glow = 1.05 + 0.95 * e + 0.25 * Math.sin(time * 10) * e;
      P.tint = 0.28 * e;
      P.tintColor = 0xffe848;
      return;
    }

    // 2技能【弹球】：蓄力缩成紧绷震动的圆弹球，冲撞时高速前滚
    if (ballMode) {
      if (st === "dash") {
        const spin = ((I.t || 0) * 1080) % 360;
        R.move(root, 0, 0.66, 0);
        R.rot(root, spin, 0, 0);
        R.move(body, 0, -0.62, 0);
        R.scale3(skirt, 0.01, 0.01, 0.01);
        R.scale3(body, 0.94, 0.88, 1.08);
        R.scale3(crown, 0.86, 0.82, 0.95);
        P.glow = 2.35;
        P.tint = 0.36;
        P.tintColor = 0xffc624;
        return;
      }
      // 原地蓄力压紧震动：蓄得越久缩得越紧、抖得越狠、光越亮
      const vib = (0.025 + 0.075 * chargeP) * Math.sin(time * (22 + 26 * chargeP)),
        sq = 0.84 - 0.22 * chargeP + vib,
        wd = 1.12 + 0.26 * chargeP - vib * 0.9;
      R.scale3(skirt, 1.08 + 0.16 * chargeP, 0.72, 1.08 + 0.16 * chargeP);
      R.scale3(body, wd, sq, wd);
      R.scale3(crown, wd * 0.92, sq * 0.92, wd * 0.92);
      R.move(body, Math.sin(time * 48) * 0.04 * chargeP, -0.03 * chargeP, Math.cos(time * 44) * 0.04 * chargeP);
      P.glow = 1.2 + 1.45 * chargeP;
      P.tint = 0.12 + 0.42 * chargeP;
      P.tintColor = 0xffb820;
      return;
    }

    // 1技能【吸附】：紧贴目标做 4Hz 高弹性吮吸脉动
    if (cling) {
      const pulse = Math.sin(time * 25.13),
        sx = 1.2 + 0.16 * pulse,
        sy = 0.88 - 0.14 * pulse;
      R.move(root, 0, 0.38 + 0.08 * Math.sin(time * 12.5), 0);
      R.scale3(skirt, 0.85, 0.7, 0.85);
      R.scale3(body, sx, sy, sx);
      R.scale3(crown, 1.08 - 0.1 * pulse, 0.95 + 0.12 * pulse, 1.08 - 0.1 * pulse);
      R.rot(body, Math.sin(time * 11) * 9, Math.cos(time * 9) * 12, Math.cos(time * 13) * 8);
      P.glow = 1.75 + 0.35 * pulse;
      P.tint = 0.26;
      P.tintColor = 0xffe438;
      return;
    }

    // 普攻：蓄力后仰压扁 -> 弹性猛顶前扑 -> 果冻回弹余震
    if (st === "attack" || st === "attack2") {
      const p = Math.min(1, Math.max(0, I.p || 0));
      let sx = 1,
        sy = 1,
        sz = 1,
        pitch = 0,
        fwd = 0,
        lift = 0;
      if (p < 0.28) {
        const k = p / 0.28;
        sx = 1 + 0.22 * k;
        sy = 1 - 0.28 * k;
        sz = 1 + 0.16 * k;
        pitch = -18 * k;
        fwd = -0.14 * k;
      } else if (p < 0.56) {
        const k = (p - 0.28) / 0.28,
          s = Math.sin(k * Math.PI);
        sx = 0.82 + 0.18 * (1 - s);
        sy = 0.92 + 0.18 * s;
        sz = 1 + 0.44 * s;
        pitch = 30 * s;
        fwd = 0.42 * s;
        lift = 0.14 * s;
      } else {
        const k = (p - 0.56) / 0.44,
          j = Math.sin(k * Math.PI * 3) * (1 - k) * 0.22;
        sx = 1 + j;
        sy = 1 - j * 1.1;
        sz = 1 + j;
        pitch = -10 * j;
      }
      R.move(root, 0, lift, fwd);
      R.rot(body, pitch, 0, 0);
      R.scale3(body, sx, sy, sz);
      R.scale3(skirt, 1 + (sx - 1) * 0.65, 1, 1 + (sz - 1) * 0.5);
      R.rot(crown, pitch * 0.4, 0, 0);
      P.glow = 1.15 + 0.45 * Math.sin(p * Math.PI);
    } else if (st === "airborne" || st === "stun") {
      // 受控/击飞/被动击退：剧烈弹性果冻颤动
      const j = Math.sin(time * 26) * 0.18,
        j2 = Math.cos(time * 21) * 0.14;
      R.scale3(body, 1 + j, 1 - j * 1.1, 1 + j2);
      R.scale3(skirt, 1 + j * 0.7, 0.9, 1 + j2 * 0.7);
      R.rot(body, Math.sin(time * 18) * 14, 0, Math.cos(time * 16) * 14);
      P.glow = 1.3;
    } else if (st === "move" || st === "run") {
      // 弹跳行走：按步态周期蓄压 -> 腾空拉长 -> 落地压扁
      const cyc = (I.stride ?? 0) * Math.PI * 2,
        hop = Math.max(0, Math.sin(cyc)),
        land = Math.max(0, -Math.sin(cyc)),
        sx = 1 - 0.18 * hop + 0.24 * land,
        sy = 1 + 0.28 * hop - 0.24 * land,
        sz = 1 - 0.14 * hop + 0.22 * land;
      R.move(root, 0, hop * 0.36, 0);
      R.scale3(body, sx, sy, sz);
      R.scale3(skirt, 1 - 0.12 * hop + 0.26 * land, 1 - 0.18 * land, 1 - 0.12 * hop + 0.26 * land);
      R.rot(body, 12 * hop - 6 * land, 0, Math.sin(cyc * 0.5) * 4);
      R.move(crown, 0, 0.06 * hop - 0.04 * land, 0);
    } else {
      // 待机：柔软果冻呼吸起伏 + 顶部果冻轻微晃动
      const br = Math.sin(time * 3.1),
        br2 = Math.sin(time * 3.1 - 0.65);
      R.scale3(body, 1 + 0.075 * br, 1 - 0.085 * br, 1 + 0.075 * br);
      R.scale3(skirt, 1 + 0.06 * br, 1, 1 + 0.06 * br);
      R.move(crown, Math.sin(time * 1.9) * 0.02, -0.025 * br2, Math.cos(time * 1.7) * 0.02);
      R.rot(core, 0, (time * 28) % 360, 0);
    }

    // 撞墙弹射窗口叠加特效：金橘色高弹储能闪光，提示立刻按 2 瞬发满蓄弹球
    if (wallBounce) {
      const f = 0.5 + 0.5 * Math.sin(time * 34);
      R.scale3(body, 1.18 - 0.14 * f, 0.86 + 0.16 * f, 1.18 - 0.14 * f);
      P.glow = 2.5 + 0.55 * f;
      P.tint = 0.45 + 0.2 * f;
      P.tintColor = 0xff9b1a;
    }
  };

  return {
    key: "hero:slime",
    geometry: b.build(),
    rig,
    height: 1.55,
    radius: 0.92,
    scale: 1.0,
    stride: 2.35,
    triangles: b.triangleCount,
    attach: {
      head: { joint: crown, x: 0, y: 0.24, z: 0 },
      chest: { joint: core, x: 0, y: 0.05, z: 0 },
      handR: { joint: body, x: 0.55, y: 0.48, z: 0.25 },
      handL: { joint: body, x: -0.55, y: 0.48, z: 0.25 },
      weapon: { joint: body, x: 0, y: 0.55, z: 0.72 },
      muzzle: { joint: body, x: 0, y: 0.55, z: 0.75 },
    },
    blend: () => 0.1,
    animate,
  };
}

export { bSlime };
