// Converts the Instagram profile-picture logo (white background) into a
// transparent PNG for use on dark surfaces, by alpha-keying near-white pixels.
// Run with: node scripts/process-logo.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const sourcePath = path.join(root, 'src/assets/images/logo-instagram.jpg');
const outputPath = path.join(root, 'src/assets/images/logo-transparent.png');

const WHITE_THRESHOLD = 235;

const image = sharp(sourcePath).ensureAlpha();
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
    data[i + 3] = 0;
  }
}

const output = await sharp(data, { raw: info }).png().toBuffer();
await writeFile(outputPath, output);
console.log(`Wrote transparent logo to ${outputPath}`);
