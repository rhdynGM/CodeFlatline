// src/lib/logger.ts
export type LogLevel = 'info' | 'warn' | 'error';
export type LogItem = { id: string; level: LogLevel; text: string; ts: number };

const subs = new Set<(item: LogItem) => void>();
const MAX_LINES = 1500;
let buffer: LogItem[] = [];

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

export function subscribe(cb: (item: LogItem) => void) {
  subs.add(cb);
  // replay current buffer (optional)
  buffer.forEach(cb);
  return () => subs.delete(cb);
}

export function log(level: LogLevel, text: string) {
  const item: LogItem = { id: makeId(), level, text, ts: Date.now() };
  buffer.push(item);
  if (buffer.length > MAX_LINES) buffer.shift();
  subs.forEach((cb) => {
    try { cb(item); } catch (_) {}
  });
  // also mirror to console for dev
  if (level === 'error') console.error(text);
  else console.log(text);
}

export function info(text: string) { log('info', text); }
export function warn(text: string) { log('warn', text); }
export function error(text: string) { log('error', text); }

export function getBuffer() { return buffer.slice(); }
export function clear() { buffer = []; }
