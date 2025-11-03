// src/lib/gameEngine.ts
// Core engine (local) for CODE: FLATLINE
import { loadState, saveState } from './storage';
import * as logger from './logger';
import { makeTarget, defenderModifier, RemoteServer } from './networkSim';

export type ServerState = {
  cpu: number;
  ram: number;
  firewall: number;
  load: number;
  status: 'online'|'flatline'|'offline';
};

export type PlayerState = {
  id: string;
  username: string;
  credits: number;
  fragments: number;
  xp: number;
  level: number;
  server: ServerState;
  bots: Array<{ id: string; status: string }>;
};

export type GameState = {
  player: PlayerState;
  channels?: Record<string, any>;
  market?: any;
  events?: any[];
  meta?: { lastSave?: number };
};

const DEFAULT_STATE: GameState = {
  player: {
    id: 'local_user',
    username: 'anon',
    credits: 500,
    fragments: 0,
    xp: 0,
    level: 1,
    server: { cpu: 10, ram: 10, firewall: 60, load: 0, status: 'online' },
    bots: [{ id: 'bot-1', status: 'idle' }],
  },
  channels: {},
  market: {},
  events: [],
  meta: {},
};

type Subscriber = (s: GameState) => void;
const subs = new Set<Subscriber>();

function notify(s: GameState) { subs.forEach((cb) => { try { cb(s); } catch (_) {} }); }

let state: GameState = DEFAULT_STATE;

/** initialize engine: load state or set default */
export async function initGame() {
  const loaded = loadState();
  if (loaded) {
    state = { ...DEFAULT_STATE, ...loaded };
    logger.info('Loaded saved game state.');
  } else {
    state = DEFAULT_STATE;
    logger.info('Initialized new game state.');
    saveState(state);
  }
  notify(state);
  return state;
}

export function subscribe(cb: Subscriber) {
  subs.add(cb);
  cb(state);
  return () => subs.delete(cb);
}

export function getState() { return JSON.parse(JSON.stringify(state)); }

export function persist() {
  state.meta = state.meta || {};
  state.meta.lastSave = Date.now();
  saveState(state);
  logger.info('State saved.');
  notify(state);
}

/** small helper delay */
function delay(ms: number) { return new Promise(res => setTimeout(res, ms)); }

/**
 * Attack simulation (multi-stage). Updates local player state and logs progress.
 * Returns result object with success flag and rewards.
 */
export async function attackTarget(targetId = 'target-001', options?: { bots?: number }) {
  const attacker = state.player;
  logger.info(`Initiating attack on ${targetId}...`);
  // Create a simulated target server
  const target: RemoteServer = makeTarget(targetId);

  // Stage sequence with logs
  logger.info('Stage 1 — connecting to target...');
  await delay(600);
  logger.info('Stage 2 — probing ports and bypassing weak filters...');
  await delay(800);
  logger.info('Stage 3 — delivering payload...');
  await delay(1000);
  logger.info('Stage 4 — triggering overload routine...');
  await delay(900);

  // Compute chance based on attacker cpu vs defender firewall & randomness
  const attackerPower = (attacker.server.cpu / 100) + (Math.random() * 0.5);
  const defend = defenderModifier(target);
  const successProbability = Math.min(0.95, Math.max(0.05, attackerPower - defend + 0.25));

  const success = Math.random() < successProbability;

  if (success) {
    const creditsGained = Math.floor(100 + Math.random() * 400);
    const fragments = Math.random() > 0.6 ? 1 + Math.floor(Math.random()*1) : 0;
    attacker.credits += creditsGained;
    attacker.fragments += fragments;
    attacker.server.load = Math.min(100, attacker.server.load + Math.floor(Math.random() * 5));
    logger.info(`SUCCESS — target flatlined. Loot: +${creditsGained} credits${fragments?`, +${fragments} fragment(s)`:''}`);
    persist();
    notify(state);
    return { success: true, credits: creditsGained, fragments };
  } else {
    const penalty = 25 + Math.floor(Math.random() * 50);
    attacker.credits = Math.max(0, attacker.credits - penalty);
    attacker.server.load = Math.min(100, attacker.server.load + Math.floor(Math.random() * 8));
    logger.warn(`FAILED — attack blocked. Penalty: -${penalty} credits`);
    persist();
    notify(state);
    return { success: false, penalty };
  }
}

/** craft a firewall module using fragments */
export async function craftFirewall() {
  const p = state.player;
  const cost = 3;
  if (p.fragments >= cost) {
    p.fragments -= cost;
    p.server.firewall = Math.min(100, p.server.firewall + 10);
    logger.info('Craft success — Firewall +10');
    persist();
    notify(state);
    return { ok: true };
  } else {
    logger.warn('Craft failed — not enough fragments');
    return { ok: false, reason: 'not_enough_fragments' };
  }
}

/** start a short virus wave event that increases load; can cause flatline */
export async function startVirusWave() {
  logger.warn('VIRUS WAVE STARTING — triggering defenses...');
  for (let i=0;i<6;i++){
    await delay(700);
    state.player.server.load = Math.min(100, state.player.server.load + Math.floor(Math.random() * 10));
    logger.info(`Virus pulse — server load ${state.player.server.load}%`);
    notify(state);
    if (state.player.server.load >= 100) {
      state.player.server.status = 'flatline';
      logger.error('SERVER FLATLINED — emergency shutdown');
      persist();
      notify(state);
      break;
    }
  }
  persist();
  return getState();
}
