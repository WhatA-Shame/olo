// 把卡丁车项目的「原版角色模型」导出成 GLB 的浏览器入口。
// 模型类在 src/core/entities/*.ts，构建时用 three 的图元现场拼出来（还带 canvas 贴图），
// 所以只能在浏览器里跑，不能在 node 里跑（node 没有 canvas）。
import { 所有预设模型 } from './src/core/baseEntities.ts';
import { 所有标准动作 } from './src/core/entityShared.ts';
import { 导出带动画模型字节 } from './src/core/glbExporter.ts';

const b64 = (u8) => {
  let s = '';
  const CH = 0x8000;
  for (let i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
  return btoa(s);
};

window.__kartNames = 所有预设模型.map((f, i) => {
  try {
    return f().名称 || `m${i}`;
  } catch {
    return `m${i}`;
  }
});
window.__kartCount = 所有预设模型.length;
window.__kartActions = 所有标准动作;

// i = 模型序号；full = true 连卡丁车特有的"跑起来/撞车震飞"一起导，false 只导标准动作
//
// 这套对应关系写在 src/47-kart.js 的 animate 里（状态 → 片段），改这边记得同步改那边：
//   idle        → 空着（包里缺真正的待机，下一个包补；现在标记成"待机"的其实是行走）
//   move        → 小加速      move+被减速 → 行走（也就是现在这个"待机"片段）
//   move+加速   → 中加速 / 大加速
//   attack      → 普通攻击    attack2 → 右攻击
//   cast_s1     → 左攻击      cast_s2 → 右攻击      ult/channel → 吟唱
//   airborne    → 滞空        stunned → 眩晕        roll → 失控
//   dead        → 死亡        respawn → 复活
//   emote       → 嘲讽 / 笑话 / 跳舞        胜利 → 庆祝
//   stop        → 急停        turnL/turnR → 左拐 / 右拐
const 对局动作 = [...所有标准动作];
const 全套动作 = [...new Set([...所有标准动作, '跑起来', '撞车震飞'])];
window.__kartExport = async (i, full) => {
  const f = 所有预设模型[i];
  const acts = full ? 全套动作 : 对局动作;
  const r = await 导出带动画模型字节(f, undefined, acts);
  // 顶点动画 = 逐帧被直接改写几何的网格（节点 TRS 里没有这份形变，必须单独标出来）
  return JSON.stringify({ name: r.名称, n: r.动画数, dyn: r.顶点动画 || [], data: b64(r.字节) });
};
window.__kartReady = true;
