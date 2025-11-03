// src/lib/storage.ts
export const STORAGE_KEY = 'flatline_v1';

export type RawState = any;

export function loadState(): RawState | null {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (!s) return null;
    return JSON.parse(s);
  } catch (err) {
    console.error('loadState error', err);
    return null;
  }
}

export function saveState(state: RawState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('saveState error', err);
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) { /* ignore */ }
}
