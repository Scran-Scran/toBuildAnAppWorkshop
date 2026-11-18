// npm run check-solutions
// Copies the project to a temp folder, overlays /solutions on top, and runs every test.
// Instructors: run this after changing a test or a solution to make sure they still agree.
import { cpSync, mkdtempSync, symlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const work = mkdtempSync(path.join(tmpdir(), "game-logger-solutions-"));

cpSync(root, work, {
  recursive: true,
  filter: (src) => !/[\\/](node_modules|\.git)([\\/]|$)/.test(src) && !src.endsWith("games.json"),
});
cpSync(path.join(root, "solutions"), work, { recursive: true }); // overlay
if (existsSync(path.join(root, "node_modules"))) {
  symlinkSync(path.join(root, "node_modules"), path.join(work, "node_modules"), "junction");
}

console.log(`Running tests against solutions in ${work}\n`);
const result = spawnSync(process.execPath, ["--test"], { cwd: work, stdio: "inherit" });
process.exit(result.status ?? 1);
