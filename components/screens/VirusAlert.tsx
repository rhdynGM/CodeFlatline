import { useState, useEffect } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X, AlertTriangle, Skull, Zap } from 'lucide-react';

interface VirusAlertProps {
  onClose: () => void;
}

export function VirusAlert({ onClose }: VirusAlertProps) {
  const [tracing, setTracing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [threat, setThreat] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreat(prev => Math.min(99, prev + Math.random() * 2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTrace = () => {
    setTracing(true);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onClose, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="relative w-full h-screen bg-black/95 flex items-center justify-center overflow-hidden">
      <Scanlines />
      
      {/* Red Alert Overlay */}
      <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />

      {/* Popup Window */}
      <div className="relative w-full max-w-3xl mx-8">
        <div className="border-4 border-red-500 bg-black shadow-[0_0_50px_rgba(239,68,68,0.8)] animate-pulse">
          {/* Header */}
          <div className="border-b-4 border-red-500 p-6 bg-red-500/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertTriangle className="text-red-500 animate-pulse" size={40} />
              <div>
                <div className="text-red-500 font-mono text-2xl">
                  [CRITICAL ALERT]
                </div>
                <div className="text-red-500/70 font-mono text-xs">
                  HOSTILE INTRUSION DETECTED
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-red-500 hover:text-cyan-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Threat Indicator */}
            <div className="border-2 border-red-500 p-6 bg-red-500/10">
              <div className="flex items-center gap-4 mb-4">
                <Skull className="text-red-500 animate-pulse" size={48} />
                <div className="flex-1">
                  <div className="text-red-500 font-mono mb-2">VIRUS TYPE: DARKNET.EXE</div>
                  <div className="text-xs text-red-500/70 font-mono">
                    ORIGIN: UNKNOWN // SECTOR: 7-G
                  </div>
                </div>
              </div>

              {/* Threat Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-500 font-mono text-xs">THREAT LEVEL</span>
                  <span className="text-red-500 font-mono animate-pulse">{Math.floor(threat)}%</span>
                </div>
                <div className="w-full bg-black border-2 border-red-500 h-8 relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-red-500 transition-all duration-300"
                    style={{ 
                      width: `${threat}%`,
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-mono text-xs mix-blend-difference">
                    CRITICAL
                  </div>
                </div>
              </div>
            </div>

            {/* Affected Systems */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-red-500/50 p-4 bg-red-500/5">
                <div className="text-red-500 font-mono text-xs mb-2">INFECTED FILES:</div>
                <div className="text-red-500 font-mono text-2xl">47</div>
              </div>
              <div className="border border-red-500/50 p-4 bg-red-500/5">
                <div className="text-red-500 font-mono text-xs mb-2">COMPROMISED NODES:</div>
                <div className="text-red-500 font-mono text-2xl">12</div>
              </div>
              <div className="border border-red-500/50 p-4 bg-red-500/5">
                <div className="text-red-500 font-mono text-xs mb-2">DATA LOSS:</div>
                <div className="text-red-500 font-mono text-2xl">3.2 GB</div>
              </div>
              <div className="border border-red-500/50 p-4 bg-red-500/5">
                <div className="text-red-500 font-mono text-xs mb-2">ESTIMATED DAMAGE:</div>
                <div className="text-yellow-500 font-mono text-2xl">8,400 CR</div>
              </div>
            </div>

            {/* Active Scan */}
            <div className="border-2 border-red-500/50 p-4 bg-black">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="text-red-500 animate-pulse" size={16} />
                <span className="text-red-500 font-mono text-xs">ACTIVE SCAN LOG:</span>
              </div>
              <div className="space-y-1 text-xs font-mono max-h-32 overflow-auto">
                <div className="text-red-500">{'>'} Malicious process detected: darknet.exe</div>
                <div className="text-red-500">{'>'} Backdoor connection to IP: 192.168.666.13</div>
                <div className="text-red-500">{'>'} Encryption breach on Tower Beta</div>
                <div className="text-red-500">{'>'} Firewall penetration attempt blocked</div>
                <div className="text-red-500">{'>'} Data exfiltration in progress</div>
                <div className="text-red-500">{'>'} System privileges escalated</div>
                <div className="text-yellow-500">{'>'} WARNING: Spreading to connected nodes</div>
              </div>
            </div>

            {/* Trace Progress */}
            {tracing && (
              <div className="border-2 border-cyan-500 p-4 bg-cyan-500/10">
                <div className="text-cyan-500 font-mono text-xs mb-2">TRACING SOURCE...</div>
                <div className="w-full bg-black border border-cyan-500 h-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-cyan-500 transition-all duration-200"
                    style={{ 
                      width: `${progress}%`,
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
                    }}
                  />
                </div>
                <div className="text-xs text-cyan-500 font-mono mt-2">
                  {progress < 100 ? 'ANALYZING NETWORK TRAFFIC...' : 'TRACE COMPLETE'}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="border-t-4 border-red-500 p-6 bg-red-500/10">
            <div className="flex gap-4">
              <CyberpunkButton
                onClick={onClose}
                variant="secondary"
                glow={false}
                className="flex-1"
              >
                Quarantine
              </CyberpunkButton>
              <CyberpunkButton
                onClick={handleTrace}
                variant="danger"
                className="flex-1 animate-pulse"
                disabled={tracing}
              >
                {tracing ? 'TRACING...' : 'TRACE SOURCE'}
              </CyberpunkButton>
              <CyberpunkButton
                onClick={onClose}
                className="flex-1"
              >
                Purge System
              </CyberpunkButton>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Stripes */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ef4444 10px, #ef4444 20px)'
        }}
      />
    </div>
  );
}
