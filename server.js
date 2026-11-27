import express from 'express';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ASSET_UPSTREAM = 'https://raw.githubusercontent.com/WhatA-Shame/olo/master/dist';
const SAFE_ASSET = /^[a-z0-9_-]+\.(bin|png)$/;
const inflight = new Map();
const DIST_INDEX = path.join(__dirname, 'dist', 'index.html');

function ensureDistBuilt() {
  if (fs.existsSync(DIST_INDEX)) return true;
  try {
    console.log('dist/index.html missing, building automatically...');
    execFileSync(process.execPath, [path.join(__dirname, 'tools', 'build.mjs')], {
      cwd: __dirname,
      stdio: 'inherit',
    });
    return fs.existsSync(DIST_INDEX);
  } catch (err) {
    console.error('Auto-build failed:', err);
    return false;
  }
}

ensureDistBuilt();

const noCacheHtml = {
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-store');
  },
};

app.get(['/', '/index.html', '/dist', '/dist/', '/dist/index.html'], (_req, res, next) => {
  if (!fs.existsSync(DIST_INDEX) && !ensureDistBuilt()) {
    return res.status(500).send('Build failed');
  }
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(DIST_INDEX, (err) => err && next(err));
});

app.use(express.static(path.join(__dirname, 'dist'), noCacheHtml));
app.use('/dist', express.static(path.join(__dirname, 'dist'), noCacheHtml));
app.use('/kart', express.static(path.join(__dirname, 'kart')));
app.use('/dist/kart', express.static(path.join(__dirname, 'kart')));
app.use('/modular', express.static(path.join(__dirname, 'modular')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/dist/images', express.static(path.join(__dirname, 'images')));

async function fetchAndCacheAsset(subPath, localDirs) {
  if (inflight.has(subPath)) return inflight.get(subPath);
  const p = (async () => {
    const res = await fetch(`${ASSET_UPSTREAM}/${subPath}`);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    for (const dir of localDirs) {
      try {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, path.basename(subPath)), buf);
      } catch {}
    }
    return buf;
  })().finally(() => inflight.delete(subPath));
  inflight.set(subPath, p);
  return p;
}

for (const prefix of ['/kart', '/dist/kart']) {
  app.get(`${prefix}/:file`, async (req, res, next) => {
    const file = req.params.file;
    if (!SAFE_ASSET.test(file)) return next();
    try {
      const buf = await fetchAndCacheAsset(`kart/${file}`, [
        path.join(__dirname, 'kart'),
        path.join(__dirname, 'dist', 'kart'),
      ]);
      if (!buf) return res.status(404).end();
      res.type(file.endsWith('.png') ? 'image/png' : 'application/octet-stream').send(buf);
    } catch {
      res.status(502).end();
    }
  });
}

for (const prefix of ['/images/portrait', '/dist/images/portrait']) {
  app.get(`${prefix}/:file`, async (req, res, next) => {
    const file = req.params.file;
    if (!SAFE_ASSET.test(file)) return next();
    try {
      const buf = await fetchAndCacheAsset(`images/portrait/${file}`, [
        path.join(__dirname, 'images', 'portrait'),
        path.join(__dirname, 'dist', 'images', 'portrait'),
      ]);
      if (!buf) return res.status(404).end();
      res.type('image/png').send(buf);
    } catch {
      res.status(502).end();
    }
  });
}

app.get('/play.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'play.html'));
});

app.get('/api/comments', (_req, res) => {
  res.json({ data: [], total: 0 });
});

app.post('/api/track', (_req, res) => {
  res.status(204).end();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
