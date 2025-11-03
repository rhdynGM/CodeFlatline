// src/context/GameProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as engine from '../lib/gameEngine';
import * as logger from '../lib/logger';

type GameContextValue = {
  state: ReturnType<typeof engine.getState> | null;
  attack: (targetId?: string) => Promise<any>;
  craftFirewall: () => Promise<any>;
  startVirusWave: () => Promise<any>;
  subscribeLogs: (cb: (item: any) => void) => () => void;
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    let unsubEngine: (() => void) | null = null;
    async function boot() {
      await engine.initGame();
      setState(engine.getState());
      unsubEngine = engine.subscribe((s) => setState(s));
    }
    boot();
    return () => { if (unsubEngine) unsubEngine(); };
  }, []);

  const attack = async (targetId?: string) => {
    const res = await engine.attackTarget(targetId);
    setState(engine.getState());
    return res;
  };

  const craftFirewall = async () => {
    const res = await engine.craftFirewall();
    setState(engine.getState());
    return res;
  };

  const startVirusWave = async () => {
    const res = await engine.startVirusWave();
    setState(engine.getState());
    return res;
  };

  const subscribeLogs = (cb: (item: any) => void) => {
    return logger.subscribe(cb);
  };

  return (
    <GameContext.Provider value={{ state, attack, craftFirewall, startVirusWave, subscribeLogs }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
