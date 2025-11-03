import { useState } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X, Server, Skull, Shield, AlertTriangle } from 'lucide-react';

interface NetworkGridProps {
  onClose: () => void;
}

const hexNodes = [
  { id: 1, x: 2, y: 1, type: 'ally', name: 'NODE-Alpha', status: 'secure' },
  { id: 2, x: 3, y: 1, type: 'neutral', name: 'HUB-7734', status: 'contested' },
  { id: 3, x: 4, y: 1, type: 'enemy', name: 'RED-Server', status: 'hostile' },
  { id: 4, x: 1, y: 2, type: 'ally', name: 'NODE-Beta', status: 'secure' },
  { id: 5, x: 2, y: 2, type: 'ally', name: 'CORE-Prime', status: 'secure' },
  { id: 6, x: 3, y: 2, type: 'neutral', name: 'DATA-Node', status: 'available' },
  { id: 7, x: 4, y: 2, type: 'enemy', name: 'DARK-Hub', status: 'hostile' },
  { id: 8, x: 5, y: 2, type: 'enemy', name: 'NODE-666', status: 'hostile' },
  { id: 9, x: 2, y: 3, type: 'neutral', name: 'FREE-Port', status: 'available' },
  { id: 10, x: 3, y: 3, type: 'neutral', name: 'RELAY-99', status: 'contested' },
  { id: 11, x: 4, y: 3, type: 'enemy', name: 'VOID-Core', status: 'hostile' },
  { id: 12, x: 1, y: 4, type: 'ally', name: 'BACKUP-1', status: 'secure' },
  { id: 13, x: 2, y: 4, type: 'ally', name: 'SAFE-Zone', status: 'secure' },
  { id: 14, x: 3, y: 4, type: 'neutral', name: 'TRADE-Hub', status: 'available' },
];

export function NetworkGrid({ onClose }: NetworkGridProps) {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const selected = hexNodes.find(n => n.id === selectedNode);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'ally': return 'green';
      case 'enemy': return 'red';
      default: return 'cyan';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'ally': return <Shield size={20} />;
      case 'enemy': return <Skull size={20} />;
      default: return <Server size={20} />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Scanlines />
      
      {/* Header */}
      <div className="border-b border-cyan-500 p-4 bg-black/80 flex items-center justify-between">
        <div className="text-cyan-500 font-mono">
          [NETWORK GRID] // SERVER MAP
        </div>
        <button 
          onClick={onClose}
          className="text-cyan-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Hex Grid */}
        <div className="flex-1 p-8 flex items-center justify-center relative overflow-auto">
          <div className="relative">
            {hexNodes.map((node) => {
              const color = getNodeColor(node.type);
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="absolute cursor-pointer transition-all duration-200 group"
                  style={{
                    left: `${node.x * 100}px`,
                    top: `${node.y * 90}px`,
                    transform: node.y % 2 === 0 ? 'translateX(50px)' : 'translateX(0)'
                  }}
                >
                  {/* Hexagon */}
                  <div className={`
                    relative w-20 h-20 flex items-center justify-center
                  `}>
                    <svg viewBox="0 0 100 100" className="absolute inset-0">
                      <polygon
                        points="50 1 95 25 95 75 50 99 5 75 5 25"
                        className={`
                          stroke-2 transition-all
                          ${selectedNode === node.id 
                            ? `fill-${color}-500/30 stroke-${color}-500` 
                            : `fill-${color}-500/10 stroke-${color}-500/50 group-hover:stroke-${color}-500`
                          }
                        `}
                        style={{
                          filter: selectedNode === node.id 
                            ? `drop-shadow(0 0 10px var(--${color}-500))` 
                            : 'none'
                        }}
                      />
                    </svg>
                    <div className={`relative z-10 text-${color}-500`}>
                      {getNodeIcon(node.type)}
                    </div>
                  </div>
                  
                  {/* Node Name */}
                  <div className={`
                    text-xs font-mono text-center mt-1 text-${color}-500
                    ${selectedNode === node.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}
                  `}>
                    {node.name}
                  </div>

                  {/* Status Indicator */}
                  {node.status === 'contested' && (
                    <div className="absolute -top-1 -right-1">
                      <AlertTriangle className="text-yellow-500 animate-pulse" size={12} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-80 border-l border-cyan-500 p-6 bg-black/80">
          <h3 className="text-cyan-500 font-mono mb-6 border-b border-cyan-500/30 pb-2">
            NODE INFO
          </h3>

          {selected ? (
            <div className="space-y-4">
              <div className="border border-green-500/50 p-4 bg-green-500/5">
                <div className="text-green-500 font-mono mb-2">{selected.name}</div>
                <div className="text-xs text-green-700 font-mono">
                  ID: {selected.id.toString().padStart(4, '0')}
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-cyan-500">TYPE:</span>
                  <span className={`text-${getNodeColor(selected.type)}-500 uppercase`}>
                    {selected.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500">STATUS:</span>
                  <span className="text-green-500 uppercase">{selected.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500">COORDS:</span>
                  <span className="text-green-700">{selected.x},{selected.y}</span>
                </div>
              </div>

              <div className="border border-cyan-500/50 p-4 bg-cyan-500/5 mt-6">
                <div className="text-cyan-500 font-mono text-xs mb-3">RESOURCES:</div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-green-700">Credits/hr:</span>
                    <span className="text-yellow-500">+{Math.floor(Math.random() * 200 + 50)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Data/hr:</span>
                    <span className="text-cyan-500">+{Math.floor(Math.random() * 100 + 25)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-6">
                {selected.type === 'neutral' && (
                  <CyberpunkButton className="w-full">
                    Capture Node
                  </CyberpunkButton>
                )}
                {selected.type === 'enemy' && (
                  <CyberpunkButton variant="danger" className="w-full">
                    Attack Node
                  </CyberpunkButton>
                )}
                {selected.type === 'ally' && (
                  <CyberpunkButton variant="secondary" className="w-full">
                    Fortify Node
                  </CyberpunkButton>
                )}
              </div>
            </div>
          ) : (
            <div className="text-green-700 font-mono text-xs">
              SELECT A NODE TO VIEW DETAILS
            </div>
          )}

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-cyan-500/30">
            <div className="text-cyan-500 font-mono text-xs mb-3">LEGEND:</div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Shield className="text-green-500" size={14} />
                <span className="text-green-700">Allied Server</span>
              </div>
              <div className="flex items-center gap-2">
                <Skull className="text-red-500" size={14} />
                <span className="text-green-700">Enemy Server</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="text-cyan-500" size={14} />
                <span className="text-green-700">Neutral Node</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
