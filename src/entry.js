// entry.js — 按原始执行顺序加载全部模块，触发顶层初始化
// 模块总数 44，等价于原单文件 bundle 的顶层执行序列

import './01-audio.js';
import './02-data.js';
import './03-vfx.js';
import './04-audio-2.js';
import './05-three.js';
import './06-three-2.js';
import './07-three-3.js';
import './08-three-4.js';
import './09-render.js';
import './10-render-2.js';
import './11-render-3.js';
import './12-three-5.js';
import './13-three-6.js';
import './14-three-7.js';
import './15-render-4.js';
import './16-render-5.js';
import './17-three-8.js';
import './18-core.js';
import './19-core-2.js';
import './20-core-3.js';
import './21-core-4.js';
import './22-render-6.js';
import './23-render-7.js';
import './24-render-8.js';
import './25-render-9.js';
import './26-core-5.js';
import './27-core-6.js';
import './28-core-7.js';
import './29-core-8.js';
import './30-core-9.js';
import './31-render-10.js';
import './32-ui.js';
import './33-data-2.js';
import './34-ui-2.js';
import './35-ui-3.js';
import './36-ui-4.js';
import './37-ui-5.js';
import './38-ui-6.js';
import './39-ui-7.js';
import './40-ui-8.js';
import './41-ai.js';
import './42-ai-2.js';
import './43-data-3.js';
import './44-data-4.js';

// 未捕获异常留一份完整栈，出问题时可在控制台执行 __lastErr 直接取到
if (typeof window !== 'undefined') {
  window.__lastErr = null;
  const isExtErr = (file, err) => /(?:chrome|moz|safari|safari-web|edge)-extension:\/\//i.test(`${file || ''}\n${(err && err.stack) || ''}`);
  window.addEventListener('error', (e) => {
    if (isExtErr(e.filename, e.error)) return;
    window.__lastErr = {
      msg: e.message,
      stack: (e.error && e.error.stack) || '',
      where: `${e.filename || ''}:${e.lineno || 0}:${e.colno || 0}`,
      at: Date.now(),
    };
  });
  window.addEventListener('unhandledrejection', (e) => {
    const r = e.reason;
    if (isExtErr('', r)) return;
    window.__lastErr = { msg: String((r && r.message) || r), stack: (r && r.stack) || '', where: 'promise', at: Date.now() };
  });
}
