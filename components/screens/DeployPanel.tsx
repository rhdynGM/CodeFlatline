import { useState } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X } from 'lucide-react';

interface DeployPanelProps {
  onClose: () => void;
}

const bots = [
  {
    id: 1,
    name: 'STRIKER-X',
    type: 'ASSAULT',
    damage: 450,
    speed: 8,
    cost: 300,
    color: 'red'
  },
  {
    id: 2,
    name: 'DEFENDER-7',
    type: 'TANK',
    damage: 200,
    speed: 4,
    cost: 250,
    color: 'cyan'
  },
  {
    id: 3,
    name: 'SCOUT-ALPHA',
    type: 'RECON',
    damage: 150,
    speed: 12,
    cost: 150,
    color: 'green'
  },
  {
    id: 4,
    name: 'HACKER-99',
    type: 'SUPPORT',
    damage: 100,
    speed: 6,
    cost: 400,
    color: 'yellow'
  }
];

export function DeployPanel({ onClose }: DeployPanelProps) {
  const [selectedBot, setSelectedBot] = useState<number | null>(null);

  const handleDeploy = () => {
    if (selectedBot) {
      // Deploy animation/logic here
      setTimeout(onClose, 500);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black/95 flex items-center justify-center overflow-hidden">
      <Scanlines />
      
      {/* Popup Window */}
      <div className="relative w-full max-w-5xl mx-8">
        <div className="border-2 border-cyan-500 bg-black shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          {/* Header */}
          <div className="border-b border-cyan-500 p-4 bg-cyan-500/10 flex items-center justify-between">
            <div className="text-cyan-500 font-mono">
              [DEPLOYMENT INTERFACE] // SELECT UNIT
            </div>
            <button 
              onClick={onClose}
              className="text-cyan-500 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Bot Cards Grid */}
          <div className="p-8 grid grid-cols-4 gap-6">
            {bots.map((bot) => (
              <div
                key={bot.id}
                onClick={() => setSelectedBot(bot.id)}
                className={`
                  border-2 p-4 cursor-pointer transition-all duration-200
                  ${selectedBot === bot.id 
                    ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.6)]' 
                    : 'border-green-500/50 bg-green-500/5 hover:border-green-500'
                  }
                `}
              >
                {/* Bot Icon */}
                <div className={`
                  w-full h-32 mb-4 flex items-center justify-center font-mono
                  border border-${bot.color}-500/30 bg-${bot.color}-500/10
                `}>
                  <div className={`text-5xl text-${bot.color}-500`}>
                    {bot.type === 'ASSAULT' && '⚔'}
                    {bot.type === 'TANK' && '🛡'}
                    {bot.type === 'RECON' && '👁'}
                    {bot.type === 'SUPPORT' && '⚡'}
                  </div>
                </div>

                {/* Bot Info */}
                <div className="font-mono text-xs space-y-2">
                  <div className="text-green-500 border-b border-green-500/30 pb-1">
                    {bot.name}
                  </div>
                  <div className="text-cyan-500">{bot.type}</div>
                  <div className="text-green-700">
                    DMG: {bot.damage} // SPD: {bot.speed}
                  </div>
                  <div className="text-yellow-500 mt-3 pt-2 border-t border-green-500/30">
                    COST: {bot.cost} CR
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deploy Button */}
          <div className="border-t border-cyan-500 p-6 bg-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="text-green-500 font-mono text-xs">
                {selectedBot 
                  ? `SELECTED: ${bots.find(b => b.id === selectedBot)?.name} // READY FOR DEPLOYMENT`
                  : 'SELECT A UNIT TO DEPLOY'
                }
              </div>
              <div className="flex gap-3">
                <CyberpunkButton
                  onClick={onClose}
                  variant="secondary"
                  glow={false}
                >
                  Cancel
                </CyberpunkButton>
                <CyberpunkButton
                  onClick={handleDeploy}
                  disabled={!selectedBot}
                  className={!selectedBot ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Deploy Unit
                </CyberpunkButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.5) 25%, rgba(6, 182, 212, 0.5) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.5) 75%, rgba(6, 182, 212, 0.5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.5) 25%, rgba(6, 182, 212, 0.5) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.5) 75%, rgba(6, 182, 212, 0.5) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
