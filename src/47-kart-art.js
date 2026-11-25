// 47-kart-art.js —— 卡丁车原版角色的立绘/头像（由 tools/kartportrait.mjs 生成，勿手改）
//
// id → 相对路径。运行时 xB(id) 直接返回这个路径，不再在浏览器里拉模型 + 开离屏渲染器画一遍：
//   20 个角色光模型就 16MB，为了 27 张选将卡头像全拉下来太亏，烘成 PNG 一张才几十 KB。
//
// 重新生成：node tools/kartportrait.mjs
export const KART_ART = {
  bear: 'images/portrait/bear.png',
  bighead: 'images/portrait/bighead.png',
  boxman: 'images/portrait/boxman.png',
  boxtree: 'images/portrait/boxtree.png',
  coconut: 'images/portrait/coconut.png',
  cow: 'images/portrait/cow.png',
  frog: 'images/portrait/frog.png',
  girlhead: 'images/portrait/girlhead.png',
  horseman: 'images/portrait/horseman.png',
  kangaroo: 'images/portrait/kangaroo.png',
  maggot: 'images/portrait/maggot.png',
  magnet: 'images/portrait/magnet.png',
  mannequin: 'images/portrait/mannequin.png',
  monkey: 'images/portrait/monkey.png',
  mushroom: 'images/portrait/mushroom.png',
  panda: 'images/portrait/panda.png',
  scallion: 'images/portrait/scallion.png',
  skeleton: 'images/portrait/skeleton.png',
  slime: 'images/portrait/slime.png',
  stone: 'images/portrait/stone.png',
};
