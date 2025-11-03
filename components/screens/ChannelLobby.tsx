import { useState } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X, Users, Lock, Globe } from 'lucide-react';

interface ChannelLobbyProps {
  onClose: () => void;
}

const guilds = [
  { id: 1, name: 'NEON SYNDICATE', members: 47, status: 'public', power: 8924 },
  { id: 2, name: 'DARK PROTOCOL', members: 89, status: 'private', power: 15230 },
  { id: 3, name: 'CYBER WOLVES', members: 34, status: 'public', power: 6712 },
  { id: 4, name: 'GHOST OPERATORS', members: 112, status: 'public', power: 23450 },
  { id: 5, name: 'DATA REAPERS', members: 56, status: 'private', power: 11890 },
  { id: 6, name: 'NEON KNIGHTS', members: 78, status: 'public', power: 18234 },
  { id: 7, name: 'VOID HACKERS', members: 23, status: 'public', power: 4567 },
  { id: 8, name: 'SYSTEM BREACH', members: 91, status: 'private', power: 19876 },
];

export function ChannelLobby({ onClose }: ChannelLobbyProps) {
  const [selectedGuild, setSelectedGuild] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen bg-black/95 flex items-center justify-center overflow-hidden">
      <Scanlines />
      
      <div className="relative w-full max-w-5xl mx-8">
        <div className="border-2 border-cyan-500 bg-black shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          {/* Header */}
          <div className="border-b border-cyan-500 p-4 bg-cyan-500/10 flex items-center justify-between">
            <div className="text-cyan-500 font-mono">
              [CHANNEL LOBBY] // GUILD DIRECTORY
            </div>
            <button 
              onClick={onClose}
              className="text-cyan-500 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Guild List */}
          <div className="p-6">
            <div className="space-y-2 max-h-[60vh] overflow-auto">
              {guilds.map((guild) => (
                <div
                  key={guild.id}
                  onClick={() => setSelectedGuild(guild.id)}
                  className={`
                    border p-4 cursor-pointer transition-all duration-200 flex items-center justify-between
                    ${selectedGuild === guild.id 
                      ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                      : 'border-green-500/50 bg-green-500/5 hover:border-green-500'
                    }
                  `}
                >
                  <div className="flex items-center gap-6 flex-1">
                    {/* Guild Icon */}
                    <div className="w-12 h-12 border border-green-500 bg-green-500/10 flex items-center justify-center">
                      <Users className="text-green-500" size={24} />
                    </div>

                    {/* Guild Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-green-500 font-mono">{guild.name}</span>
                        {guild.status === 'private' ? (
                          <Lock className="text-red-500" size={14} />
                        ) : (
                          <Globe className="text-cyan-500" size={14} />
                        )}
                      </div>
                      <div className="flex gap-6 font-mono text-xs">
                        <span className="text-cyan-500">MEMBERS: {guild.members}</span>
                        <span className="text-yellow-500">POWER: {guild.power.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`
                      px-3 py-1 border font-mono text-xs
                      ${guild.status === 'private' 
                        ? 'border-red-500 text-red-500 bg-red-500/10' 
                        : 'border-green-500 text-green-500 bg-green-500/10'
                      }
                    `}>
                      {guild.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="border-t border-cyan-500 p-6 bg-cyan-500/5">
            <div className="flex items-center justify-between">
              <div className="text-green-500 font-mono text-xs">
                {selectedGuild 
                  ? `SELECTED: ${guilds.find(g => g.id === selectedGuild)?.name}`
                  : 'SELECT A GUILD TO JOIN OR CREATE YOUR OWN'
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
                  variant="secondary"
                >
                  Create Guild
                </CyberpunkButton>
                <CyberpunkButton
                  disabled={!selectedGuild}
                  className={!selectedGuild ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Join Channel
                </CyberpunkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
