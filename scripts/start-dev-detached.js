const { spawn } = require("node:child_process");
const { createWriteStream, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const cwd = join(__dirname, "..");
const node = process.execPath;
const nextCli = join(cwd, "node_modules", "next", "dist", "bin", "next");
const out = createWriteStream(join(cwd, ".next-dev.out.log"), { flags: "w" });
const err = createWriteStream(join(cwd, ".next-dev.err.log"), { flags: "w" });

const child = spawn(node, [nextCli, "dev", "--webpack"], {
  cwd,
  detached: true,
  stdio: ["ignore", "pipe", "pipe"],
  windowsHide: true
});

child.stdout.pipe(out);
child.stderr.pipe(err);
child.unref();
writeFileSync(join(cwd, ".next-dev.pid"), String(child.pid));
