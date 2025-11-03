import React, { useEffect, useState } from "react";
import { simulateNetworkLoad, logEvent, saveData, loadData } from "../lib";

interface GameEvent {
  time: string;
  message: string;
  type: "info" | "attack" | "defense" | "system";
}

export const GameFlow: React.FC = () => {
  const [logs, setLogs] = useState<GameEvent[]>([]);
  const [status, setStatus] = useState<"idle" | "attacking" | "defending" | "flatlined">("idle");
  const [cpuLoad, setCpuLoad] = useState<number>(0);

  useEffect(() => {
    const savedLogs = loadData("logs") || [];
    setLogs(savedLogs);
  }, []);

  const pushLog = (message: string, type: GameEvent["type"] = "info") => {
    const event = { time: new Date().toLocaleTimeString(), message, type };
    setLogs((prev) => {
      const updated = [...prev.slice(-40), event];
      saveData("logs", updated);
      return updated;
    });
  };

  const simulateAttack = async () => {
    if (status === "attacking") return;
    setStatus("attacking");
    pushLog("Launching malware injection...", "attack");

    for (let i = 0; i < 5; i++) {
      const load = await simulateNetworkLoad(50, 90);
      setCpuLoad(load);
      if (load > 85) pushLog("⚠️ Server overload detected!", "system");
      await new Promise((r) => setTimeout(r, 1000));
    }

    setStatus("idle");
    pushLog("Attack cycle complete.", "info");
  };

  const simulateDefense = async () => {
    if (status === "defending") return;
    setStatus("defending");
    pushLog("Deploying countermeasures...", "defense");
    const load = await simulateNetworkLoad(30, 60);
    setCpuLoad(load);
    pushLog("Firewall stabilized the load.", "system");
    setStatus("idle");
  };

  const flatlineServer = () => {
    setStatus("flatlined");
    pushLog("💀 SERVER FLATLINED — SYSTEM FAILURE", "system");
  };

  return (
    <div className="p-4 font-mono text-green-400 bg-black min-h-screen">
      <h2 className="text-xl mb-2">[ SYSTEM STATUS: {status.toUpperCase()} ]</h2>
      <p>CPU Load: {cpuLoad}%</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={simulateAttack}
          className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded"
        >
          Launch Attack
        </button>
        <button
          onClick={simulateDefense}
          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
        >
          Deploy Defense
        </button>
        <button
          onClick={flatlineServer}
          className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded"
        >
          Flatline
        </button>
      </div>
      <div className="mt-4 bg-[#0a0a0a] p-2 border border-green-700 rounded h-[300px] overflow-y-auto">
        {logs.map((log, i) => (
          <p key={i} className={`text-sm ${
            log.type === "attack" ? "text-red-400" :
            log.type === "defense" ? "text-blue-400" :
            log.type === "system" ? "text-yellow-400" : "text-green-400"
          }`}>
            [{log.time}] {log.message}
          </p>
        ))}
      </div>
    </div>
  );
};
