import { useState } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface TradeMarketProps {
  onClose: () => void;
}

const offers = [
  { id: 1, user: 'SHADOWHEX', offering: 'DMG AMP LVL5', requesting: '1,200 CR', type: 'offer', trend: 'up' },
  { id: 2, user: 'NEONVIPER', offering: '800 CR', requesting: 'SHIELD GEN LVL3', type: 'request', trend: 'down' },
  { id: 3, user: 'CYBERPHANTOM', offering: 'STRIKER-X BOT', requesting: '2,500 CR', type: 'offer', trend: 'up' },
  { id: 4, user: 'DATAREAPER', offering: '1,500 CR', requesting: 'HACK SUITE LVL2', type: 'request', trend: 'up' },
  { id: 5, user: 'VOIDWALKER', offering: 'FIREWALL LVL4', requesting: 'SPD BOOST LVL3', type: 'offer', trend: 'down' },
  { id: 6, user: 'NETRUNNER', offering: '45 PARTS', requesting: '600 CR', type: 'offer', trend: 'up' },
  { id: 7, user: 'GHOSTCODE', offering: '2,000 CR', requesting: 'DEFENDER-7 BOT', type: 'request', trend: 'down' },
  { id: 8, user: 'DARKBYTE', offering: 'AUTO-REPAIR LVL2', requesting: '1,800 CR', type: 'offer', trend: 'up' },
];

export function TradeMarket({ onClose }: TradeMarketProps) {
  const [selectedTrade, setSelectedTrade] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'offer' | 'request'>('all');

  const filteredOffers = filter === 'all' 
    ? offers 
    : offers.filter(o => o.type === filter);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Scanlines />
      
      {/* Header */}
      <div className="border-b border-green-500 p-4 bg-black/80 flex items-center justify-between">
        <div className="text-green-500 font-mono">
          [TRADE MARKET] // P2P EXCHANGE
        </div>
        <div className="flex items-center gap-6">
          <span className="text-green-500 font-mono text-xs">YOUR CREDITS: 2,450</span>
          <button 
            onClick={onClose}
            className="text-green-500 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Trade Listings */}
        <div className="flex-1 p-6">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`
                px-4 py-2 border font-mono text-xs transition-all
                ${filter === 'all' 
                  ? 'border-green-500 bg-green-500/20 text-green-500' 
                  : 'border-green-500/30 text-green-700 hover:border-green-500'
                }
              `}
            >
              ALL TRADES
            </button>
            <button
              onClick={() => setFilter('offer')}
              className={`
                px-4 py-2 border font-mono text-xs transition-all
                ${filter === 'offer' 
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-500' 
                  : 'border-cyan-500/30 text-cyan-700 hover:border-cyan-500'
                }
              `}
            >
              OFFERS
            </button>
            <button
              onClick={() => setFilter('request')}
              className={`
                px-4 py-2 border font-mono text-xs transition-all
                ${filter === 'request' 
                  ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500' 
                  : 'border-yellow-500/30 text-yellow-700 hover:border-yellow-500'
                }
              `}
            >
              REQUESTS
            </button>
          </div>

          {/* Trade List */}
          <div className="space-y-3 overflow-auto max-h-[calc(100vh-250px)]">
            {filteredOffers.map((trade) => (
              <div
                key={trade.id}
                onClick={() => setSelectedTrade(trade.id)}
                className={`
                  border p-4 cursor-pointer transition-all duration-200
                  ${selectedTrade === trade.id 
                    ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                    : 'border-green-500/50 bg-green-500/5 hover:border-green-500'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-green-500 font-mono text-xs">{trade.user}</div>
                    <div className={`
                      px-2 py-1 border text-xs font-mono
                      ${trade.type === 'offer' 
                        ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10' 
                        : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                      }
                    `}>
                      {trade.type.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {trade.trend === 'up' ? (
                      <TrendingUp className="text-green-500" size={16} />
                    ) : (
                      <TrendingDown className="text-red-500" size={16} />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono">
                  <div className="flex-1 text-center">
                    <div className="text-xs text-green-700 mb-1">OFFERING</div>
                    <div className="text-cyan-500">{trade.offering}</div>
                  </div>
                  <ArrowRight className="text-green-500" size={20} />
                  <div className="flex-1 text-center">
                    <div className="text-xs text-green-700 mb-1">REQUESTING</div>
                    <div className="text-yellow-500">{trade.requesting}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Details Panel */}
        <div className="w-96 border-l border-green-500 p-6 bg-black/80">
          <h3 className="text-green-500 font-mono mb-6 border-b border-green-500/30 pb-2">
            TRADE DETAILS
          </h3>

          {selectedTrade ? (
            <div className="space-y-4">
              {(() => {
                const trade = offers.find(t => t.id === selectedTrade);
                if (!trade) return null;

                return (
                  <>
                    <div className="border border-green-500/50 p-4 bg-green-500/5">
                      <div className="text-green-500 font-mono mb-2">TRADER INFO</div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-green-700">USER:</span>
                          <span className="text-cyan-500">{trade.user}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">RATING:</span>
                          <span className="text-green-500">★★★★☆</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">TRADES:</span>
                          <span className="text-yellow-500">{Math.floor(Math.random() * 100 + 20)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-cyan-500/50 p-4 bg-cyan-500/5">
                      <div className="text-cyan-500 font-mono text-xs mb-3">TRADE OFFER:</div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-green-700 mb-1">THEY OFFER:</div>
                          <div className="text-green-500 font-mono">{trade.offering}</div>
                        </div>
                        <div className="border-t border-cyan-500/30 pt-3">
                          <div className="text-xs text-green-700 mb-1">THEY WANT:</div>
                          <div className="text-yellow-500 font-mono">{trade.requesting}</div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-green-500/50 p-4 bg-green-500/5">
                      <div className="text-green-500 font-mono text-xs mb-3">MARKET VALUE:</div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-green-700">Fair Price:</span>
                          <span className="text-green-500">✓ Match</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Trend:</span>
                          <span className={trade.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                            {trade.trend === 'up' ? '↑ Rising' : '↓ Falling'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <CyberpunkButton className="w-full">
                        Accept Trade
                      </CyberpunkButton>
                      <CyberpunkButton variant="secondary" className="w-full">
                        Counter Offer
                      </CyberpunkButton>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-green-700 font-mono text-xs">
              SELECT A TRADE TO VIEW DETAILS
            </div>
          )}

          {/* Create Trade */}
          <div className="mt-8 pt-6 border-t border-green-500/30">
            <CyberpunkButton 
              variant="secondary" 
              className="w-full"
            >
              + Create Trade Offer
            </CyberpunkButton>
          </div>

          {/* Market Stats */}
          <div className="mt-6 border border-green-500/30 p-4 bg-green-500/5">
            <div className="text-green-500 font-mono text-xs mb-3">MARKET STATS:</div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-green-700">Active Trades:</span>
                <span className="text-cyan-500">{offers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Volume (24h):</span>
                <span className="text-yellow-500">47,230 CR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Avg. Price:</span>
                <span className="text-green-500">1,340 CR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
