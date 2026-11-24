// 给纯 Node 环境补上最小 DOM 桩，好让 heroMesh/heroMap/bNw 能在离线跑起来。
const noop = new Proxy(function () {}, {
  get: (t, k) => {
    if (k === 'canvas') return fakeCanvas;
    if (k === 'width' || k === 'height') return 64;
    if (k === 'data') return new Uint8ClampedArray(64 * 64 * 4);
    if (k === Symbol.toPrimitive) return () => 0;
    return noop;
  },
  apply: () => noop,
  construct: () => noop,
});
const fakeCanvas = {
  width: 64, height: 64, style: {},
  getContext: () => noop,
  addEventListener() {}, removeEventListener() {},
  toDataURL: () => 'data:,',
};
class FakeImage {
  constructor() { this.width = 64; this.height = 64; this.style = {}; this.complete = true; this.naturalWidth = 64; this.naturalHeight = 64; }
  set src(v) { this._src = v; if (this.onload) setTimeout(() => this.onload(), 0); }
  get src() { return this._src; }
  addEventListener() {} removeEventListener() {}
}
globalThis.document = { createElement: () => fakeCanvas, createElementNS: () => fakeCanvas, body: fakeCanvas };
globalThis.Image = FakeImage;
globalThis.window = globalThis;
globalThis.self = globalThis;
if (!globalThis.navigator) { try { globalThis.navigator = { userAgent: 'node' }; } catch {} }
globalThis.requestAnimationFrame = (f) => setTimeout(() => f(0), 0);
globalThis.devicePixelRatio = 1;
globalThis.__NODE_STUB__ = true;
