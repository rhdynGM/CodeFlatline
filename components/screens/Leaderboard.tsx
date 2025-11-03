import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X, Trophy, Medal, Award, Crown } from 'lucide-react';

interface LeaderboardProps {
  onClose: () => void;
}

const players = [
  { rank: 1, name: 'SHADOWHEX', score: 45230, kills: 892, badge: 'legend' },
  { rank: 2, name: 'NEONVIPER', score: 42150, kills: 834, badge: 'master' },
  { rank: 3, name: 'DATAREAPER', score: 38940, kills: 756, badge: 'master' },
  { rank: 4, name: 'CYBERPHANTOM', score: 35670, kills: 701, badge: 'elite' },
  { rank: 5, name: 'VOIDWALKER', score: 33450, kills: 678, badge: 'elite' },
  { rank: 6, name: 'GHOSTPROTOCOL', score: 31220, kills: 623, badge: 'elite' },
  { rank: 7, name: 'DARKBYTE', score: 28900, kills: 589, badge: 'veteran' },
  { rank: 8, name: 'NEUROMANCER', score: 26780, kills: 534, badge: 'veteran' },
  { rank: 9, name: 'CODEBREAKER', score: 24560, kills: 498, badge: 'veteran' },
  { rank: 10, name: 'SYNTHETICA', score: 22340, kills: 467, badge: 'veteran' },
  { rank: 11, name: 'HACKMASTER', score: 20120, kills: 423, badge: 'advanced' },
  { rank: 12, name: 'NETRUNNER', score: 18900, kills: 389, badge: 'advanced' },
];

export function Leaderboard({ onClose }: LeaderboardProps) {
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'legend': return <Crown className="text-yellow-500" size={16} />;
      case 'master': return <Trophy className="text-cyan-500" size={16} />;
      case 'elite': return <Award className="text-green-500" size={16} />;
      default: return <Medal className="text-green-700" size={16} />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'legend': return 'yellow';
      case 'master': return 'cyan';
      case 'elite': return 'green';
      default: return 'green';
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Scanlines />
      
      {/* Header */}
      <div className="border-b border-green-500 p-4 bg-black/80 flex items-center justify-between">
        <div className="text-green-500 font-mono">
          [GLOBAL RANKINGS] // TOP OPERATORS
        </div>
        <button 
          onClick={onClose}
          className="text-green-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-8 h-[calc(100vh-80px)] overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {/* 2nd Place */}
            <div className="pt-12">
              <div className="border-2 border-cyan-500 p-6 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <div className="text-center mb-4">
                  <Trophy className="text-cyan-500 mx-auto mb-2" size={40} />
                  <div className="text-6xl font-mono text-cyan-500 mb-2">#2</div>
                </div>
                <div className="text-center space-y-2 font-mono">
                  <div className="text-cyan-500">{players[1].name}</div>
                  <div className="text-xs text-green-700">
                    SCORE: {players[1].score.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-700">
                    KILLS: {players[1].kills}
                  </div>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div>
              <div className="border-2 border-yellow-500 p-6 bg-yellow-500/10 shadow-[0_0_30px_rgba(234,179,8,0.6)]">
                <div className="text-center mb-4">
                  <Crown className="text-yellow-500 mx-auto mb-2 animate-pulse" size={48} />
                  <div className="text-7xl font-mono text-yellow-500 mb-2">#1</div>
                </div>
                <div className="text-center space-y-2 font-mono">
                  <div className="text-yellow-500">{players[0].name}</div>
                  <div className="text-xs text-green-700">
                    SCORE: {players[0].score.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-700">
                    KILLS: {players[0].kills}
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="pt-12">
              <div className="border-2 border-green-500 p-6 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                <div className="text-center mb-4">
                  <Award className="text-green-500 mx-auto mb-2" size={40} />
                  <div className="text-6xl font-mono text-green-500 mb-2">#3</div>
                </div>
                <div className="text-center space-y-2 font-mono">
                  <div className="text-green-500">{players[2].name}</div>
                  <div className="text-xs text-green-700">
                    SCORE: {players[2].score.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-700">
                    KILLS: {players[2].kills}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of Rankings */}
          <div className="border border-green-500 bg-black/50">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-green-500 bg-green-500/10 font-mono text-xs text-green-500">
              <div>RANK</div>
              <div className="col-span-2">OPERATOR</div>
              <div className="text-right">SCORE</div>
              <div className="text-right">KILLS</div>
            </div>

            {/* Table Rows */}
            {players.slice(3).map((player, idx) => (
              <div
                key={player.rank}
                className={`
                  grid grid-cols-5 gap-4 p-4 border-b border-green-500/30 font-mono text-xs
                  hover:bg-green-500/10 transition-colors
                  ${idx % 2 === 0 ? 'bg-green-500/5' : ''}
                `}
              >
                <div className="text-cyan-500 flex items-center gap-2">
                  #{player.rank}
                </div>
                <div className="col-span-2 text-green-500 flex items-center gap-2">
                  {getBadgeIcon(player.badge)}
                  {player.name}
                </div>
                <div className="text-yellow-500 text-right">
                  {player.score.toLocaleString()}
                </div>
                <div className="text-red-500 text-right">
                  {player.kills}
                </div>
              </div>
            ))}
          </div>

          {/* Your Rank */}
          <div className="mt-8 border-2 border-cyan-500 p-6 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <div className="flex items-center justify-between font-mono">
              <div className="flex items-center gap-4">
                <div className="text-cyan-500">YOUR RANK: #47</div>
                <div className="text-green-500">NETCRAWLER</div>
              </div>
              <div className="flex gap-8 text-xs">
                <div className="text-yellow-500">SCORE: 12,340</div>
                <div className="text-red-500">KILLS: 234</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CyberpunkButton onClick={onClose} variant="secondary" className="w-full">
              Back to Terminal
            </CyberpunkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
