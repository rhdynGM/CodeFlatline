// src/lib/networkSim.ts
// Small simulation utilities to model remote targets and simple AI defenders.
// This is intentionally tiny and deterministic enough for local single-player tests.

export type RemoteServer = {
  id: string;
  firewall: number; // 0..100
  cpu: number;      // 0..100
  ram: number;      // 0..100
  load: number;     // 0..100
  status: 'online'|'flatline'|'offline';
};

export function makeTarget(id = 'target-001'): RemoteServer {
  // Create a pseudo-random but reproducible target based on id
  const seed = Array.from(id).reduce((s,c)=>s + c.charCodeAt(0), 0);
  const firewall = 40 + (seed % 40); // 40..79
  const cpu = 20 + (seed % 50);      // 20..69
  const ram = 8 + (seed % 32);       // 8..39
  return { id, firewall, cpu, ram, load: 5, status: 'online' };
}

// Simulate defending responses; returns modifier in range [-0.3 .. +0.3]
export function defenderModifier(server: RemoteServer) {
  const base = (server.firewall / 100) * 0.5;
  // small randomness
  return base + ((Math.random() - 0.5) * 0.2);
}
