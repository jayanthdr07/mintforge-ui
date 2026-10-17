/**
 * Zero-dependency ANSI color helpers for Mintforge CLI
 * Works both as a tag/string: `${c.bold}text${c.reset}`
 * and as a wrapper function:  `${c.bold("text")}`
 */

const isColorSupported =
  !("NO_COLOR" in process.env) &&
  (process.stdout.isTTY || "FORCE_COLOR" in process.env);

function color(open, close = "\x1b[0m") {
  const code = isColorSupported ? open : "";
  const end = isColorSupported ? close : "";

  const fn = function (str) {
    if (str === undefined || str === null) return code;
    return `${code}${str}${end}`;
  };

  fn.toString = () => code;
  fn[Symbol.toPrimitive] = () => code;

  return fn;
}

const c = {
  reset: color("\x1b[0m", "\x1b[0m"),
  bold: color("\x1b[1m", "\x1b[22m"),
  dim: color("\x1b[2m", "\x1b[22m"),
  italic: color("\x1b[3m", "\x1b[23m"),
  underline: color("\x1b[4m", "\x1b[24m"),
  green: color("\x1b[32m", "\x1b[39m"),
  emerald: color("\x1b[38;2;16;185;129m", "\x1b[39m"),
  cyan: color("\x1b[36m", "\x1b[39m"),
  yellow: color("\x1b[33m", "\x1b[39m"),
  red: color("\x1b[31m", "\x1b[39m"),
  magenta: color("\x1b[35m", "\x1b[39m"),
  gray: color("\x1b[90m", "\x1b[39m"),
  bgRed: color("\x1b[41m\x1b[37m\x1b[1m", "\x1b[49m\x1b[39m\x1b[22m"),
  bgGreen: color("\x1b[42m\x1b[30m\x1b[1m", "\x1b[49m\x1b[39m\x1b[22m"),
  bgYellow: color("\x1b[43m\x1b[30m\x1b[1m", "\x1b[49m\x1b[39m\x1b[22m"),
  bgEmerald: color("\x1b[48;2;16;185;129m\x1b[30m\x1b[1m", "\x1b[49m\x1b[39m\x1b[22m"),
};

module.exports = c;
