const { openSync } = require("node:fs");
const { spawn } = require("node:child_process");
const { join } = require("node:path");

const cwd = join(__dirname, "..");
const out = openSync(join(cwd, ".next-dev.out.log"), "a");
const err = openSync(join(cwd, ".next-dev.err.log"), "a");

const port = process.argv[2] ?? "3000";

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", port],
  {
    cwd,
    detached: true,
    stdio: ["ignore", out, err],
    env: {
      ...process.env,
      PATH: `${join(process.execPath, "..")};${process.env.PATH ?? ""}`,
      Path: `${join(process.execPath, "..")};${process.env.Path ?? ""}`
    }
  }
);

child.unref();

console.log(child.pid);
