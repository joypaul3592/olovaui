import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { spawnSync } from 'child_process';
import Critters from 'critters';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

const OUT_DIR = path.join(process.cwd(), 'out');

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function inlineCriticalCSS() {
  const critters = new Critters({
    path: OUT_DIR,
    preload: 'swap',
    compress: true,
    inlineFonts: true,
    pruneSource: true,
  });

  for await (const file of walk(OUT_DIR)) {
    if (file.endsWith('.html')) {
      const html = await readFile(file, 'utf-8');
      const processed = await critters.process(html);
      await writeFile(file, processed);
    }
  }
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.warn('out/ directory not found; skip post-export optimizations');
    return;
  }
  console.warn('Inlining critical CSS with Critters...');
  await inlineCriticalCSS();
  console.warn('Building Pagefind search index...');
  const pagefindBinary = path.join(
    process.cwd(),
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'pagefind.cmd' : 'pagefind'
  );

  if (!fs.existsSync(pagefindBinary)) {
    console.warn('Pagefind binary not found; skip search indexing');
    return;
  }

  const result =
    process.platform === 'win32'
      ? spawnSync('cmd.exe', ['/c', pagefindBinary, '--site', OUT_DIR], {
          stdio: 'inherit',
        })
      : spawnSync(pagefindBinary, ['--site', OUT_DIR], {
          stdio: 'inherit',
        });

  if (result.status !== 0) {
    throw new Error(`Pagefind indexing failed with exit code ${result.status ?? 'unknown'}`);
  }

  console.warn('Post-export optimizations complete');
}

main().catch((err) => {
  console.error('Post-export failed', err);
  process.exit(1);
});
