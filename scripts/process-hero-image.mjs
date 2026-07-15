// The source hero photo is only 828px wide (Instagram's export size), which
// looks soft when stretched full-bleed across wide screens. This applies a
// tuned sharpen + contrast/saturation pass and re-encodes at max quality so
// the upscale reads as crisp as the source allows.
// Run with: node scripts/process-hero-image.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const sourcePath = path.join(root, 'src/assets/images/proyectos/nordelta.jpeg');
const outputPath = path.join(root, 'src/assets/images/proyectos/nordelta-hero.jpg');

await sharp(sourcePath)
  .sharpen({ sigma: 1.4, m1: 1, m2: 2 })
  .modulate({ saturation: 1.1, brightness: 1.03 })
  .linear(1.06, -8)
  .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
  .toFile(outputPath);

console.log(`Wrote enhanced hero image to ${outputPath}`);
