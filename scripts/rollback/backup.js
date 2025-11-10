#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..', '..');
const backupsRoot = path.join(projectRoot, 'backups');
const snapshotsRoot = path.join(backupsRoot, 'snapshots');

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listEnvFiles(root) {
  return fs.readdirSync(root).filter((n) => n.startsWith('.env'));
}

function cpSafe(srcRel, destDir) {
  const src = path.join(projectRoot, srcRel);
  if (!fs.existsSync(src)) return false;
  const dest = path.join(destDir, srcRel);
  ensureDir(path.dirname(dest));
  fs.cpSync(src, dest, { recursive: true, force: true });
  return true;
}

function main() {
  ensureDir(snapshotsRoot);
  const stamp = nowStamp();
  const target = path.join(snapshotsRoot, stamp);
  ensureDir(target);

  const include = [
    'public',
    'src',
    'next.config.ts',
    'postcss.config.mjs',
    'eslint.config.mjs',
    'tsconfig.json',
    'package.json',
    '.gitignore',
  ];

  // add env files dynamically
  for (const env of listEnvFiles(projectRoot)) include.push(env);

  const copied = [];
  for (const item of include) {
    if (cpSafe(item, target)) copied.push(item);
  }

  let gitRev = null;
  try { gitRev = execSync('git rev-parse HEAD', { cwd: projectRoot }).toString().trim(); } catch {}

  const manifest = {
    createdAt: new Date().toISOString(),
    stamp,
    projectRoot,
    copied,
    gitRev,
  };
  fs.writeFileSync(path.join(target, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`Snapshot created at: ${target}`);
  console.log(`Included ${copied.length} items.`);
}

main();