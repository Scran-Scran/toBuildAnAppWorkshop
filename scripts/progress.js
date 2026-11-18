// npm run progress  ->  a one-screen checklist of which steps are done.
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const steps = [
  ["Step 1: Read", "tests/step1-read.test.js"],
  ["Step 2: Create", "tests/step2-create.test.js"],
  ["Step 3: Update", "tests/step3-update.test.js"],
  ["Step 4: Delete", "tests/step4-delete.test.js"],
  ["Step 5: Bonus (stats bar)", "tests/step5-bonus.test.js"],
];

console.log("\nGame Logger workshop progress\n");
let done = 0;
for (const [name, file] of steps) {
  const result = spawnSync(process.execPath, ["--test", file], { cwd: root, encoding: "utf8" });
  const passed = result.status === 0;
  if (passed) done++;
  console.log(`  ${passed ? "✅" : "⬜"}  ${name}${passed ? "" : `   (run: npm run test:${steps.findIndex((s) => s[1] === file) + 1})`}`);
}
console.log(`\n${done} of ${steps.length} steps complete.\n`);
