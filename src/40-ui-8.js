// 40-ui-8.js — ui｜24 个顶层语句｜68KB
// 对应 game.pretty.js 第 74451–76275 行
// 关键内容：
//   AG                    商店
//   RG                    上沿的金色星轨线：中间亮，向两侧渐隐 */
//   IG                    被动：${s.passive.name}
//   PG                    比分牌：贴着屏幕上沿的倒梯形，左蓝右红，中间垂下一块计
//   DG                    我方已推掉的塔
//   zG                    对局结束：收起操作类部件，把画面留给终局演出与结算页
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { Nh, Se, kr, z0 } from './02-data.js';
import { Hf, Jn, M0, Sf, T0, W8, Zn, _e, j8, po, qx, ro, z, zi } from './32-ui.js';
import { IB, Ia, UB, Yh, ek, ln, u4 } from './33-data-2.js';
import { Ar, Po, T3, Tf, Vt, Zh, fk, ks, lH, ny } from './34-ui-2.js';
import { Ef, Vn, a$, br, c$, e$, gk, i$, is, l$, o$, u$, uo, vo } from './36-ui-4.js';
import { A$, D$, E$, N$, p$ } from './37-ui-5.js';
import { fG, oG } from './38-ui-6.js';
import { Ak, EG, Ek, K2, M1, MG, Rk, SG, TG, Tk, X2, Y2, Yd, Z4, _G, bG, kG, mG, q2, wG, yG } from './39-ui-7.js';

function AG(n) {
  Zn("sf-hud-shop", _G);
  const { host: t } = n,
    e = (Tt) => ln[Tt];
  let s = !1,
    i = "recommend",
    a = null,
    o = null,
    r = [],
    l = "",
    c = null;
  const f = z("button", "sf-hud__shopbtn", _e(Vt("shop")), z("span", "sf-hud__key", "P"));
  ((f.type = "button"),
    (f.tabIndex = -1),
    (f.dataset.sfSnd = "click"),
    f.setAttribute("aria-label", "商店"),
    f.addEventListener("click", () => n.actions.toggleShop()));
  const d = is(f, "is-open"),
    h = is(f, "is-ready"),
    u = is(f, "is-saving"),
    m = br(f, "--p", 0.01),
    x = ro(null),
    p = z("span", "sf-hud__quick-name"),
    g = z("span", "sf-num"),
    y = z(
      "button",
      "sf-hud__quick",
      x,
      z(
        "span",
        "sf-hud__quick-text",
        z("span", "sf-hud__quick-tag", "推荐 · 可购买"),
        z("span", "sf-hud__quick-price", _e(Vt("gold")), p, g),
      ),
    );
  ((y.type = "button"),
    (y.tabIndex = -1),
    y.addEventListener("click", () => {
      c && n.actions.buy(c);
    }));
  const v = is(y, "is-on"),
    _ = ro(null),
    k = z("span", "sf-hud__autobuy-ico", _e(Vt("info"))),
    M = z("span", "sf-hud__autobuy-tag"),
    S = z("span", "sf-hud__autobuy-name"),
    b = z("div", "sf-hud__autobuy", _, k, z("span", "sf-hud__autobuy-text", M, S));
  (b.setAttribute("role", "status"), b.setAttribute("aria-live", "polite"));
  const w = [];
  let T = null,
    E = 0,
    A = 0;
  function C(Tt, Zt) {
    ((T = Tt),
      (E = Zt),
      (A = 0),
      (_.hidden = Tt.itemId === null),
      (k.hidden = Tt.itemId !== null),
      Tt.itemId && ((_.innerHTML = Po(Tt.itemId)), _.classList.remove("sf-slot--empty")),
      (M.textContent = Tt.tag),
      (S.textContent = Tt.text),
      (S.hidden = Tt.text === ""),
      b.classList.toggle("is-warn", Tt.warn),
      b.classList.remove("is-out"),
      uo(b, "is-on"),
      R(),
      F());
  }
  function R() {
    if (!s) {
      b.parentElement !== L && L.appendChild(b);
      return;
    }
    b.parentElement !== B && B.appendChild(b);
    const Tt = U.offsetTop,
      Zt = b.offsetHeight || 46;
    ((B.style.top = `${Math.max(0, Math.round(Tt - Zt - 8))}px`), B.classList.toggle("is-off", Tt < Zt + 12));
  }
  function I(Tt) {
    for (w.push(Tt); w.length > 3;) w.shift();
  }
  function P(Tt) {
    if (!T) {
      const ce = w.shift();
      ce && C(ce, Tt);
      return;
    }
    if (A > 0) {
      Tt >= A && ((A = 0), (T = null), b.classList.remove("is-on", "is-out"), F());
      return;
    }
    const Zt = Tt - E,
      be = w.length > 0 && Zt >= SG ? w.shift() : void 0;
    be ? C(be, Tt) : Zt >= Y2 && (b.classList.add("is-out"), (A = Tt + TG));
  }
  function F() {
    v(c !== null && T === null);
  }
  const L = z("div", "sf-hud__shopbar", f, y, b),
    B = z("div", "sf-hud__shop-dock"),
    G = W8({
      tabs: wG.map((Tt) => ({ id: Tt, label: u4[Tt] })),
      value: i,
      onChange: (Tt) => {
        ((i = Tt), (a = null), ft());
      },
    }),
    q = j8({
      value: n.me.autoBuy === !0,
      label: "自动出装",
      onChange: (Tt) => {
        n.state.over ||
          (t.command({ type: "autoBuy", enabled: Tt }), t.updateSettings({ autoBuy: Tt }), Ue());
      },
    }),
    et = z("span", "sf-hud__shop-auto-hint"),
    ct = vo(et),
    rt = z("div", "sf-hud__shop-auto", z("span", "sf-hud__shop-auto-row", "自动出装", q.el), et);
  ((rt.dataset.sfSnd = "click"), rt.addEventListener("click", () => q.flip()));
  const mt = is(rt, "is-on"),
    nt = is(rt, "is-warn");
  let H = null,
    st = !1,
    tt = !1;
  const it = z("b", "sf-num", "0"),
    D = Vn(it),
    Q = T0({
      icon: Vt("close"),
      label: "关闭商店",
      quiet: !0,
      sound: "back",
      onClick: () => n.actions.setShop(!1),
    }),
    $ = z(
      "header",
      "sf-hud__shop-head",
      z("h2", "sf-hud__shop-title sf-metal", "商店"),
      G.el,
      rt,
      z("span", "sf-hud__chip sf-hud__shop-gold", _e(Vt("gold")), it),
      Q,
    ),
    ut = z("b", "sf-num"),
    N = z("span", "sf-hud__shop-steps"),
    J = z("small"),
    Z = z(
      "div",
      "sf-hud__shop-prog",
      z("span", "sf-hud__shop-prog-who", z("b", null, z0(n.me.heroId)), " 的推荐出装"),
      z("span", "sf-hud__shop-prog-n", "已买 ", ut, J),
      N,
    ),
    ot = z("div", "sf-hud__shop-grid"),
    j = z("div", "sf-hud__shop-list sf-scroll", Z, ot),
    at = z("aside", "sf-hud__shop-detail"),
    Rt = [],
    kt = z("div", "sf-hud__shop-slots");
  for (let Tt = 0; Tt < n.me.items.length; Tt++) {
    const Zt = ro(null, { button: !0 });
    ((Zt.dataset.sfSnd = "select"),
      Zt.addEventListener("click", () => {
        n.me.items[Tt] && ((a = { kind: "inv", index: Tt }), Ue());
      }),
      Rt.push(Zt),
      kt.appendChild(Zt));
  }
  const V = z(
      "footer",
      "sf-hud__shop-inv",
      z("h3", "sf-heading", "我的装备"),
      kt,
      z("span", "sf-hud__shop-hint", `点选装备可出售，返还 ${Math.round(Yh * 100)}%`),
    ),
    U = z("div", "sf-hud__shop-panel sf-panel", $, z("div", "sf-hud__shop-body", j, at), V);
  (U.setAttribute("role", "dialog"), U.setAttribute("aria-label", "商店"));
  const ht = z("div", "sf-hud__shop", U, B);
  ht.addEventListener("pointerdown", (Tt) => {
    Tt.target === ht && n.actions.setShop(!1);
  });
  function lt(Tt, Zt) {
    return Tt.buyId ? Tt.buyId : ln[Tt.finalId].category === "boots" ? (Ak(Zt) ?? Tt.finalId) : Tt.finalId;
  }
  let O = null,
    Y = 0;
  function gt(Tt, Zt, be) {
    const ce = e(Zt),
      Ze = ro(Po(Zt)),
      hs = z("span", "sf-hud__card-name", ce.name),
      gi = z("span", "sf-hud__card-brief", Z4(ce)),
      js = z("b", "sf-num"),
      qs = z("span", "sf-hud__card-tag"),
      Re = be ? [z("i"), z("i")] : null,
      Oe = z(
        "button",
        "sf-hud__card",
        z(
          "span",
          "sf-hud__card-top",
          Tt > 0 ? z("span", "sf-hud__card-no sf-num", String(Tt)) : null,
          Ze,
          Re ? z("span", "sf-hud__card-dots", ...Re) : null,
        ),
        hs,
        gi,
        z("span", "sf-hud__card-price", _e(Vt("gold")), js),
        qs,
      );
    ((Oe.type = "button"), (Oe.dataset.sfSnd = "select"), (Oe.dataset.item = Zt));
    const X = {
      el: Oe,
      order: Tt,
      id: Zt,
      slot: Ze,
      name: hs,
      brief: gi,
      price: js,
      tag: qs,
      dots: Re,
      autoUntil: 0,
    };
    return (
      Oe.addEventListener("click", () => {
        const vt = performance.now(),
          St = O === X && vt - Y < EG;
        if (((O = X), (Y = St ? 0 : vt), St)) {
          const Et = X.order > 0 ? (Yd(n.me)[X.order - 1]?.buyId ?? null) : X.id;
          Et && n.actions.buy(Et);
          return;
        }
        ((a = X.order > 0 ? { kind: "card", order: X.order } : { kind: "shop", id: X.id }), Ue());
      }),
      ot.appendChild(Oe),
      X
    );
  }
  function ft() {
    const Tt = n.me;
    if (((ot.textContent = ""), (r = []), (O = null), i === "recommend"))
      for (const Zt of Yd(Tt)) r.push(gt(Zt.order, lt(Zt, Tt), ln[Zt.finalId].category === "boots"));
    else {
      const Zt = IB.filter((be) => be.category === i).sort((be, ce) => be.cost - ce.cost);
      for (const be of Zt) r.push(gt(0, be.id, !1));
    }
    ((!a || a.kind !== "inv") && (a = _t(Tt)), (j.scrollTop = 0), Ue());
  }
  function _t(Tt) {
    if (i === "recommend") {
      const Zt = Yd(Tt),
        be = Zt.find((ce) => ce.next) ?? Zt.find((ce) => ce.stage !== "done") ?? Zt[0];
      return be ? { kind: "card", order: be.order } : null;
    }
    return r[0] ? { kind: "shop", id: r[0].id } : null;
  }
  function Dt(Tt, Zt) {
    if (!a) return null;
    if (a.kind === "inv") {
      const ce = Tt.items[a.index];
      return ce ? { id: ce, kind: "inv", title: "我的装备", star: !1, invIndex: a.index } : null;
    }
    if (a.kind === "card") {
      const ce = Zt?.[a.order - 1];
      if (!ce) return null;
      if (!ce.buyId) return { id: lt(ce, Tt), kind: "own", title: "已买", star: !1, invIndex: -1 };
      const Ze = ce.stage === "base" && ce.baseId ? `已有${K2(ce.baseId)} · 稍后升级` : `第 ${ce.order} 件`;
      return {
        id: ce.buyId,
        kind: "buy",
        title: ce.next ? (ce.stage === "base" ? "下一件 · 升级" : "下一件") : Ze,
        star: ce.next,
        invIndex: -1,
      };
    }
    const be = X2(Tt) === a.id;
    return { id: a.id, kind: "buy", title: be ? "下一件" : kG[e(a.id).category], star: be, invIndex: -1 };
  }
  let zt = null,
    Ot = null,
    Jt = null,
    ue = null,
    Kt = null,
    Ie = null,
    xt = null;
  function qt(Tt) {
    if (((at.textContent = ""), (Ot = Jt = ue = Kt = Ie = xt = null), (zt = Tt), !Tt)) {
      at.appendChild(z("div", "sf-hud__dt-empty", "选择一件装备查看详情"));
      return;
    }
    const Zt = e(Tt.id),
      be = Tt.id,
      ce = z(
        "div",
        `sf-hud__dt-title${Tt.star ? " is-next" : ""}`,
        Tt.star ? _e(Vt("star")) : Tt.kind === "own" ? _e(Vt("check")) : null,
        Tt.title,
      ),
      Ze = z(
        "div",
        "sf-hud__dt-meta",
        z("span", "sf-badge sf-badge--mute", u4[Zt.category]),
        Zt.category === "boots"
          ? z("span", `sf-badge${Zt.tier === 2 ? "" : " sf-badge--mute"}`, MG[Zt.tier])
          : null,
      ),
      hs = z("b", "sf-num");
    Kt = hs;
    const gi = z(
        "div",
        "sf-hud__dt-head",
        ro(Po(be)),
        z("div", "sf-hud__dt-headtext", z("div", "sf-hud__dt-name", Zt.name), Ze),
        Tt.kind === "buy" ? z("span", "sf-hud__dt-price", _e(Vt("gold")), hs) : null,
      ),
      js = z("div", "sf-hud__dt-stats");
    for (const Re of ek(Zt.stats))
      js.appendChild(z("span", "sf-hud__dt-stat", z("span", null, Re.label), z("b", "sf-num", Re.value)));
    const qs = z(
      "div",
      "sf-hud__dt-body sf-scroll",
      Zt.brief ? z("div", "sf-hud__dt-brief", Zt.brief) : null,
      js,
    );
    if (
      (Zt.passive
        ? qs.appendChild(
            z("div", "sf-hud__dt-passive", z("b", null, `被动 · ${Zt.passive.name}`), Zt.passive.desc),
          )
        : qs.appendChild(z("div", "sf-hud__dt-nopassive", "(无被动)")),
      (Ot = z("div", "sf-hud__dt-note")),
      at.append(ce, gi, qs, Ot),
      Tt.kind === "own")
    ) {
      at.appendChild(z("div", "sf-hud__dt-owned", _e(Vt("check")), "已经在装备栏里了"));
      return;
    }
    if (Tt.kind === "inv") {
      const Re = Tt.invIndex;
      Ie = po({
        label: "出售",
        icon: Vt("gold"),
        variant: "danger",
        block: !0,
        sound: "none",
        onClick: () => {
          const Oe = n.me.autoBuy === !0;
          (n.actions.sell(Re), Oe && n.me.autoBuy !== !0 && (tt = !0));
        },
      });
    } else
      ((ue = z("span", "sf-hud__dt-save-text sf-num")),
        (Jt = z("div", "sf-hud__dt-save", "金币", z("span", "sf-hud__dt-save-bar", z("i")), ue)),
        at.appendChild(Jt),
        (Ie = po({
          label: "购买",
          icon: Vt("gold"),
          variant: "primary",
          block: !0,
          sound: "none",
          onClick: () => n.actions.buy(be),
        })),
        (Ie.style.pointerEvents = "auto"),
        Ie.appendChild(z("span", "sf-hud__key", "回车")));
    ((xt = Ie.querySelector(".sf-btn__label")), at.appendChild(Ie));
  }
  function te(Tt) {
    const Zt = zt;
    if (!Zt || !Ot) return;
    const be = Ot;
    if (((be.textContent = ""), (be.className = "sf-hud__dt-note"), Zt.kind === "own" || !Ie || !xt)) return;
    if (Zt.kind === "inv") {
      const qs = Ek(Zt.id);
      (Tt.autoBuy && Tk(Tt.heroId, Zt.id)
        ? (be.classList.add("is-warn"), be.append("这是推荐装备：卖掉后本局自动出装会关闭"))
        : be.append("出售后返还 ", z("b", "sf-num sf-gold", String(qs)), " 金币"),
        (xt.textContent = `出售 +${qs}`));
      return;
    }
    const ce = e(Zt.id),
      Ze = M1(Tt, Zt.id),
      hs = Math.floor(Tt.gold),
      gi = Math.max(1, Math.ceil(Ze.cost - Tt.gold));
    if (
      (Ze.replaces
        ? (be.classList.add("is-good"),
          be.append(`替换${ln[Ze.replaces].name}，已抵 `, z("b", "sf-num", String(ce.cost - Ze.cost))))
        : Ze.block === "full"
          ? (be.classList.add("is-warn"), be.append("装备栏已满，先卖掉一件再买"))
          : Ze.block === "boots_owned"
            ? (be.classList.add("is-warn"), be.append("已经有鞋了，可以直接买进阶鞋替换"))
            : Ze.block === "boots_same" && (be.classList.add("is-warn"), be.append("已经穿着这双鞋了")),
      Kt && (Kt.textContent = String(Ze.cost)),
      Jt && ue)
    ) {
      const qs = Ze.block === "ok" || Ze.block === "gold";
      ((Jt.hidden = !qs),
        qs &&
          (Jt.style.setProperty("--p", Ef(Ze.cost > 0 ? Tt.gold / Ze.cost : 1).toFixed(3)),
          Jt.classList.toggle("is-full", Ze.ok),
          (ue.textContent = ""),
          Ze.ok ? ue.append(`✓ ${hs}/${Ze.cost}`) : ue.append("还差 ", z("b", null, String(gi)))));
    }
    const js = Ze.block === "gold" && Tt.autoBuy === !0 && X2(Tt) === Zt.id;
    ((xt.textContent = js ? `还差 ${gi} · 攒够自动买` : `购买 ${Ze.cost}`),
      Ie.classList.toggle("is-wait", js),
      Ie.classList.toggle("is-disabled", !Ze.ok));
  }
  let ve = "",
    Wt = "",
    Nt = 0;
  function Me(Tt) {
    const Zt = Tt.autoBuy === !0;
    (q.get() !== Zt && q.set(Zt), mt(Zt), H && n.now >= H.until && (H = null));
    let be,
      ce = !1;
    if (H) ((be = H.text), (ce = H.warn));
    else if (!Zt) ((be = st ? "卖了推荐装，本局已关闭" : "已关闭，自己点购买"), (ce = st));
    else {
      const Ze = q2(Tt);
      Ze === "paused"
        ? ((be = "装备栏已满，已暂停"), (ce = !0))
        : Ze === "done"
          ? (be = "推荐出装已买齐")
          : (be = "钱够自动买下一件");
    }
    (ct(be), nt(ce));
  }
  function Ue() {
    const Tt = n.me,
      Zt = n.now,
      be = Tt.items.join(",");
    (D(Math.floor(Tt.gold)), Me(Tt));
    const ce = i === "recommend" ? Yd(Tt) : null;
    if (ce && a?.kind === "card" && be !== Wt) {
      const Re = ce[a.order - 1],
        Oe = ce.find((X) => X.next);
      Re && Oe && Re.buyId !== o && (a = { kind: "card", order: Oe.order });
    }
    ((Wt = be), a?.kind === "inv" && !Tt.items[a.index] && (a = _t(Tt)));
    const Ze = new Map();
    for (const Re of Tt.items) Re && Ze.set(Re, (Ze.get(Re) ?? 0) + 1);
    let hs = 0;
    for (const Re of r) {
      const Oe = ce ? ce[Re.order - 1] : null;
      let X = Re.id;
      if (Oe) {
        X = Oe.buyId;
        const _n = lt(Oe, Tt);
        if (_n !== Re.id) {
          Re.id = _n;
          const ts = e(_n);
          ((Re.slot.innerHTML = Po(_n)),
            (Re.name.textContent = ts.name),
            (Re.brief.textContent = Z4(ts)),
            (Re.el.dataset.item = _n));
        }
        Re.dots &&
          (Re.dots[0].classList.toggle("is-on", Oe.stage !== "todo"),
          Re.dots[1].classList.toggle("is-on", Oe.stage === "done"));
      }
      const vt = X ? M1(Tt, X) : null,
        St = !!Oe && Oe.stage === "done",
        Et = !!vt && (vt.block === "full" || vt.block === "boots_owned" || vt.block === "boots_same"),
        wt =
          a?.kind === "card"
            ? a.order === Re.order && Re.order > 0
            : a?.kind === "shop" && Re.order === 0 && a.id === Re.id,
        Gt = Re.el.classList;
      Gt.toggle("is-afford", !!vt && vt.ok);
      const fe = !!Oe && Oe.stage === "base" && !Oe.next;
      (Gt.toggle("is-poor", !!vt && vt.block === "gold" && !fe),
        Gt.toggle("is-blocked", Et),
        Gt.toggle("is-done", St),
        Gt.toggle("is-next", !!Oe && Oe.next),
        Gt.toggle("is-sel", wt));
      const we = vt ? String(vt.cost) : "";
      Re.price.textContent !== we && (Re.price.textContent = we);
      let re = "",
        Te = "",
        De = "";
      const Ce = Ze.get(Re.id) ?? 0;
      (Re.autoUntil > 0 && (Zt >= Re.autoUntil || !St) && (Re.autoUntil = 0),
        Re.autoUntil > 0
          ? (([re, Te] = ["已自动购买", "is-auto"]),
            (hs = hs > 0 ? Math.min(hs, Re.autoUntil) : Re.autoUntil))
          : Oe
            ? St
              ? ([re, Te] = ["✓ 已买", "is-done"])
              : Oe.next
                ? ([re, Te, De] = ["下一件", "is-next", Oe.stage === "base" ? " · 升级" : ""])
                : Oe.stage === "base" && Oe.baseId
                  ? ([re, Te, De] = [`已有${K2(Oe.baseId)}`, "is-have", " · 稍后升级"])
                  : Et
                    ? ([re, Te] = ["栏位已满", "is-step"])
                    : ([re, Te] = [`第 ${Oe.order} 件`, "is-step"])
            : Ce > 0
              ? ([re, Te] = [Ce > 1 ? `已有 ×${Ce}` : "已有", "is-own"])
              : Et && vt && ([re, Te] = [Rk[vt.block], "is-step"]),
        Re.tag.textContent !== re + De &&
          ((Re.tag.textContent = re), De && Re.tag.appendChild(z("span", "sf-hud__card-tag-more", De))));
      const cn = `sf-hud__card-tag ${Te}`;
      Re.tag.className !== cn && (Re.tag.className = cn);
    }
    Nt = hs;
    const gi = ce ? be : "-";
    if (gi !== ve && ((ve = gi), (Z.hidden = !ce), ce)) {
      ut.textContent = `${ce.filter((Oe) => Oe.stage === "done").length}/${ce.length}`;
      const Re = ce.find((Oe) => Oe.stage === "base" && Oe.baseId);
      ((J.textContent = Re?.baseId ? `(${K2(Re.baseId)}已有)` : ""), (N.textContent = ""));
      for (const Oe of ce)
        N.appendChild(
          z(
            "i",
            Oe.stage === "done" ? "is-done" : Oe.next ? "is-next" : Oe.stage === "base" ? "is-half" : "",
          ),
        );
    }
    for (let Re = 0; Re < Rt.length; Re++) {
      const Oe = Tt.items[Re],
        X = Rt[Re];
      (X.dataset.item !== (Oe ?? "") &&
        ((X.dataset.item = Oe ?? ""),
        (X.innerHTML = Oe ? Po(Oe) : ""),
        X.classList.toggle("sf-slot--empty", !Oe),
        X.setAttribute("aria-label", Oe ? `${ln[Oe].name}（点选可出售）` : "空装备栏")),
        X.classList.toggle("is-active", a?.kind === "inv" && a.index === Re));
    }
    o = a?.kind === "card" ? (ce?.[a.order - 1]?.buyId ?? null) : null;
    const js = Dt(Tt, ce),
      qs = js ? `${js.kind}|${js.id}|${js.title}|${js.invIndex}` : "";
    (qs !== l && ((l = qs), qt(js)), te(Tt));
  }
  let zn = null,
    Tn = !1,
    ra = !1;
  function Ma(Tt) {
    const Zt = Tt.autoBuy === !0;
    if (zn === null) return ((zn = Zt), (ra = q2(Tt) === "done"), !0);
    const be = tt;
    return (
      (tt = !1),
      Zt === zn
        ? !1
        : ((zn = Zt),
          Zt
            ? ((st = !1), n.toast("自动出装：已开启", "good"))
            : be
              ? ((st = !0),
                I({ tag: "自动出装已关闭", text: "商店顶部可重新打开", itemId: null, warn: !0 }),
                (H = null),
                s && uo(rt, "is-flash"))
              : ((st = !1), n.toast("自动出装：已关闭", "info")),
          !0)
    );
  }
  function Wf(Tt) {
    const Zt = Tt.autoBuy === !0,
      be = Zt ? yG(Tt) : -1;
    (u(be >= 0), be >= 0 && m(be));
    const ce = Zt ? null : X2(Tt),
      Ze = ce ? M1(Tt, ce) : null,
      hs = ce && Ze && Ze.ok && !s ? ce : null;
    if (
      (hs !== c &&
        ((c = hs),
        h(!!hs),
        hs &&
          ((x.innerHTML = Po(hs)),
          x.classList.remove("sf-slot--empty"),
          y.setAttribute("aria-label", `快捷购买 ${ln[hs].name}`)),
        F()),
      hs && Ze && ((p.textContent = ln[hs].name), (g.textContent = String(Ze.cost))),
      Zt)
    ) {
      const gi = q2(Tt);
      (gi === "paused" &&
        !Tn &&
        ((Tn = !0), I({ tag: "自动出装暂停", text: "装备栏满了", itemId: null, warn: !0 })),
        gi === "done" && !ra && ((ra = !0), I({ tag: "推荐出装已买齐", text: "", itemId: null, warn: !1 })));
    }
  }
  let Mo = -1;
  const Fr = [];
  function ou(Tt) {
    const Zt = Math.floor(Tt.gold);
    let be = Zt !== Mo || Fr.length !== Tt.items.length;
    for (let ce = 0; ce < Tt.items.length && !be; ce++) be = Fr[ce] !== Tt.items[ce];
    if (be) {
      ((Mo = Zt), (Fr.length = Tt.items.length));
      for (let ce = 0; ce < Tt.items.length; ce++) Fr[ce] = Tt.items[ce];
    }
    return be;
  }
  const jf = (Tt) => {
    !s ||
      (Tt.code !== "Enter" && Tt.code !== "NumpadEnter") ||
      !n.enabled ||
      n.paused ||
      Sf() ||
      Tt.ctrlKey ||
      Tt.metaKey ||
      Tt.altKey ||
      (Tt.preventDefault(), !(Tt.repeat || !zt || zt.kind !== "buy") && n.actions.buy(zt.id));
  };
  return (
    window.addEventListener("keydown", jf),
    {
      els: [L, ht],
      isOpen: () => s,
      setOpen(Tt) {
        Tt !== s &&
          ((s = Tt),
          ht.classList.toggle("is-open", Tt),
          d(Tt),
          Tt &&
            ((i = "recommend"),
            G.set(i),
            (a = null),
            (l = ""),
            (ve = ""),
            (H = null),
            (Wt = n.me.items.join(",")),
            ft()),
          R(),
          Wf(n.me));
      },
      update(Tt) {
        const Zt = Tt.me,
          be = Ma(Zt);
        (ou(Zt) || be
          ? (Wf(Zt), s && Ue())
          : s && ((Nt > 0 && Tt.now >= Nt) || (H !== null && Tt.now >= H.until)) && Ue(),
          P(Tt.now));
      },
      handleEvent(Tt, Zt) {
        if (Tt.type !== "itemBought" || Tt.unitId !== Zt.state.playerId) return;
        const be = ln[Tt.itemId];
        if (Tt.auto) {
          const Ze = be.category === "boots" && be.tier === 2 ? "已自动升级" : "已自动购买";
          (I({ tag: Ze, text: be.name, itemId: Tt.itemId, warn: !1 }),
            s && (H = { text: `${Ze} ${be.name}`, warn: !1, until: Zt.now + Y2 }));
        }
        if (s) {
          for (const ce of r)
            ce.id === Tt.itemId && (uo(ce.el, "is-flash"), Tt.auto && (ce.autoUntil = Zt.now + Y2));
          Tt.auto && uo(rt, "is-flash");
        }
      },
      dispose() {
        window.removeEventListener("keydown", jf);
      },
    }
  );
}

const RG = Jn(`
.sf-hud { --hud-lift: 0px; }
.sf-hud__status {
  --w: 458u;
  position: absolute; bottom: 0; z-index: 3; left: min(50%, calc(100% - var(--hud-cw) - var(--w) / 2 - 6u)); transform: translateX(-50%);
  display: flex; align-items: flex-end; gap: 8u; width: var(--w); padding: 7u 10u max(6u, var(--sf-safe-b)); border-radius: 12u 12u 0 0;
  background: var(--hud-plate); box-shadow: 0 -4u 16u rgba(2, 4, 12, 0.5), inset 0 1px 0 rgba(143, 233, 255, 0.12);
}
/* 上沿的金色星轨线：中间亮，向两侧渐隐 */
.sf-hud__status::before { content: ''; position: absolute; left: 10u; right: 10u; top: 0; height: 1.5px; pointer-events: none; background: linear-gradient(90deg, rgba(255, 231, 173, 0), rgba(255, 231, 173, 0.95) 18%, rgba(224, 177, 96, 0.35) 50%, rgba(255, 231, 173, 0.95) 82%, rgba(255, 231, 173, 0)); }
.sf-hud__status.is-dead .sf-hud__st-bars, .sf-hud__status.is-dead .sf-hud__st-items { filter: saturate(0.25) brightness(0.8); }

/* ── 头像 ── */
.sf-hud__st-por { position: relative; flex: none; width: 62u; height: 62u; margin: -18u 2u 2u 2u; }
.sf-hud__st-por > .sf-portrait { width: 100%; height: 100%; border-radius: 50%; box-shadow: 0 0 0 max(2px, 2.5u) #0a1128, 0 0 0 max(3.5px, 4.5u) var(--sf-c-gold-400), 0 0 14u rgba(255, 214, 130, 0.35), 0 4u 10u rgba(0, 0, 0, 0.6); transition: filter 0.4s linear; }
.sf-hud__status.is-dead .sf-hud__st-por > .sf-portrait { filter: grayscale(1) brightness(0.55); }
.sf-hud__st-respawn { position: absolute; inset: 0; display: none; place-items: center; font-size: max(20px, 27u); font-weight: 800; color: #fff; text-shadow: 0 1px 3px #000, 0 0 12u rgba(255, 93, 93, 0.9); }
.sf-hud__status.is-dead .sf-hud__st-respawn { display: grid; }
.sf-hud__st-lv {
  position: absolute; right: -5u; bottom: -3u; display: grid; place-items: center; min-width: max(20px, 23u); height: max(20px, 23u); padding: 0 3u; border-radius: 50%;
  font-size: max(11px, 13u); font-weight: 800; line-height: 1; color: #2b1a04; background: var(--sf-grad-gold); box-shadow: 0 0 0 max(1.5px, 2u) #0a1128, 0 2u 5u rgba(0, 0, 0, 0.6);
}
.sf-hud__st-lv.is-up { animation: sf-hud-lvup 0.9s var(--sf-ease-out); }
@keyframes sf-hud-lvup { 0% { transform: scale(2.2); box-shadow: 0 0 0 2px #0a1128, 0 0 0 0 rgba(255, 244, 214, 0.95); } 60% { transform: scale(0.94); } 100% { transform: none; box-shadow: 0 0 0 2px #0a1128, 0 0 0 22u rgba(255, 244, 214, 0); } }
.sf-hud__st-passive { --sf-slot: max(22px, 25u); position: absolute; left: -6u; bottom: -4u; }
/* 名签：压在头像上沿正中，职业图标(职业色) + 名字 */
.sf-hud__st-name {
  position: absolute; left: 50%; top: -9u; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 2u; height: max(15px, 16u); padding: 0 6u 0 4u; border-radius: 99px; pointer-events: none;
  font-size: max(10px, 11u); font-weight: 800; line-height: 1; letter-spacing: 0.06em; white-space: nowrap; color: var(--sf-c-text);
  background: rgba(6, 10, 24, 0.9); box-shadow: 0 0 0 1px var(--sf-c-gold-line), 0 1px 3px rgba(0, 0, 0, 0.6);
}
.sf-hud__st-name .sf-i { width: 1.15em; height: 1.15em; vertical-align: 0; color: var(--role, var(--sf-c-gold-300)); }

/* ── 生命 / 法力 / 经验 ── */
.sf-hud__st-bars { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3u; }
.sf-hud__st-stats { display: flex; align-items: baseline; justify-content: space-between; gap: 4u; height: max(13px, 14u); padding: 0 2u; font-size: max(10px, 11u); line-height: 1; color: var(--sf-c-text-3); white-space: nowrap; cursor: default; }
.sf-hud__st-stats b { margin-left: 2u; font-weight: 700; color: var(--sf-c-text); }
.sf-hud__bar { --p: 1; --s: 0; --seg: 100%; position: relative; height: 20u; border-radius: 4u; overflow: hidden; background: rgba(3, 6, 16, 0.82); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.3); }
.sf-hud__bar > i { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; transform-origin: left center; }
.sf-hud__bar-trail { background: linear-gradient(180deg, #ffd9c9, #ff7a5c); transform: scaleX(var(--p)); transition: transform 0.55s cubic-bezier(0.3, 0, 0.2, 1) 0.2s; }
.sf-hud__bar-fill { transform: scaleX(var(--p)); transition: transform 0.12s linear; }
.is-hp > .sf-hud__bar-fill { background: linear-gradient(180deg, #a6f7c0 0%, #4fd98a 38%, #1f9d58 100%); }
.is-hp.is-mid > .sf-hud__bar-fill { background: linear-gradient(180deg, #ffe7a6 0%, #f3bb48 38%, #c07e16 100%); }
.is-hp.is-low > .sf-hud__bar-fill { background: linear-gradient(180deg, #ffb8a8 0%, #f0584f 38%, #a8222d 100%); }
.is-mp > .sf-hud__bar-fill { background: linear-gradient(180deg, #a9d6ff 0%, #4da3ff 40%, #1e5fc4 100%); }
.sf-hud__bar-shield { transform: translateX(calc(var(--p) * 100%)) scaleX(var(--s)); background: linear-gradient(180deg, #ffffff, #cfe2ff); transition: transform 0.12s linear; }
/* 每 1000 生命一道刻度：血厚的英雄一眼能看出来 */
.sf-hud__bar-ticks { background: repeating-linear-gradient(90deg, rgba(3, 6, 16, 0) 0, rgba(3, 6, 16, 0) calc(var(--seg) - 1px), rgba(3, 6, 16, 0.6) calc(var(--seg) - 1px), rgba(3, 6, 16, 0.6) var(--seg)); }
.sf-hud__bar-gloss { background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 48%, rgba(0, 0, 0, 0.16)); }
.sf-hud__bar-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 5u; font-size: max(11px, 12.5u); font-weight: 800; line-height: 1; color: #fff; text-shadow: 0 1px 1px rgba(2, 4, 12, 0.95), 0 0 4u rgba(2, 4, 12, 0.9); white-space: nowrap; }
.sf-hud__bar-text em { font-style: normal; color: #dff0ff; }
.sf-hud__bar-text em:empty { display: none; }
.sf-hud__bar.is-mp { height: 13u; }
.sf-hud__bar.is-mp .sf-hud__bar-text { font-size: max(10px, 10.5u); }
.sf-hud__xp { --p: 0; position: relative; height: max(3px, 4u); border-radius: 2u; overflow: hidden; background: rgba(3, 6, 16, 0.82); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.22); }
.sf-hud__xp > i { position: absolute; inset: 0; transform-origin: left center; transform: scaleX(var(--p)); transition: transform 0.3s var(--sf-ease-out); background: linear-gradient(90deg, #c08c3c, #ffe7ad); box-shadow: 0 0 6u rgba(255, 214, 130, 0.8); }

/* ── 装备 ── */
.sf-hud__st-items { flex: none; display: grid; grid-template-columns: repeat(3, auto); gap: 3u; }
.sf-hud__st-items .sf-slot { --sf-slot: 27u; border-radius: 5u; box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(1.5px, 2u) rgba(224, 177, 96, 0.5); }
.sf-hud__st-items .sf-slot--empty { box-shadow: inset 0 0 0 1px var(--sf-c-line-strong); }
/* 新到手的装备(手动买的、自动出装买的都算)：那一格亮一下再落定 */
.sf-hud__st-items .sf-slot.is-new { animation: sf-hud-item-new 1.1s var(--sf-ease-out); }
@keyframes sf-hud-item-new {
  0% { transform: scale(1.5); filter: brightness(2.4); box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(2px, 2.5u) #fff4d6, 0 0 0 0 rgba(255, 231, 173, 0.9); }
  35% { transform: scale(0.94); filter: brightness(1.5); }
  100% { transform: none; filter: none; box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(1.5px, 2u) rgba(224, 177, 96, 0.5), 0 0 0 16u rgba(255, 231, 173, 0); }
}

/* ── 金币 + 商店入口（与小地图下方的商店按钮是同一个入口，放在装备旁边顺手） ── */
.sf-hud__st-shop {
  flex: none; align-self: stretch; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4u; width: 46u; padding: 0; margin: 0; border: 0; border-radius: 6u; cursor: pointer;
  color: var(--sf-c-gold-200); background: linear-gradient(180deg, rgba(74, 54, 14, 0.7), rgba(22, 16, 6, 0.8)); box-shadow: inset 0 0 0 1px rgba(243, 207, 133, 0.55), inset 0 1px 0 1px rgba(255, 244, 214, 0.12);
  transition: transform 0.1s var(--sf-ease-out), filter 0.12s linear;
}
@media (hover: hover) { .sf-hud__st-shop:hover { filter: brightness(1.25); } }
.sf-hud__st-shop:active { transform: scale(0.95); }
.sf-hud__st-shop-ico { display: grid; place-items: center; width: 24u; height: 24u; border-radius: 50%; color: #2b1a04; background: var(--sf-grad-gold); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 0 1px #6b4614; }
.sf-hud__st-shop-ico > .sf-i { width: 64%; height: 64%; }
.sf-hud__st-shop-gold { font-size: max(11px, 12.5u); font-weight: 800; line-height: 1; }
/* 窄横屏放不下：收起这个入口，状态栏变窄（左侧的商店按钮还在） */
@media (orientation: landscape) and (max-width: 760px) {
  .sf-hud__status { --w: 404u; }
  .sf-hud__st-shop { display: none; }
}

/* ── 状态图标行 ── */
.sf-hud__buffs { position: absolute; left: 80u; right: 6u; bottom: calc(100% + 5u); display: flex; flex-wrap: wrap-reverse; gap: 4u; pointer-events: none; }
.sf-hud__buff {
  --t: 1; position: relative; flex: none; width: max(22px, 25u); height: max(22px, 25u); border-radius: 5u; overflow: hidden; pointer-events: auto;
  box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(1.5px, 2u) rgba(111, 227, 161, 0.75), 0 2u 6u rgba(0, 0, 0, 0.5);
  animation: sf-hud-buff-in 0.22s var(--sf-ease-spring) both;
}
.sf-hud__buff.is-debuff { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(1.5px, 2u) rgba(255, 93, 93, 0.9), 0 2u 6u rgba(0, 0, 0, 0.5); }
.sf-hud__buff.is-neutral { box-shadow: 0 0 0 1px rgba(8, 13, 31, 0.95), 0 0 0 max(1.5px, 2u) rgba(143, 233, 255, 0.75), 0 2u 6u rgba(0, 0, 0, 0.5); }
.sf-hud__buff > svg { display: block; width: 100%; height: 100%; }
/* 已流逝的部分盖上暗色扇形：从 12 点方向顺时针扩大 */
.sf-hud__buff-cd { position: absolute; inset: -30%; background: conic-gradient(rgba(3, 6, 16, 0.72) calc((1 - var(--t)) * 360deg), rgba(3, 6, 16, 0) 0); pointer-events: none; }
.sf-hud__buff-n { position: absolute; right: 1px; bottom: 0; font-size: max(10px, 11u); font-weight: 800; line-height: 1.05; color: #fff; text-shadow: 0 0 2px #000, 0 1px 1px #000, 0 0 3px #000; }
@keyframes sf-hud-buff-in { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: none; } }

/* 竖屏：铺满底边的一条；技能区与摇杆整体上移让位 */
@media (orientation: portrait) {
  .sf-hud { --hud-lift: max(58px, 68u); }
  .sf-hud__status { left: 0; right: 0; width: auto; transform: none; border-radius: 0; padding-left: max(10u, var(--sf-safe-l)); padding-right: max(10u, var(--sf-safe-r)); align-items: center; }
  .sf-hud__st-por { width: 48u; height: 48u; margin: -12u 3u 3u 3u; }
  .sf-hud__st-stats { display: none; }
  .sf-hud__st-shop { display: none; }
  .sf-hud__st-items { grid-template-columns: repeat(6, auto); }
  .sf-hud__st-items .sf-slot { --sf-slot: 28u; }
  .sf-hud__st-passive { --sf-slot: max(20px, 22u); left: -7u; top: -9u; bottom: auto; }
  .sf-hud__st-lv { right: -7u; }
  /* 竖屏：左上角是被动图标，名签排在它右边，只写名字(职业图标省掉)，状态图标行相应右移一点 */
  .sf-hud__st-name { left: calc(max(20px, 22u) - 5u); top: -10u; transform: none; height: max(14px, 15u); padding: 0 5u; font-size: max(10px, 10u); }
  .sf-hud__st-name .sf-i { display: none; }
  /* 状态图标只排到技能区左缘为止，多了向上换行 */
  .sf-hud__buffs { left: max(68u, 66px); right: calc(var(--hud-sk) * 2.9 + var(--hud-r)); }
}
`),
  CG = 0.4,
  LG = Object.keys(T3),
  Q4 = new Map(LG.map((n, t) => [n, t])),
  J4 = 10;

function IG(n) {
  Zn("sf-hud-status", RG);
  const { host: t } = n,
    e = n.me.heroId,
    s = Se[e],
    i = [],
    a = z("span", "sf-hud__st-respawn sf-num"),
    o = z("span", "sf-hud__st-lv sf-num", "1"),
    r = ro(Ia(e, "passive"), { round: !0, cls: "sf-hud__st-passive", label: `被动：${s.passive.name}` });
  (r.setAttribute("data-hud-hit", ""), i.push(M0(r, () => u$(s))));
  const l = z("span", "sf-hud__st-name", _e(Ar(s.role)), s.name);
  (l.style.setProperty("--role", Tf[s.role]), l.setAttribute("aria-label", z0(s)));
  const c = z("div", "sf-hud__st-por", Zh(t, e), a, l, o, r),
    f = z("span", "sf-num"),
    d = z("em", "sf-num"),
    h = z("span", "sf-num"),
    u = z(
      "div",
      "sf-hud__bar is-hp",
      z("i", "sf-hud__bar-trail"),
      z("i", "sf-hud__bar-fill"),
      z("i", "sf-hud__bar-shield"),
      z("i", "sf-hud__bar-ticks"),
      z("i", "sf-hud__bar-gloss"),
      z("span", "sf-hud__bar-text", f, d, h),
    ),
    m = z("span", "sf-hud__bar-text sf-num"),
    x = z("div", "sf-hud__bar is-mp", z("i", "sf-hud__bar-fill"), z("i", "sf-hud__bar-gloss"), m),
    p = z("div", "sf-hud__xp", z("i"));
  (p.setAttribute("data-hud-hit", ""),
    i.push(
      M0(p, () => {
        const N = n.me;
        return N.xpToNext > 0
          ? `<div class="sf-tip__title"><span>等级 ${N.level}</span><span class="sf-tip__meta sf-num">${Math.floor(N.xp)} / ${N.xpToNext}</span></div><div>获得经验可提升等级，技能会自动升级。</div>`
          : `<div class="sf-tip__title"><span>等级 ${N.level}</span><span class="sf-tip__meta">已满级</span></div>`;
      }),
    ));
  const y = [
      s.role === "mage"
        ? ["法强", (N) => Math.round(N.stats.ap), String]
        : ["物攻", (N) => Math.round(N.stats.ad), String],
      ["护甲", (N) => Math.round(N.stats.armor), String],
      ["魔抗", (N) => Math.round(N.stats.mr), String],
      ["移速", (N) => Math.round(N.stats.moveSpeed * 10) / 10, (N) => N.toFixed(1)],
    ],
    v = z("div", "sf-hud__st-stats");
  v.setAttribute("data-hud-hit", "");
  const _ = y.map(([N, , J]) => {
    const Z = z("b", "sf-num");
    return (v.appendChild(z("span", null, N, Z)), Vn(Z, J));
  });
  i.push(
    M0(v, () => {
      const N = n.me.stats,
        J = (ot) => `${Math.round(ot * 100)}%`,
        Z = [
          ["物攻", String(Math.round(N.ad))],
          ["法强", String(Math.round(N.ap))],
          ["护甲", String(Math.round(N.armor))],
          ["魔抗", String(Math.round(N.mr))],
          ["攻速", N.attackSpeed.toFixed(2)],
          ["移速", N.moveSpeed.toFixed(1)],
          ["冷却缩减", J(N.cdr)],
          ["吸血", J(N.lifesteal)],
          ["暴击", J(N.critChance)],
          ["暴击伤害", J(N.critDamage)],
          ["物穿", J(N.armorPen)],
          ["法穿", J(N.magicPen)],
          ["回血", `${N.hpRegen.toFixed(1)}/秒`],
          ["回蓝", `${N.manaRegen.toFixed(1)}/秒`],
          ["射程", N.attackRange.toFixed(1)],
          ["", ""],
        ];
      return `<div class="sf-tip__title"><span>${ks(z0(s))}</span><span class="sf-tip__meta">属性</span></div><div style="display:grid;grid-template-columns:auto auto auto auto;gap:1px 10px;margin-top:4px">${Z.map(([ot, j]) => `<span style="color:var(--sf-c-text-3)">${ot}</span><b class="sf-num" style="color:var(--sf-c-text);text-align:right">${j}</b>`).join("")}</div><div style="margin-top:5px;font-size:var(--sf-fs-xs);color:var(--sf-c-text-3)">冷却缩减上限 ${J(CG)}；吸血只对普攻生效。</div>`;
    }),
  );
  const k = z("div", "sf-hud__st-bars", v, u, x, p),
    M = z("div", "sf-hud__st-items"),
    S = [];
  for (let N = 0; N < n.me.items.length; N++) {
    const J = ro(null);
    (J.setAttribute("data-hud-hit", ""), M.appendChild(J), S.push({ el: J, id: null, off: null }));
  }
  const b = z("span", "sf-hud__st-shop-gold sf-num", "0"),
    w = z("button", "sf-hud__st-shop", z("span", "sf-hud__st-shop-ico", _e(Vt("shop"))), b);
  ((w.type = "button"),
    (w.tabIndex = -1),
    (w.dataset.sfSnd = "click"),
    w.setAttribute("aria-label", "金币 / 打开商店"),
    w.addEventListener("click", () => n.actions.toggleShop()));
  const T = Vn(b),
    E = z("div", "sf-hud__buffs"),
    A = new Map(),
    C = [],
    R = z("div", "sf-hud__status", E, c, k, M, w);
  R.setAttribute("data-hud-hit", "");
  const I = br(u, "--p"),
    P = br(u, "--s"),
    F = br(x, "--p"),
    L = br(p, "--p", 0.005),
    B = Vn(f),
    G = Vn(h, (N) => `/ ${N}`),
    q = Vn(d, (N) => (N > 0 ? `+${N}` : "")),
    et = vo(m),
    ct = Vn(o),
    rt = Vn(a),
    mt = is(R, "is-dead"),
    nt = is(u, "is-mid"),
    H = is(u, "is-low");
  let st = -1,
    tt = -1,
    it = -1,
    D = !1;
  function Q(N) {
    for (let J = 0; J < S.length; J++) {
      const Z = S[J],
        ot = N.items[J] ?? null;
      ot !== Z.id &&
        ((Z.id = ot),
        Z.off?.(),
        (Z.off = null),
        Z.el.classList.toggle("sf-slot--empty", ot === null),
        (Z.el.innerHTML = ot ? Po(ot) : ""),
        ot
          ? (Z.el.setAttribute("aria-label", ln[ot].name),
            (Z.off = M0(Z.el, () => fk(ln[ot]))),
            D && uo(Z.el, "is-new"))
          : (Z.el.removeAttribute("aria-label"), Z.el.classList.remove("is-new")));
    }
    D = !0;
  }
  function $(N) {
    const J = n.me.buffs.find((at) => at.id === N),
      Z = T3[N],
      ot =
        J && Number.isFinite(J.timeLeft)
          ? `${J.timeLeft >= 10 ? Math.ceil(J.timeLeft) : J.timeLeft.toFixed(1)} 秒`
          : "持续",
      j = J && J.stacks > 1 ? ` ×${J.stacks}` : "";
    return `<div class="sf-tip__title"><span>${ks(Z.name)}${j}</span><span class="sf-tip__meta sf-num">${ot}</span></div><div>${J ? ks(UB(J)) : ""}</div>`;
  }
  function ut(N) {
    C.length = 0;
    for (const J of N.buffs) {
      let Z = !1;
      for (let ot = 0; ot < C.length; ot++)
        if (C[ot].id === J.id) {
          (J.timeLeft > C[ot].timeLeft && (C[ot] = J), (Z = !0));
          break;
        }
      Z || C.push(J);
    }
    if (
      (C.length > 1 && C.sort((J, Z) => (Q4.get(J.id) ?? 0) - (Q4.get(Z.id) ?? 0)),
      C.length > J4 && (C.length = J4),
      A.size > 0)
    )
      for (const [J, Z] of A) {
        let ot = !1;
        for (const j of C) j.id === J && (ot = !0);
        ot || (Z.off(), Z.el.remove(), A.delete(J));
      }
    for (let J = 0; J < C.length; J++) {
      const Z = C[J];
      let ot = A.get(Z.id);
      if (!ot) {
        const j = T3[Z.id],
          at = z("i", "sf-hud__buff-cd"),
          Rt = z("b", "sf-hud__buff-n sf-num"),
          kt = z("span", `sf-hud__buff is-${j.kind}`);
        ((kt.innerHTML = lH(Z.id)), kt.append(at, Rt), kt.setAttribute("aria-label", j.name));
        const V = Z.id;
        ((ot = { el: kt, setT: br(kt, "--t", 1 / 90), setN: vo(Rt), off: M0(kt, () => $(V)) }),
          A.set(Z.id, ot));
        const U = E.children[J] ?? null;
        E.insertBefore(kt, U);
      }
      (ot.setT(
        Number.isFinite(Z.timeLeft) && Z.duration > 0 && Number.isFinite(Z.duration)
          ? Ef(Z.timeLeft / Z.duration)
          : 1,
      ),
        ot.setN(Z.stacks > 1 ? String(Z.stacks) : ""));
    }
  }
  return {
    el: R,
    update(N) {
      const J = N.me,
        Z = J.stats,
        ot = Math.max(0, J.shield),
        j = Math.max(1, Z.maxHp, J.hp + ot),
        at = J.alive ? Math.max(0, J.hp) : 0;
      (I(at / j), P(ot / j), B(Math.ceil(at)), G(Math.round(Z.maxHp)), q(Math.round(ot)));
      const Rt = at / Math.max(1, Z.maxHp);
      (H(Rt < 0.25), nt(Rt >= 0.25 && Rt < 0.5));
      const kt = Math.round(j);
      kt !== st && ((st = kt), u.style.setProperty("--seg", `${((1e3 / j) * 100).toFixed(3)}%`));
      const V = Math.round(Z.maxMana),
        U = Math.floor(Math.max(0, J.mana));
      (F(V > 0 ? U / V : 0),
        (U !== tt || V !== it) && ((tt = U), (it = V), et(`${U} / ${V}`)),
        L(J.xpToNext > 0 ? Ef(J.xp / J.xpToNext) : 1),
        ct(J.level),
        T(Math.floor(J.gold)),
        mt(!J.alive),
        J.alive || rt(Math.ceil(J.respawnIn)));
      for (let ht = 0; ht < y.length; ht++) _[ht](y[ht][1](J));
      (Q(J), ut(J));
    },
    handleEvent(N, J) {
      N.type === "levelUp" && N.unitId === J.state.playerId && uo(o, "is-up");
    },
    dispose() {
      for (const N of i) N();
      for (const N of S) N.off?.();
      for (const N of A.values()) N.off();
      A.clear();
    },
  };
}

const PG = Jn(`
/* ── 比分牌：贴着屏幕上沿的倒梯形，左蓝右红，中间垂下一块计时牌 ── */
.sf-hud__score { position: absolute; left: 50%; top: 0; z-index: 3; transform: translateX(-50%); padding-top: var(--sf-safe-t); filter: drop-shadow(0 4u 10u rgba(2, 4, 12, 0.55)); }
.sf-hud__score-plate {
  position: relative; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; width: 356u; height: 40u; padding: 0 22u;
  clip-path: polygon(0 0, 100% 0, calc(100% - 16u) 100%, 16u 100%);
  background:
    linear-gradient(90deg, rgba(232, 199, 122, 0), rgba(255, 231, 173, 0.9) 22%, rgba(255, 231, 173, 0.25) 42%, rgba(255, 231, 173, 0.25) 58%, rgba(255, 231, 173, 0.9) 78%, rgba(232, 199, 122, 0)) left bottom / 100% 1.5px no-repeat,
    linear-gradient(90deg, rgba(34, 104, 214, 0.62), rgba(9, 15, 36, 0.94) 36%, rgba(9, 15, 36, 0.94) 64%, rgba(196, 44, 58, 0.62));
}
/* 击杀数靠近计时牌：蓝侧「队名 塔 击杀」靠右排，红侧镜像 */
.sf-hud__score-side { display: flex; align-items: center; justify-content: flex-end; gap: 9u; min-width: 0; }
.sf-hud__score-side.is-red { flex-direction: row-reverse; }
/* 两位数击杀也要放得下：数字列留足宽度，且不允许被压缩 */
.sf-hud__score-kills { flex: none; font-size: max(20px, 28u); font-weight: 800; line-height: 1; text-shadow: 0 1px 0 rgba(2, 4, 12, 0.9), 0 0 10u currentColor; min-width: 1.35em; text-align: center; }
.is-blue > .sf-hud__score-kills { color: #8cc6ff; }
.is-red > .sf-hud__score-kills { color: #ff8d8d; }
.sf-hud__score-kills.is-bump { animation: sf-hud-bump 0.5s var(--sf-ease-spring); }
.sf-hud__score-towers { display: inline-flex; align-items: center; gap: 3u; font-size: var(--sf-fs-xs); font-weight: 700; color: var(--sf-c-text-2); line-height: 1; }
.sf-hud__score-towers .sf-i { width: 1.25em; height: 1.25em; vertical-align: 0; }
.is-blue > .sf-hud__score-towers .sf-i { color: #6cb6ff; }
.is-red > .sf-hud__score-towers .sf-i { color: #ff7a7a; }
.sf-hud__score-team { font-size: var(--sf-fs-xs); font-weight: 700; letter-spacing: 0.1em; color: var(--sf-c-text-3); line-height: 1; }

.sf-hud__score-mid { position: relative; width: 98u; height: 40u; }
/* 计时牌比两翼多垂下一截：外层金边 + 内层深底，用两层同形裁切叠出描边 */
.sf-hud__clock { position: absolute; left: 50%; top: 0; width: 104u; height: 54u; margin-left: -52u; }
.sf-hud__clock::before, .sf-hud__clock::after { content: ''; position: absolute; clip-path: polygon(0 0, 100% 0, 100% 68%, 50% 100%, 0 68%); }
.sf-hud__clock::before { inset: 0; background: linear-gradient(180deg, rgba(255, 231, 173, 0.25), #f3cf85 70%, #fff4d6); }
.sf-hud__clock::after { inset: 0 1.5px 1.5px; background: linear-gradient(180deg, #0c1530, #16254f 60%, #1c2f60); }
.sf-hud__clock-in { position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; align-items: center; padding-top: 5u; }
.sf-hud__time { font-size: max(15px, 19u); font-weight: 800; line-height: 1.1; color: var(--sf-c-gold-100); letter-spacing: 0.04em; }
.sf-hud__wave { display: inline-flex; align-items: center; gap: 3u; margin-top: 1u; font-size: max(10px, 10.5u); font-weight: 700; line-height: 1.2; color: var(--sf-c-cyan-300); }
.sf-hud__wave .sf-i { width: 1.05em; height: 1.05em; vertical-align: 0; }
.sf-hud__wave.is-soon { color: #fff4d6; animation: sf-hud-blink 0.5s steps(2, jump-none) infinite; }
@keyframes sf-hud-bump { 0% { transform: scale(1.7); filter: brightness(2); } 100% { transform: none; filter: none; } }
@keyframes sf-hud-blink { 50% { opacity: 0.45; } }

/* ── 右上角 ── */
.sf-hud__tr { position: absolute; right: var(--hud-r); top: var(--hud-t); z-index: 3; display: flex; align-items: center; gap: 6u; }
.sf-hud__kda { gap: 4u; }
.sf-hud__kda b { font-weight: 800; }
.sf-hud__kda .is-d { color: #ff8d8d; }
.sf-hud__kda .is-a { color: var(--sf-c-text-2); }
.sf-hud__kda i { font-style: normal; color: var(--sf-c-text-4); margin: 0 -1u; }
.sf-hud__kda-cs { display: inline-flex; align-items: center; gap: 4u; margin-left: 6u; padding-left: 8u; box-shadow: inset 1px 0 0 var(--sf-c-line-strong); color: var(--sf-c-text-2); }
.sf-hud__gold { color: var(--sf-c-gold-200); min-width: 76u; }
.sf-hud__gold.is-pop > b { animation: sf-hud-goldpop 0.45s var(--sf-ease-out); }
.sf-hud__gold > b { display: inline-block; font-weight: 800; transform-origin: left center; }
@keyframes sf-hud-goldpop { 0% { transform: scale(1.35); color: #fff; } 100% { transform: none; } }
.sf-hud__tr .sf-iconbtn { width: max(38px, 40u); height: max(38px, 40u); }
.sf-hud__tr .sf-hud__key { right: -4u; bottom: -8u; min-width: max(15px, 16u); height: max(14px, 15u); font-size: max(9px, 9.5u); }

/* 横屏逐级收紧：屏越窄，比分牌与右上角越挤（按两位数击杀、五位数金币的最坏情况留位置） */
/* ≤920px(主流手机横屏)：去掉队名与补兵 */
@media (orientation: landscape) and (max-width: 920px) {
  .sf-hud__score-plate { width: 300u; padding: 0 20u; }
  .sf-hud__score-team { display: none; }
  .sf-hud__kda-cs { display: none; }
  .sf-hud__gold { min-width: 0; }
  .sf-hud__tr { gap: 5u; }
}
/* ≤700px(小手机)：比分牌只留击杀与计时，右上角再压一压 */
@media (orientation: landscape) and (max-width: 700px) {
  .sf-hud__score-plate { width: 204u; padding: 0 14u; }
  .sf-hud__score-towers { display: none; }
  .sf-hud__kda > .sf-i { display: none; }
  .sf-hud__tr { gap: 4u; }
  .sf-hud__tr .sf-hud__chip { padding: 0 8u; }
}
/* ≤620px(568 宽一类的极小屏)：居中已经放不下，比分牌改为紧贴小地图右侧 */
@media (orientation: landscape) and (max-width: 620px) {
  .sf-hud { --hud-mini: 156u; }
  .sf-hud__score { left: calc(var(--hud-l) + var(--hud-mini) + 6u); transform: none; }
}
/* 竖屏：比分牌挪到小地图右侧，第二行放个人数据与按钮（宽度只有小地图右边那一截，数值牌用紧凑样式） */
@media (orientation: portrait) {
  .sf-hud__score { left: calc(var(--hud-l) + var(--hud-mini) + 8u); right: var(--hud-r); top: 0; transform: none; }
  .sf-hud__score-plate { width: auto; padding: 0 16u; }
  .sf-hud__score-team { display: none; }
  .sf-hud__tr { top: calc(var(--hud-t) + 56u); gap: 4u; }
  .sf-hud__tr .sf-hud__chip { height: max(27px, 31u); padding: 0 7u; gap: 4u; font-size: var(--sf-fs-xs); }
  .sf-hud__kda > .sf-i, .sf-hud__kda-cs { display: none; }
  .sf-hud__gold { min-width: 0; }
  .sf-hud__tr .sf-iconbtn { width: max(36px, 40u); height: max(36px, 40u); }
}
`);

function DG(n) {
  Zn("sf-hud-top", PG);
  const t = (q, et = "") => z("span", q, et),
    e = t("sf-hud__score-kills sf-num", "0"),
    s = t("sf-hud__score-kills sf-num", "0"),
    i = t("sf-num", "0"),
    a = t("sf-num", "0"),
    o = z("span", "sf-hud__score-towers", _e(Vt("tower")), i),
    r = z("span", "sf-hud__score-towers", _e(Vt("tower")), a);
  ((o.title = "我方已推掉的塔"), (r.title = "敌方已推掉的塔"));
  const l = t("sf-hud__time sf-num", "00:00"),
    c = t("sf-num", ""),
    f = z("span", "sf-hud__wave", _e(Vt("hourglass")), c);
  f.title = "下一波小兵";
  const d = z(
      "div",
      "sf-hud__score",
      z(
        "div",
        "sf-hud__score-plate",
        z("div", "sf-hud__score-side is-blue", t("sf-hud__score-team", "蓝"), o, e),
        z("div", "sf-hud__score-mid"),
        z("div", "sf-hud__score-side is-red", t("sf-hud__score-team", "红"), r, s),
      ),
      z("div", "sf-hud__clock", z("div", "sf-hud__clock-in", l, f)),
    ),
    h = z("b", "sf-num", "0"),
    u = z("b", "sf-num is-d", "0"),
    m = z("b", "sf-num is-a", "0"),
    x = z("b", "sf-num", "0"),
    p = z(
      "div",
      "sf-hud__chip sf-hud__kda",
      _e(Vt("kill")),
      h,
      z("i", null, "/"),
      u,
      z("i", null, "/"),
      m,
      z("span", "sf-hud__kda-cs", _e(Vt("cs")), x),
    );
  p.title = "击杀 / 阵亡 / 助攻 · 补兵";
  const g = z("b", "sf-num", "0"),
    y = z("div", "sf-hud__chip sf-hud__gold", _e(Vt("gold")), g);
  y.title = "金币";
  const v = T0({ icon: Vt("scoreboard"), label: "战况", onClick: () => n.actions.toggleScoreboard() });
  v.appendChild(z("span", "sf-hud__key", "Tab"));
  const _ = T0({ icon: Vt("pause"), label: "暂停 / 设置", onClick: () => n.actions.openSettings() });
  _.appendChild(z("span", "sf-hud__key", "Esc"));
  const k = z("div", "sf-hud__tr", p, y, v, _),
    M = Vn(e),
    S = Vn(s),
    b = Vn(i),
    w = Vn(a),
    T = Vn(l, gk),
    E = vo(c),
    A = Vn(h),
    C = Vn(u),
    R = Vn(m),
    I = Vn(x),
    P = Vn(g);
  let F = -1,
    L = -1,
    B = -1,
    G = !1;
  return {
    els: [d, k],
    update(q) {
      const et = q.state,
        ct = et.teams[q.team],
        rt = et.teams[q.team === 0 ? 1 : 0];
      (M(ct.kills),
        S(rt.kills),
        ct.kills !== F && (F >= 0 && uo(e, "is-bump"), (F = ct.kills)),
        rt.kills !== L && (L >= 0 && uo(s, "is-bump"), (L = rt.kills)),
        b(ct.towersDestroyed),
        w(rt.towersDestroyed),
        T(Math.floor(et.time)));
      const mt = Math.ceil(et.nextWaveIn);
      E(mt > 0 ? `${mt}秒` : "出兵");
      const nt = mt > 0 && mt <= 3;
      nt !== G && ((G = nt), f.classList.toggle("is-soon", nt));
      const H = q.me;
      (A(H.kills), C(H.deaths), R(H.assists), I(H.cs));
      const st = Math.floor(H.gold);
      (P(st), st !== B && (B >= 0 && st - B >= 15 && uo(y, "is-pop"), (B = st)));
    },
  };
}

const zG = 2,
  NG = Jn(`
/* 对局结束：收起操作类部件，把画面留给终局演出与结算页 */
.sf-hud__skills, .sf-hud__joy, .sf-hud__shopbar, .sf-hud__status { transition: opacity 0.5s linear; }
.sf-hud.is-over .sf-hud__skills, .sf-hud.is-over .sf-hud__joy, .sf-hud.is-over .sf-hud__shopbar, .sf-hud.is-over .sf-hud__status { opacity: 0; pointer-events: none; }
.sf-hud.is-over .sf-hud__skills *, .sf-hud.is-over .sf-hud__shopbar *, .sf-hud.is-over .sf-hud__status * { pointer-events: none; }
/* 宿主关闭了输入(加载页还盖着 / 提示层开着)：控件与战场都不接指针，暂停对话框除外 */
.sf-hud.is-locked .sf-hud__field, .sf-hud.is-locked button, .sf-hud.is-locked [data-hud-hit] { pointer-events: none; }
.sf-hud.is-locked .sf-dialog-scrim, .sf-hud.is-locked .sf-dialog-scrim button { pointer-events: auto; }
`);

function Z2(n) {
  for (const t of n.heroes) if (t.id === n.playerId) return t;
  return n.heroes[0];
}

function FG(n, t, e, s = {}) {
  (Hf(), N$(), c$(), Zn("sf-hud-index", NG));
  const i = s.input === "touch" || s.input === "kbm" ? s.input : null,
    a = z("div", "sf-root sf-hud");
  let o = null,
    r = !1;
  const l = {
      root: a,
      host: t,
      state: e,
      me: Z2(e),
      team: Z2(e).team,
      mode: E$(i),
      paused: !1,
      enabled: s.inputEnabled !== !1,
      now: performance.now() / 1e3,
      toast: (tt, it) => v.show(tt, it),
      inputBlocked: () => !l.enabled || !l.me.alive || l.paused || l.state.over,
      hero(tt) {
        for (const it of l.state.heroes) if (it.id === tt) return it;
      },
      unit(tt) {
        if (!(tt < 0)) {
          for (const it of l.state.units) if (it.id === tt) return it;
        }
      },
      actions: null,
    },
    c = z("div", "sf-hud__field"),
    f = mG(l),
    d = DG(l),
    h = fG(l),
    u = D$(),
    m = IG(l),
    x = p$(l),
    p = AG(l),
    g = bG(l),
    y = e$(l, { dimTarget: s.dimTarget ?? null, onDeathChange: s.onDeathChange }),
    v = i$(l),
    _ = a$(),
    k = o$(l),
    M = oG(l, { banner: u, minimap: f }),
    S = l$(l, M.replacesTips ? 0 : (s.tipsSeconds ?? 8));
  function b(tt) {
    if (!(tt === l.mode && a.classList.contains(`sf-hud--${tt}`))) {
      ((l.mode = tt),
        a.classList.toggle("sf-hud--touch", tt === "touch"),
        a.classList.toggle("sf-hud--kbm", tt === "kbm"));
      for (const it of A) it.onMode?.(tt);
    }
  }
  const w = {
    setShop(tt) {
      tt !== p.isOpen() &&
        ((tt && l.state.over) || (zi(), tt && (g.setOpen(!1, !1), T.cancelAim()), p.setOpen(tt)));
    },
    toggleShop: () => w.setShop(!p.isOpen()),
    isShopOpen: () => p.isOpen(),
    setScoreboard(tt, it) {
      (tt && it && p.setOpen(!1), g.setOpen(tt, it));
    },
    toggleScoreboard: () => w.setScoreboard(!g.isPinned(), !0),
    isScoreboardPinned: () => g.isPinned(),
    openSettings() {
      o ||
        r ||
        l.state.over ||
        (zi(),
        T.reset(),
        (l.paused = !0),
        t.setPaused(!0),
        (o = ny(a, {
          mode: "match",
          get: () => ({ ...t.getSettings(), autoBuy: l.me.autoBuy === !0 }),
          update: (tt) => {
            (tt.autoBuy !== void 0 && !l.state.over && t.command({ type: "autoBuy", enabled: tt.autoBuy }),
              t.updateSettings(tt));
          },
          autoBuyNote: () =>
            t.getSettings().autoBuy && l.me.autoBuy !== !0 && !l.state.over
              ? "卖了推荐装，本局已关闭。点一下重新打开。"
              : null,
          audio: t.audio,
          onReplayTutorial: () => M.restartGuide(),
          onQuit: () => t.quit(),
          onClose: () => {
            ((o = null), (l.paused = !1), r || t.setPaused(!1));
          },
        })));
    },
    buy(tt) {
      if (l.state.over) return !1;
      const it = M1(l.me, tt);
      return it.ok
        ? (t.command({ type: "buy", itemId: tt }),
          t.audio.ui("buy"),
          l.toast(`已购买 ${ln[tt].name}`, "good"),
          !0)
        : (t.audio.ui("error"), l.toast(Rk[it.block], "warn"), !1);
    },
    sell(tt) {
      const it = l.me.items[tt];
      !it ||
        l.state.over ||
        (t.command({ type: "sell", index: tt }),
        t.audio.ui("confirm"),
        l.toast(`已出售 ${ln[it].name}，返还 ${Ek(it)} 金币`, "info"));
    },
  };
  l.actions = w;
  const T = A$(l, { field: c, skills: x, forced: i, setMode: b });
  a.append(
    ...y.els.slice(0, 2),
    c,
    T.joystick,
    f.el,
    ...p.els.slice(0, 1),
    ...d.els,
    h.el,
    k.el,
    m.el,
    x.el,
    u.el,
    ...M.els,
    _.el,
    S.el,
    v.el,
    y.els[2],
    g.el,
    p.els[1],
  );
  const E = [
      ["minimap", f],
      ["topbar", d],
      ["feed", h],
      ["banner", u],
      ["coach", M],
      ["status", m],
      ["skills", x],
      ["shop", p],
      ["scoreboard", g],
      ["death", y],
      ["toasts", v],
      ["channel", _],
      ["fps", k],
      ["tips", S],
      ["input", T],
    ],
    A = E.map((tt) => tt[1]),
    C = A.filter((tt) => tt.update),
    R = A.filter((tt) => tt.handleEvent),
    I = A.filter((tt) => tt.afterEvents);
  let P = !1;
  const F = new Map(),
    L = (tt) => {
      let it = F.get(tt);
      return (
        it ||
          F.set(
            tt,
            (it = { calls: 0, total: 0, max: 0, slow: 0, evBatches: 0, evTotal: 0, evMax: 0, evCur: 0 }),
          ),
        it
      );
    };
  function B(tt) {
    for (let it = 0; it < C.length; it++) {
      const D = C[it],
        Q = performance.now();
      D.update(l, tt);
      const $ = performance.now() - Q,
        ut = L(D);
      (ut.calls++, (ut.total += $), $ > ut.max && (ut.max = $), $ > zG && ut.slow++);
    }
  }
  function G(tt) {
    for (let it = 0; it < R.length; it++) {
      const D = R[it],
        Q = performance.now();
      for (let $ = 0; $ < tt.length; $++) D.handleEvent(tt[$], l);
      L(D).evCur += performance.now() - Q;
    }
    for (let it = 0; it < I.length; it++) {
      const D = I[it],
        Q = performance.now();
      (D.afterEvents(l), (L(D).evCur += performance.now() - Q));
    }
    for (const it of F.values())
      it.evCur <= 0 ||
        (it.evBatches++,
        (it.evTotal += it.evCur),
        it.evCur > it.evMax && (it.evMax = it.evCur),
        (it.evCur = 0));
  }
  (b(l.mode), a.classList.toggle("is-locked", !l.enabled), n.appendChild(a));
  const q = qx(a, t.audio),
    et = () => {
      document.hidden && s.autoPause !== !1 && !l.state.over && w.openSettings();
    };
  document.addEventListener("visibilitychange", et);
  const ct = 0.4;
  let rt = -1 / 0,
    mt = "";
  function nt(tt) {
    if (!t.setOverlayAvoid || tt - rt < ct) return;
    rt = tt;
    const it = [],
      D = ($) => {
        if (!$) return;
        const ut = $.getBoundingClientRect();
        ut.width < 2 ||
          ut.height < 2 ||
          it.push({
            left: Math.round(ut.left),
            top: Math.round(ut.top),
            right: Math.round(ut.right),
            bottom: Math.round(ut.bottom),
          });
      };
    for (const $ of d.els) D($);
    if ((D(f.el), u.isShowing())) D(u.el.firstElementChild);
    else for (const $ of Array.from(M.els[M.els.length - 1].children)) D($);
    let Q = "";
    for (const $ of it) Q += `${$.left},${$.top},${$.right},${$.bottom};`;
    Q !== mt && ((mt = Q), t.setOverlayAvoid(it));
  }
  let H = !1;
  function st(tt) {
    ((l.state = tt), (l.me = Z2(tt)));
  }
  return {
    el: a,
    update(tt, it) {
      if (!r) {
        if (
          (st(tt),
          (l.now = performance.now() / 1e3),
          tt.over !== H &&
            ((H = tt.over),
            a.classList.toggle("is-over", H),
            H && (p.setOpen(!1), g.setOpen(!1, !1), T.reset())),
          P)
        )
          B(it);
        else for (let D = 0; D < C.length; D++) C[D].update(l, it);
        nt(l.now);
      }
    },
    handleEvents(tt, it) {
      if (!(r || tt.length === 0)) {
        if ((st(it), (l.now = performance.now() / 1e3), P)) {
          G(tt);
          return;
        }
        for (let D = 0; D < tt.length; D++) {
          const Q = tt[D];
          for (let $ = 0; $ < R.length; $++) R[$].handleEvent(Q, l);
        }
        for (let D = 0; D < I.length; D++) I[D].afterEvents(l);
      }
    },
    dispose() {
      if (!r) {
        ((r = !0), document.removeEventListener("visibilitychange", et), o?.close());
        for (const tt of A) tt.dispose?.();
        (q(), zi(), t.setAim(null), t.setCameraPeek(null), t.setOverlayAvoid?.(null), a.remove());
      }
    },
    setShopOpen: (tt) => w.setShop(tt),
    setScoreboardOpen: (tt) => w.setScoreboard(tt, !0),
    openSettings: () => w.openSettings(),
    announce(tt, it, D, Q) {
      u.demo({ type: "announce", key: tt, team: it, unitId: D, victimId: Q }, l);
    },
    getInputMode: () => l.mode,
    setInputEnabled(tt) {
      tt === l.enabled ||
        r ||
        ((l.enabled = tt), a.classList.toggle("is-locked", !tt), tt || (zi(), T.reset()));
    },
    setProfiling(tt) {
      ((P = tt), tt && F.clear());
    },
    coach: { restartGuide: () => M.restartGuide(), debug: () => M.debug() },
    getProfile() {
      const tt = [];
      for (const [it, D] of E) {
        const Q = F.get(D);
        Q &&
          tt.push({
            part: it,
            calls: Q.calls,
            avg: Q.calls > 0 ? Q.total / Q.calls : 0,
            max: Q.max,
            slow: Q.slow,
            evBatches: Q.evBatches,
            evAvg: Q.evBatches > 0 ? Q.evTotal / Q.evBatches : 0,
            evMax: Q.evMax,
          });
      }
      return tt.sort((it, D) => D.max - it.max);
    },
  };
}

const UG = 0.4;

function E0(n, t) {
  return Se[n].skills[t].castTime * UG;
}

function $a(n, t, e) {
  return Nh(Se[n].skills[t], e, 1);
}

function Ck(n, t) {
  const e = Se[n].skills[t].cast;
  return "range" in e ? e.range : 0;
}

function bi(n, t, e) {
  const s = Se[n].skills[t],
    i = s.cast;
  let a,
    o,
    r = 0;
  switch (i.type) {
    case "direction":
      ((a = "dir"), (o = i.range + i.width * 0.5));
      break;
    case "cone":
      ((a = "dir"), (o = i.range), (r = i.range));
      break;
    case "position":
      ((a = "pos"), (o = i.range + i.radius), (r = i.radius));
      break;
    case "target":
      ((a = "target"), (o = i.range));
      break;
    default:
      ((a = "none"), (o = i.radius), (r = i.radius));
      break;
  }
  return {
    heroId: n,
    slot: t,
    name: s.name,
    cast: i,
    param: a,
    reach: o,
    aoeRadius: r,
    autoAimsEnemy: !0,
    damage: null,
    cc: [],
    mobility: null,
    delay: 0,
    projectileSpeed: 0,
    blockedByMinions: !1,
    stopsAtFirstHero: !1,
    hitsNonHeroes: !0,
    duration: 0,
    lock: s.castTime,
    selfBuffs: [],
    immunity: null,
    dodgeable: !1,
    ...e,
  };
}

const ze = $a,
  k1 = Ck,
  d0 = (n, t, e = !1) => {
    const s = k1(n, t);
    return {
      kind: "dash",
      distance: s,
      duration: s / ze(n, t, "dashSpeed"),
      wallBlocked: !0,
      stopsAtHero: e,
      destination: "aim",
    };
  },
  Gi = (n, t = {}) => ({
    type: n,
    base: "damage",
    hits: 1,
    interval: 0,
    repeatRatio: 1,
    nonHeroRatio: 1,
    ...t,
  }),
  Oa = {
    panyue: {
      s1: bi("panyue", "s1", {
        roles: ["engage", "chase"],
        damage: Gi("physical", { ad: "adRatio" }),
        cc: [{ kind: "knockup", duration: ze("panyue", "s1", "knockup"), value: 0 }],
        mobility: d0("panyue", "s1", !0),
        lock: d0("panyue", "s1").duration,
        reach: k1("panyue", "s1") + ze("panyue", "s1", "impactRadius"),
        aoeRadius: ze("panyue", "s1", "impactRadius"),
        dodgeable: !0,
      }),
      s2: bi("panyue", "s2", {
        roles: ["defense", "engage"],
        damage: Gi("magic"),
        cc: [{ kind: "slow", duration: ze("panyue", "s2", "slowDur"), value: ze("panyue", "s2", "slow") }],
        duration: ze("panyue", "s2", "duration"),
        selfBuffs: ["shield", "panyue_bulwark"],
      }),
      ult: bi("panyue", "ult", {
        roles: ["engage", "zone"],
        damage: Gi("physical", { hp: "hpRatio" }),
        cc: [
          { kind: "knockup", duration: ze("panyue", "ult", "knockup"), value: 0 },
          { kind: "slow", duration: ze("panyue", "ult", "zoneDur"), value: ze("panyue", "ult", "slow") },
        ],
        mobility: {
          kind: "leap",
          distance: k1("panyue", "ult"),
          duration: ze("panyue", "ult", "leapTime"),
          wallBlocked: !1,
          stopsAtHero: !1,
          destination: "aim",
        },
        delay: ze("panyue", "ult", "leapTime"),
        duration: ze("panyue", "ult", "zoneDur"),
        lock: ze("panyue", "ult", "leapTime"),
        immunity: "unstoppable",
        dodgeable: !0,
      }),
    },
    chijin: {
      s1: bi("chijin", "s1", {
        roles: ["burst", "waveclear"],
        damage: Gi("physical", { ad: "adRatio" }),
        cc: [{ kind: "slow", duration: ze("chijin", "s1", "slowDur"), value: ze("chijin", "s1", "slow") }],
        delay: E0("chijin", "s1"),
      }),
      s2: bi("chijin", "s2", {
        roles: ["chase", "escape", "steroid"],
        damage: Gi("physical", { ad: "adRatio" }),
        mobility: d0("chijin", "s2"),
        lock: d0("chijin", "s2").duration,
        duration: ze("chijin", "s2", "asDur"),
        selfBuffs: ["chijin_blaze"],
      }),
      ult: bi("chijin", "ult", {
        roles: ["burst", "zone", "waveclear"],
        damage: Gi("physical", {
          ad: "adRatio",
          hits: Math.round(ze("chijin", "ult", "duration") / ze("chijin", "ult", "tick")),
          interval: ze("chijin", "ult", "tick"),
        }),
        delay: Se.chijin.skills.ult.castTime,
        duration: ze("chijin", "ult", "duration"),
        lock: 0,
        selfBuffs: ["chijin_spin", "dmg_reduction"],
        dodgeable: !0,
      }),
    },
    xingli: {
      s1: bi("xingli", "s1", {
        roles: ["poke", "waveclear"],
        damage: Gi("magic", { ap: "apRatio" }),
        delay: E0("xingli", "s1"),
        projectileSpeed: ze("xingli", "s1", "speed"),
        dodgeable: !0,
      }),
      s2: bi("xingli", "s2", {
        roles: ["engage", "zone", "waveclear"],
        damage: Gi("magic", { ap: "apRatio" }),
        cc: [
          { kind: "pull", duration: 0, value: ze("xingli", "s2", "pull") },
          { kind: "slow", duration: ze("xingli", "s2", "slowDur"), value: ze("xingli", "s2", "slow") },
        ],
        delay: ze("xingli", "s2", "delay"),
        dodgeable: !0,
      }),
      ult: bi("xingli", "ult", {
        roles: ["burst", "zone", "waveclear"],
        damage: Gi("magic", {
          ap: "apRatio",
          hits: ze("xingli", "ult", "waves"),
          interval: ze("xingli", "ult", "duration") / ze("xingli", "ult", "waves"),
        }),
        cc: [
          { kind: "slow", duration: ze("xingli", "ult", "slowDur"), value: ze("xingli", "ult", "slow") },
          { kind: "stun", duration: Se.xingli.passive.values.stun, value: 0 },
        ],
        delay: ze("xingli", "ult", "delay"),
        duration: ze("xingli", "ult", "duration"),
        dodgeable: !0,
      }),
    },
    fengling: {
      s1: bi("fengling", "s1", {
        roles: ["poke", "waveclear"],
        damage: Gi("physical", { ad: "adRatio", nonHeroRatio: ze("fengling", "s1", "minionRatio") }),
        cc: [
          { kind: "slow", duration: ze("fengling", "s1", "slowDur"), value: ze("fengling", "s1", "slow") },
        ],
        delay: E0("fengling", "s1"),
        projectileSpeed: ze("fengling", "s1", "speed"),
        stopsAtFirstHero: !0,
        dodgeable: !0,
      }),
      s2: bi("fengling", "s2", {
        roles: ["escape", "steroid"],
        autoAimsEnemy: !1,
        mobility: d0("fengling", "s2"),
        lock: d0("fengling", "s2").duration,
        duration: ze("fengling", "s2", "critWindow"),
        hitsNonHeroes: !1,
        selfBuffs: ["haste", "fengling_crit"],
      }),
      ult: bi("fengling", "ult", {
        roles: ["zone", "waveclear", "burst"],
        damage: Gi("physical", {
          ad: "adRatio",
          hits: Math.round(ze("fengling", "ult", "duration") / ze("fengling", "ult", "tick")),
          interval: ze("fengling", "ult", "tick"),
        }),
        cc: [
          { kind: "slow", duration: ze("fengling", "ult", "slowDur"), value: ze("fengling", "ult", "slow") },
        ],
        delay: ze("fengling", "ult", "delay"),
        duration: ze("fengling", "ult", "duration"),
        dodgeable: !0,
      }),
    },
    yeque: {
      s1: bi("yeque", "s1", {
        roles: ["chase", "burst", "escape", "waveclear"],
        damage: Gi("physical", { ad: "adRatio" }),
        mobility: d0("yeque", "s1"),
        lock: d0("yeque", "s1").duration,
      }),
      s2: bi("yeque", "s2", {
        roles: ["poke", "burst", "waveclear"],
        damage: Gi("physical", {
          ad: "adRatio",
          hits: ze("yeque", "s2", "blades"),
          repeatRatio: ze("yeque", "s2", "repeatRatio"),
        }),
        cc: [{ kind: "slow", duration: ze("yeque", "s2", "slowDur"), value: ze("yeque", "s2", "slow") }],
        delay: E0("yeque", "s2"),
        projectileSpeed: ze("yeque", "s2", "speed"),
        blockedByMinions: !0,
        stopsAtFirstHero: !0,
        dodgeable: !0,
      }),
      ult: bi("yeque", "ult", {
        roles: ["execute", "chase", "burst"],
        damage: Gi("physical", { ad: "adRatio", missing: "missingRatio" }),
        mobility: {
          kind: "blink",
          distance: k1("yeque", "ult"),
          duration: ze("yeque", "ult", "vanish"),
          wallBlocked: !1,
          stopsAtHero: !1,
          destination: "behindTarget",
        },
        delay: ze("yeque", "ult", "vanish"),
        lock: ze("yeque", "ult", "vanish"),
        hitsNonHeroes: !1,
        immunity: "untargetable",
      }),
    },
    mushroom: {
      s1: bi("mushroom", "s1", {
        roles: ["engage", "chase"],
        damage: Gi("physical", { hp: "hpRatio" }),
        cc: [{ kind: "knockup", duration: ze("mushroom", "s1", "knockup"), value: 0 }],
        mobility: {
          kind: "dash",
          distance: 24,
          duration: ze("mushroom", "s1", "rollTime"),
          wallBlocked: !0,
          stopsAtHero: !1,
          destination: "aim",
        },
        lock: 0,
        reach: 9 + ze("mushroom", "s1", "impactRadius"),
        aoeRadius: ze("mushroom", "s1", "impactRadius"),
        dodgeable: !0,
      }),
      s2: bi("mushroom", "s2", {
        roles: ["poke", "waveclear", "slow"],
        damage: Gi("magic", { ap: "apRatio" }),
        cc: [{ kind: "slow", duration: ze("mushroom", "s2", "slowDur"), value: ze("mushroom", "s2", "slow") }],
        delay: E0("mushroom", "s2"),
      }),
      ult: bi("mushroom", "ult", {
        roles: ["engage", "zone"],
        damage: Gi("magic", { hp: "hpRatio" }),
        cc: [{ kind: "knockup", duration: ze("mushroom", "ult", "knockup"), value: 0 }],
        mobility: {
          kind: "leap",
          distance: k1("mushroom", "ult"),
          duration: ze("mushroom", "ult", "leapTime"),
          wallBlocked: !1,
          stopsAtHero: !1,
          destination: "aim",
        },
        delay: ze("mushroom", "ult", "warnTime") + ze("mushroom", "ult", "leapTime"),
        lock: ze("mushroom", "ult", "warnTime") + ze("mushroom", "ult", "leapTime"),
        immunity: "unstoppable",
        dodgeable: !0,
      }),
    },
    niumo: {
      s1: bi("niumo", "s1", {
        roles: ["waveclear", "poke"],
        damage: Gi("physical", { ad: "adRatio" }),
        duration: ze("niumo", "s1", "trailDur"),
      }),
      s2: bi("niumo", "s2", {
        // 站定喷火：没有位移了，别让 AI 当突进用（会站着被白打）
        roles: ["waveclear", "poke"],
        damage: Gi("magic", { base: "sprayDmg", ad: "sprayAd" }),
        duration: ze("niumo", "s2", "duration"),
        delay: E0("niumo", "s2"),
        lock: 0,
        immunity: "unstoppable",
        dodgeable: !0,
      }),
      ult: bi("niumo", "ult", {
        roles: ["buff", "zone"],
        damage: Gi("magic", { base: "perStack", ad: "adRatio" }),
        duration: ze("niumo", "ult", "duration"),
        immunity: "unstoppable",
      }),
    },
  };

kr.flatMap((n) => [Oa[n].s1, Oa[n].s2, Oa[n].ult]);

const OG = {
    panyue: ["ult", "s1", "s2"],
    chijin: ["s2", "ult", "s1"],
    xingli: ["s2", "ult", "s1"],
    fengling: ["s1", "ult", "s2"],
    yeque: ["s2", "s1", "ult"],
    mushroom: ["ult", "s1", "s2"],
    niumo: ["ult", "s1", "s2"],
  },
  BG = {
    telegraph: "incoming",
    xingli_s2_well: "incoming",
    chijin_ult_spin: "damage",
    niumo_trail: "damage",
    xingli_ult_storm: "damage",
    fengling_ult_rain: "damage",
    panyue_ult_fissure: "slow",
    panyue_s2_aura: "none",
    fountain_zone: "none",
  };

function Lk(n) {
  let t = 1;
  for (const e of n.buffs) e.id === "dmg_reduction" && (t *= 1 - Math.min(1, Math.max(0, e.value)));
  return t < 1 ? Math.max(0.2, t) : 1;
}

function Ik(n, t, e, s) {
  if (t === "true") return n;
  const i = t === "physical" ? s.stats.armor * (1 - e.stats.armorPen) : s.stats.mr * (1 - e.stats.magicPen);
  return (n * 600) / (600 + Math.max(0, i));
}

function Pk(n, t, e, s) {
  const i = Oa[n.heroId][t].damage,
    a = n.skills[t].level;
  if (!i || a <= 0) return 0;
  const o = Se[n.heroId].skills[t],
    r = (f) => (f ? Nh(o, f, a) : 0);
  let l = r(i.base) + r(i.ad) * n.stats.ad + r(i.ap) * n.stats.ap + r(i.hp) * n.stats.maxHp;
  (e && i.missing && (l += r(i.missing) * Math.max(0, e.stats.maxHp - e.hp)),
    e && e.kind !== "hero" && (l *= i.nonHeroRatio));
  const c = Math.max(0, Math.min(i.hits, s ?? i.hits));
  return c <= 0 ? 0 : l * (1 + (c - 1) * i.repeatRatio);
}

function Dk(n, t) {
  if (n.heroId !== "yeque" || t.kind === "tower" || t.kind === "core") return 1;
  const e = Se.yeque.passive.values;
  let s = 1;
  return (
    t.hp < t.stats.maxHp * e.threshold && (s *= 1 + e.bonus),
    t.kind === "monster" && (s *= 1 + e.monsterBonus),
    s
  );
}

function Nm(n, t, e, s) {
  const i = Oa[n.heroId][t].damage;
  if (!i) return 0;
  const a = Pk(n, t, e, s) * Dk(n, e) * Lk(e);
  return Ik(a, i.type, n, e);
}

function S1(n, t) {
  const e = n.stats,
    s = n.kind === "hero" ? Se[n.heroId].basicAttack.damageType : "physical",
    i = t.kind === "tower" || t.kind === "core" ? 0 : e.critChance;
  let a = e.ad * (1 + i * (e.critDamage - 1)) * Lk(t);
  return (n.kind === "hero" && (a *= Dk(n, t)), Ik(a, s, n, t));
}

function t6(n, t, e = OG[n.heroId]) {
  let s = n.mana,
    i = 0;
  for (const a of e) {
    const o = n.skills[a];
    o.level <= 0 || o.cd > 0 || s < o.cost || ((s -= o.cost), (i += Nm(n, a, t)));
  }
  return i;
}

const HG = 0.9,
  $G = 1.4,
  GG = 0.35;
export { FG, E0, $a, Ck, Oa, BG, Pk, Nm, S1, t6, HG, $G, GG };
