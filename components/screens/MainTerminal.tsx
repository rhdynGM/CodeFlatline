import { useState, useEffect } from 'react';
import { Scanlines } from '../Scanlines';
import { GlitchText } from '../GlitchText';
import { CyberpunkButton } from '../CyberpunkButton';
import { User } from 'lucide-react';
import type { Screen } from '../../App';
import type { ProfileData } from './ProfileSetup';

interface MainTerminalProps {
  onNavigate: (screen: Screen) => void;
  userProfile?: ProfileData | null;
}

const logMessages = [
  { time: '14:23:41', level: 'INFO', message: 'Tower Alpha defenses at 87%' },
  { time: '14:23:45', level: 'WARN', message: 'Incoming data packet from unknown source' },
  { time: '14:23:52', level: 'INFO', message: 'Bot deployment successful: Unit-7734' },
  { time: '14:24:01', level: 'ERROR', message: 'VIRUS DETECTED: Sector 7-G' },
  { time: '14:24:12', level: 'INFO', message: 'Guild message: Raid party forming' },
  { time: '14:24:23', level: 'INFO', message: 'Resource generation +250 credits' },
];

export function MainTerminal({ onNavigate, userProfile }: MainTerminalProps) {
  const [logs, setLogs] = useState(logMessages);
  const [command, setCommand] = useState('');
  const [towerHealth, setTowerHealth] = useState({ alpha: 87, beta: 92 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: Math.random() > 0.7 ? 'WARN' : 'INFO',
        message: `System check: All nodes responding`
      };
      setLogs(prev => [...prev.slice(-5), newLog]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.toLowerCase() === 'deploy') onNavigate('deploy');
    if (command.toLowerCase() === 'upgrade') onNavigate('upgrade');
    if (command.toLowerCase() === 'market') onNavigate('market');
    if (command.toLowerCase() === 'flatline') onNavigate('flatline');
    setCommand('');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Scanlines />
      
      {/* Header */}
      <div className="border-b border-green-500 p-4 bg-black/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-green-500 font-mono">
              <GlitchText>CODE:FLATLINE</GlitchText>
              <span className="ml-4 text-xs text-green-700">// MAINFRAME TERMINAL</span>
            </div>
            
            {/* User Profile Display */}
            {userProfile && (
              <div className="flex items-center gap-2 border-l border-green-500/30 pl-4">
                <div className="w-8 h-8 border border-cyan-500 bg-black overflow-hidden flex items-center justify-center">
                  {userProfile.photoUrl ? (
                    <img 
                      src={userProfile.photoUrl} 
                      alt={userProfile.nickname} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-cyan-500" />
                  )}
                </div>
                <div className="font-mono">
                  <div className="text-cyan-500 text-xs">{userProfile.nickname}</div>
                  {userProfile.status && (
                    <div className="text-green-700 text-[10px]">{userProfile.status}</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 text-xs font-mono">
            <span className="text-cyan-500">UPTIME: 47:23:11</span>
            <span className="text-green-500">CREDITS: 2,450</span>
            <span className="text-red-500 animate-pulse">THREATS: 1</span>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Tower Status */}
        <div className="w-1/2 border-r border-green-500 p-6">
          <h2 className="text-green-500 font-mono mb-6 border-b border-green-500/30 pb-2">
            [TOWER STATUS]
          </h2>
          
          <div className="space-y-6">
            {/* Tower Alpha */}
            <div className="border border-green-500/50 p-4 bg-green-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-500 font-mono">TOWER ALPHA</span>
                <span className="text-cyan-500 font-mono">{towerHealth.alpha}%</span>
              </div>
              <div className="w-full bg-black border border-green-500/30 h-4 relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-green-500"
                  style={{ 
                    width: `${towerHealth.alpha}%`,
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-green-700 font-mono">
                DEFENSES: ACTIVE // BOTS: 7 // THREATS: 0
              </div>
            </div>

            {/* Tower Beta */}
            <div className="border border-green-500/50 p-4 bg-green-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-500 font-mono">TOWER BETA</span>
                <span className="text-cyan-500 font-mono">{towerHealth.beta}%</span>
              </div>
              <div className="w-full bg-black border border-green-500/30 h-4 relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-green-500"
                  style={{ 
                    width: `${towerHealth.beta}%`,
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-green-700 font-mono">
                DEFENSES: ACTIVE // BOTS: 5 // THREATS: 0
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-3">
              <CyberpunkButton 
                onClick={() => onNavigate('deploy')}
                className="w-full"
              >
                Deploy Units
              </CyberpunkButton>
              <CyberpunkButton 
                onClick={() => onNavigate('upgrade')}
                variant="secondary"
                className="w-full"
              >
                Upgrade Bench
              </CyberpunkButton>
              <CyberpunkButton 
                onClick={() => onNavigate('network')}
                variant="secondary"
                className="w-full"
              >
                Network Grid
              </CyberpunkButton>
            </div>
          </div>
        </div>

        {/* System Log */}
        <div className="w-1/2 p-6 flex flex-col">
          <h2 className="text-green-500 font-mono mb-4 border-b border-green-500/30 pb-2">
            [SYSTEM LOG]
          </h2>
          
          <div className="flex-1 overflow-auto space-y-2 font-mono text-xs mb-4">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-cyan-500">{log.time}</span>
                <span className={
                  log.level === 'ERROR' ? 'text-red-500' :
                  log.level === 'WARN' ? 'text-yellow-500' :
                  'text-green-500'
                }>
                  [{log.level}]
                </span>
                <span className="text-green-700">{log.message}</span>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CyberpunkButton 
              onClick={() => onNavigate('lobby')}
              variant="secondary"
              glow={false}
            >
              Channels
            </CyberpunkButton>
            <CyberpunkButton 
              onClick={() => onNavigate('leaderboard')}
              variant="secondary"
              glow={false}
            >
              Rankings
            </CyberpunkButton>
            <CyberpunkButton 
              onClick={() => onNavigate('market')}
              variant="secondary"
              glow={false}
            >
              Market
            </CyberpunkButton>
            <CyberpunkButton 
              onClick={() => onNavigate('settings')}
              variant="secondary"
              glow={false}
            >
              Config
            </CyberpunkButton>
          </div>

          {logs.some(log => log.level === 'ERROR') && (
            <CyberpunkButton 
              onClick={() => onNavigate('virus')}
              variant="danger"
              className="w-full animate-pulse"
            >
              ⚠ VIRUS ALERT - TRACE NOW
            </CyberpunkButton>
          )}
        </div>
      </div>

      {/* Command Bar */}
      <div className="absolute bottom-0 w-full border-t border-green-500 bg-black/90 p-4">
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-green-500 font-mono">{'>'}</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command... (try: deploy, upgrade, market, flatline)"
            className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono placeholder-green-700"
            style={{ textShadow: '0 0 5px rgba(34, 197, 94, 0.5)' }}
          />
          <span className="text-green-500 font-mono animate-pulse">▮</span>
        </form>
      </div>
    </div>
  );
}
