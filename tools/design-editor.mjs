// 设计表的本地编辑服务器：起一个静态服务 + 一个保存接口，
// 页面里点「保存」就原地写回 docs/hero-design.html，不用另存为。
//
// 用法:
//   node tools/design-editor.mjs           # 默认 8799
//   node tools/design-editor.mjs 9000      # 换端口
//
// 只监听 127.0.0.1，只允许写 docs/hero-design.html 这一个文件。
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = path.join(root, 'docs', 'hero-design.html');
const PORT = Number(process.argv[2] || 8799);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary',
  '.bin': 'application/octet-stream',
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);

  if (url === '/__ping') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, target: path.relative(root, TARGET) }));
    return;
  }

  if (url === '/__save') {
    if (req.method !== 'POST') {
      res.writeHead(405).end('POST only');
      return;
    }
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > 32 * 1024 * 1024) {
        res.writeHead(413).end('too large');
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      if (!/^<!DOCTYPE html>/i.test(body.trim())) {
        res.writeHead(400).end('不是完整的 HTML 文档');
        return;
      }
      try {
        // 先写临时文件再改名：写一半断电也不会把原文件弄坏。
        // Windows 上目标文件被别的程序（预览面板 / 编辑器）打开时 rename 会 EPERM，
        // 这种情况退回直接覆盖写。
        const tmp = TARGET + '.tmp';
        fs.writeFileSync(tmp, body, 'utf8');
        try {
          fs.renameSync(tmp, TARGET);
        } catch (e) {
          if (e.code !== 'EPERM' && e.code !== 'EBUSY' && e.code !== 'EACCES') throw e;
          fs.writeFileSync(TARGET, body, 'utf8');
          try {
            fs.unlinkSync(tmp);
          } catch {}
        }
        console.log(`  ✓ 已保存 ${new Date().toLocaleTimeString()}  ${(body.length / 1024).toFixed(0)}KB`);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('ok');
      } catch (e) {
        console.error('  ✗ 写入失败', e.message);
        res.writeHead(500).end(String(e.message));
      }
    });
    return;
  }

  if (url === '/' || url === '') {
    res.writeHead(302, { Location: '/docs/hero-design.html' }).end();
    return;
  }

  const file = path.join(root, path.normalize(url).replace(/^([/\\])+/, ''));
  if (!file.startsWith(root)) {
    res.writeHead(403).end('forbidden');
    return;
  }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': st.size,
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`设计表编辑器: http://127.0.0.1:${PORT}/docs/hero-design.html`);
  console.log(`保存目标:     ${path.relative(root, TARGET)}`);
  console.log('改完点右上角「保存」即写回文件；Ctrl+C 退出。');
});
