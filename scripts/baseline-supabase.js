#!/usr/bin/env node
/**
 * baseline-supabase.js
 *
 * One-time script: marks every local migration as "already applied" on Supabase
 * so Prisma stops reporting drift from pre-existing migration history.
 *
 * Usage:
 *   pnpm db:baseline:prod
 *
 * This runs `prisma migrate resolve --applied <name>` for every folder in the
 * local migrations directory, against Supabase (via .env.production).
 *
 * It is safe to re-run — if a migration is already in _prisma_migrations,
 * Prisma will simply skip it with a warning.
 *
 * DO NOT run this script after the initial baseline — it is a one-time operation.
 */

import { execSync } from "child_process";
import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const MIGRATIONS_DIR = join(ROOT, "packages/database/prisma/migrations");

// Load .env then .env.production (production creds win)
const DOTENV_FLAGS = `-e ${join(ROOT, ".env")} -e ${join(ROOT, ".env.production")}`;

function getMigrationNames() {
  return readdirSync(MIGRATIONS_DIR)
    .filter((entry) => {
      const full = join(MIGRATIONS_DIR, entry);
      return statSync(full).isDirectory(); // skip migration_lock.toml
    })
    .sort(); // chronological order
}

function resolveMigration(name) {
  const cmd = `dotenv ${DOTENV_FLAGS} -- sh -c 'DATABASE_URL=$DIRECT_URL prisma migrate resolve --applied "${name}"'`;
  console.log(`  → Resolving: ${name}`);
  try {
    execSync(cmd, { cwd: ROOT, stdio: "pipe" });
    console.log(`    ✓ Done`);
  } catch (err) {
    const stderr = err.stderr?.toString() ?? "";
    // Already resolved / already in _prisma_migrations — safe to continue
    if (stderr.includes("already been applied") || stderr.includes("already recorded")) {
      console.log(`    ↷ Already applied, skipping`);
    } else {
      console.error(`    ✗ Failed:\n${stderr}`);
      process.exit(1);
    }
  }
}

async function main() {
  console.log("┌─────────────────────────────────────────────┐");
  console.log("│  Supabase Migration Baseline (one-time)     │");
  console.log("└─────────────────────────────────────────────┘");
  console.log("");
  console.log("Target: Supabase (.env.production → DIRECT_URL)");
  console.log(`Migrations dir: ${MIGRATIONS_DIR}`);
  console.log("");

  const migrations = getMigrationNames();

  if (migrations.length === 0) {
    console.log("No migrations found. Nothing to baseline.");
    process.exit(0);
  }

  console.log(`Found ${migrations.length} migration(s) to baseline:\n`);
  migrations.forEach((m) => console.log(`  • ${m}`));
  console.log("");

  for (const name of migrations) {
    resolveMigration(name);
  }

  console.log("");
  console.log("✅ Baseline complete! Supabase migration history is now in sync.");
  console.log("   You can now run `pnpm db:deploy:prod` without drift errors.");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
