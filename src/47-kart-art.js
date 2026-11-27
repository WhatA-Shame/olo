// 47-kart-art.js —— 卡丁车原版角色的立绘/头像（由 tools/kartportrait.mjs 生成，勿手改）
//
// id → 相对路径。运行时 xB(id) 直接返回这个路径，不再在浏览器里拉模型 + 开离屏渲染器画一遍：
//   20 个角色光模型就 16MB，为了 27 张选将卡头像全拉下来太亏，烘成 PNG 一张才几十 KB。
//
// 重新生成：node tools/kartportrait.mjs
export const KART_ART = {
  bear: 'images/portrait/bear.webp?v=3',
  bighead: 'images/portrait/bighead.webp?v=3',
  blackcat: 'images/portrait/blackcat.webp?v=3',
  boxman: 'images/portrait/boxman.webp?v=3',
  boxtree: 'images/portrait/boxtree.webp?v=3',
  coconut: 'images/portrait/coconut.webp?v=3',
  cow: 'images/portrait/cow.webp?v=3',
  doll: 'images/portrait/doll.webp?v=3',
  dungbeetle: 'images/portrait/dungbeetle.webp?v=3',
  frog: 'images/portrait/frog.webp?v=3',
  girlhead: 'images/portrait/girlhead.webp?v=3',
  horseman: 'images/portrait/horseman.webp?v=3',
  kangaroo: 'images/portrait/kangaroo.webp?v=3',
  maggot: 'images/portrait/maggot.webp?v=3',
  magnet: 'images/portrait/magnet.webp?v=3',
  mannequin: 'images/portrait/mannequin.webp?v=3',
  monkey: 'images/portrait/monkey.webp?v=3',
  mushroom: 'images/portrait/mushroom.webp?v=3',
  panda: 'images/portrait/panda.webp?v=3',
  paperboy: 'images/portrait/paperboy.webp?v=3',
  scallion: 'images/portrait/scallion.webp?v=3',
  skeleton: 'images/portrait/skeleton.webp?v=3',
  slime: 'images/portrait/slime.webp?v=3',
  stagbeetle: 'images/portrait/stagbeetle.webp?v=3',
  stone: 'images/portrait/stone.webp?v=3',
  thunderdragon: 'images/portrait/thunderdragon.webp?v=3',
  tiandongbao: 'images/portrait/tiandongbao.webp?v=3',
  wooddoll: 'images/portrait/wooddoll.webp?v=3',
  // 原生英雄改用的新皮：让选将台也走风格化头像，不再现场渲染 3D 白模。
  // 牛伟 / 牛魔 / 转转光标（李广）没有对应模型，继续用 3D 渲染。
  panyue: 'images/portrait/stagbeetle.webp?v=3',
  xingli: 'images/portrait/tiandongbao.webp?v=3',
  yeque: 'images/portrait/blackcat.webp?v=3',
};
