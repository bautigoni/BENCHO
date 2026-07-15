// Rasterizes the real Grupo CGR logo (src/assets/images/logo-instagram.jpg)
// into the favicon set under public/. Re-run after replacing the source logo.
// Run with: node scripts/generate-favicons.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const sourceLogo = path.join(root, 'src/assets/images/logo-instagram.jpg');
const publicDir = path.join(root, 'public');

const targets = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 }
];

await mkdir(publicDir, { recursive: true });

const pngBuffers = {};
for (const { file, size } of targets) {
  const buffer = await sharp(sourceLogo).resize(size, size, { fit: 'cover' }).png().toBuffer();
  pngBuffers[size] = buffer;
  await writeFile(path.join(publicDir, file), buffer);
}

const icoBuffer = await pngToIco([pngBuffers[16], pngBuffers[32]]);
await writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);

console.log(`Generated ${targets.length + 1} favicon assets in ${publicDir}`);
