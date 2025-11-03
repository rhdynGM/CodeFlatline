import { useState } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X } from 'lucide-react';

interface UpgradeBenchProps {
  onClose: () => void;
}

const upgrades = [
  { id: 1, name: 'SHIELD GEN', level: 3, cost: { credits: 500, parts: 12 } },
  { id: 2, name: 'DMG AMP', level: 5, cost: { credits: 750, parts: 18 } },
  { id: 3, name: 'SPD BOOST', level: 2, cost: { credits: 400, parts: 8 } },
  { id: 4, name: 'FIREWALL', level: 4, cost: { credits: 600, parts: 15 } },
  { id: 5, name: 'HACK SUITE', level: 1, cost: { credits: 1000, parts: 25 } },
  { id: 6, name: 'STEALTH', level: 3, cost: { credits: 800, parts: 20 } },
  { id: 7, name: 'AUTO-REPAIR', level: 2, cost: { credits: 900, parts: 22 } },
  { id: 8, name: 'OVERCLOCK', level: 6, cost: { credits: 1200, parts: 30 } },
  { id: 9, name: 'EMP CORE', level: 1, cost: { credits: 1500, parts: 35 } },
];

export function UpgradeBench({ onClose }: UpgradeBenchProps) {
  const [selectedUpgrade, setSelectedUpgrade] = useState<number | null>(null);
  const [hoveredUpgrade, setHoveredUpgrade] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen bg-black/95 flex items-center justify-center overflow-hidden">
      <Scanlines />
      
      <div className="relative w-full max-w-6xl mx-8">
        <div className="border-2 border-green-500 bg-black shadow-[0_0_30px_rgba(34,197,94,0.5)]">
          {/* Header */}
          <div className="border-b border-green-500 p-4 bg-green-500/10 flex items-center justify-between">
            <div className="text-green-500 font-mono">
              [UPGRADE BENCH] // TECH TREE
            </div>
            <div className="flex items-center gap-6">
              <span className="text-cyan-500 font-mono text-xs">CREDITS: 2,450</span>
              <span className="text-yellow-500 font-mono text-xs">PARTS: 87</span>
              <button 
                onClick={onClose}
                className="text-green-500 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* 3x3 Grid */}
          <div className="p-8">
            <div className="grid grid-cols-3 gap-4">
              {upgrades.map((upgrade) => (
                <div
                  key={upgrade.id}
                  onClick={() => setSelectedUpgrade(upgrade.id)}
                  onMouseEnter={() => setHoveredUpgrade(upgrade.id)}
                  onMouseLeave={() => setHoveredUpgrade(null)}
                  className={`
                    relative border-2 p-6 cursor-pointer transition-all duration-200
                    ${selectedUpgrade === upgrade.id 
                      ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.6)]' 
                      : 'border-green-500/50 bg-green-500/5 hover:border-green-500'
                    }
                  `}
                >
                  {/* Upgrade Name */}
                  <div className="text-green-500 font-mono mb-3 border-b border-green-500/30 pb-2">
                    {upgrade.name}
                  </div>

                  {/* Level */}
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-xs text-cyan-500 font-mono">LVL:</span>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 border ${
                          i < upgrade.level 
                            ? 'bg-green-500 border-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' 
                            : 'border-green-700 bg-black'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Cost */}
                  <div className="space-y-1 font-mono text-xs">
                    <div className="text-yellow-500">
                      UPGRADE COST:
                    </div>
                    <div className="text-cyan-500 pl-2">
                      {upgrade.cost.credits} CR
                    </div>
                    <div className="text-green-700 pl-2">
                      {upgrade.cost.parts} PARTS
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {hoveredUpgrade === upgrade.id && (
                    <div className="absolute inset-0 border-2 border-cyan-500 pointer-events-none animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="border-t border-green-500 p-6 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div className="text-green-500 font-mono text-xs">
                {selectedUpgrade 
                  ? `SELECTED: ${upgrades.find(u => u.id === selectedUpgrade)?.name} // NEXT LEVEL: ${(upgrades.find(u => u.id === selectedUpgrade)?.level || 0) + 1}`
                  : 'SELECT AN UPGRADE TO VIEW DETAILS'
                }
              </div>
              <div className="flex gap-3">
                <CyberpunkButton
                  onClick={onClose}
                  variant="secondary"
                  glow={false}
                >
                  Back
                </CyberpunkButton>
                <CyberpunkButton
                  disabled={!selectedUpgrade}
                  className={!selectedUpgrade ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Craft Upgrade
                </CyberpunkButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="#22c55e" />
            <line x1="50" y1="0" x2="50" y2="50" stroke="#22c55e" strokeWidth="1" />
            <line x1="50" y1="50" x2="100" y2="50" stroke="#22c55e" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
    </div>
  );
}
