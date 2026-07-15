// Generates the default social share image (public/og-image.jpg) from the
// Nordelta project photo plus a branded gradient, the real logo, and a title overlay.
// Run with: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const sourcePhoto = path.join(root, 'src/assets/images/proyectos/nordelta-hero.jpg');
const logoPath = path.join(root, 'src/assets/images/logo-transparent.png');
const outputPath = path.join(root, 'public/og-image.jpg');

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_SIZE = 72;
const LOGO_X = 80;
const LOGO_Y = 78;

const overlaySvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="fade" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#0c0c0e" stop-opacity="0.92" />
      <stop offset="55%" stop-color="#0c0c0e" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#0c0c0e" stop-opacity="0.15" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)" />
  <text x="${LOGO_X + LOGO_SIZE + 20}" y="${LOGO_Y + LOGO_SIZE / 2 + 12}" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff">Grupo <tspan fill="#f9640f">CGR</tspan></text>
  <text x="80" y="480" font-family="Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">Servicios para la construcción</text>
  <text x="80" y="540" font-family="Arial, sans-serif" font-size="28" font-weight="400" fill="#e2e3e5">Más de 18 años de trayectoria en Buenos Aires</text>
</svg>
`;

const base = await sharp(sourcePhoto).resize(WIDTH, HEIGHT, { fit: 'cover' }).toBuffer();
const logo = await sharp(logoPath).resize(LOGO_SIZE, LOGO_SIZE).toBuffer();

const composed = await sharp(base)
  .composite([{ input: Buffer.from(overlaySvg) }, { input: logo, left: LOGO_X, top: LOGO_Y }])
  .jpeg({ quality: 82 })
  .toBuffer();

await writeFile(outputPath, composed);
console.log(`Generated OG image at ${outputPath}`);
