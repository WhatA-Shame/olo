// 把 tools/_ln.js 里的装备表替换进 src/33-data-2.js 的 `ln` 定义处。
// ln 是多变量声明链的第一项（const ln = {...}, IB = ...），所以收尾是 `}` 而不是 `};`。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'src/33-data-2.js');
let s = fs.readFileSync(target, 'utf8');

const i = s.indexOf('const ln = {');
if (i < 0) throw new Error('找不到 const ln = {');
let d = 0,
  j = i + 10,
  inStr = 0,
  q = '';
for (; j < s.length; j++) {
  const c = s[j];
  if (inStr) {
    if (c === '\\') {
      j++;
      continue;
    }
    if (c === q) inStr = 0;
    continue;
  }
  if (c === '"' || c === "'" || c === '`') {
    inStr = 1;
    q = c;
    continue;
  }
  if (c === '{') d++;
  else if (c === '}') {
    d--;
    if (d === 0) {
      j++;
      break;
    }
  }
}
// 生成的字面量末尾是 "};" —— 这里要去掉分号，保留原来的逗号续接后面的声明
let neu = fs.readFileSync(path.join(root, 'tools/_ln.js'), 'utf8').trimEnd();
if (neu.endsWith(';')) neu = neu.slice(0, -1);
s = s.slice(0, i) + neu + s.slice(j);
fs.writeFileSync(target, s);
console.log(`✓ 已替换 ln（${neu.length} 字节）`);
