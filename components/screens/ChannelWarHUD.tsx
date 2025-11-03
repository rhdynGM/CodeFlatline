import { useState, useEffect } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X, Shield, Zap, Target } from 'lucide-react';

interface ChannelWarHUDProps {
  onClose: () => void;
}

export function ChannelWarHUD({ onClose }: ChannelWarHUDProps) {
  const [allyHealth, setAllyHealth] = useState(78);
  const [enemyHealth, setEnemyHealth] = useState(65);
  const [tickCount, setTickCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickCount(prev => prev + 1);
      // Simulate damage
      if (Math.random() > 0.5) {
        setEnemyHealth(prev => Math.max(0, prev - Math.floor(Math.random() * 3)));
      } else {
        setAllyHealth(prev => Math.max(0, prev - Math.floor(Math.random() * 2)));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Scanlines />
      
      {/* Header */}
      <div className="border-b border-red-500 p-4 bg-black/80 flex items-center justify-between">
        <div className="text-red-500 font-mono animate-pulse">
          [CHANNEL WAR] // ACTIVE CONFLICT
        </div>
        <div className="flex items-center gap-6">
          <span className="text-green-500 font-mono text-xs">TICK: {tickCount}</span>
          <button 
            onClick={onClose}
            className="text-red-500 hover:text-cyan-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Battle View */}
      <div className="h-[calc(100vh-80px)] flex">
        {/* Allied Mainframe */}
        <div className="w-1/2 border-r border-green-500 p-8 bg-gradient-to-r from-green-500/10 to-transparent">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-green-500" size={32} />
            <div>
              <div className="text-green-500 font-mono">ALLIED MAINFRAME</div>
              <div className="text-xs text-green-700 font-mono">NEON SYNDICATE</div>
            </div>
          </div>

          {/* Health Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-500 font-mono text-xs">INTEGRITY</span>
              <span className="text-cyan-500 font-mono">{allyHealth}%</span>
            </div>
            <div className="w-full bg-black border border-green-500 h-8 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-green-500 transition-all duration-500"
                style={{ 
                  width: `${allyHealth}%`,
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-green-500 font-mono text-xs">
                {allyHealth > 0 ? 'OPERATIONAL' : 'CRITICAL'}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="border border-green-500/50 p-4 bg-green-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-green-500" size={16} />
                <span className="text-green-500 font-mono text-xs">ACTIVE UNITS</span>
              </div>
              <div className="text-cyan-500 font-mono">23 BOTS DEPLOYED</div>
            </div>

            <div className="border border-green-500/50 p-4 bg-green-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-green-500" size={16} />
                <span className="text-green-500 font-mono text-xs">FIREPOWER</span>
              </div>
              <div className="text-cyan-500 font-mono">8,450 DPS</div>
            </div>

            <div className="border border-green-500/50 p-4 bg-green-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="text-green-500" size={16} />
                <span className="text-green-500 font-mono text-xs">DEFENSES</span>
              </div>
              <div className="text-cyan-500 font-mono">SHIELDS AT 67%</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <CyberpunkButton className="w-full">
              Deploy Reinforcements
            </CyberpunkButton>
            <CyberpunkButton variant="secondary" className="w-full">
              Activate Shields
            </CyberpunkButton>
          </div>
        </div>

        {/* Enemy Mainframe */}
        <div className="w-1/2 p-8 bg-gradient-to-l from-red-500/10 to-transparent">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-red-500" size={32} />
            <div>
              <div className="text-red-500 font-mono">ENEMY MAINFRAME</div>
              <div className="text-xs text-red-700 font-mono">DARK PROTOCOL</div>
            </div>
          </div>

          {/* Health Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-500 font-mono text-xs">INTEGRITY</span>
              <span className="text-cyan-500 font-mono">{enemyHealth}%</span>
            </div>
            <div className="w-full bg-black border border-red-500 h-8 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-red-500 transition-all duration-500"
                style={{ 
                  width: `${enemyHealth}%`,
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-red-500 font-mono text-xs">
                {enemyHealth > 0 ? 'HOSTILE' : 'DESTROYED'}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="border border-red-500/50 p-4 bg-red-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-red-500" size={16} />
                <span className="text-red-500 font-mono text-xs">ACTIVE UNITS</span>
              </div>
              <div className="text-cyan-500 font-mono">19 BOTS DEPLOYED</div>
            </div>

            <div className="border border-red-500/50 p-4 bg-red-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-red-500" size={16} />
                <span className="text-red-500 font-mono text-xs">FIREPOWER</span>
              </div>
              <div className="text-cyan-500 font-mono">7,120 DPS</div>
            </div>

            <div className="border border-red-500/50 p-4 bg-red-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="text-red-500" size={16} />
                <span className="text-red-500 font-mono text-xs">DEFENSES</span>
              </div>
              <div className="text-cyan-500 font-mono">SHIELDS AT 42%</div>
            </div>
          </div>

          {/* Battle Log */}
          <div className="mt-8 border border-red-500/50 p-4 bg-red-500/5">
            <div className="text-red-500 font-mono text-xs mb-2">COMBAT LOG:</div>
            <div className="space-y-1 text-xs font-mono text-green-700 max-h-32 overflow-auto">
              <div>{'>'} Enemy shield generator damaged</div>
              <div>{'>'} Allied bot destroyed: UNIT-4423</div>
              <div>{'>'} Critical hit on enemy tower</div>
              <div>{'>'} Enemy reinforcements detected</div>
              <div>{'>'} Allied defenses holding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Divider Effect */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse pointer-events-none" />
    </div>
  );
}
