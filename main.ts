// NaijaStats — Nigeria in Numbers. The entrypoint for make.fun's best
// national statistics site bounty.
//
// Node 22, standard library only. The site itself is the static files in
// app/ (index.html, style.css and ES modules, no build step, nothing loaded
// over the network). This program hands the site in: it copies app/ and
// screenshots/ from beside this file into the output directory, then writes
// /output/dossier.json with buildDossier from the vendored make.fun library
// (vendor/makefun-frontend.ts, the kit's copy, unchanged).
//
// The grader runs this program twice and compares the outputs byte for byte,
// so everything here is deterministic: same files in, same files out.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The output directory itself is never removed: the grader mounts it, and
// deleting it would fail the run with EBUSY or EACCES. Only the app/ and
// screenshots/ directories inside it are refreshed, and only those two.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's own caps, from the competition's gate: app/ holds at most
// 993 files and directories and 16 MiB, screenshots/ at most 4 files of
// 256 KiB each, and the dossier text at most 160 KiB.
const DOSSIER_OPTIONS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function refreshDir(source, target) {
  if (!existsSync(source)) throw new Error(`missing entry directory: ${source}`);
  mkdirSync(target, { recursive: true });
  cpSync(source, target, { recursive: true, force: true });
}

function main() {
  mkdirSync(outDir, { recursive: true });

  // Refresh app/ and screenshots/ in place. A stale directory from an
  // earlier run in the same output directory is cleared first, so the
  // output holds exactly what the repository holds — but the output
  // directory itself is left standing, since the grader mounts it.
  for (const dir of ['app', 'screenshots']) {
    const target = join(outDir, dir);
    if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  }
  refreshDir(join(repoRoot, 'app'), join(outDir, 'app'));
  if (existsSync(join(repoRoot, 'screenshots'))) {
    refreshDir(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'));
  } else {
    mkdirSync(join(outDir, 'screenshots'), { recursive: true });
  }

  // buildDossier refuses an entry past the scorer's caps, so a bad hand-in
  // fails here, loudly, instead of reaching the judge half-built.
  const dossier = buildDossier(outDir, DOSSIER_OPTIONS);
  writeFileSync(join(outDir, 'dossier.json'), dossier);
  console.log(`NaijaStats handed in to ${outDir} (dossier ${dossier.length} bytes)`);
}

main();
