// 23-render-7.js — render｜28 个顶层语句｜60KB
// 对应 game.pretty.js 第 45216–47147 行
// 关键内容：
//   fF                    横向 0..1；vUv.y：沿水流方向的米数。vFal
//   JN                    ridge
//   hF                    position
//   pF                    pillar
//   _F                    beam
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { fi } from './04-audio-2.js';
import { dt } from './05-three.js';
import { Ae, An, Bn, N0, Sn } from './07-three-3.js';
import { ee } from './10-render-2.js';
import { Yt, fs, ke, nn, un } from './14-three-7.js';
import { aa, mf } from './15-render-4.js';
import { Be, Bf, Cx, Er, Fn, Ht, Ir, Lx, Mn, Pt, Px, ci, gs, li, x8, xf, y8, yo, yt } from './21-core-4.js';
import { Ho, KN, O0, Ts, XN, Xo, YN, _8, ae, b8, d3, gn, h3, oh, op, p3, tl, u3, vr, w_, zx } from './22-render-6.js';

function JN(n, t, e, s, i, a) {
  s.forEach((o, r) => {
    const l = new ke(5e3 + r * 31),
      c = o.poly;
    let f = 1 / 0,
      d = -1 / 0,
      h = 1 / 0,
      u = -1 / 0;
    for (const k of c)
      ((f = Math.min(f, k.x)), (d = Math.max(d, k.x)), (h = Math.min(h, k.y)), (u = Math.max(u, k.y)));
    const m = { x: 0, y: 0 },
      x = o.kind === "ridge",
      p = o.inradius > 3.1,
      g = e.baseDist((f + d) / 2, (h + u) / 2, 20) < 10,
      y = p ? 2.3 : 1.8,
      v = [],
      _ = (k, M) => o.niches.some((S) => Math.hypot(S.x - k, S.z - M) < 1.6);
    for (let k = h; k <= u; k += y)
      for (let M = f; M <= d; M += y) {
        if (((m.x = M + l.range(-0.5, 0.5) * y), (m.y = k + l.range(-0.5, 0.5) * y), !yo(m, c))) continue;
        const S = -Er(m, c);
        if (S < (x ? 1.2 : 1.35)) continue;
        const b = m.x,
          w = m.y;
        if (_(b, w)) continue;
        const T = o.topY(S) - 0.04,
          E = l.next(),
          C = Math.min(
            x ? 0.72 : g ? 0.9 : 1.08,
            (p ? l.range(0.82, 1.08) : l.range(0.62, 0.8)) * Math.min(1.1, 0.7 + S * 0.12),
          ),
          R = S >= (p ? 1.9 : 1.55) ? KN(e, b, w, T) : 0;
        if (R >= YN && E < (x ? 0.22 : p ? (g ? 0.5 : 0.64) : 0.45)) {
          let I = !0;
          for (const P of v) Math.hypot(P[0] - b, P[1] - w) < (P[2] + 1) * 1.15 && (I = !1);
          if (I) {
            const P = Math.min(C, R),
              F = P * l.range(0.95, 1.1),
              L = l.next(),
              B = e.riverDist(b, w) < 6;
            (L < 0.09
              ? n.add(t.accentTrees[L < 0.05 ? 0 : 1], ae(b, T, w, l.range(0, 6.28), P, F), {
                  tint: Ht([1, 1, 1], l.range(0.92, 1.04)),
                })
              : B && L < 0.6
                ? n.add(l.pick(t.willows), ae(b, T, w, l.range(0, 6.28), P, F), { tint: op(b, w, l) })
                : p && S > 3 && L > 0.9 && R > 1
                  ? n.add(l.pick(t.pines), ae(b, T, w, l.range(0, 6.28), P * 0.85, F * 0.85), {
                      tint: op(b, w, l),
                    })
                  : n.add(l.pick(t.trees), ae(b, T, w, l.range(0, 6.28), P, F), { tint: op(b, w, l) }),
              v.push([b, w, P]),
              i.aoBlobs.push({ x: b, y: T + 0.06, z: w, r: 2 * P, strength: 0.38 }),
              i.casters.push({ x: b, z: w, height: T + _8 * P, radius: b8 * P * 1.05, strength: 0.72 }));
            continue;
          }
        }
        if (E < 0.86) {
          const I = l.next();
          if (I < 0.3) {
            const P = l.range(0.75, 1.2);
            (n.add(l.pick(t.shrubs), ae(b, T, w, l.range(0, 6.28), P), { tint: op(b, w, l), rank: li }),
              i.aoBlobs.push({ x: b, y: T + 0.06, z: w, r: 0.95 * P, strength: 0.3 }));
          } else if (I < (x ? 0.62 : 0.46)) {
            const P = l.range(0.45, 0.85) * (x ? 1.15 : 1);
            (n.add(l.pick(t.boulders), ae(b, T + 0.05, w, l.range(0, 6.28), P, P * l.range(0.8, 1.2)), {
              tint: Ht([1, 1, 1], l.range(0.9, 1.1)),
              rank: li,
            }),
              i.aoBlobs.push({ x: b, y: T + 0.06, z: w, r: 1.3 * P, strength: 0.34 }));
          } else if (I < 0.6 && S > 0.95 && !x)
            if (a.claim(b, w)) {
              const P = u3(e, b, w, l),
                F = l.range(0.75, 1.2),
                L = p && S > 2.2 && l.chance(0.3);
              (n.add(l.pick(L ? t.bigCrystals : t.crystals), ae(b, T, w, l.range(0, 6.28), F), {
                tint: P,
                glow: l.range(0.75, 1),
                rank: li,
              }),
                i.glows.push({ x: b, z: w, y: T + 0.05, r: L ? 3.2 : 2, color: P }),
                i.aoBlobs.push({ x: b, y: T + 0.06, z: w, r: L ? 1.5 : 0.9, strength: 0.25 }));
            } else
              n.add(l.pick(t.ferns), ae(b, T, w, l.range(0, 6.28), l.range(1.1, 1.6)), {
                shadow: !1,
                rank: gs(b, w),
              });
          else if (I < 0.68)
            if (a.claim(b, w)) {
              const P = l.range(0.9, 1.3);
              (n.add(l.pick(t.lanterns), ae(b, T, w, l.range(0, 6.28), P), { rank: li }),
                i.glows.push({ x: b, z: w, y: T + 0.05, r: 1.6, color: zx }));
            } else
              n.add(l.pick(t.ferns), ae(b, T, w, l.range(0, 6.28), l.range(1, 1.5)), {
                shadow: !1,
                rank: gs(b, w),
              });
          else if (I < 0.75 && S < 1.9 && !x) {
            const P = l.chance(0.4);
            (n.add(
              l.pick(P ? t.tallPillars : t.pillars),
              ae(
                b,
                T - 0.05,
                w,
                l.range(0, 6.28),
                l.range(0.9, 1.1),
                1,
                l.range(-0.05, 0.05),
                l.range(-0.05, 0.05),
              ),
              { tint: Ht([1, 0.99, 0.95], l.range(0.85, 1)), glow: 0.5 },
            ),
              i.aoBlobs.push({ x: b, y: T + 0.06, z: w, r: 0.85, strength: 0.34 }));
          } else
            I < 0.8
              ? n.add(l.pick(t.flowers), ae(b, T + 0.02, w, l.range(0, 6.28), l.range(1.5, 2.2)), {
                  tint: l.pick(p3),
                  shadow: !1,
                  maskedTint: !0,
                  rank: gs(b, w, 0.55, 0.25),
                })
              : I < 0.92
                ? n.add(l.pick(t.ferns), ae(b, T, w, l.range(0, 6.28), l.range(1, 1.6)), {
                    shadow: !1,
                    rank: gs(b, w),
                  })
                : n.add(l.pick(t.tufts), ae(b, T, w, l.range(0, 6.28), l.range(1.3, 2)), {
                    shadow: !1,
                    rank: gs(b, w),
                  });
        }
      }
    if (!x)
      for (let k = h; k <= u; k += 0.95)
        for (let M = f; M <= d; M += 0.95) {
          if (((m.x = M + l.range(-0.45, 0.45)), (m.y = k + l.range(-0.45, 0.45)), !yo(m, c))) continue;
          const S = -Er(m, c);
          S < 1.35 ||
            !l.chance(0.3) ||
            n.add(l.pick(t.tufts), ae(m.x, o.topY(S) - 0.03, m.y, l.range(0, 6.28), l.range(1.2, 1.9)), {
              shadow: !1,
              tint: [0.95, 1, 0.9],
              rank: gs(m.x, m.y),
            });
        }
    for (const k of o.rim) {
      const M = k.oz,
        S = vr(k.ox, k.oz),
        b = k.x - k.ox * k.inset,
        w = k.z - k.oz * k.inset;
      if (!k.bare && M > -0.75 && !x) {
        const E = l.chance(0.75) ? 2 : 1;
        for (let A = 0; A < E; A++) {
          const C = l.range(-0.45, 0.45);
          n.add(
            l.pick(t.drapes),
            ae(
              b - k.oz * C + k.ox * 0.04,
              k.y - 0.05,
              w + k.ox * C + k.oz * 0.04,
              S + l.range(-0.25, 0.25),
              l.range(0.9, 1.35),
            ),
            {
              shadow: !1,
              tint: Ht([1, 1, 0.94], l.range(0.88, 1.06)),
              rank: gs(b + A * 0.37, w - A * 0.21, 0.5, 0.25),
            },
          );
        }
      }
      const T = M > 0.3 || k.ox < -0.3 ? 0.2 : M > -0.5 ? 0.06 : 0;
      if (!x && l.chance(T)) {
        const E = Math.max(0.02, k.inset - 0.26);
        n.add(
          l.pick(t.vines),
          ae(
            k.x - k.ox * E,
            k.y - 0.12,
            k.z - k.oz * E,
            S,
            l.range(0.9, 1.25),
            l.range(0.7, Math.max(0.8, Math.min(1.7, k.y - 0.9))),
          ),
          { shadow: !1, tint: Ht([1, 1, 1], l.range(0.85, 1.08)), rank: gs(k.x, k.z, 0.5, 0.3) },
        );
      }
      if (M > -0.2 && l.chance(0.07)) {
        const E = a.claim(k.x, k.z, 10),
          A = E ? XN(u3(e, k.x, k.z, l), 0.7) : yt(14262384);
        (n.add(
          l.pick(t.brackets),
          ae(k.x - k.ox * 0.06, l.range(0.25, 0.42), k.z - k.oz * 0.06, S, l.range(0.9, 1.4)),
          { shadow: !1, tint: A, maskedTint: !0, glow: E ? 0.45 : 0, rank: E ? li : gs(k.x, k.z) },
        ),
          E && i.glows.push({ x: k.x + k.ox * 0.4, z: k.z + k.oz * 0.4, y: 0.03, r: 1, color: A }));
      }
      if (l.chance(0.4)) {
        const E = l.range(0.28, 0.5),
          A = l.range(-0.4, 0.4),
          C = k.x - k.ox * 0.22 - k.oz * A,
          R = k.z - k.oz * 0.22 + k.ox * A;
        e.riverDist(C, R) > 0.2 &&
          n.add(l.pick(t.rocks), ae(C, -0.04, R, l.range(0, 6.28), E, E * l.range(0.7, 1.05)), {
            tint: Ht([1, 1, 1], l.range(0.82, 1.05)),
            rank: gs(C, R, 0.5, 0.25),
          });
      }
    }
  });
}

function tF(n, t, e, s, i, a) {
  const o = e.map,
    r = o.bound,
    l = new ke(777),
    c = 1.05;
  for (let v = -r; v <= r; v += c)
    for (let _ = -r; _ <= r; _ += c) {
      const k = _ + l.range(-0.5, 0.5) * c,
        M = v + l.range(-0.5, 0.5) * c,
        S = l.next(),
        b = un(k * 0.11, M * 0.11, 3, 19);
      if (!e.clutterOk(k, M, 0.9) || e.bushDist(k, M) < 0.3 || e.campDist(k, M) < -0.6) continue;
      const T = (e.solidDist(k, M, 4) < 1.6 ? 0.55 : 0.16 + Math.max(0, b - 0.45) * 1.5) * s;
      if (S > T) continue;
      const E = e.heightAt(k, M) - 0.02,
        A = l.next(),
        C = un(k * 0.07 + 31, M * 0.07, 2, 23);
      if (A < 0.05 + Math.max(0, C - 0.52) * 0.7)
        n.add(l.pick(t.flowers), ae(k, E, M, l.range(0, 6.28), l.range(1.3, 1.9)), {
          tint: p3[Math.floor(C * 5.99 + l.range(0, 0.8)) % p3.length],
          shadow: !1,
          maskedTint: !0,
          rank: gs(k, M, 0.55, 0.25),
        });
      else {
        const R = 0.88 + b * 0.24;
        n.add(l.pick(t.tufts), ae(k, E, M, l.range(0, 6.28), l.range(0.9, 1.6)), {
          shadow: !1,
          tint: [R * 0.97, R, R * 0.9],
          rank: gs(k, M),
        });
      }
    }
  e.walls.forEach((v, _) => {
    const k = new ke(8800 + _ * 13),
      M = v.poly;
    for (let S = 0; S < M.length; S++) {
      const b = M[S],
        w = M[(S + 1) % M.length],
        T = Math.hypot(w.x - b.x, w.y - b.y),
        E = (w.y - b.y) / T,
        A = -(w.x - b.x) / T,
        C = { x: (b.x + w.x) / 2 + E * 0.2, y: (b.y + w.y) / 2 + A * 0.2 },
        R = yo(C, M) ? -1 : 1;
      for (let I = k.range(0.3, 1.2); I < T; I += k.range(0.7, 1.9)) {
        const P = k.range(0.05, 0.42),
          F = b.x + ((w.x - b.x) * I) / T + E * R * P,
          L = b.y + ((w.y - b.y) * I) / T + A * R * P;
        if (
          e.solidDist(F, L) < 0.02 ||
          e.laneDist(F, L) < 0.6 ||
          e.riverDist(F, L) < 0.3 ||
          e.baseDist(F, L) < 0.3 ||
          e.padDist(F, L) < 0.3
        )
          continue;
        const B = e.heightAt(F, L),
          G = k.next();
        if (G < 0.34) {
          const q = k.range(0.16, 0.34) * (P < 0.2 ? 1.25 : 1);
          n.add(k.pick(t.rocks), ae(F, B, L, k.range(0, 6.28), q, q * k.range(0.7, 1.1)), {
            shadow: !1,
            tint: Ht([1, 1, 1], k.range(0.85, 1.08)),
            rank: gs(F, L, 0.5, 0.25),
          });
        } else if (G < 0.56)
          n.add(k.pick(t.ferns), ae(F, B - 0.02, L, k.range(0, 6.28), k.range(0.8, 1.25)), {
            shadow: !1,
            tint: Ht([1, 1, 1], k.range(0.85, 1.05)),
            rank: gs(F, L),
          });
        else if (G < 0.66) {
          const q = k.chance(0.4) && a.claim(F, L),
            et = q ? Pt(u3(e, F, L, k), [1, 1, 1], 0.2) : k.pick([yt(14182458), yt(14725232), yt(13208170)]);
          (n.add(k.pick(t.mushrooms), ae(F, B, L, k.range(0, 6.28), k.range(1, 1.5)), {
            shadow: !1,
            tint: et,
            maskedTint: !0,
            glow: q ? 1 : 0,
            rank: q ? li : gs(F, L, 0.4, 0.3),
          }),
            q && i.glows.push({ x: F, z: L, y: B + 0.03, r: 1.1, color: et }));
        } else
          G < 0.7 && P > 0.15
            ? a.claim(F, L) &&
              (n.add(k.pick(t.lanterns), ae(F, B, L, k.range(0, 6.28), k.range(0.5, 0.68)), { shadow: !1 }),
              i.glows.push({ x: F, z: L, y: B + 0.03, r: 1.3, color: zx }))
            : G < 0.86 &&
              n.add(k.pick(t.tufts), ae(F, B - 0.02, L, k.range(0, 6.28), k.range(1.3, 2)), {
                shadow: !1,
                rank: gs(F, L),
              });
      }
    }
  });
  const f = e.riverLine,
    d = f[0],
    h = f[f.length - 1],
    u = Math.hypot(h.x - d.x, h.y - d.y),
    m = (h.x - d.x) / u,
    x = (h.y - d.y) / u,
    p = new ke(1212),
    g = o.riverWidth / 2;
  for (let v = 0; v < u; v += 2.6) {
    const _ = (p.chance(0.5) ? 1 : -1) * p.range(g - 3.2, g - 1.2),
      k = d.x + m * v - x * _,
      M = d.y + x * v + m * _;
    if (e.boundDist(k, M) < 0.8 || e.laneDist(k, M) < 1.6 || e.campDist(k, M) < 0.8) continue;
    const S = p.next();
    if (S < 0.42) {
      const b = 3 + p.int(3);
      let w = 0;
      for (let T = 0; T < b; T++) {
        const E = p.range(0, 6.28),
          A = T === 0 ? 0 : p.range(0.55, 1.25),
          C = k + Math.cos(E) * A,
          R = M + Math.sin(E) * A;
        if (e.heightAt(C, R) > Fn - 0.08) continue;
        const I = T === 0 ? p.range(0.55, 0.7) : p.range(0.35, 0.55);
        ((w = Math.max(w, I)),
          n.add(p.pick(t.lilyPads), ae(C, Fn + 0.012, R, p.range(0, 6.28), I, 1), {
            shadow: !1,
            tint: Ht([1, 1, 1], p.range(0.85, 1.08)),
          }),
          T === 1 &&
            n.add(t.lotusBud, ae(C, Fn, R, p.range(0, 6.28), p.range(0.9, 1.2)), {
              shadow: !1,
              tint: yt(O0.petalPink),
              maskedTint: !0,
            }));
      }
      w > 0 && p.chance(0.6) && i.ripples.push({ x: k, z: M, r: 1.3 });
    } else if (S < 0.5) {
      if (a.claim(k, M, 10)) {
        const b = Pt(oh, [1, 1, 1], p.range(0.1, 0.4)),
          w = p.range(0.2, 0.4);
        (n.add(
          p.pick(t.crystals),
          ae(k, e.heightAt(k, M) - 0.02, M, p.range(0, 6.28), w, w, p.range(-0.3, 0.3), p.range(-0.3, 0.3)),
          { shadow: !1, tint: b, glow: 1 },
        ),
          i.glows.push({ x: k, z: M, y: Fn + 0.02, r: 1.5, color: b }),
          i.ripples.push({ x: k, z: M, r: 0.8 }));
      }
    } else if (S < 0.66) {
      const b = 1 + p.int(3);
      for (let w = 0; w < b; w++) {
        const T = p.range(0.25, 0.5) * (w === 0 ? 1.2 : 0.8),
          E = k + p.range(-0.6, 0.6) * w,
          A = M + p.range(-0.6, 0.6) * w;
        n.add(p.pick(t.rocks), ae(E, e.heightAt(E, A) + 0.04, A, p.range(0, 6.28), T, T * 0.8), {
          shadow: !1,
          tint: [0.8, 0.86, 0.92],
        });
      }
      p.chance(0.5) && i.ripples.push({ x: k, z: M, r: 0.9 });
    }
  }
  const y = new ke(2323);
  for (let v = 0; v < u; v += 4.5) {
    const k = (y.chance(0.5) ? 1 : -1) * (g + y.range(0.7, 1.3)),
      M = d.x + m * v - x * k,
      S = d.y + x * v + m * k,
      b = y.range(0.5, 0.62),
      w = y.range(0, 6.28);
    if (
      e.boundDist(M, S) < 1 ||
      e.laneDist(M, S) < 1.5 ||
      e.solidDist(M, S) < 0.4 ||
      e.bushDist(M, S) < 0.4 ||
      e.campDist(M, S) < 0.5 ||
      !a.claim(M, S, 9)
    )
      continue;
    const T = Pt(oh, [1, 1, 1], 0.25);
    (n.add(y.pick(t.bells), ae(M, e.heightAt(M, S) - 0.02, S, w, b), {
      shadow: !1,
      tint: T,
      maskedTint: !0,
      glow: 1,
    }),
      i.glows.push({ x: M, z: S, y: 0.03, r: 1.1, color: T }));
  }
  e.walls.forEach((v, _) => {
    const k = new ke(6100 + _ * 7),
      M = v.poly;
    for (let S = 0; S < M.length; S++) {
      const b = M[S],
        w = M[(S + 1) % M.length],
        T = Math.hypot(w.x - b.x, w.y - b.y),
        E = (w.y - b.y) / T,
        A = -(w.x - b.x) / T,
        C = { x: (b.x + w.x) / 2 + E * 0.2, y: (b.y + w.y) / 2 + A * 0.2 },
        R = yo(C, M) ? 1 : -1;
      for (let I = k.range(0.2, 0.9); I < T; I += k.range(0.8, 1.5)) {
        const P = b.x + ((w.x - b.x) * I) / T + E * R * 0.14,
          F = b.y + ((w.y - b.y) * I) / T + A * R * 0.14;
        e.riverDist(P, F) > 1 ||
          e.laneDist(P, F) < 1.2 ||
          (k.chance(0.8) &&
            n.add(
              k.pick(t.reeds),
              ae(P, Math.min(0, e.heightAt(P, F)) - 0.05, F, k.range(0, 6.28), k.range(0.85, 1.3)),
              { shadow: !1, tint: Ht([1, 1, 1], k.range(0.85, 1.05)), rank: gs(P, F, 0.55, 0.25) },
            ));
      }
    }
  });
}

const nl = yt(Yt.env.rockDark),
  cr = yt(Yt.env.rock),
  e0 = yt(Yt.env.rockLight),
  rp = yt(Yt.env.rockWarm),
  sl = yt(Yt.env.moss),
  eF = yt(3104576),
  N_ = yt(5211208),
  F_ = yt(4937848),
  nF = yt(7301700),
  sF = yt(Yt.env.fog),
  wr = 2.7,
  g1 = wr + 0.2,
  _0 = 0.55,
  w8 = -1.95,
  m3 = 0.9,
  M8 = 0.5;

function iF(n) {
  const t = n.map.bound,
    e = (a, o) => ci(t - 13, t - 1.5, o),
    s = (a, o) => {
      const r = Math.atan2(o, a);
      return 17.5 + un(Math.cos(r) * 2.2 + 5, Math.sin(r) * 2.2 + 5, 3, 91) * 4.5;
    };
  return {
    heightAt: (a, o) => {
      const r = Math.max(Math.abs(a), Math.abs(o)) - t,
        l = e(a, o),
        c = (un(a * 0.07 + 3.1, o * 0.07 + 1.7, 3, 57) - 0.35) * 3.2 * ci(1.5, 8, r),
        f = s(a, o),
        d = ci(f - 5, f, r),
        h = wr + 0.12 + c * (1 - d * 0.7) - d * 0.5,
        u = w8 - 0.03 * r + (un(a * 0.11, o * 0.11, 2, 61) - 0.5) * 0.5;
      let m = Mn(h, u, l);
      const x = n.riverDist(a, o);
      return (x < 2.5 && (m -= ci(2.5, 0.2, x) * Mn(0, 0.5, l)), m);
    },
    southWeight: e,
    edgeDist: s,
  };
}

function aF(n, t) {
  const e = [
      { x: -n, y: -n },
      { x: -n, y: n },
      { x: n, y: n },
      { x: n, y: -n },
    ],
    s = [],
    i = [];
  for (let a = 0; a < 4; a++) {
    const o = e[a],
      r = e[(a + 1) % 4],
      l = Math.hypot(r.x - o.x, r.y - o.y),
      c = Math.round(l / t);
    i.push(s.length);
    for (let f = 0; f < c; f++) s.push({ x: o.x + ((r.x - o.x) * f) / c, y: o.y + ((r.y - o.y) * f) / c });
  }
  return { pts: s, sideStart: i };
}

const rh = 7,
  oF = rh,
  vl = 8,
  rF = rh + vl + 4;

function lF(n, t, e, s) {
  const i = [],
    a = n.map.bound,
    { pts: o, sideStart: r } = aF(a, 1.25),
    l = Px(o),
    c = l.length,
    f = yt(Yt.blue.stone),
    d = yt(Yt.blue.stoneDark),
    h = yt(6969954),
    u = yt(Yt.red.stoneDark),
    m = (g) => {
      const y = g ? h : f,
        v = g ? u : d,
        _ = g ? 1 : 0.8;
      return {
        top: Ht(Pt(v, y, g ? 0.75 : 0.45), _),
        face: Ht(Pt(v, y, g ? 0.55 : 0.3), _),
        outer: Ht(v, g ? 0.9 : 0.75),
        foot: Ht(v, g ? 0.7 : 0.58),
      };
    },
    x = [m(!1), m(!0)],
    p = (g, y, v) => {
      const _ = t.southWeight(g.x, g.z),
        k = y * 13 + 7,
        M = (nn(k, v, 5) - 0.5) * 0.1,
        S = nn(y, 77, 3) < 0.15 ? 1 : 0,
        b = n.baseDist(g.x - g.nx * 0.5, g.z - g.nz * 0.5) < 0.4,
        w = ci(0.6, -0.8, n.riverDist(g.x, g.z)),
        T = w * _,
        E = w * (1 - _),
        A = b ? g1 : Mn(wr + (un(g.s * 0.2, 3.3, 3, 15) - 0.5) * 0.8, wr, E),
        C = Mn(0.9 + (un(g.s * 0.45, 8.1, 2, 21) - 0.5) * 0.9, m3, E),
        R = g.x - g.z > 0,
        I = x[R ? 1 : 0];
      let P,
        F,
        L,
        B = 1,
        G = 1;
      const q = 0.9 + nn(y, 31, 9) * 0.2,
        et = y % 2 === 0 ? 1.06 : 0.93,
        ct = nn(Math.floor(y / 3), 41, 17) < 0.3;
      if (v < rh) {
        const rt = !b && nn(y, 53, 29) < 0.2 ? 1 : 0,
          mt = b ? 0 : ((nn(y, 19, 77) - 0.5) * 0.6 + rt * 0.3) * (1 - E),
          nt = b
            ? [
                [0, -0.05],
                [0.03, 0.13],
                [_0 - 0.07, 0.15],
                [_0, A * 0.5],
                [_0 + 0.01, A - 0.2],
                [_0 + 0.02, A - 0.03],
                [_0 + 0.12, A],
              ]
            : [
                [0, -0.05 - E * 0.7],
                [Math.max(0.04, 0.08 + M * 0.6 + S * 0.1 + mt * 0.25), C - 0.1],
                [Math.max(0.2, 0.28 + M + S * 0.08 + mt * 0.6), C + 0.06],
                [Math.max(0.26, 0.36 + M + S * 0.14 + mt), Mn(C, A, 0.5)],
                [Math.max(0.34, 0.46 + M + S * 0.12 + mt), Mn(C, A, 0.82)],
                [Math.max(0.42, 0.56 + M + S * 0.1 + mt * 0.8), A - 0.12],
                [0.98 + Math.max(0, mt * 0.4), A],
              ],
          H = 0.42 * (1 - T),
          st = [
            [0, -0.05],
            [0.05, H * 0.9 - T * 0.3],
            [0.2, H - T * 0.32],
            [0.48, H - T * 0.34],
            [0.57, H - 0.1 - T * 0.4],
            [0.6, H - 0.17 - T * 0.45],
            [0.72, Mn(-0.9, w8, 0.82)],
          ];
        ((P = Mn(nt[v][0], st[v][0], _)), (F = Mn(nt[v][1], st[v][1], _)));
        const tt = ct ? Pt(e0, rp, 0.55) : Pt(sl, N_, 0.5),
          it = 0.92 + nn(y >> 1, 7, 63) * 0.16,
          D = [
            Pt(nl, cr, 0.2),
            Pt(nl, cr, 0.65 - S * 0.3),
            Pt(e0, sl, nn(y, 5, 51) * 0.4),
            Ht(cr, it),
            Ht(Pt(cr, nl, 0.25), 2 - it),
            ct ? Pt(cr, e0, 0.45) : Pt(cr, sl, 0.55),
            tt,
          ],
          Q = [
            I.foot,
            Ht(I.face, et),
            Ht(I.face, 0.9),
            Ht(I.face, et),
            Ht(I.face, et * 1.04),
            Ht(I.top, et),
            I.top,
          ],
          $ = un(g.s * 0.31, 5.7, 2, 19),
          ut = Pt(Pt(e0, rp, 0.6), sl, ci(0.5, 0.75, $) * 0.6),
          N = [
            Ht(cr, 0.8),
            Pt(e0, sl, $ * 0.5),
            ut,
            Ht(ut, 1.04),
            Ht(Pt(e0, rp, 0.7), 0.8),
            Ht(nl, 0.66 * et),
            Ht(nl, 0.5 * et),
          ],
          J = [
            I.foot,
            Ht(I.face, et),
            Ht(I.top, et),
            Ht(I.top, et),
            Ht(I.top, 1.06),
            Ht(I.outer, et),
            Ht(I.foot, et),
          ],
          Z = ci(0.1, 0.6, -(g.nx * mf.x + g.nz * mf.y)),
          ot = v >= 1 && v <= 5,
          j = b ? Q[v] : ot ? Ht(D[v], 0.82 * Mn(1, 0.8, Z) * (1 - rt * 0.2)) : D[v],
          at = b ? J[v] : N[v];
        ((L = Pt(j, at, _)),
          v === 0
            ? (B = Mn(b ? 0.6 : 0.72, 0.72, _))
            : ot && !b
              ? (B = Mn(1 - Z * 0.27 - rt * 0.2, v >= 5 ? 0.7 : 1, _))
              : b && v === 2 && (B = 0.75),
          v === rh - 1 && (B = Mn(B, 0.55, _)),
          b && (G = 0.3),
          E > 0 && v >= 3 && ((F -= E * (v === 3 ? 0.1 : M8)), (L = Pt(L, [0.2, 0.36, 0.5], E * 0.6))),
          E > 0 && v < 3 && (L = Pt(L, [0.1, 0.2, 0.28], E * 0.7)));
      } else {
        const rt = t.edgeDist(g.x, g.z) * Mn(1, 0.93, _),
          mt = [2, 3.6, 5.6, 8, 10.6, 13.2, rt - 2.2, rt],
          nt = v - oF;
        if (nt < vl) {
          ((P = mt[nt]), nt < vl - 2 && (P = Math.min(P, rt - 3 - (vl - 2 - nt) * 0.4)));
          const H = g.x + g.nx * P * g.miter,
            st = g.z + g.nz * P * g.miter;
          F = t.heightAt(H, st);
          const tt = un(H * 0.16, st * 0.16, 3, 33),
            it = un(H * 0.05 + 4, st * 0.05, 2, 71);
          let D = Pt(eF, N_, tt);
          ((D = Pt(D, nF, ci(0.55, 0.75, it) * 0.6)),
            (D = Ht(D, Mn(1, 0.6, _))),
            (D = Pt(D, sF, ci(4, 40, P) * 0.55)),
            nt === 0 && (D = ct ? Pt(Pt(e0, sl, 0.6 + _ * 0.3), D, 0.5) : Pt(sl, D, 0.6)),
            nt === vl - 1 && (D = Pt(e0, rp, 0.5)),
            b && nt === 0 && (D = Pt(Pt(I.top, D, 0.45), D, _)),
            (L = D),
            (G = nt === vl - 1 ? 1 : nt === 0 ? 0.6 : h3));
        } else {
          const H = nt - vl,
            st = [
              [0.9, -3.5],
              [2.4, -14],
              [3.2, -30],
              [5.5, -52],
            ][H];
          ((P = rt + st[0] + (nn(k, v, 81) - 0.5) * 0.9),
            (F =
              t.heightAt(g.x + g.nx * rt * g.miter, g.z + g.nz * rt * g.miter) +
              st[1] +
              (nn(k, v, 83) - 0.5) * 2.5),
            (L = [cr, Pt(cr, nl, 0.6), Pt(nl, F_, 0.5), F_][H]));
        }
      }
      return { t: P * g.miter, y: F, color: Ht(L, q), ao: B, tex: G };
    };
  for (let g = 0; g < 4; g++) {
    const y = r[g],
      v = g === 3 ? c : r[g + 1],
      _ = [],
      k = [];
    for (let b = y; b <= v; b++) (_.push(l[b % c]), k.push(b % c));
    const M = new Be();
    (y8(
      M,
      _,
      !1,
      rF,
      (b, w, T) => p(b, k[w], T),
      (b) => (b < rh - 1 ? Ir : Lx),
    ),
      M.computeNormals(24));
    const S = new Sn(M.build(), s);
    ((S.name = `border:${g}`),
      (S.castShadow = !0),
      (S.receiveShadow = !0),
      (S.matrixAutoUpdate = !1),
      e.add(S),
      i.push(S));
  }
  return i;
}

function cF(n, t, e, s, i) {
  const a = e.map.bound,
    o = new ke(31415),
    r = a + 26,
    l = 2.8,
    c = [];
  for (let p = -r; p <= r; p += l)
    for (let g = -r; g <= r; g += l) {
      const y = g + o.range(-0.5, 0.5) * l,
        v = p + o.range(-0.5, 0.5) * l,
        _ = Math.max(Math.abs(y), Math.abs(v)) - a;
      if (_ < 1.4) continue;
      const k = s.edgeDist(y, v);
      if (_ > k - 1.6) continue;
      const M = s.southWeight(y, v);
      if (e.riverDist(y, v) < 1.6 || (M > 0.5 && _ < 3.6) || (e.baseDist(y, v, 12) < 4.2 && _ < 3.4))
        continue;
      const b = s.heightAt(y, v),
        w = o.next(),
        T = 0.5 + un(y * 0.05, v * 0.05, 2, 12) * 0.5;
      if (w < (0.62 * T + 0.16) * (_ < 9 ? 1.3 : 1)) {
        let E = !0;
        for (let L = c.length - 1; L >= Math.max(0, c.length - 60); L--) {
          const B = c[L];
          Math.hypot(B[0] - y, B[1] - v) < 1.7 && (E = !1);
        }
        if (!E) continue;
        c.push([y, v, 1]);
        const A = y < -a && _ < 7 ? Ir : _ > 9 && gs(y, v, 0.6, 0.4) !== li ? x8 : li,
          C = o.chance(0.42 + (v < 0 ? 0.2 : 0)),
          R = un(y * 0.04 + 9, v * 0.04, 2, 88),
          I = o.range(0.85, 1.08) * (M > 0.5 ? 0.72 : 1),
          P = ci(4, 34, _) * 0.5,
          F = [I * (0.95 + R * 0.25) * (1 + P * 0.5), I * (1 + P * 0.62), I * (1 - R * 0.25) * (1 + P * 1.1)];
        if (C) {
          const L = o.range(0.85, 1.35) * (M > 0.5 ? 0.8 : 1);
          n.add(o.pick(t.pines), ae(y, b - 0.1, v, o.range(0, 6.28), L, L * o.range(0.9, 1.2)), {
            tint: F,
            rank: A,
          });
        } else {
          const L = o.range(1, 1.55) * (M > 0.5 ? 0.8 : 1);
          n.add(
            o.pick(_ < 3.2 ? t.trees : t.farTrees),
            ae(y, b - 0.1, v, o.range(0, 6.28), L, L * o.range(0.95, 1.15)),
            { tint: F, rank: A },
          );
        }
      } else if (w < 0.74) {
        const E = o.range(0.7, 1.9);
        n.add(o.pick(t.boulders), ae(y, b - 0.1, v, o.range(0, 6.28), E, E * o.range(0.8, 1.5)), {
          tint: Ht([1, 1, 1], o.range(0.9, 1.1)),
          rank: li,
        });
      } else if (w < 0.8)
        n.add(o.pick(t.shrubs), ae(y, b - 0.05, v, o.range(0, 6.28), o.range(1, 1.7)), { rank: li });
      else if (w < 0.815 && _ > 4 && M < 0.5) {
        const E = Pt(yt(Yt.env.crystal), yt(9411839), o.next()),
          A = o.range(1.5, 2.6);
        (n.add(
          o.pick(t.bigCrystals),
          ae(y, b - 0.2, v, o.range(0, 6.28), A, A, o.range(-0.15, 0.15), o.range(-0.15, 0.15)),
          { tint: E, glow: 0.9, rank: li },
        ),
          i.glows.push({ x: y, z: v, y: b + 0.1, r: 5.5, color: E }));
      } else
        w < 0.83 &&
          M < 0.5 &&
          n.add(
            o.pick(t.tallPillars),
            ae(
              y,
              b - 0.1,
              v,
              o.range(0, 6.28),
              o.range(1.2, 1.7),
              o.range(1.2, 1.9),
              o.range(-0.08, 0.08),
              o.range(-0.08, 0.08),
            ),
            { tint: [0.95, 0.95, 0.92], glow: 0.9, rank: li },
          );
    }
  const f = new ke(16180);
  for (let p = -a + 0.6; p < a - 0.6; p += f.range(0.4, 1.3)) {
    const g = a + 0.34;
    if (e.riverDist(p, g) < 1.2 || e.baseDist(p, a - 0.6) < 0.3) continue;
    const y = f.next();
    y < 0.7
      ? n.add(f.pick(t.drapes), ae(p, 0.4, g + 0.14, -Math.PI / 2 + f.range(-0.3, 0.3), f.range(1, 1.5)), {
          shadow: !1,
          tint: Ht([0.86, 0.92, 0.8], f.range(0.62, 0.9)),
          rank: gs(p, g, 0.5, 0.25),
        })
      : y < 0.85
        ? n.add(f.pick(t.ferns), ae(p, 0.4, g - 0.04, f.range(0, 6.28), f.range(0.7, 1)), {
            shadow: !1,
            rank: gs(p, g),
          })
        : y < 0.93 &&
          n.add(f.pick(t.vines), ae(p, 0.36, g + 0.3, -Math.PI / 2, f.range(0.9, 1.2), f.range(0.8, 1.5)), {
            shadow: !1,
          });
  }
  const d = new ke(4409);
  for (let p = -a + 0.8; p < a - 0.8; p += d.range(0.7, 2.1)) {
    const g = a + 0.78 + d.range(0, 0.25);
    if (e.riverDist(p, g) < 1.4) continue;
    const y = d.range(0.22, 0.48);
    n.add(d.pick(t.rocks), ae(p, s.heightAt(p, g) + 0.02, g, d.range(0, 6.28), y, y * d.range(0.7, 1.1)), {
      shadow: !1,
      tint: Ht([0.8, 0.8, 0.86], d.range(0.6, 0.85)),
      rank: gs(p, g, 0.55, 0.25),
    });
  }
  [
    [-a + 1.05, -a - 1.15, wr - 0.45, 0.95],
    [-a + 4.75, -a - 1.2, wr - 0.45, 0.8],
    [-a - 1.15, -a + 1.35, wr - 0.45, 0.85],
    [-a - 1.2, -a + 4.65, wr - 0.45, 0.9],
    [-a + 1, -a + 0.3, Fn - 0.1, 0.42],
    [-a + 4.9, -a + 0.35, Fn - 0.12, 0.5],
    [-a + 0.3, -a + 1.2, Fn - 0.1, 0.4],
    [-a + 0.35, -a + 4.9, Fn - 0.12, 0.46],
  ].forEach(([p, g, y, v], _) => {
    n.add(t.boulders[_ % t.boulders.length], ae(p, y, g, _ * 1.7, v, v * 0.85), {
      tint: [0.74, 0.8, 0.88],
      rank: li,
    });
  });
  const u = new ke(27182),
    m = 1.7,
    x = [yt(16777215), yt(16769146), yt(16752324), yt(10473727)];
  for (let p = -r; p <= r; p += m)
    for (let g = -r; g <= r; g += m) {
      const y = g + u.range(-0.5, 0.5) * m,
        v = p + u.range(-0.5, 0.5) * m,
        _ = Math.max(Math.abs(y), Math.abs(v)) - a;
      if (_ < 1.2 || _ > s.edgeDist(y, v) - 1.2 || e.riverDist(y, v) < 1.2 || !u.chance(0.7)) continue;
      const k = s.heightAt(y, v) - 0.04;
      u.chance(0.06)
        ? n.add(u.pick(t.flowers), ae(y, k, v, u.range(0, 6.28), u.range(1.6, 2.4)), {
            tint: u.pick(x),
            shadow: !1,
            maskedTint: !0,
            rank: gs(y, v, 0.5, 0.25),
          })
        : u.chance(0.55) &&
          n.add(u.pick(t.tufts), ae(y, k, v, u.range(0, 6.28), u.range(1.5, 2.6)), {
            shadow: !1,
            tint: [0.8, 0.95, 0.75],
            rank: gs(y, v, 0.4, 0.3),
          });
    }
}

const fF = `
#include <common>
#include <fog_pars_vertex>
attribute vec2 aFall;
varying vec2 vUv;
varying vec2 vFall;
void main() {
  vUv = uv;
  vFall = aFall;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,
  dF = `
#include <common>
#include <fog_pars_fragment>
uniform sampler2D tNoise;
uniform float uTime;
varying vec2 vUv;
varying vec2 vFall;
void main() {
  // vUv.x：横向 0..1；vUv.y：沿水流方向的米数。vFall.x：沿程 0(源头)..1(落点)；vFall.y：1 = 跌水，0 = 平铺的溪流。
  // 噪声沿下落方向拉长七八倍并向下滚动：读成一股一股的水，而不是一块抖动的白噪点
  float t = uTime;
  float n1 = texture2D(tNoise, vec2(vUv.x * 1.7, vUv.y * 0.034 - t * 0.36)).g;
  float n2 = texture2D(tNoise, vec2(vUv.x * 3.9 + 0.37, vUv.y * 0.058 - t * 0.62)).b;
  // 固定的几股水柱(只随横向变化，极慢地左右游移)
  float strands = texture2D(tNoise, vec2(vUv.x * 2.6 + 0.11 + sin(t * 0.21) * 0.01, 0.37)).g;
  float streak = smoothstep(0.4, 0.74, n1 * 0.6 + n2 * 0.4);
  float body = smoothstep(0.26, 0.6, strands + streak * 0.3);
  // 两侧与源头渐隐：没有一条笔直的边；落点一段翻成白沫
  float side = smoothstep(0.0, 0.26, vUv.x) * smoothstep(1.0, 0.74, vUv.x);
  float head = smoothstep(0.0, 0.16, vFall.x);
  float foam = smoothstep(0.7, 1.0, vFall.x) * vFall.y * (0.55 + 0.45 * n2);
  vec3 col = mix(vec3(0.19, 0.57, 0.83), vec3(0.93, 0.99, 1.0), max(streak * 0.85, foam));
  float a = side * head * max(mix(0.34, 0.9, body) * (0.55 + 0.45 * streak), foam * 0.9);
  gl_FragColor = vec4(col, a);
  ${aa}
}
`;

function hF(n, t, e, s) {
  const i = n.map.bound,
    a = [],
    o = (b, w, T) => new dt(b, w, T),
    r = wr - M8,
    l = [
      [2.15, 0],
      [1.02, r + 0.05],
      [0.5, r - 0.06],
      [0.3, 1.72],
      [0.2, m3 + 0.36],
      [0.1, m3 - 0.08],
      [-0.06, Fn + 0.02],
    ],
    c = [0, 0, 0.05, 0.12, 0.2, 0.3, 0.42],
    f = { a: -i + 1.5, c: -i + 4.3 },
    d = { a: -i + 4.2, c: -i + 1.8 };
  (a.push({
    rows: l.map(([b, w], T) => {
      const E = -i - b,
        A = T === 0 ? t.heightAt((f.a + f.c) / 2, E) + 0.06 : w;
      return [o(f.a - c[T], A, E), o(f.c + c[T], A, E)];
    }),
    bulge: o(0, 0, 0.16),
    fall: 1,
  }),
    a.push({
      rows: l.map(([b, w], T) => {
        const E = -i - b,
          A = T === 0 ? t.heightAt(E, (d.a + d.c) / 2) + 0.06 : w;
        return [o(E, A, d.a + c[T]), o(E, A, d.c - c[T])];
      }),
      bulge: o(0.16, 0, 0),
      fall: 1,
    }),
    s.glows.push({ x: -i + 2.9, z: -i + 0.8, y: Fn + 0.03, r: 2.6, color: [0.8, 0.95, 1] }),
    s.glows.push({ x: -i + 0.8, z: -i + 3, y: Fn + 0.03, r: 2.2, color: [0.8, 0.95, 1] }));
  for (const [b, w, T] of [
    [-i + 2.2, -i + 0.55, 1],
    [-i + 3.6, -i + 0.5, 0.8],
    [-i + 0.55, -i + 2.4, 0.9],
    [-i + 0.5, -i + 3.6, 0.75],
  ])
    s.ripples.push({ x: b, z: w, r: T });
  const h = t.heightAt(i - 3.5, i + 2.2) + 0.12;
  (a.push({
    rows: [
      [o(i - 6.4, Fn, i - 0.5), o(i - 0.2, Fn, i - 0.5)],
      [o(i - 6.6, Fn - 0.02, i + 0.45), o(i - 0.2, Fn - 0.02, i + 0.45)],
      [o(i - 6.8, Mn(Fn, h, 0.5), i + 1), o(i + 0.1, Mn(Fn, h, 0.5), i + 1)],
      [o(i - 7, h, i + 1.5), o(i + 0.4, h, i + 1.5)],
    ],
    bulge: o(0, 0.1, 0.22),
    fall: 1,
  }),
    a.push({
      rows: [
        [o(i - 7.2, h, i + 1.2), o(i + 0.8, h, i + 1.2)],
        [o(i - 4.4, h - 0.08, i + 6.5), o(i + 4.4, h - 0.08, i + 4.8)],
        [o(i - 0.2, h - 0.16, i + 12), o(i + 8, h - 0.16, i + 8.6)],
        [o(i + 4.5, h - 0.25, i + 17), o(i + 11.5, h - 0.25, i + 12)],
      ],
      bulge: o(0, 0, 0),
      fall: 0,
    }),
    s.glows.push({ x: i - 3.2, z: i + 1.9, y: h + 0.05, r: 3.4, color: [0.8, 0.95, 1] }));
  const u = [],
    m = [],
    x = [],
    p = [],
    g = 4,
    y = new dt(),
    v = new dt(),
    _ = new dt();
  for (const b of a) {
    const w = u.length / 3,
      T = b.rows.length,
      E = [0];
    for (let C = 1; C < T; C++)
      (v.addVectors(b.rows[C][0], b.rows[C][1]).multiplyScalar(0.5),
        _.addVectors(b.rows[C - 1][0], b.rows[C - 1][1]).multiplyScalar(0.5),
        E.push(E[C - 1] + v.distanceTo(_)));
    const A = E[T - 1] || 1;
    for (let C = 0; C < T; C++) {
      const R = E[C] / A,
        I = Math.sin(R * Math.PI) * 0.6 + R * 0.4;
      for (let P = 0; P <= g; P++) {
        const F = P / g;
        (y
          .lerpVectors(b.rows[C][0], b.rows[C][1], F)
          .addScaledVector(b.bulge, I * Math.sin(F * Math.PI) * 1.3),
          u.push(y.x, y.y, y.z),
          m.push(F, E[C]),
          x.push(R, b.fall));
      }
    }
    for (let C = 0; C < T - 1; C++)
      for (let R = 0; R < g; R++) {
        const I = w + C * (g + 1) + R;
        p.push(I, I + g + 1, I + 1, I + 1, I + g + 1, I + g + 2);
      }
  }
  const k = new Bn();
  (k.setAttribute("position", new Ae(u, 3)),
    k.setAttribute("uv", new Ae(m, 2)),
    k.setAttribute("aFall", new Ae(x, 2)),
    k.setIndex(p));
  const M = new An({
      uniforms: { ...N0.clone(ee.fog), tNoise: { value: e }, uTime: fs.uTime },
      vertexShader: fF,
      fragmentShader: dF,
      transparent: !0,
      depthWrite: !1,
      side: fi,
      fog: !0,
    }),
    S = new Sn(k, M);
  return ((S.name = "waterfalls"), (S.renderOrder = 2), (S.frustumCulled = !1), S);
}

function U_(n, t, e, s, i, a, o, r, l) {
  (n.add(t.brazier, ae(s, i, a, 0.4, o), { tint: e.stone }),
    n.add(t.brazierCrystal, ae(s, i, a, 0.9, o), { tint: e.crystalTint, glow: e.crystalGlow }),
    r.glows.push({ x: s, z: a, y: i + 0.06, r: 2.6 * o, color: e.glow }),
    l.push({
      x: s,
      y: i + 2.2 * o,
      z: a,
      radius: 0.5,
      color: e.glow,
      count: 3,
      mode: 1,
      range: 1.6,
      size: 0.8,
    }));
}

function uF(n, t, e, s, i, a) {
  const o = n.at(t, e, !1),
    r = 40,
    l = s * 0.875,
    c = s * 0.985,
    f = 0.1,
    d = Pt(i.stone, [1, 1, 1], 0.06),
    h = i.stoneDark;
  for (let u = 0; u < r; u++) {
    const m = (u / r) * Math.PI * 2,
      x = ((u + 1) / r) * Math.PI * 2,
      p = (m + x) / 2,
      g = Math.cos(m),
      y = Math.sin(m),
      v = Math.cos(x),
      _ = Math.sin(x);
    if (Math.max(Math.abs(t + Math.cos(p) * c), Math.abs(e + Math.sin(p) * c)) > a - 0.05) continue;
    const k = 0.92 + ((u * 7) % 5) * 0.03,
      M = Ht(d, k),
      S = 0.012,
      b = (I, P, F, L, B, G, q, et) => o.vertex(t + P * I, L, e + F * I, B, G, q, et),
      w = Math.cos(m + S),
      T = Math.sin(m + S),
      E = Math.cos(x - S),
      A = Math.sin(x - S);
    o.quad(
      b(l + 0.02, w, T, f, M, 0, 1, 0),
      b(l + 0.02, E, A, f, M, 0, 1, 0),
      b(c - 0.02, E, A, f, M, 0, 1, 0),
      b(c - 0.02, w, T, f, M, 0, 1, 0),
    );
    const C = Math.cos(p),
      R = Math.sin(p);
    (o.quad(
      b(c, g, y, -0.02, h, C, 0.3, R),
      b(c - 0.02, g, y, f, M, C, 0.3, R),
      b(c - 0.02, v, _, f, M, C, 0.3, R),
      b(c, v, _, -0.02, h, C, 0.3, R),
    ),
      o.quad(
        b(l, v, _, -0.02, h, -C, 0.3, -R),
        b(l + 0.02, v, _, f, M, -C, 0.3, -R),
        b(l + 0.02, g, y, f, M, -C, 0.3, -R),
        b(l, g, y, -0.02, h, -C, 0.3, -R),
      ));
  }
}

function pF(n, t, e, s, i, a, o, r, l, c) {
  const f = s.map,
    d = f.bound,
    h = [w_(0), w_(1)];
  for (const u of f.bases) {
    const m = d3[u.team],
      x = h[u.team],
      p = new ke(600 + u.team),
      g = [
        { ax: -d, az: -d, dx: 0, dz: 1, nx: -1, nz: 0 },
        { ax: -d, az: d, dx: 1, dz: 0, nx: 0, nz: 1 },
        { ax: d, az: d, dx: 0, dz: -1, nx: 1, nz: 0 },
        { ax: d, az: -d, dx: -1, dz: 0, nx: 0, nz: -1 },
      ];
    for (const A of g) {
      const C = (P, F) =>
          s.baseDist(P - A.nx * 0.6, F - A.nz * 0.6) < -0.5 && (u.team === 0 ? P - F < 0 : P - F > 0),
        R = vr(-A.nx, -A.nz);
      for (let P = 0.9; P < d * 2 - 0.5; P += 1.45) {
        const F = A.ax + A.dx * P,
          L = A.az + A.dz * P;
        if (!C(F, L) || i.southWeight(F, L) > 0.3) continue;
        const B = _0 + 0.42;
        n.add(x.merlon, ae(F + A.nx * B, g1 - 0.04, L + A.nz * B, R + Math.PI / 2, 1, p.range(0.92, 1.08)), {
          tint: Ht([1, 1, 1], p.range(0.92, 1.04)),
        });
      }
      let I = 0;
      for (let P = 2.2; P < d * 2 - 1; P += 3) {
        const F = A.ax + A.dx * P,
          L = A.az + A.dz * P;
        if (!C(F, L)) continue;
        const B = i.southWeight(F, L);
        if ((I++, B > 0.55)) {
          I % 3 === 0 && U_(n, t, m, F + A.nx * 0.3, 0.38, L + A.nz * 0.3, 0.5, o, l);
          continue;
        }
        if (B > 0.3) continue;
        const G = F + A.nx * _0,
          q = L + A.nz * _0;
        I % 2 === 0
          ? n.add(x.buttress, ae(G, 0.1, q, R, 1, (g1 - 0.25) / 2.4), {})
          : I % 4 === 1 &&
            n.add(x.emblem, ae(G - A.nx * 0.02, g1 * 0.56, q - A.nz * 0.02, R, 1), { glow: 1 });
        const et = F + A.nx * 1.9,
          ct = L + A.nz * 1.9,
          rt = i.heightAt(et, ct) - 0.05;
        I % 4 === 2
          ? U_(n, t, m, et, rt, ct, 1, o, l)
          : I % 4 === 0 &&
            n.add(t.banner, ae(et, rt, ct, R + Math.PI / 2 + p.range(-0.12, 0.12), 1.05, p.range(1, 1.2)), {
              tint: m.cloth,
              maskedTint: !0,
            });
      }
    }
    const y = u.fountain.x,
      v = u.fountain.y,
      _ = u.fountainRadius;
    uF(n, y, v, _, m, d);
    for (let A = 0; A < 4; A++) {
      const C = Math.PI / 4 + (A / 4) * Math.PI * 2,
        R = y + Math.cos(C) * _ * 0.93,
        I = v + Math.sin(C) * _ * 0.93;
      Math.max(Math.abs(R), Math.abs(I)) > d - 0.3 ||
        n.add(x.lowLamp, ae(R, 0.08, I, C, 1), { shadow: !1, glow: 1 });
    }
    (c.push({ kind: "pillar", x: y, y: 0.05, z: v, width: 2.6, length: 6, color: m.glow, alpha: 0.08 }),
      r.reserve(y, v));
    const k = Math.sign(y),
      M = Math.sign(v);
    for (const A of [-1, 1]) {
      const C = k * (d + 2.1) - (A < 0 ? k * 5.2 : 0),
        R = M * (d + 2.1) - (A > 0 ? M * 5.2 : 0);
      if (i.southWeight(C, R) > 0.3) continue;
      const I = i.heightAt(C, R) - 0.05;
      n.add(e.watcher, ae(C, I, R, vr(y - C, v - R), 1.25), { tint: Pt(m.stone, [1, 1, 1], 0.3) });
    }
    const S = k * (d + 3.4),
      b = M * (d + 3.4),
      w = i.southWeight(S, b),
      T = i.heightAt(S, b) - 0.3,
      E = w > 0.5 ? 1.5 : 2.3;
    (n.add(t.bigCrystals[u.team % t.bigCrystals.length], ae(S, T, b, 0.7, E), {
      tint: m.crystalTint,
      glow: m.crystalGlow,
    }),
      o.glows.push({ x: S, z: b, y: T + 0.4, r: 7, color: m.glow }),
      l.push({ x: S, y: T + 1, z: b, radius: 2.4, color: m.glow, count: 12, mode: 1, range: 5, size: 1.1 }),
      l.push({
        x: y,
        y: 0.1,
        z: v,
        radius: _ * 0.82,
        color: m.glow,
        count: 40,
        mode: 1,
        range: 3.4,
        size: 1,
      }),
      l.push({
        x: u.core.x,
        y: 0.2,
        z: u.core.y,
        radius: 5.5,
        color: m.glow,
        count: 16,
        mode: 1,
        range: 2.6,
        size: 0.8,
      }));
  }
  (a.forEach((u, m) => {
    const x = xf(u.poly),
      p = x.x - x.y < 0 ? 0 : 1,
      g = d3[p],
      y = h[p],
      v = new ke(900 + m);
    for (const _ of u.poly) {
      if (s.baseDist(_.x, _.y, 12) > 6.5) continue;
      const k = x.x - _.x,
        M = x.y - _.y,
        S = Math.hypot(k, M) || 1,
        b = 1.55,
        w = _.x + (k / S) * b,
        T = _.y + (M / S) * b,
        E = u.height + v.range(1, 1.5),
        A = E / 3.6,
        C = v.range(-0.1, 0.1) + Math.PI / 4;
      (n.add(y.gatePillar, ae(w, 0, T, C, 1, A), { tint: Ht([1, 1, 1], v.range(0.94, 1.03)), glow: 1 }),
        n.add(y.gateCrystal, ae(w, E + 0.35 - 3.6, T, C, 0.9), { glow: 1 }),
        n.add(e.flag, ae(w - (k / S) * 0.5, E - 1.9, T - (M / S) * 0.5, v.range(-0.3, 0.3), 1.05), {
          tint: g.cloth,
          maskedTint: !0,
        }),
        r.reserve(w, T),
        o.glows.push({ x: w, z: T, y: u.topY(1.2) + 0.05, r: 2.4, color: g.glow }),
        o.aoBlobs.push({ x: w, y: u.topY(1.2) + 0.06, z: T, r: 1.4, strength: 0.4 }),
        l.push({
          x: w,
          y: E + 0.6,
          z: T,
          radius: 0.5,
          color: g.glow,
          count: 3,
          mode: 1,
          range: 1.6,
          size: 0.8,
        }));
    }
  }),
    h[0].dispose(),
    h[1].dispose());
}

const Zs = Math.PI * 2,
  x1 = Yt.env;

function O_(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(5922674),
    i = yt(14216447),
    a = t.range(1.3, 1.7),
    o = t.range(-0.25, 0.25);
  gn(
    e,
    [
      [0, -0.15, 0, 0.12],
      [o * 0.5, a * 0.55, 0.05, 0.08],
      [o, a, 0.1, 0.04],
    ],
    { sides: 5, c0: Ht(s, 0.8), c1: Pt(s, i, 0.5) },
  );
  const r = 3 + t.int(2);
  for (let l = 0; l < r; l++) {
    const c = (l / r) * Zs + t.range(-0.4, 0.4),
      f = a * t.range(0.4, 0.8),
      d = t.range(0.45, 0.8),
      h = o * (f / a);
    (gn(
      e,
      [
        [h, f, 0.05, 0.05],
        [h + Math.cos(c) * d * 0.6, f + d * 0.45, Math.sin(c) * d * 0.6, 0.03],
        [h + Math.cos(c) * d, f + d * 0.8, Math.sin(c) * d, 0.012],
      ],
      { sides: 3, c0: s, c1: i },
    ),
      Xo(
        e,
        h + Math.cos(c) * d,
        f + d * 0.72,
        Math.sin(c) * d,
        0.2,
        0.035,
        t.range(-0.4, 0.4),
        t.range(-0.4, 0.4),
        [0.6, 0.8, 1],
        [0.9, 0.97, 1],
        0.5,
        n + l,
      ));
  }
  return e.build();
}

function B_(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(2761252),
    i = yt(5917770),
    a = t.range(0.7, 1.15);
  (gn(
    e,
    [
      [0, -0.15, 0, 0.36],
      [0.02, a * 0.4, 0, 0.27],
      [0.05, a * 0.85, 0.02, 0.22],
      [0.1, a, 0.06, 0.12],
    ],
    { sides: 7, c0: s, c1: i },
  ),
    Ts(e, 0.05, a * 0.86, 0.02, 0.17, 0.07, 0.17, {
      detail: 0,
      seed: n,
      bottom: [1, 0.35, 0.08],
      top: [1, 0.62, 0.2],
      glow: 0.8,
    }));
  for (let r = 0; r < 2; r++) {
    const l = t.range(0, Zs),
      c = 0.3,
      f = 0.03,
      d = Math.cos(l) * c,
      h = Math.sin(l) * c,
      u = -Math.sin(l) * f,
      m = Math.cos(l) * f,
      x = [1, 0.42, 0.1],
      p = e.vertex(d - u, 0.08, h - m, x, Math.cos(l), 0, Math.sin(l), 0, 0.9),
      g = e.vertex(d + u, 0.08, h + m, x, Math.cos(l), 0, Math.sin(l), 0, 0.9),
      y = e.vertex(d * 0.82, a * 0.6, h * 0.82, x, Math.cos(l), 0, Math.sin(l), 0, 0.5);
    (e.tri(p, g, y), e.tri(p, y, g));
  }
  const o = t.range(0, Zs);
  return (
    gn(
      e,
      [
        [0.05, a * 0.7, 0, 0.07],
        [Math.cos(o) * 0.4, a * 0.95, Math.sin(o) * 0.4, 0.03],
      ],
      { sides: 3, c0: s, c1: i },
    ),
    e.build()
  );
}

function mF(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(2365980),
    i = yt(5913140);
  (gn(
    e,
    [
      [0, -0.06, 0, 0.42],
      [0, 0.14, 0, 0.3],
      [0, 0.26, 0, 0.19],
      [0, 0.2, 0, 0.13],
    ],
    { sides: 7, c0: s, c1: i },
  ),
    Ts(e, 0, 0.17, 0, 0.13, 0.04, 0.13, {
      detail: 0,
      seed: n,
      bottom: [1, 0.4, 0.1],
      top: [1, 0.75, 0.3],
      glow: 1,
    }));
  for (let a = 0; a < 3; a++) {
    const o = t.range(0, Zs);
    Ts(e, Math.cos(o) * 0.4, 0.05, Math.sin(o) * 0.4, 0.13, 0.1, 0.11, {
      detail: 0,
      bump: 0.25,
      seed: n + a,
      bottom: s,
      top: i,
      flat: !0,
    });
  }
  return e.build();
}

function gF(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(5917242),
    i = yt(8022608),
    a = t.range(1.9, 2.4),
    o = 0.36;
  gn(
    e,
    [
      [-a / 2, o * 0.9, 0, o],
      [-a * 0.15, o * 0.92, 0.04, o * 0.96],
      [a * 0.2, o * 0.88, -0.03, o * 0.92],
      [a / 2, o * 0.86, 0, o * 0.86],
    ],
    { sides: 8, c0: s, c1: i },
  );
  for (const r of [-1, 1]) {
    const l = (r * a) / 2,
      c = (r < 0 ? o : o * 0.86) * 0.78,
      f = r < 0 ? o * 0.9 : o * 0.86,
      d = e.vertex(l - r * 0.12, f, 0, [0.03, 0.025, 0.02], r, 0, 0),
      h = [];
    for (let u = 0; u < 8; u++) {
      const m = (u / 8) * Zs;
      h.push(e.vertex(l + r * 0.005, f + Math.sin(m) * c, Math.cos(m) * c, [0.14, 0.11, 0.08], r, 0, 0));
    }
    for (let u = 0; u < 8; u++) r > 0 ? e.tri(d, h[u], h[(u + 1) % 8]) : e.tri(d, h[(u + 1) % 8], h[u]);
  }
  return (
    Ts(e, t.range(-0.4, 0.4), o * 1.72, 0, 0.5, 0.09, 0.3, {
      detail: 0,
      bump: 0.2,
      seed: n,
      bottom: yt(5212744),
      top: yt(9420632),
    }),
    Ts(e, a * 0.28, o * 1.75, 0.06, 0.12, 0.07, 0.12, {
      detail: 0,
      seed: n + 1,
      bottom: yt(12081198),
      top: yt(14711368),
    }),
    e.build()
  );
}

function xF(n, t) {
  const e = new ke(n),
    s = new Be(),
    i = yt(4864556),
    a = yt(8020552),
    o = 3;
  for (let r = 0; r < o; r++) {
    const l = (r - 1) * e.range(0.45, 0.7),
      c = l + e.range(-0.35, 0.35),
      f = e.range(0.09, 0.14);
    gn(
      s,
      [
        [-0.75, t + 0.05, l * 0.6, f * 0.8],
        [-0.25, t + 0.22, l * 0.8, f],
        [-0.02, t - 0.25, l, f],
        [-0.08, t * 0.5, (l + c) / 2, f * 0.9],
        [-0.05, 0.3, c, f * 0.8],
        [-0.02, -0.1, c + e.range(-0.15, 0.15), f * 0.55],
      ],
      { sides: 5, c0: a, c1: i },
    );
  }
  return s.build();
}

function H_(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(4160072),
    i = t.range(0.55, 0.8),
    a = 0.28;
  gn(
    e,
    [
      [0, -0.1, 0, 0.06],
      [0.08, i * 0.6, 0, 0.05],
      [a, i, 0, 0.04],
    ],
    { sides: 4, c0: Ht(s, 0.7), c1: s, sway1: 0.3 },
  );
  for (const l of [-1, 1]) {
    const c = e.vertex(0, 0, 0, Ht(s, 0.8), 0, 1, 0, 0),
      f = e.vertex(0.1, 0.22, l * 0.3, s, 0, 1, 0, 0.3),
      d = e.vertex(0.3, 0.1, l * 0.42, yt(7317584), 0, 1, 0, 0.5);
    (e.tri(c, f, d), e.tri(c, d, f));
  }
  const o = 0.3,
    r = e.vertex(a, i, 0, [0.85, 0.8, 0.7], 0.3, 1, 0, 0.4, 0.2, 1);
  for (let l = 0; l < 5; l++) {
    const c = (l / 5) * Zs + n,
      f = 0.5,
      d = (x, p, g) =>
        e.vertex(
          a + Math.cos(x) * p,
          i + g,
          Math.sin(x) * p,
          [1, 1, 1],
          Math.cos(x) * 0.4,
          0.9,
          Math.sin(x) * 0.4,
          0.5,
          0.25,
          1,
        ),
      h = d(c - f, o * 0.62, 0.06),
      u = d(c, o, 0.16),
      m = d(c + f, o * 0.62, 0.06);
    (e.quad(r, m, u, h), e.quad(h, u, m, r));
  }
  return (
    Ts(e, a, i + 0.1, 0, 0.11, 0.11, 0.11, {
      detail: 1,
      seed: n,
      bottom: [1, 0.72, 0.3],
      top: [1, 0.9, 0.55],
      glow: 1,
      swayBottom: 0.4,
      swayTop: 0.4,
    }),
    e.build()
  );
}

function $_(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(9078678),
    i = yt(5196898),
    a = t.range(1.5, 2.1),
    o = t.range(1.2, 1.6),
    r = 6,
    l = [];
  for (let c = 0; c <= r; c++) {
    const f = -0.15 + (o * c) / r;
    l.push([0, Math.sin(f) * a, -Math.cos(f) * a + a * 0.75, 0.19 - c * 0.008]);
  }
  gn(e, l, { sides: 4, c0: i, c1: s, cap: !0 });
  for (let c = 0; c < r; c++) {
    const f = -0.15 + (o * (c + 0.5)) / r,
      d = Math.sin(f) * a,
      h = -Math.cos(f) * a + a * 0.75,
      u = [0.75, 0.55, 1],
      m = e.vertex(0.2, d - 0.07, h - 0.02, u, 1, 0, 0, 0, 0.7),
      x = e.vertex(0.2, d + 0.07, h + 0.02, u, 1, 0, 0, 0, 0.7),
      p = e.vertex(0.2, d + 0.05, h + 0.09, u, 1, 0, 0, 0, 0.7),
      g = e.vertex(0.2, d - 0.09, h + 0.05, u, 1, 0, 0, 0, 0.7);
    (e.quad(m, x, p, g), e.quad(g, p, x, m));
  }
  return (
    Ts(e, 0, 0.06, -a * 0.26, 0.42, 0.2, 0.36, {
      detail: 0,
      bump: 0.22,
      seed: n,
      bottom: i,
      top: s,
      flat: !0,
    }),
    e.build()
  );
}

function G_(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(2763840),
    i = yt(5725054),
    a = t.range(0.55, 0.85);
  (Ts(e, 0, a * 0.3, 0, a, a * 0.72, a * 0.9, {
    detail: 0,
    bump: 0.32,
    seed: n,
    bottom: Ht(s, 0.7),
    top: i,
    flat: !0,
  }),
    Ts(e, a * 0.85, a * 0.08, a * 0.3, a * 0.42, a * 0.32, a * 0.36, {
      detail: 0,
      bump: 0.3,
      seed: n + 3,
      bottom: s,
      top: i,
      flat: !0,
    }));
  const o = 5 + t.int(3);
  for (let r = 0; r < o; r++) {
    const l = (r / o) * Zs + t.range(-0.3, 0.3),
      c = a * t.range(0.7, 0.95);
    Xo(
      e,
      Math.cos(l) * c,
      a * t.range(0.25, 0.55),
      Math.sin(l) * c,
      a * t.range(0.5, 0.8),
      a * 0.09,
      Math.sin(l) * 0.9,
      -Math.cos(l) * 0.9,
      [1, 0.72, 0.3],
      [1, 0.9, 0.6],
      0.9,
      n + r,
    );
  }
  return e.build();
}

function V_(n) {
  const t = new ke(n),
    e = new Be(),
    s = yt(10133684),
    i = yt(6317696),
    a = t.range(0.28, 0.38);
  Ts(e, 0, a * 0.42, 0, 0.26, a * 0.62, 0.19, {
    detail: 0,
    bump: 0.14,
    seed: n,
    bottom: i,
    top: s,
    flat: !0,
  });
  const o = [1, 1, 1],
    r = e.vertex(-0.03, 0.06, 0.2, o, 0, 0.2, 1, 0, 0.8, 1),
    l = e.vertex(0.03, 0.06, 0.2, o, 0, 0.2, 1, 0, 0.8, 1),
    c = e.vertex(0.025, a * 0.72, 0.15, o, 0, 0.2, 1, 0, 0.8, 1),
    f = e.vertex(-0.025, a * 0.72, 0.15, o, 0, 0.2, 1, 0, 0.8, 1);
  return (e.quad(r, l, c, f), e.build());
}

function yF(n) {
  const t = new Be();
  return (
    Ho(t, 0, 0.22, 0, 0.55, {
      lobes: 5,
      dark: yt(4156026),
      mid: yt(9418952),
      light: yt(15267071),
      seed: n,
      sway0: 0.05,
      sway1: 0.2,
      thick: 0.6,
    }),
    Ho(t, 0.4, 0.14, 0.2, 0.36, {
      lobes: 5,
      dark: yt(4156026),
      mid: yt(10274004),
      light: yt(15923711),
      seed: n + 3,
      sway0: 0.05,
      sway1: 0.2,
      thick: 0.6,
    }),
    t.build()
  );
}

function vF(n, t, e, s) {
  const i = [];
  for (const a of n)
    for (const o of a.rim) {
      const r = t - o.x,
        l = e - o.z,
        c = Math.hypot(r, l);
      c > s || c < 0.5 || (r / c) * o.ox + (l / c) * o.oz < 0.35 || i.push({ rp: o, cliff: a, dist: c });
    }
  return (i.sort((a, o) => a.dist - o.dist), i);
}

function dd(n, t, e, s) {
  const i = [];
  for (const a of n) {
    if (i.length >= t) break;
    i.some((o) => Math.hypot(o.rp.x - a.rp.x, o.rp.z - a.rp.z) < e) || s.chance(0.25) || i.push(a);
  }
  return i;
}

const bF = {
  1: yt(10477823),
  2: yt(16747068),
  3: yt(13166736),
  4: yt(x1.amber),
  5: yt(11832575),
  6: yt(16767104),
};

function _F(n, t, e, s, i, a, o, r) {
  const l = {
      frostBranch: [O_(401), O_(409)],
      frostShrub: yF(419),
      charStump: [B_(421), B_(431)],
      vent: mF(433),
      log: gF(439),
      lampFlower: [H_(443), H_(449)],
      starArc: [$_(457), $_(461)],
      meteor: [G_(463), G_(467)],
      rune: [V_(479), V_(487)],
    },
    c = new Map(),
    f = [],
    d = (h, u) => {
      const m = h.rp.inset + u;
      return [h.rp.x - h.rp.ox * m, h.cliff.topY(m) - 0.03, h.rp.z - h.rp.oz * m];
    };
  for (const h of e.map.camps) {
    const u = Cx[h.monsterType],
      m = new ke(4400 + h.id * 7),
      x = Bf(h.monsterType),
      p = h.pos.x,
      g = h.pos.y,
      y = bF[u],
      v = u >= 5,
      _ = vF(s, p, g, x + (v ? 9 : 7));
    a.reserve(p, g);
    const k = Math.round(x * (u === 1 ? 1.4 : 3.2));
    for (let M = 0; M < k; M++) {
      if (u !== 1 && m.chance(0.4)) continue;
      const S =
          u === 1
            ? Math.PI * (0.15 + (0.7 * M) / Math.max(1, k - 1)) + Math.PI
            : (M / k) * Zs + m.range(-0.08, 0.08),
        b = x + m.range(-0.1, 0.25),
        w = p + Math.cos(S) * b,
        T = g + Math.sin(S) * b;
      if (e.solidDist(w, T) < 0.25 || e.laneDist(w, T) < 0.6) continue;
      const E = e.heightAt(w, T);
      if (u === 1)
        n.add(m.pick(l.rune), ae(w, E - 0.03, T, vr(p - w, g - T) - Math.PI / 2, m.range(0.95, 1.15)), {
          shadow: !1,
          tint: Pt(y, [1, 1, 1], 0.2),
          maskedTint: !0,
          glow: 1,
        });
      else {
        const A = m.range(0.8, 1.2) * (v ? 1.15 : 1);
        (n.add(
          m.pick(t.ruinStones),
          ae(
            w,
            E - 0.05,
            T,
            -S + Math.PI / 2 + m.range(-0.25, 0.25),
            A,
            A * (v ? 1.1 : 1),
            m.range(-0.12, 0.12),
            m.range(-0.12, 0.12),
          ),
          { shadow: !1, tint: u === 2 ? [0.42, 0.36, 0.36] : v ? [0.78, 0.82, 0.98] : [0.95, 0.95, 0.9] },
        ),
          v && m.chance(0.25) && i.ripples.push({ x: w, z: T, r: 0.8 }));
      }
    }
    switch (u) {
      case 1: {
        for (const M of dd(_, 4, 2.6, m)) {
          const [S, b, w] = d(M, m.range(0.5, 1.1)),
            T = m.next();
          if (T < 0.45) {
            const E = m.chance(0.4),
              A = Pt(yt(x1.frost), [0.9, 0.97, 1], m.range(0.1, 0.5));
            (n.add(m.pick(E ? t.bigCrystals : t.crystals), ae(S, b, w, m.range(0, Zs), m.range(0.7, 1)), {
              tint: A,
              glow: 0.85,
            }),
              a.reserve(S, w),
              i.glows.push({ x: S, z: w, y: b + 0.05, r: E ? 2.6 : 1.8, color: A }),
              i.aoBlobs.push({ x: S, y: b + 0.06, z: w, r: E ? 1.3 : 0.9, strength: 0.25 }));
          } else
            T < 0.75
              ? (n.add(m.pick(l.frostBranch), ae(S, b, w, m.range(0, Zs), m.range(0.9, 1.15)), { glow: 1 }),
                i.aoBlobs.push({ x: S, y: b + 0.06, z: w, r: 0.8, strength: 0.3 }))
              : n.add(l.frostShrub, ae(S, b, w, m.range(0, Zs), m.range(0.9, 1.3)));
        }
        (r.push({ kind: "fog", x: p, y: 0.35, z: g, width: 10, color: tl.cold, alpha: 0.11 }),
          o.push({
            x: p,
            y: 0.15,
            z: g,
            radius: x * 0.95,
            color: Ht(y, 1.05),
            count: 14,
            mode: 1,
            range: 2,
            size: 0.7,
          }));
        break;
      }
      case 2: {
        for (const M of dd(_, 3, 2.8, m)) {
          const [S, b, w] = d(M, m.range(0.5, 1));
          (n.add(m.pick(l.charStump), ae(S, b, w, m.range(0, Zs), m.range(0.9, 1.2)), { glow: 1 }),
            i.aoBlobs.push({ x: S, y: b + 0.06, z: w, r: 0.9, strength: 0.34 }));
        }
        for (let M = 0; M < 3; M++) {
          const S = m.range(0, Zs),
            b = x * m.range(0.82, 1),
            w = p + Math.cos(S) * b,
            T = g + Math.sin(S) * b;
          e.solidDist(w, T) < 0.5 ||
            e.laneDist(w, T) < 0.8 ||
            (n.add(l.vent, ae(w, 0, T, m.range(0, Zs), m.range(0.8, 1)), { shadow: !1, glow: 1 }),
            i.glows.push({ x: w, z: T, y: 0.03, r: 1.2, color: y }),
            o.push({ x: w, y: 0.2, z: T, radius: 0.25, color: y, count: 3, mode: 1, range: 2.2, size: 0.7 }));
        }
        o.push({
          x: p,
          y: 0.1,
          z: g,
          radius: x * 0.9,
          color: Ht(y, 1.1),
          count: 12,
          mode: 1,
          range: 2.6,
          size: 0.7,
        });
        break;
      }
      case 3: {
        const M = _[0];
        if (M) {
          const S = Math.round(M.rp.y * 10) / 10;
          let b = c.get(S);
          (b || ((b = xF(491 + S * 10, M.rp.y)), c.set(S, b), f.push(b)),
            n.add(
              b,
              ae(
                M.rp.x - M.rp.ox * (M.rp.inset - 0.12),
                0,
                M.rp.z - M.rp.oz * (M.rp.inset - 0.12),
                vr(M.rp.ox, M.rp.oz),
                1,
              ),
            ));
          const w = _.find((C) => Math.hypot(C.rp.x - M.rp.x, C.rp.z - M.rp.z) > 2.5) ?? M,
            [T, E, A] = d(w, 1);
          (n.add(l.log, ae(T, E, A, vr(w.rp.ox, w.rp.oz) + Math.PI / 2 + m.range(-0.3, 0.3), 0.95)),
            i.aoBlobs.push({ x: T, y: E + 0.06, z: A, r: 1.3, strength: 0.36 }));
        }
        for (let S = 0; S < 4; S++) {
          const b = m.range(0, Zs),
            w = p + Math.cos(b) * x * m.range(0.85, 1.05),
            T = g + Math.sin(b) * x * m.range(0.85, 1.05);
          e.solidDist(w, T) < 0.3 ||
            e.laneDist(w, T) < 0.6 ||
            n.add(m.pick(t.mushrooms), ae(w, 0, T, m.range(0, Zs), m.range(0.8, 1.2)), {
              shadow: !1,
              tint: m.pick([yt(14182458), yt(14725232)]),
              maskedTint: !0,
              glow: 0,
            });
        }
        o.push({
          x: p,
          y: 0.2,
          z: g,
          radius: x * 0.9,
          color: Ht(y, 0.9),
          count: 6,
          mode: 0,
          range: 1.2,
          size: 0.6,
        });
        break;
      }
      case 4: {
        for (const M of dd(_, 4, 1.7, m)) {
          const [S, b, w] = d(M, m.range(0.1, 0.35)),
            T = Pt(yt(x1.petalPink), yt(x1.petalWhite), m.next());
          (n.add(
            m.pick(l.lampFlower),
            ae(S, b, w, vr(M.rp.ox, M.rp.oz) + m.range(-0.4, 0.4), m.range(0.9, 1.25)),
            { tint: T, maskedTint: !0, glow: 1 },
          ),
            a.reserve(S, w),
            i.glows.push({ x: S, z: w, y: b + 0.05, r: 1.4, color: y }),
            o.push({
              x: S,
              y: b + 0.8,
              z: w,
              radius: 0.5,
              color: y,
              count: 2,
              mode: 0,
              range: 0.7,
              size: 0.6,
            }));
        }
        o.push({
          x: p,
          y: 0.5,
          z: g,
          radius: x,
          color: Ht(y, 0.9),
          count: 7,
          mode: 0,
          range: 1.4,
          size: 0.6,
        });
        break;
      }
      case 5: {
        for (const M of dd(_, 4, 4.2, m)) {
          const [S, b, w] = d(M, m.range(0.7, 1.2));
          (n.add(
            m.pick(l.starArc),
            ae(S, b, w, vr(M.rp.ox, M.rp.oz) + m.range(-0.4, 0.4), m.range(0.85, 1.1)),
            { glow: 1 },
          ),
            i.aoBlobs.push({ x: S, y: b + 0.06, z: w, r: 0.9, strength: 0.32 }));
        }
        (r.push({
          kind: "fog",
          x: p,
          y: Fn + 0.35,
          z: g,
          width: 12,
          color: Pt(tl.cold, tl.violet, 0.3),
          alpha: 0.11,
        }),
          r.push({
            kind: "beam",
            x: p - 1.5,
            y: Fn,
            z: g + 1,
            width: 3.6,
            length: 11,
            color: Pt(tl.warm, tl.violet, 0.35),
            alpha: 0.06,
          }),
          o.push({
            x: p,
            y: Fn + 0.05,
            z: g,
            radius: x * 0.95,
            color: Ht(y, 1.1),
            count: 20,
            mode: 1,
            range: 2.4,
            size: 0.9,
          }));
        break;
      }
      default: {
        for (const M of dd(_, 4, 3.6, m)) {
          const [S, b, w] = d(M, m.range(0.6, 1.2));
          (n.add(
            m.pick(l.meteor),
            ae(
              S,
              b - 0.22,
              w,
              m.range(0, Zs),
              m.range(0.9, 1.3),
              void 0,
              m.range(-0.2, 0.2),
              m.range(-0.2, 0.2),
            ),
            { glow: 1 },
          ),
            a.reserve(S, w),
            i.glows.push({ x: S, z: w, y: b + 0.05, r: 1.5, color: y }),
            i.aoBlobs.push({ x: S, y: b + 0.06, z: w, r: 1.1, strength: 0.34 }));
        }
        (r.push({ kind: "fog", x: p, y: Fn + 0.3, z: g, width: 11, color: tl.steam, alpha: 0.09 }),
          r.push({
            kind: "beam",
            x: p + 1.2,
            y: Fn,
            z: g - 0.8,
            width: 3.8,
            length: 12,
            color: tl.warm,
            alpha: 0.075,
          }),
          o.push({
            x: p,
            y: Fn + 0.05,
            z: g,
            radius: x * 0.9,
            color: Ht(y, 1.1),
            count: 20,
            mode: 1,
            range: 3,
            size: 0.85,
          }));
      }
    }
  }
  for (const h of Object.values(l)) Array.isArray(h) ? h.forEach((u) => u.dispose()) : h.dispose();
  f.forEach((h) => h.dispose());
}
export { JN, tF, iF, lF, cF, hF, pF, _F };
