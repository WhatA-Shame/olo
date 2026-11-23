// 38-ui-6.js — ui｜21 个顶层语句｜55KB
// 对应 game.pretty.js 第 71632–73219 行
// 关键内容：
//   X$                    血量危险：先后撤，按 B 回城
//   sy                    push_lane
//   Y$                    group
//   I3                    移动
//   kk                    text
//   q4                    小贴士
//
// 由 tools/split.mjs 自动生成；手改后若重新生成会被覆盖。
import { rn } from './01-audio.js';
import { Se } from './02-data.js';
import { Jn, Qe, Zn, _e, jx, z } from './32-ui.js';
import { Pl, _3, v1 } from './33-data-2.js';
import { Vt } from './34-ui-2.js';
import { E3, Xc } from './35-ui-3.js';
import { Dl, Na, Rl } from './36-ui-4.js';
import { $$, $4, B$, G$, G2, G4, H$, Id, L3, Mk, Pd, Q1, Rc, W$, Wi, Xd, Yp, j$, q$, qd, wk } from './37-ui-5.js';

function X$(n, t, e, s) {
  const i = wk,
    a = n.time,
    o = n.map;
  for (const c of o.camps) {
    if (!rn[c.monsterType].epic) continue;
    const f = Yp(n, c.id);
    f && f.alive
      ? s.epicSince.has(c.id) || s.epicSince.set(c.id, a)
      : (s.epicSince.delete(c.id), s.epicHelpAt.delete(c.id));
  }
  const r = l();
  return (
    s.lastId === "epic_soon" &&
      r &&
      r.id !== "epic_soon" &&
      r.priority > 3.5 &&
      s.lastKey.startsWith("epic_soon:") &&
      s.epicSoonOff.add(Number(s.lastKey.slice(10))),
    (s.lastId = r ? r.id : null),
    (s.lastKey = r ? r.key : ""),
    r
  );
  function l() {
    if (!t.alive || n.over) return null;
    const c = s.lastId,
      f = W$(n, t),
      d = t.team,
      h = d === 0 ? 1 : 0,
      u = t.hp / Math.max(1, t.stats.maxHp);
    if (u < i.retreatHp[c === "retreat" ? 1 : 0] && !Pd(t, "fountain") && !Pd(t, "recall"))
      return {
        id: "retreat",
        priority: 1,
        key: "retreat",
        tone: "warn",
        text: e === "kbm" ? "血量危险：先后撤，按 B 回城" : "血量危险：先后撤，点「回城」",
      };
    if (Pd(t, "tower_focus")) {
      let p = null,
        g = 1 / 0;
      for (const y of f.foeTowers) {
        const v = Wi(y.pos, t.pos);
        v < g && ((g = v), (p = y));
      }
      if (
        (f.foeCore && Wi(f.foeCore.pos, t.pos) < g && (p = f.foeCore),
        p && j$(t, p, i.aggroPad[c === "tower_aggro" ? 1 : 0]) && !Q1(p, f.myMinions))
      )
        return {
          id: "tower_aggro",
          priority: 2,
          key: "tower_aggro",
          tone: "warn",
          text: "塔在打你，塔下没有小兵，先退出来",
        };
    }
    {
      let p = null;
      const g = (v) => {
        if (p || a - v.lastHitTime >= i.defendRecent) return;
        const _ = i.defendRadius * i.defendRadius;
        for (const k of n.heroes)
          if (!(k.team === d || !k.alive || !k.visible[d]) && Wi(k.pos, v.pos) <= _) {
            p = v;
            return;
          }
      };
      f.myCore && g(f.myCore);
      for (const v of f.myTowers) v.tier === 3 && g(v);
      const y = p;
      if (y)
        return y.kind === "core"
          ? {
              id: "defend",
              priority: 3,
              key: "defend:core",
              tone: "warn",
              text: "敌人在打我方水晶，快回防！",
              pos: y.pos,
            }
          : {
              id: "defend",
              priority: 3,
              key: `defend:${y.lane}`,
              tone: "warn",
              text: `敌人在拆我方${Pl(y.lane, 3)}，回防！`,
              pos: y.pos,
            };
    }
    if (Pd(t, "recall"))
      return {
        id: "heal_up",
        priority: 3.5,
        key: "heal_up",
        tone: "info",
        text: "回城中：原地别动，回泉水补满再出发",
      };
    if (Pd(t, "fountain") && u < i.fountainHp)
      return { id: "heal_up", priority: 3.5, key: "heal_up", tone: "info", text: "在泉水里补满状态再出发" };
    if (f.foeCore && !f.foeCore.invulnerable) {
      let p = null,
        g = 1 / 0;
      for (const v of Xd) {
        if (f.foeTowers.some((M) => M.lane === v && M.tier === 3)) continue;
        const _ = L3(n, h, v, 3),
          k = _ ? Wi(_, t.pos) : 1 / 0;
        (k < g || p === null) && ((g = k), (p = v));
      }
      if (c === "end_it" && s.lastKey.startsWith("end_it:")) {
        const v = s.lastKey.slice(7);
        Xd.indexOf(v) >= 0 && !f.foeTowers.some((_) => _.lane === v && _.tier === 3) && (p = v);
      }
      const y = p ? `敌方${v1[p]}高地已破` : "敌方高地已破";
      return {
        id: "end_it",
        priority: 4,
        key: `end_it:${p ?? ""}`,
        tone: "go",
        text: `${y}：跟着小兵去打水晶！`,
        pos: f.foeCore.pos,
      };
    }
    {
      let p = 0;
      for (const g of n.heroes) g.team !== d && g.alive && p++;
      if (p <= 1)
        return { id: "numbers", priority: 6, key: "numbers", tone: "go", text: "敌方大部分阵亡，抓紧推塔！" };
    }
    {
      const p = i.pushNowDist[c === "push_now" ? 1 : 0],
        g = c === "push_now" ? 2 : 0;
      for (const y of f.foeTowers)
        if (!(y.invulnerable || Wi(y.pos, t.pos) > p * p) && Q1(y, f.myMinions, g))
          return (
            (s.pushLane = y.lane),
            { id: "push_now", priority: 5, key: G4(y), tone: "go", text: "小兵进塔了，快打塔！", pos: y.pos }
          );
    }
    {
      let p = null,
        g = !1,
        y = 1 / 0;
      for (const v of o.camps) {
        const _ = s.epicSince.get(v.id);
        if (_ === void 0) continue;
        const k = Id(v.pos, t.pos),
          M = c === "epic_up" && s.lastKey === `epic_up:${v.id}:help`;
        let S = q$(n, t, v, i.epicMates[M ? 1 : 0], M ? 1 : i.epicHurt);
        S
          ? s.epicHelpAt.set(v.id, a)
          : M && a - (s.epicHelpAt.get(v.id) ?? -1 / 0) <= i.epicHelpLinger && (S = !0);
        const b = i.epicNear[c === "epic_up" && s.lastKey === `epic_up:${v.id}` ? 1 : 0],
          w = !s.epicTold.has(v.id) && a - _ < i.epicFresh;
        (!w && a - _ >= i.epicFresh && s.epicTold.add(v.id),
          !(!S && !w && k > b) && ((S && !g) || (S === g && k < y)) && ((y = k), (p = v), (g = S)));
      }
      if (p) {
        const v = rn[p.monsterType].name,
          _ = _3(p.pos);
        return g
          ? {
              id: "epic_up",
              priority: 7,
              key: `epic_up:${p.id}:help`,
              tone: "go",
              text: `队友在打${v}(${_})，过去帮忙`,
              pos: p.pos,
            }
          : {
              id: "epic_up",
              priority: 7,
              key: `epic_up:${p.id}`,
              tone: "info",
              text: `${v}已刷新(${_})：一个人打不过，等队友去了再跟上`,
            };
      }
    }
    {
      let p = null,
        g = 1 / 0;
      for (const y of o.camps) {
        if (!rn[y.monsterType].epic) continue;
        const v = Yp(n, y.id);
        if (!v || v.alive || v.respawnIn <= 0 || v.respawnIn > i.epicSoon) {
          s.epicSoonOff.delete(y.id);
          continue;
        }
        s.epicSoonOff.has(y.id) || (v.respawnIn < g && ((g = v.respawnIn), (p = y)));
      }
      if (p)
        return {
          id: "epic_soon",
          priority: 8,
          key: `epic_soon:${p.id}`,
          tone: "info",
          text: `${rn[p.monsterType].name} ${Math.ceil(g)} 秒后刷新(${_3(p.pos)})`,
          pos: p.pos,
        };
    }
    const m = t.lane === "jungle",
      x = t.lane === "jungle" ? "mid" : t.lane;
    if (n.wave === 0) {
      const p = Math.max(1, Math.ceil(n.nextWaveIn));
      if (m) {
        const y = Mk(n, t);
        if (y)
          return {
            id: "spawn_wait",
            priority: 9,
            key: "spawn_wait",
            tone: "info",
            text: `小兵 ${p} 秒后出发，你是打野：先去${rn[y.monsterType].name}那儿等着`,
            pos: y.pos,
          };
      }
      const g = L3(n, d, x);
      return {
        id: "spawn_wait",
        priority: 9,
        key: "spawn_wait",
        tone: "info",
        text: `小兵 ${p} 秒后出发，先去${Pl(x, 1)}等着`,
        pos: g ?? void 0,
      };
    }
    if (m && a < G2) {
      let p = null,
        g = 1 / 0,
        y = null,
        v = 1 / 0;
      for (const _ of o.camps) {
        if (_.side !== d) continue;
        const k = Yp(n, _.id);
        if (k) {
          if (k.alive) {
            const M = Id(_.pos, t.pos) - (s.lastKey === `jungle:${_.id}` ? 6 : 0);
            M < g && ((g = M), (p = _));
          } else if (k.respawnIn > 0 && k.respawnIn <= 30 && rn[_.monsterType].alias) {
            const M = Id(_.pos, t.pos) - (s.lastKey === `jungle_wait:${_.id}` ? 6 : 0);
            M < v && ((v = M), (y = _));
          }
        }
      }
      if (p)
        return {
          id: "jungle",
          priority: 10,
          key: `jungle:${p.id}`,
          tone: "info",
          text: `打野怪升级：去打${$4(p)}`,
          pos: p.pos,
        };
      if (y) {
        const _ = Yp(n, y.id);
        return {
          id: "jungle",
          priority: 10,
          key: `jungle_wait:${y.id}`,
          tone: "info",
          text: `野怪 ${Math.max(1, Math.ceil(_ ? _.respawnIn : 1))} 秒后刷新，先去${$4(y)}营地等着`,
          pos: y.pos,
        };
      }
    }
    if (a >= $$) {
      let p = null,
        g = null,
        y = 1 / 0,
        v = 1 / 0;
      for (const _ of n.heroes) {
        if (_.team !== d || _.id === t.id || !_.alive) continue;
        const k = Wi(_.pos, t.pos);
        k < y ? ((g = p), (v = y), (p = _), (y = k)) : k < v && ((g = _), (v = k));
      }
      if (p && g) {
        const _ = { x: (p.pos.x + g.pos.x) / 2, y: (p.pos.y + g.pos.y) / 2 };
        if (Id(_, t.pos) > i.groupDist[c === "group" ? 1 : 0]) {
          let k = G$(n, _);
          const M = s.groupLane !== null && a - s.groupAt <= i.groupForget ? s.groupLane : null;
          return (
            M !== null && M !== k
              ? qd(_, o.lanes[M]) - qd(_, o.lanes[k]) < 6
                ? ((k = M), (s.groupCand = null))
                : (s.groupCand !== k && ((s.groupCand = k), (s.groupCandSince = a)),
                  a - s.groupCandSince < i.groupSwitch ? (k = M) : (s.groupCand = null))
              : (s.groupCand = null),
            (s.groupLane = k),
            (s.groupAt = a),
            Rc(f, k) && (s.pushLane = k),
            {
              id: "group",
              priority: 11,
              key: `group:${k}`,
              tone: "info",
              text: `队友在${v1[k]}集合，过去一起推`,
              pos: _,
            }
          );
        }
      }
    }
    if (a < G2 && !m && qd(t.pos, o.lanes[x]) > i.backDist[c === "back_to_lane" ? 1 : 0]) {
      const g = o.bases[h].core;
      let y = null,
        v = 1 / 0;
      for (const _ of f.myMinions) {
        if (_.lane !== x) continue;
        const k = Wi(_.pos, g);
        k < v && ((v = k), (y = _.pos));
      }
      if (!y)
        for (const _ of f.myTowers) {
          if (_.lane !== x) continue;
          const k = Wi(_.pos, g);
          k < v && ((v = k), (y = _.pos));
        }
      return {
        id: "back_to_lane",
        priority: 12,
        key: "back_to_lane",
        tone: "info",
        text: `回到${v1[x]}，跟着小兵打`,
        pos: y ?? void 0,
      };
    }
    if (a < i.farmUntil) {
      const p = i.farmDist[c === "lane_farm" ? 1 : 0];
      for (const g of f.foeMinions)
        if (Wi(g.pos, t.pos) <= p * p) {
          s.farmSeenAt = a;
          break;
        }
      if (a - s.farmSeenAt <= (c === "lane_farm" ? i.farmLinger : 0))
        return {
          id: "lane_farm",
          priority: 13,
          key: "lane_farm",
          tone: "info",
          text: "补兵赚钱：给小兵最后一击",
        };
    }
    {
      let p = null;
      if (a < G2 && Rc(f, x)) p = x;
      else {
        const y = s.pushLane && Rc(f, s.pushLane) ? s.pushLane : null;
        let v = 10;
        for (const _ of Xd) {
          if (!Rc(f, _)) continue;
          const k = qd(t.pos, o.lanes[_]) - (_ === y ? 4 : 0);
          k < v && ((v = k), (p = _));
        }
        if ((p || (p = y), !p)) {
          v = 1 / 0;
          for (const _ of Xd) {
            const k = Rc(f, _);
            if (!k) continue;
            const M = Id(k.pos, t.pos) - (_ === x ? 20 : 0);
            M < v && ((v = M), (p = _));
          }
        }
      }
      const g = p ? Rc(f, p) : null;
      return p && g
        ? ((s.pushLane = p),
          {
            id: "push_lane",
            priority: 14,
            key: G4(g),
            tone: "info",
            text: `跟着小兵，推掉敌方${Pl(p, g.tier)}`,
            pos: g.pos,
          })
        : {
            id: "push_lane",
            priority: 14,
            key: "push_lane:core",
            tone: "info",
            text: "跟着小兵，去打敌方水晶",
            pos: o.bases[h].core,
          };
    }
  }
}

const sy = { interval: 0.5, confirm: 1, minHold: 4, warnLinger: 1.5, groupHold: 8 },
  V4 = (n) => n.priority <= 3,
  W4 = (n) => n.id === "push_lane" || n.id === "push_now";

function Y$(n, t) {
  const e = sy;
  return (n.id === "group" && W4(t)) || (W4(n) && t.id === "group") ? e.groupHold : e.minHold;
}

class K$ {
  current = null;
  since = -1 / 0;
  pendingKey = "";
  pendingSince = 0;
  warnGoneAt = -1;
  reset() {
    ((this.current = null), (this.since = -1 / 0), (this.pendingKey = ""), (this.warnGoneAt = -1));
  }
  feed(t, e) {
    const s = sy,
      i = this.current;
    if (!t) {
      const a = i !== null;
      return (this.reset(), a);
    }
    return i
      ? t.key === i.key
        ? ((this.current = t), (this.pendingKey = ""), (this.warnGoneAt = -1), !1)
        : V4(t)
          ? this.adopt(t, e)
          : V4(i)
            ? (this.warnGoneAt < 0 && (this.warnGoneAt = e),
              e - this.warnGoneAt >= s.warnLinger - 1e-6 ? this.adopt(t, e) : !1)
            : (this.pendingKey !== t.key && ((this.pendingKey = t.key), (this.pendingSince = e)),
              e - this.pendingSince >= s.confirm - 1e-6 && e - this.since >= Y$(i, t) - 1e-6
                ? this.adopt(t, e)
                : !1)
      : this.adopt(t, e);
  }
  feedHidden(t, e) {
    const s = this.current;
    return !t || !s || t.key === s.key ? this.feed(t, e) : this.adopt(t, e);
  }
  adopt(t, e) {
    return ((this.current = t), (this.since = e), (this.pendingKey = ""), (this.warnGoneAt = -1), !0);
  }
}

const I3 = ["移动", "普攻补兵", "放技能", "回城与出装", "推塔", "获胜"],
  V2 = ["move", "go", "attack", "lasthit", "skill", "recall", "shop", "push", "win"],
  j4 = { move: 1, go: 1, attack: 2, lasthit: 2, skill: 3, recall: 4, shop: 4, push: 5, win: 6 },
  ai = {
    startAt: 2,
    moveDist: 8,
    moveTimeout: 30,
    goDist: 12,
    goTimeout: 60,
    nearEnemy: 14,
    attackReach: 6,
    attackWait: 90,
    attackTimeout: 45,
    lastHits: 2,
    monsterKills: 1,
    lasthitTimeout: 60,
    skillTimeout: 40,
    recallHp: 0.4,
    recallHpHold: 1.5,
    recallHpOk: 0.6,
    recallAfter: 60,
    recallTimeout: 45,
    shopTimeout: 12,
    pushDist: 22,
    pushAt: 240,
    pushLinger: 20,
    pushTimeout: 40,
    winShow: 8,
    outroShow: 3,
    checkShow: 0.8,
    tipShow: 5,
    tipGap: 15,
  };

function kk(n) {
  const t = [],
    e = /`([^`]+)`|\*\*([^*]+)\*\*/g;
  let s = 0;
  for (let i = e.exec(n); i; i = e.exec(n))
    (i.index > s && t.push({ t: "text", s: n.slice(s, i.index) }),
      i[1] !== void 0 ? t.push({ t: "key", s: i[1] }) : t.push({ t: "bold", s: i[2] }),
      (s = i.index + i[0].length));
  return (s < n.length && t.push({ t: "text", s: n.slice(s) }), t);
}

function Z$(n) {
  return kk(n)
    .map((t) => t.s)
    .join("");
}

const hr = (n, t) => {
  const e = n.x - t.x,
    s = n.y - t.y;
  return e * e + s * s;
};

function Q$(n, t) {
  for (const e of n.buffs) if (e.id === t) return !0;
  return !1;
}

class q4 {
  team;
  playerId;
  jungler;
  foeTowerIds = new Set();
  cur = "move";
  phase = "wait";
  tPhase = 0;
  done = { move: !1, go: !1, attack: !1, lasthit: !1, skill: !1, recall: !1, shop: !1, push: !1, win: !1 };
  variant = "";
  target = null;
  targetLabel = "";
  targetId = -1;
  skipped = !1;
  lastTime;
  lastPos;
  moved = 0;
  attacked = !1;
  lastHits = 0;
  monsterKills = 0;
  casted = !1;
  recallDone = !1;
  leftFountain = !1;
  backAtFountain = !1;
  shopOpened = !1;
  autoBought = !1;
  sinceTowerHit = -1;
  sinceSkill = -1;
  lowHpFor = 0;
  scanAt = -1;
  enemyNear = !1;
  enemyInReach = !1;
  seenTips = new Set();
  pendingTips = [];
  activeTip = null;
  tipLeft = 0;
  lastTipEnd = -1 / 0;
  s2Level;
  ultLevel;
  view = {
    card: null,
    lesson: 1,
    lessonsDone: [!1, !1, !1, !1, !1, !1],
    highlight: null,
    arrow: null,
    minimap: null,
    finished: !1,
  };
  constructor(t, e) {
    ((this.team = e.team),
      (this.playerId = e.id),
      (this.jungler = e.lane === "jungle"),
      (this.lastTime = t.time),
      (this.lastPos = { x: e.pos.x, y: e.pos.y }),
      (this.s2Level = e.skills.s2.level),
      (this.ultLevel = e.skills.ult.level));
    for (const s of t.units) s.kind === "tower" && s.team !== e.team && this.foeTowerIds.add(s.id);
  }
  get finished() {
    return this.cur === "end";
  }
  skip() {
    ((this.skipped = !0), (this.cur = "end"), (this.activeTip = null), (this.pendingTips.length = 0));
  }
  debug() {
    return {
      step: this.cur,
      phase: this.phase,
      variant: this.variant,
      t: this.tPhase,
      done: V2.filter((t) => this.done[t]),
      tips: [...this.seenTips],
      tip: this.activeTip ? this.activeTip.id : null,
      skipped: this.skipped,
      moved: this.moved,
      lastHits: this.jungler ? this.monsterKills : this.lastHits,
    };
  }
  onEvent(t, e) {
    const s = this.playerId;
    switch (t.type) {
      case "attack":
        t.unitId === s && (this.attacked = !0);
        break;
      case "gold":
        if (t.unitId !== s) break;
        t.reason === "lasthit" ? this.lastHits++ : t.reason === "monster" && this.monsterKills++;
        break;
      case "skillCast":
        t.unitId === s && (t.slot === "s1" || t.slot === "s2" || t.slot === "ult") && (this.casted = !0);
        break;
      case "fx":
        t.key === "recall_done" && t.unitId === s && (this.recallDone = !0);
        break;
      case "itemBought":
        t.unitId === s && t.auto === !0 && e.time > 5 && (this.autoBought = !0);
        break;
      case "damage":
        t.sourceId === s &&
          this.sinceTowerHit < 0 &&
          this.foeTowerIds.has(t.targetId) &&
          (this.sinceTowerHit = 0);
        break;
    }
  }
  update(t) {
    const { state: e, me: s } = t,
      i = ai,
      a = this.view;
    let o = e.time - this.lastTime;
    if (((this.lastTime = e.time), o > 0 ? o > 5 && (o = 5) : (o = 0), this.step() === "end"))
      return this.hidden(!0);
    t.shopOpen && (this.shopOpened = !0);
    const r = Math.sqrt(hr(s.pos, this.lastPos));
    if (
      (s.alive && r <= Math.max(2, s.stats.moveSpeed * o * 1.5 + 0.5) && (this.moved += r),
      (this.lastPos.x = s.pos.x),
      (this.lastPos.y = s.pos.y),
      e.over || !s.alive)
    )
      return this.hidden(!1);
    const l = Q$(s, "fountain"),
      c = e.map.bases[this.team],
      f = c.fountainRadius + 4;
    (hr(s.pos, c.fountain) > f * f
      ? ((this.leftFountain = !0), (this.backAtFountain = !1))
      : l && this.leftFountain && (this.backAtFountain = !0),
      this.sinceSkill >= 0 && (this.sinceSkill += o),
      this.sinceTowerHit >= 0 && (this.sinceTowerHit += o));
    const d = s.hp / Math.max(1, s.stats.maxHp);
    ((this.lowHpFor = d < i.recallHp && !s.inCombat && !l ? this.lowHpFor + o : 0),
      (e.time - this.scanAt >= 0.2 || e.time < this.scanAt) &&
        ((this.scanAt = e.time), this.scanNear(e, s), this.detectTips(t)),
      this.levelTips(t),
      this.activeTip &&
        ((this.tipLeft -= o), this.tipLeft <= 0 && ((this.activeTip = null), (this.lastTipEnd = e.time))),
      (this.activeTip && this.phase !== "wait") || (this.tPhase += o));
    for (let m = 0; m < 16; m++) {
      const x = this.step();
      if (x === "end") return this.hidden(!0);
      if (x === "outro") {
        if (this.tPhase >= i.outroShow) {
          this.cur = "end";
          continue;
        }
        break;
      }
      if (this.phase === "wait") {
        if (x === "recall" && !this.done.shop && this.autoBought && !this.shopOpened) {
          this.enter("shop", e, s);
          continue;
        }
        if (this.alreadyDone(x, s)) {
          this.finish(x, e, s);
          continue;
        }
        if (this.trigger(x, e, s)) {
          ((this.phase = "show"), (this.tPhase = 0));
          continue;
        }
        break;
      }
      if (this.phase === "show") {
        if (this.completed(x, e, s)) {
          if (x === "win") {
            this.finish(x, e, s);
            continue;
          }
          ((this.phase = "check"), (this.tPhase = 0));
          break;
        }
        if (x === "recall" && this.variant === "low") {
          if (d >= i.recallHpOk) {
            this.sinceSkill >= i.recallAfter
              ? this.finish(x, e, s)
              : ((this.phase = "wait"), (this.tPhase = 0), (this.lowHpFor = 0));
            continue;
          }
          break;
        }
        if (this.tPhase >= this.timeout(x)) {
          this.finish(x, e, s);
          continue;
        }
        break;
      }
      if (this.tPhase >= i.checkShow) {
        this.finish(x, e, s);
        continue;
      }
      break;
    }
    if (!this.activeTip && this.pendingTips.length > 0) {
      for (let x = this.pendingTips.length - 1; x >= 0; x--)
        this.pendingTips[x].expire >= e.time ||
          (this.seenTips.delete(this.pendingTips[x].id), this.pendingTips.splice(x, 1));
      const m = this.cur === "outro" || this.phase !== "wait";
      if (e.time - this.lastTipEnd >= i.tipGap) {
        const x = this.pendingTips.findIndex((p) => p.urgent || !m);
        x >= 0 &&
          ((this.activeTip = this.pendingTips[x]), this.pendingTips.splice(x, 1), (this.tipLeft = i.tipShow));
      }
    }
    const u = this.step();
    if (u === "end") return this.hidden(!0);
    ((a.finished = !1), (a.lesson = u === "outro" ? 6 : j4[u]), a.lessonsDone.fill(!0));
    for (const m of V2) this.done[m] || (a.lessonsDone[j4[m] - 1] = !1);
    return (
      (a.highlight = null),
      (a.arrow = null),
      (a.minimap = null),
      this.activeTip
        ? (a.card = {
            kind: "tip",
            id: this.activeTip.id,
            lesson: a.lesson,
            title: "小贴士",
            text: this.activeTip.text,
            done: !1,
            warn: this.activeTip.warn,
          })
        : u === "outro"
          ? (a.card = {
              kind: "outro",
              id: "outro",
              lesson: 6,
              title: "引导结束",
              text: t.objectiveHints ? "引导结束，接下来看屏幕上方的目标提示。" : "引导结束，祝你旗开得胜！",
              done: !0,
              warn: !1,
            })
          : this.phase === "wait"
            ? (a.card = null)
            : (a.card = {
                kind: "step",
                id: u,
                lesson: a.lesson,
                title: I3[a.lesson - 1],
                text: this.text(u, t),
                done: this.phase === "check",
                warn: !1,
              }),
      u !== "outro" &&
        this.phase === "show" &&
        (this.activeTip || (a.highlight = this.highlightOf(u, t.mode)),
        (u === "go" || u === "push") && this.target
          ? ((a.arrow = { pos: this.target, label: this.targetLabel }), (a.minimap = this.target))
          : u === "win" && (a.minimap = e.map.bases[this.team === 0 ? 1 : 0].core)),
      a
    );
  }
  step() {
    return this.cur;
  }
  hidden(t) {
    const e = this.view;
    return (
      (e.card = null),
      (e.highlight = null),
      (e.arrow = null),
      (e.minimap = null),
      (e.finished = t),
      t && e.lessonsDone.fill(!0),
      e
    );
  }
  enter(t, e, s) {
    if (
      ((this.cur = t),
      (this.phase = "wait"),
      (this.tPhase = 0),
      (this.variant = ""),
      (this.target = null),
      (this.targetLabel = ""),
      (this.targetId = -1),
      t === "go")
    )
      if (this.jungler) {
        const i = Mk(e, s);
        i && ((this.target = i.pos), (this.targetLabel = rn[i.monsterType].name));
      } else
        s.lane !== "jungle" &&
          ((this.target = L3(e, this.team, s.lane)), (this.targetLabel = `我方${Pl(s.lane, 1)}`));
  }
  finish(t, e, s) {
    ((this.done[t] = !0), t === "skill" && this.sinceSkill < 0 && (this.sinceSkill = 0));
    const i = V2.find((a) => !this.done[a]);
    if (!i) {
      ((this.cur = "outro"), (this.phase = "show"), (this.tPhase = 0), (this.target = null));
      return;
    }
    this.enter(i, e, s);
  }
  alreadyDone(t, e) {
    const s = ai;
    switch (t) {
      case "move":
        return this.moved >= s.moveDist;
      case "go":
        return !this.target || hr(e.pos, this.target) < s.goDist * s.goDist;
      case "attack":
        return this.attacked;
      case "lasthit":
        return this.jungler ? this.monsterKills >= s.monsterKills : this.lastHits >= s.lastHits;
      case "skill":
        return this.casted;
      case "recall":
        return this.recallDone;
      case "shop":
        return this.shopOpened;
      case "push":
        return this.sinceTowerHit >= 0;
      default:
        return !1;
    }
  }
  trigger(t, e, s) {
    const i = ai;
    switch (t) {
      case "move":
        return e.time >= i.startAt;
      case "attack":
        return this.enemyNear || this.tPhase >= i.attackWait;
      case "recall":
        return this.lowHpFor >= i.recallHpHold
          ? ((this.variant = "low"), !0)
          : this.sinceSkill >= i.recallAfter
            ? ((this.variant = "timed"), !0)
            : !1;
      case "push": {
        const a = this.findPushTower(e, s);
        if (a) return ((this.variant = "minions"), this.setTower(a), !0);
        if (e.time >= i.pushAt) {
          const o = this.frontTower(e, s);
          return (o && ((this.variant = "late"), this.setTower(o)), !0);
        }
        return !1;
      }
      default:
        return !0;
    }
  }
  completed(t, e, s) {
    const i = ai;
    switch (t) {
      case "move":
        return this.moved >= i.moveDist;
      case "go":
        return !this.target || hr(s.pos, this.target) < i.goDist * i.goDist;
      case "attack":
        return this.attacked;
      case "lasthit":
        return this.jungler ? this.monsterKills >= i.monsterKills : this.lastHits >= i.lastHits;
      case "skill":
        return this.casted;
      case "recall":
        return this.recallDone || this.backAtFountain;
      case "shop":
        return this.shopOpened;
      case "push":
        return (
          this.sinceTowerHit >= i.pushLinger ||
          (this.targetId >= 0 && !e.units.some((a) => a.id === this.targetId && a.alive))
        );
      case "win":
        return this.tPhase >= i.winShow;
      default:
        return !1;
    }
  }
  timeout(t) {
    const e = ai;
    switch (t) {
      case "move":
        return e.moveTimeout;
      case "go":
        return e.goTimeout;
      case "attack":
        return e.attackTimeout;
      case "lasthit":
        return e.lasthitTimeout;
      case "skill":
        return e.skillTimeout;
      case "recall":
        return e.recallTimeout;
      case "shop":
        return e.shopTimeout;
      case "push":
        return e.pushTimeout;
      default:
        return e.winShow;
    }
  }
  highlightOf(t, e) {
    switch (t) {
      case "move":
        return e === "touch" ? "joystick" : null;
      case "attack":
        return "attack";
      case "skill":
        return "s1";
      case "recall":
        return "recall";
      case "shop":
        return "shop";
      default:
        return null;
    }
  }
  text(t, e) {
    const s = e.mode === "kbm",
      i = e.me;
    switch (t) {
      case "move":
        return s ? "按 `W` `A` `S` `D` 移动，或鼠标右键点地面。" : "拖动左下角的摇杆移动。";
      case "go":
        return this.jungler
          ? `你是打野：跟着箭头去**${this.targetLabel}**，打野怪升级。`
          : `跟着箭头去**${this.targetLabel}**，小兵马上就到。`;
      case "attack": {
        const a = this.jungler ? "野怪" : "敌方小兵";
        return this.enemyInReach
          ? s
            ? "按 `空格` 普攻，会自动打最合适的敌人。"
            : "按住右下角的大按钮普攻。"
          : s
            ? `走近${a}，再按 \`空格\` 普攻。`
            : `走近${a}，再按住右下角的大按钮普攻。`;
      }
      case "lasthit":
        return this.jungler
          ? `把野怪打死，金币和经验都归你。(${Math.min(this.monsterKills, ai.monsterKills)}/${ai.monsterKills})`
          : `小兵快死时补上**最后一击**，金币全拿。(${Math.min(this.lastHits, ai.lastHits)}/${ai.lastHits})`;
      case "skill": {
        const a = Se[i.heroId].skills.s1.brief,
          o = a ? `：${a}。` : "。";
        return s ? `按 \`Q\` 放一技能${o}按住能看到范围，松开施放。` : `轻点一技能${o}按住拖动可以自己瞄准。`;
      }
      case "recall":
        return s
          ? "血少了就按 `B` 回城：原地站 5 秒，回泉水很快补满。"
          : "血少了就点「回城」：原地站 5 秒，回泉水很快补满。";
      case "shop":
        return i.autoBuy
          ? s
            ? "金币够了会**自动购买**推荐装备。想自己挑，按 `P` 打开商店。"
            : "金币够了会**自动购买**推荐装备。想自己挑，点小地图下面的商店。"
          : s
            ? "金币够了就按 `P` 打开商店，照着**推荐**页买下一件。"
            : "金币够了就点小地图下面的商店，照着**推荐**页买下一件。";
      case "push":
        return this.variant === "late"
          ? "塔会先打小兵：等小兵进塔再上去打，塔下没兵就退出来。"
          : "小兵进塔了！塔会先打小兵，趁现在打塔。塔下没兵就退出来。";
      default:
        return "一路打掉 **一塔 → 二塔 → 高地塔**，就能打水晶。水晶爆了就赢！";
    }
  }
  setTower(t) {
    ((this.target = { x: t.pos.x, y: t.pos.y }),
      (this.targetId = t.id),
      (this.targetLabel = t.kind === "tower" ? `敌方${Pl(t.lane, t.tier)}` : "敌方防御塔"));
  }
  findPushTower(t, e) {
    const s = ai.pushDist * ai.pushDist;
    let i = null;
    for (const a of t.units)
      if (
        !(a.kind !== "tower" || !a.alive || a.team === this.team || a.invulnerable) &&
        !(hr(a.pos, e.pos) > s)
      ) {
        if (!i) {
          i = [];
          for (const o of t.units) o.kind === "minion" && o.alive && o.team === this.team && i.push(o);
        }
        if (Q1(a, i)) return a;
      }
    return null;
  }
  frontTower(t, e) {
    let s = null,
      i = 1 / 0;
    for (const a of t.units) {
      if (a.kind !== "tower" || !a.alive || a.team === this.team || a.invulnerable) continue;
      const o = e.lane !== "jungle" && a.lane === e.lane ? -1 : hr(a.pos, e.pos);
      o < i && ((i = o), (s = a));
    }
    return s;
  }
  scanNear(t, e) {
    const s = ai.nearEnemy * ai.nearEnemy,
      i = e.stats.attackRange + ai.attackReach;
    ((this.enemyNear = !1), (this.enemyInReach = !1));
    for (const a of t.units) {
      if (
        !a.alive ||
        !(this.jungler
          ? a.kind === "monster"
          : a.kind === "minion" && a.team !== this.team && a.visible[this.team])
      )
        continue;
      const r = hr(a.pos, e.pos);
      if (r > s) continue;
      this.enemyNear = !0;
      const l = i + a.radius;
      if (r <= l * l) {
        this.enemyInReach = !0;
        return;
      }
    }
  }
  queueTip(t, e, s, i, a = !1, o = !1) {
    this.seenTips.has(t) ||
      (this.seenTips.add(t),
      this.pendingTips.push({ id: t, text: e, warn: a, urgent: o, expire: s.time + i }));
  }
  levelTips(t) {
    const { me: e, state: s } = t,
      i = t.mode === "kbm",
      a = Se[e.heroId];
    if (e.skills.s2.level > 0 && this.s2Level === 0) {
      const o = a.skills.s2.brief;
      this.queueTip("tip_s2", `二技能解锁了${o ? `：${o}` : ""}。${i ? "按 `E` 施放。" : ""}`, s, 40);
    }
    if (e.skills.ult.level > 0 && this.ultLevel === 0) {
      const o = a.skills.ult.brief;
      this.queueTip("tip_ult", `大招解锁了${o ? `：${o}` : ""}。${i ? "按 `R` 施放。" : ""}`, s, 40);
    }
    ((this.s2Level = e.skills.s2.level), (this.ultLevel = e.skills.ult.level));
  }
  detectTips(t) {
    const { state: e, me: s } = t;
    if (!this.seenTips.has("tip_tower"))
      for (const i of s.buffs) {
        if (i.id !== "tower_focus") continue;
        const a = e.units.find((l) => l.id === i.sourceId);
        if (!a) continue;
        const o = a.stats.attackRange + s.radius + wk.aggroPad[0];
        if (hr(a.pos, s.pos) > o * o) break;
        const r = [];
        for (const l of e.units) l.kind === "minion" && l.alive && l.team === this.team && r.push(l);
        Q1(a, r) || this.queueTip("tip_tower", "塔在打你！塔下没有小兵别硬冲，越打越疼。", e, 3, !0, !0);
        break;
      }
    if (
      (s.bushId >= 0 && this.queueTip("tip_bush", "草丛里敌人看不见你；出手会暴露 1.5 秒。", e, 4),
      !this.seenTips.has("tip_buff_blue") || !this.seenTips.has("tip_buff_red"))
    ) {
      const i = ai.nearEnemy * ai.nearEnemy;
      for (const a of e.units) {
        if (
          a.kind !== "monster" ||
          !a.alive ||
          (a.monsterType !== "frost_golem" && a.monsterType !== "ember_golem") ||
          hr(a.pos, s.pos) > i
        )
          continue;
        const o = rn[a.monsterType];
        this.queueTip(
          a.monsterType === "frost_golem" ? "tip_buff_blue" : "tip_buff_red",
          `**${o.name}**：${o.reward ?? "打掉它有增益"}。`,
          e,
          25,
        );
      }
    }
  }
}

const Sk = Jn(`
/* ── 提示卡 ── */
.sf-hud__gcard {
  --edge: 232, 199, 122;
  display: none; width: 100%; box-sizing: border-box; padding: 6u 8u 7u 11u; border-radius: 10u; background: var(--hud-plate);
  box-shadow: inset 0 0 0 1px rgba(var(--edge), 0.55), inset 0 1px 0 1px rgba(143, 233, 255, 0.12), 0 6u 18u rgba(2, 4, 12, 0.5);
}
.sf-hud__gcard.is-on { display: block; }
.sf-hud__gcard.is-in { animation: sf-hud-gcard-in 0.26s var(--sf-ease-out) both; }
.sf-hud__gcard-head { display: flex; align-items: center; gap: 7u; min-height: max(22px, 24u); }
.sf-hud__gcard-badge {
  flex: none; display: inline-grid; place-items: center; min-width: max(30px, 34u); height: max(17px, 19u); padding: 0 5u; border-radius: 99px;
  font-family: var(--sf-font-num); font-weight: 800; font-size: max(10px, 11u); line-height: 1; letter-spacing: 0.04em; color: #06202c; background: linear-gradient(180deg, #c9f6ff, #5cd6f7);
}
.sf-hud__gcard-badge .sf-i { width: 1.2em; height: 1.2em; vertical-align: 0; }
.sf-hud__gcard-title { font-size: var(--sf-fs-sm); font-weight: 800; letter-spacing: 0.08em; line-height: 1.2; color: var(--sf-c-gold-200); white-space: nowrap; text-shadow: var(--hud-shadow-text); }
.sf-hud__gcard-dots { display: flex; align-items: center; gap: max(3px, 4u); margin-left: auto; }
.sf-hud__gcard-dots > i { width: max(6px, 7u); height: max(6px, 7u); border-radius: 50%; background: rgba(150, 178, 235, 0.22); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.55); }
.sf-hud__gcard-dots > i.is-done { background: #ffe7ad; box-shadow: 0 0 0 1px #6b4614, 0 0 5u rgba(255, 214, 130, 0.85); }
.sf-hud__gcard-dots > i.is-cur { background: #5cd6f7; box-shadow: 0 0 0 max(2px, 2u) rgba(92, 214, 247, 0.32); }
.sf-hud__gcard-skip {
  position: relative; flex: none; margin: 0 0 0 4u; padding: 0 10u; min-width: 64px; height: max(32px, 30u); border: 0; border-radius: 99px; cursor: pointer;
  font: inherit; font-size: var(--sf-fs-xs); font-weight: 700; line-height: 1; color: var(--sf-c-text-2); background: rgba(150, 178, 235, 0.16); box-shadow: inset 0 0 0 1px rgba(150, 178, 235, 0.3);
}
/* 手指的落点比按钮再大一圈(上下左右各外扩 8px)；卡片其余部分仍不拦截指针 */
.sf-hud__gcard-skip::after { content: ''; position: absolute; inset: -8px; }
@media (hover: hover) { .sf-hud__gcard-skip:hover { color: var(--sf-c-text); background: rgba(150, 178, 235, 0.28); } }
.sf-hud__gcard-skip:active { transform: scale(0.94); }
.sf-hud__gcard-body { margin-top: 3u; font-size: var(--sf-fs-sm); font-weight: 600; line-height: 1.55; color: var(--sf-c-text); text-shadow: var(--hud-shadow-text); }
.sf-hud__gcard-body b { color: var(--sf-c-gold-200); font-weight: 800; }
.sf-hud__gcard-body .sf-kbd { min-width: max(19px, 21u); height: max(19px, 21u); padding: 0 5u; margin: 0 1u; vertical-align: -0.28em; font-size: max(11px, 11.5u); color: var(--sf-c-gold-100); }
/* 做到了：徽标变绿打勾，卡片亮一下 */
.sf-hud__gcard.is-done { --edge: 111, 227, 161; animation: sf-hud-gcard-done 0.6s ease-out both; }
.sf-hud__gcard.is-done .sf-hud__gcard-badge { color: #052414; background: linear-gradient(180deg, #c8ffe0, #6fe3a1); }
.sf-hud__gcard.is-done .sf-hud__gcard-title { color: #b9f5d2; }
/* 小贴士 / 结束语 */
.sf-hud__gcard.is-tip { --edge: 92, 214, 247; }
.sf-hud__gcard.is-tip .sf-hud__gcard-title { color: var(--sf-c-cyan-300); }
.sf-hud__gcard.is-warn { --edge: 255, 184, 77; }
.sf-hud__gcard.is-warn .sf-hud__gcard-badge { color: #2b1a04; background: linear-gradient(180deg, #ffe2a6, #ffb84d); }
.sf-hud__gcard.is-warn .sf-hud__gcard-title { color: #ffd08a; }
.sf-hud__gcard.is-outro .sf-hud__gcard-skip { display: none; }
@keyframes sf-hud-gcard-in { from { opacity: 0; transform: translateY(-8u); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-gcard-done { 0% { filter: brightness(1.9); } 100% { filter: none; } }

/* ── 控件光圈 ── */
.sf-hud__gglow { position: absolute; inset: -9%; z-index: 4; border-radius: 50%; pointer-events: none; box-shadow: 0 0 0 max(2px, 2.5u) #5cd6f7, 0 0 14u rgba(92, 214, 247, 0.85), inset 0 0 10u rgba(92, 214, 247, 0.4); }
.sf-hud__gglow::before, .sf-hud__gglow::after { content: ''; position: absolute; inset: 0; border-radius: 50%; box-shadow: 0 0 0 max(2px, 2u) rgba(143, 233, 255, 0.95); animation: sf-hud-gglow 1.2s ease-out infinite; }
.sf-hud__gglow::after { animation-delay: 0.6s; }
/* 摇杆空闲时是半透明的：被点名时提到全亮 */
.sf-hud__joy.is-guide-host { opacity: 1; }
@keyframes sf-hud-gglow { from { transform: scale(1); opacity: 0.95; } to { transform: scale(1.5); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .sf-hud__gglow::before, .sf-hud__gglow::after { animation: none; opacity: 0; } }
/* 竖屏 / 小屏：卡片内边距收一点 */
@media (max-width: 480px) { .sf-hud__gcard { padding: 5px 6px 6px 9px; } .sf-hud__gcard-head { gap: 6px; } }
/* 手机横屏(屏高不足 460px)：卡片正下方就是玩家英雄头顶的血条，再往北是正在交手的敌人，三行的卡片会把它们盖住。
   压成一行：徽标(第几课) + 正文 + 跳过；课名与进度点收起。正文短的一行放下，长的折成两行，都比原来矮一行 */
@media (orientation: landscape) and (max-height: 460px) {
  .sf-hud__gcard { padding: 4px 6px 4px 8px; }
  .sf-hud__gcard.is-on { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; column-gap: 7px; }
  .sf-hud__gcard-head { display: contents; }
  .sf-hud__gcard-title, .sf-hud__gcard-dots { display: none; }
  .sf-hud__gcard-badge { grid-column: 1; grid-row: 1; align-self: center; }
  .sf-hud__gcard-body { grid-column: 2; grid-row: 1; margin-top: 0; line-height: 1.4; }
  .sf-hud__gcard-skip { grid-column: 3; grid-row: 1; align-self: center; height: 32px; margin: 0; }
}
`);

function J$(n) {
  Zn("sf-hud-guide", Sk);
  const t = z("span", "sf-hud__gcard-badge sf-num"),
    e = z("b", "sf-hud__gcard-title"),
    s = z("span", "sf-hud__gcard-dots"),
    i = [];
  for (let p = 0; p < I3.length; p++) {
    const g = z("i");
    (i.push(g), s.appendChild(g));
  }
  s.setAttribute("aria-hidden", "true");
  const a = z("button", "sf-hud__gcard-skip", "跳过引导");
  ((a.type = "button"),
    (a.tabIndex = -1),
    (a.dataset.sfSnd = "back"),
    a.addEventListener("click", (p) => {
      (p.stopPropagation(), n());
    }));
  const o = z("div", "sf-hud__gcard-body"),
    r = z("div", "sf-hud__gcard", z("div", "sf-hud__gcard-head", t, e, s, a), o);
  (r.setAttribute("role", "status"), r.setAttribute("aria-live", "polite"));
  let l = !1,
    c = "",
    f = "",
    d = !1,
    h = "",
    u = "";
  function m(p) {
    o.textContent = "";
    for (const g of kk(p))
      g.t === "key"
        ? o.appendChild(z("span", "sf-kbd", g.s))
        : g.t === "bold"
          ? o.appendChild(z("b", null, g.s))
          : o.appendChild(document.createTextNode(g.s));
    r.setAttribute("aria-label", Z$(p));
  }
  function x(p) {
    const g = p.done ? "check" : p.kind === "tip" ? "info" : `${p.lesson}/${I3.length}`;
    g !== h &&
      ((h = g),
      (t.textContent = ""),
      g === "check"
        ? t.appendChild(_e(Vt("check")))
        : g === "info"
          ? t.appendChild(_e(Vt("info")))
          : (t.textContent = g));
  }
  return {
    el: r,
    visible: () => l,
    render(p) {
      const g = p.card;
      if (!g)
        return (l && ((l = !1), r.classList.remove("is-on", "is-in"), (c = ""), delete r.dataset.step), !1);
      let y = !1;
      ((!l || g.id !== c) &&
        ((l = !0),
        (c = g.id),
        (r.className = `sf-hud__gcard is-on${g.kind === "tip" ? " is-tip" : ""}${g.kind === "outro" ? " is-outro" : ""}${g.warn ? " is-warn" : ""}`),
        r.offsetWidth,
        r.classList.add("is-in"),
        (r.dataset.step = g.id),
        (r.dataset.kind = g.kind),
        (e.textContent = g.title),
        (f = ""),
        (d = !1),
        (h = "")),
        g.text !== f && ((f = g.text), m(g.text)),
        g.done !== d &&
          ((d = g.done), r.classList.toggle("is-done", g.done), (y = g.done && g.kind === "step")),
        (r.dataset.done = g.done ? "1" : "0"),
        x(g));
      let _ = "";
      for (let k = 0; k < i.length; k++) _ += p.lessonsDone[k] ? "d" : k === p.lesson - 1 ? "c" : ".";
      if (_ !== u) {
        u = _;
        for (let k = 0; k < i.length; k++)
          i[k].className = _[k] === "d" ? "is-done" : _[k] === "c" ? "is-cur" : "";
      }
      return y;
    },
  };
}

const tG = {
  joystick: ".sf-hud__joy-base",
  attack: '.sf-hud__sk[data-btn="attack"]',
  s1: '.sf-hud__sk[data-btn="s1"]',
  recall: '.sf-hud__sk[data-btn="recall"]',
  shop: ".sf-hud__shopbtn",
};

function eG(n) {
  Zn("sf-hud-guide", Sk);
  const t = z("i", "sf-hud__gglow");
  t.setAttribute("aria-hidden", "true");
  let e = null,
    s = null;
  function i() {
    (s && (s.classList.remove("is-guide"), s.parentElement?.classList.remove("is-guide-host")),
      t.remove(),
      (s = null));
  }
  return {
    current: () => e,
    set(a) {
      if ((a === e && (a === null || (s && s.isConnected && t.parentElement === s))) || (i(), (e = a), !a))
        return;
      const o = n.root.querySelector(tG[a]);
      o &&
        ((s = o),
        o.classList.add("is-guide"),
        o.parentElement?.classList.add("is-guide-host"),
        o.appendChild(t));
    },
    dispose() {
      (i(), (e = null));
    },
  };
}

const nG = Jn(`
.sf-hud__obj {
  --tone: 143, 233, 255;
  display: none; align-items: center; gap: 6u; max-width: 100%; box-sizing: border-box; height: max(22px, 26u); padding: 0 12u 0 7u; border-radius: 99px;
  background: linear-gradient(180deg, rgba(20, 33, 72, 0.7), rgba(7, 12, 30, 0.74)); box-shadow: inset 0 0 0 1px rgba(var(--tone), 0.4), 0 3u 10u rgba(2, 4, 12, 0.4);
  font-size: var(--sf-fs-sm); line-height: 1; color: var(--sf-c-text); white-space: nowrap; pointer-events: none;
}
.sf-hud__obj.is-on { display: inline-flex; }
.sf-hud__obj.is-in { animation: sf-hud-obj-in 0.22s var(--sf-ease-out) both; }
.sf-hud__obj > .sf-i { flex: none; width: 1.2em; height: 1.2em; color: rgb(var(--tone)); vertical-align: 0; }
.sf-hud__obj-tag { flex: none; font-size: var(--sf-fs-xs); font-weight: 800; letter-spacing: 0.08em; color: rgb(var(--tone)); }
.sf-hud__obj-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; font-weight: 600; letter-spacing: 0.02em; text-shadow: var(--hud-shadow-text); }
.sf-hud__obj.is-swap .sf-hud__obj-text { animation: sf-hud-obj-swap 0.2s linear both; }
.sf-hud__obj.is-warn { --tone: 255, 184, 77; box-shadow: inset 0 0 0 max(1px, 1.5u) rgba(var(--tone), 0.75), 0 0 12u rgba(255, 184, 77, 0.28), 0 3u 10u rgba(2, 4, 12, 0.4); }
.sf-hud__obj.is-warn .sf-hud__obj-text { color: #ffe9c4; }
.sf-hud__obj.is-go { --tone: 255, 231, 173; box-shadow: inset 0 0 0 1px rgba(var(--tone), 0.65), 0 3u 10u rgba(2, 4, 12, 0.4); }
.sf-hud__obj.is-go .sf-hud__obj-text { color: var(--sf-c-gold-100); }
@keyframes sf-hud-obj-in { from { opacity: 0; transform: translateY(-5u); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-obj-swap { from { opacity: 0; } to { opacity: 1; } }
/* 窄屏放不下「当前目标」四个字：只留图标 */
@media (max-width: 460px) { .sf-hud__obj-tag { display: none; } .sf-hud__obj { padding: 0 10px 0 6px; } }
`);

function sG() {
  Zn("sf-hud-objective", nG);
  const n = z("span", "sf-hud__obj-text"),
    t = z("div", "sf-hud__obj", _e(Vt("target")), z("span", "sf-hud__obj-tag", "当前目标"), n);
  (t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"));
  let e = !1,
    s = "",
    i = "",
    a = "";
  return {
    el: t,
    visible: () => e,
    render(o) {
      if (!o) {
        e && ((e = !1), t.classList.remove("is-on", "is-in", "is-swap"), (s = ""), delete t.dataset.key);
        return;
      }
      (e
        ? o.key !== s && (t.classList.remove("is-swap"), t.offsetWidth, t.classList.add("is-swap"))
        : ((e = !0), t.classList.add("is-on"), t.offsetWidth, t.classList.add("is-in")),
        o.key !== s && ((s = o.key), (t.dataset.key = o.key)),
        t.dataset.id !== o.id && (t.dataset.id = o.id),
        o.tone !== a &&
          ((a = o.tone),
          t.classList.toggle("is-warn", o.tone === "warn"),
          t.classList.toggle("is-go", o.tone === "go")),
        o.text !== i && ((i = o.text), (n.textContent = o.text)));
    },
  };
}

const iG = Jn(`
.sf-hud__coach {
  position: absolute; left: 50%; top: calc(var(--hud-t) + 58u); z-index: 4; width: min(520u, 60vw); transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; pointer-events: none; transition: opacity 0.2s linear;
}
/* 横幅出现：让位 */
.sf-hud__coach.is-yield { opacity: 0; }
.sf-hud__coach.is-yield button { pointer-events: none; }
.sf-hud.is-over .sf-hud__coach { display: none; }
/* 手机横屏(屏高不足 460px)：两侧让开小地图与右上角；贴紧比分条下沿(屏幕矮，指引位下面紧挨着玩家英雄的头顶) */
@media (orientation: landscape) and (max-height: 460px) {
  .sf-hud__coach { top: calc(var(--hud-t) + 50u); width: min(440px, calc(100vw - 2 * (var(--hud-mini) + 40u))); }
}
/* 竖屏：放在商店按钮那一行的正下方，左右各留 8px */
@media (orientation: portrait) {
  .sf-hud__coach { top: calc(var(--hud-t) + var(--hud-mini) + max(58px, 66u)); width: calc(100vw - 16px); }
}
`),
  X4 = 3,
  aG = 400;

function oG(n, t) {
  Zn("sf-hud-coach", iG);
  const { host: e } = n,
    s = n.state.config.autoPlay === !0,
    i = B$(n, () => l),
    a = eG(n),
    o = sG(),
    r = J$(() => {
      f && (f.skip(), w(), E3(e, "tutorial", !1), n.toast("已关闭新手引导，可在设置里重新打开", "info"));
    }),
    l = z("div", "sf-hud__coach", r.el, o.el);
  let c = Xc(e.getSettings(), "tutorial"),
    f = c && !s ? new q4(n.state, n.me) : null;
  const d = f !== null,
    h = { state: n.state, me: n.me, mode: n.mode, shopOpen: !1, objectiveHints: !0 };
  let u = null,
    m = null;
  const x = H$(),
    p = new K$();
  let g = -1 / 0,
    y = null,
    v = 0;
  const _ = [];
  let k = !1,
    M = !1,
    S = null;
  function b() {
    f = new q4(n.state, n.me);
  }
  function w() {
    ((f = null),
      r.render({
        card: null,
        lesson: 1,
        lessonsDone: [],
        highlight: null,
        arrow: null,
        minimap: null,
        finished: !0,
      }),
      a.set(null),
      i.set(null),
      (m = null),
      (u = null));
  }
  return {
    els: [i.el, l],
    replacesTips: d,
    restartGuide() {
      s || (w(), b());
    },
    debug() {
      const T = f ? f.debug() : null,
        E = r.el;
      return {
        guideOn: f !== null,
        guide: T,
        card: r.visible()
          ? {
              id: E.dataset.step ?? "",
              kind: E.dataset.kind ?? "",
              done: E.dataset.done === "1",
              title: E.querySelector(".sf-hud__gcard-title")?.textContent ?? "",
              text: E.getAttribute("aria-label") ?? "",
            }
          : null,
        highlight: a.current(),
        arrow: m ? { x: m.pos.x, y: m.pos.y, label: m.label, mode: i.mode() } : null,
        minimap: S ? { x: S.x, y: S.y } : null,
        objective: p.current,
        objectiveVisible: o.visible() && !k,
        yielding: k,
        log: _.slice(),
      };
    },
    handleEvent(T, E) {
      f && f.onEvent(T, E.state);
    },
    onMode(T) {
      h.mode = T;
    },
    update(T) {
      const E = T.state,
        A = T.me,
        C = e.getSettings(),
        R = Xc(C, "tutorial");
      R !== c && ((c = R), R ? !s && !E.over && b() : w());
      let I = !1;
      if (f) {
        ((h.state = E),
          (h.me = A),
          (h.mode = T.mode),
          (h.shopOpen = T.actions.isShopOpen()),
          (h.objectiveHints = Xc(C, "objectiveHints")));
        const G = f.update(h);
        G.finished
          ? (w(), E3(e, "tutorial", !1))
          : (r.render(G) && e.audio.ui("confirm"),
            (I = G.card !== null),
            a.set(G.highlight),
            i.set(G.arrow),
            (m = G.arrow ? { pos: G.arrow.pos, label: G.arrow.label } : null),
            (u = G.minimap));
      }
      if ((i.update?.(T, 0), E.time - g >= sy.interval || E.time < g)) {
        g = E.time;
        const G = X$(E, A, T.mode, x);
        if (o.visible() ? p.feed(G, E.time) : p.feedHidden(G, E.time)) {
          const q = p.current;
          q
            ? (_.length >= aG && _.shift(),
              _.push({ t: Math.round(E.time * 10) / 10, id: q.id, key: q.key, tone: q.tone, text: q.text }),
              q.pos ? ((y = { x: q.pos.x, y: q.pos.y }), (v = T.now + X4)) : (y = null))
            : (y = null);
        }
      }
      const F = Xc(C, "objectiveHints") && !I && A.alive && !E.over;
      o.render(F ? p.current : null);
      const L = t.banner.isShowing();
      (L !== k && ((k = L), l.classList.toggle("is-yield", L)),
        y && k && (v = T.now + X4),
        u && A.alive && !E.over ? (S = u) : y && F && !k && T.now < v ? (S = y) : (S = null),
        t.minimap.setGuide(S));
      const B = I || o.visible();
      B !== M && ((M = B), T.root.classList.toggle("is-coach", B));
    },
    dispose() {
      (a.dispose(), i.dispose?.(), t.minimap.setGuide(null), n.root.classList.remove("is-coach"), (f = null));
    },
  };
}

const rG = Jn(`
.sf-hud__feed { position: absolute; right: var(--hud-r); top: calc(var(--hud-t) + max(46px, 50u)); z-index: 3; display: flex; flex-direction: column; align-items: flex-end; gap: 5u; }
.sf-hud__kf {
  --tone: 77, 163, 255;
  position: relative; display: flex; align-items: center; gap: 6u; height: 34u; padding: 0 10u 0 30u; border-radius: 0 6u 6u 0;
  background: linear-gradient(90deg, rgba(var(--tone), 0), rgba(var(--tone), 0.3) 26%, rgba(var(--tone), 0.12) 70%), linear-gradient(90deg, rgba(9, 15, 36, 0), rgba(9, 15, 36, 0.88) 14%, rgba(9, 15, 36, 0.93));
  box-shadow: inset -3px 0 0 rgba(var(--tone), 0.95);
  animation: sf-hud-kf-in 0.32s var(--sf-ease-out) both;
}
.sf-hud__kf.is-foe { --tone: 255, 93, 93; }
.sf-hud__kf.is-me { box-shadow: inset -3px 0 0 var(--sf-c-me); }
.sf-hud__kf.is-me::after { content: ''; position: absolute; left: 22%; right: 0; top: 0; bottom: 0; border-radius: 0 6u 6u 0; pointer-events: none; box-shadow: inset 0 1px 0 rgba(183, 243, 107, 0.55), inset 0 -1px 0 rgba(183, 243, 107, 0.55); }
.sf-hud__kf.is-out { animation: sf-hud-kf-out 0.4s var(--sf-ease-in) both; }
.sf-hud__kf .sf-hud__face { --sz: 26u; }
.sf-hud__kf-assists { display: flex; align-items: center; margin-right: 2u; }
.sf-hud__kf-assists .sf-hud__face { --sz: 17u; margin-left: -4u; box-shadow: 0 0 0 1.5px var(--ring); }
.sf-hud__kf-assists .sf-hud__face:first-child { margin-left: 0; }
.sf-hud__kf-plus { font-size: var(--sf-fs-xs); font-weight: 800; color: var(--sf-c-text-2); margin: 0 1u 0 2u; }
.sf-hud__kf-ico { width: 15u; height: 15u; color: #fff; filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.8)); }
.sf-hud__kf-ico > svg { display: block; width: 100%; height: 100%; }
.sf-hud__kf-text { font-size: var(--sf-fs-xs); font-weight: 700; color: var(--sf-c-text); letter-spacing: 0.04em; white-space: nowrap; text-shadow: var(--hud-shadow-text); }
@keyframes sf-hud-kf-in { from { opacity: 0; transform: translateX(40u); } to { opacity: 1; transform: none; } }
@keyframes sf-hud-kf-out { to { opacity: 0; transform: translateX(24u); } }
@media (orientation: portrait) {
  .sf-hud__feed { top: calc(var(--hud-t) + max(96px, 106u)); }
  /* 竖屏：顶部指引位(引导卡 / 当前目标)横贯整屏，就在击杀流第三条的位置——有指引时只留最新的两条 */
  .sf-hud.is-coach .sf-hud__kf:nth-last-child(n+3) { display: none; }
}
`),
  lG = 6.5,
  cG = 4;

function fG(n) {
  Zn("sf-hud-feed", rG);
  const t = z("div", "sf-hud__feed");
  t.setAttribute("aria-live", "polite");
  const e = [];
  function s(a) {
    for (t.appendChild(a), e.push({ el: a, until: n.now + lG, leaving: !1 }); e.length > cG;)
      e.shift()?.el.remove();
  }
  const i = (a) => {
    const o = z("span", "sf-hud__kf-ico");
    return ((o.innerHTML = Vt(a)), o);
  };
  return {
    el: t,
    update(a) {
      for (let o = e.length - 1; o >= 0; o--) {
        const r = e[o];
        !r.leaving && a.now >= r.until
          ? ((r.leaving = !0), r.el.classList.add("is-out"))
          : r.leaving && a.now >= r.until + 0.42 && (r.el.remove(), e.splice(o, 1));
      }
    },
    handleEvent(a, o) {
      if (a.type === "heroKill") {
        const r = o.hero(a.victimId);
        if (!r) return;
        const l = o.hero(a.killerId),
          c = l ?? o.unit(a.killerId),
          f = l ? l.team : r.team === 0 ? 1 : 0,
          d = r.isPlayer || !!l?.isPlayer || a.assistIds.indexOf(o.state.playerId) >= 0,
          h = z("div", `sf-hud__kf ${f === o.team ? "is-ally" : "is-foe"}${d ? " is-me" : ""}`),
          u = a.assistIds.map((m) => o.hero(m)).filter((m) => !!m);
        if (u.length > 0) {
          const m = z("span", "sf-hud__kf-assists");
          for (const x of u.slice(0, 4)) m.appendChild(Na(o.host, x, o.team));
          h.append(m, z("span", "sf-hud__kf-plus", "+"));
        }
        if (l) h.appendChild(Na(o.host, l, o.team));
        else {
          const m = c?.kind,
            x = Vt(m === "tower" || m === "core" ? "tower" : m === "monster" ? "monster" : "cs");
          h.appendChild(Rl(x, Dl(f, o.team)));
        }
        (h.append(i("kill"), Na(o.host, r, o.team, "is-dead")), s(h));
      } else if (a.type === "towerDestroyed") {
        const r = a.team !== o.team,
          l = z("div", `sf-hud__kf ${r ? "is-ally" : "is-foe"}`);
        (l.append(
          z("span", "sf-hud__kf-text", `${r ? "我方摧毁" : "敌方摧毁"}`),
          i("tower"),
          z("span", "sf-hud__kf-text", Pl(a.lane, a.tier)),
          Rl(Vt("tower"), `${Dl(a.team, o.team)} is-dead`),
        ),
          s(l));
      } else if (a.type === "epicSlain") {
        const r = a.team === o.team,
          l = z("div", `sf-hud__kf ${r ? "is-ally" : "is-foe"}`);
        (l.append(
          z("span", "sf-hud__kf-text", `${r ? "我方击败" : "敌方击败"}`),
          i("monster"),
          z("span", "sf-hud__kf-text", rn[a.monsterType].name),
        ),
          s(l));
      }
    },
    dispose() {
      e.length = 0;
    },
  };
}

const dG = jx(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 0Q8.8 7.2 16 8Q8.8 8.8 8 16Q7.2 8.8 0 8Q7.2 7.2 8 0Z" fill="#ffe7ad"/></svg>',
  ),
  hG =
    Jn(`
.sf-hud__mini {
  position: absolute; left: var(--hud-l); top: var(--hud-t); z-index: 3; width: var(--hud-mini); height: var(--hud-mini); padding: max(2px, 3u); border-radius: 9u;
  background: linear-gradient(180deg, rgba(20, 33, 72, 0.94), rgba(7, 12, 30, 0.96)); box-shadow: 0 6u 18u rgba(2, 4, 12, 0.55);
  touch-action: none; cursor: crosshair;
}
/* 金色星轨描边：与面板同一手法，左上/右下两角最亮 */
.sf-hud__mini::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
  background: conic-gradient(from 315deg at 50% 50%, rgba(255, 231, 173, 0.95) 0deg, rgba(224, 177, 96, 0.4) 40deg, rgba(160, 180, 230, 0.22) 110deg,
    rgba(224, 177, 96, 0.36) 150deg, rgba(255, 231, 173, 0.85) 180deg, rgba(224, 177, 96, 0.36) 212deg, rgba(160, 180, 230, 0.22) 250deg, rgba(224, 177, 96, 0.4) 322deg, rgba(255, 231, 173, 0.95) 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.sf-hud__mini::after { content: ''; position: absolute; left: -6u; top: -6u; width: 14u; height: 14u; pointer-events: none; background-repeat: no-repeat; background-size: contain; }
.sf-hud__mini > canvas { display: block; width: 100%; height: 100%; border-radius: 6u; }
.sf-hud__mini.is-peek { box-shadow: 0 6u 18u rgba(2, 4, 12, 0.55), 0 0 0 1px rgba(143, 233, 255, 0.7), 0 0 14u rgba(92, 214, 247, 0.45); }
@media (orientation: portrait) { .sf-hud { --hud-mini: 136u; } }
`) + `.sf-hud__mini::after { background-image: ${dG}; }`,
  W2 = [Qe.blue, Qe.red],
  Y4 = {
    mossback: "#e2cf7a",
    glimwing: "#e2cf7a",
    frost_golem: "#4da3ff",
    ember_golem: "#ff5d5d",
    abyss_drake: "#c09bff",
    star_colossus: "#ffd76a",
  },
  uG = {
    mossback: "diamond",
    glimwing: "diamond",
    frost_golem: "dot",
    ember_golem: "dot",
    abyss_drake: "triangle",
    star_colossus: "diamond",
  },
  j2 = "255, 214, 130",
  pG = { kill: 1.8, alert: 2.4, tower: 2.6, epic: 2.6 };
export { oG, fG, hG, W2, Y4, uG, j2, pG };
