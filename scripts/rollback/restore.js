#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..', '..');
const backupsRoot = path.join(projectRoot, 'backups');
const snapshotsRoot = path.join(backupsRoot, 'snapshots');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function getLatestSnapshotDir() {
  if (!fs.existsSync(snapshotsRoot)) return null;
  const entries = fs.readdirSync(snapshotsRoot).filter((n) => {
    const p = path.join(snapshotsRoot, n);
    return fs.statSync(p).isDirectory();
  }).sort();
  return entries.length ? path.join(snapshotsRoot, entries[entries.length - 1]) : null;
}

function readManifest(dir) {
  const mf = path.join(dir, 'manifest.json');
  if (fs.existsSync(mf)) return JSON.parse(fs.readFileSync(mf, 'utf8'));
  // fallback: infer by reading directories/files copied
  const copied = [];
  for (const entry of fs.readdirSync(dir)) copied.push(entry);
  return { copied };
}

function cpBack(srcRel, fromDir) {
  const src = path.join(fromDir, srcRel);
  const dest = path.join(projectRoot, srcRel);
  if (!fs.existsSync(src)) return false;
  ensureDir(path.dirname(dest));
  fs.cpSync(src, dest, { recursive: true, force: true });
  return true;
}

function main() {
  const arg = process.argv[2];
  const chosen = arg && arg !== 'latest' ? path.join(snapshotsRoot, arg) : getLatestSnapshotDir();
  if (!chosen || !fs.existsSync(chosen)) {
    console.error('No snapshot found. Run: npm run backup');
    process.exit(1);
  }

  const manifest = readManifest(chosen);

  // Safety: pre-restore backup
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const preDir = path.join(backupsRoot, 'pre-restore', stamp);
  ensureDir(preDir);
  for (const item of manifest.copied) {
    const src = path.join(projectRoot, item);
    if (fs.existsSync(src)) {
      const dest = path.join(preDir, item);
      ensureDir(path.dirname(dest));
      fs.cpSync(src, dest, { recursive: true, force: true });
    }
  }

  // Restore from snapshot
  let restored = 0;
  for (const item of manifest.copied) {
    if (cpBack(item, chosen)) restored++;
  }

  console.log(`Restored ${restored} items from snapshot: ${path.basename(chosen)}`);
  console.log(`A pre-restore backup was saved at: ${preDir}`);
}

main();