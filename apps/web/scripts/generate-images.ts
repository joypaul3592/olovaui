import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'optimized');
const WIDTHS = [640, 1280, 1920];

function isRaster(file: string) {
  return /(\.png|\.jpg|\.jpeg)$/i.test(file);
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip already optimized folder
      if (entry.name === 'optimized') continue;
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generateForFile(file: string) {
  const rel = path.relative(PUBLIC_DIR, file);
  const base = rel.replace(/\.[^.]+$/, '');
  const name = base.replace(/[\\/]/g, '_');
  await ensureDir(OUT_DIR);

  const buf = await fs.promises.readFile(file);
  for (const w of WIDTHS) {
    const webp = await sharp(buf).resize({ width: w }).webp({ quality: 82 }).toBuffer();
    await fs.promises.writeFile(path.join(OUT_DIR, `${name}-${w}.webp`), webp);

    const avif = await sharp(buf).resize({ width: w }).avif({ quality: 50 }).toBuffer();
    await fs.promises.writeFile(path.join(OUT_DIR, `${name}-${w}.avif`), avif);
  }
}

async function main() {
  console.warn('Generating optimized images (WebP/AVIF)...');
  for await (const file of walk(PUBLIC_DIR)) {
    if (isRaster(file)) {
      await generateForFile(file);
    }
  }
  console.warn('Optimized images generated in public/optimized');
}

main().catch((err) => {
  console.error('Image generation failed', err);
  process.exit(1);
});