import { useEffect, useState } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { Skull } from 'lucide-react';

interface FlatlineScreenProps {
  onRestart: () => void;
}

export function FlatlineScreen({ onRestart }: FlatlineScreenProps) {
  const [flicker, setFlicker] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(prev => !prev);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <Scanlines />
      
      {/* Red Overlay Flash */}
      <div className={`absolute inset-0 bg-red-500/20 transition-opacity duration-150 ${flicker ? 'opacity-100' : 'opacity-0'}`} />

      {/* Static Noise Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          animation: 'noise 0.2s infinite'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Skull Icon */}
        <div className="mb-8 flex justify-center">
          <Skull 
            className={`text-red-500 ${flicker ? 'opacity-100' : 'opacity-70'}`} 
            size={120}
            style={{
              filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 0.8))'
            }}
          />
        </div>

        {/* FLATLINE Text */}
        <div className="mb-12">
          <h1 
            className={`font-mono text-9xl text-red-500 mb-4 ${flicker ? 'opacity-100' : 'opacity-80'}`}
            style={{
              textShadow: '0 0 40px rgba(239, 68, 68, 1), 0 0 20px rgba(239, 68, 68, 0.8)',
              letterSpacing: '0.2em'
            }}
          >
            FLATLINE
          </h1>
          <div className="h-1 w-full bg-red-500 animate-pulse" 
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)'
            }}
          />
        </div>

        {/* Error Messages */}
        <div className="space-y-2 mb-12 font-mono">
          <div className="text-red-500 text-xl animate-pulse">
            CRITICAL SYSTEM FAILURE
          </div>
          <div className="text-red-500/70 text-xs">
            ERROR CODE: 0xDEADBEEF
          </div>
          <div className="text-red-500/70 text-xs">
            ALL MAINFRAMES DESTROYED
          </div>
          <div className="text-red-500/70 text-xs">
            CONNECTION TERMINATED
          </div>
        </div>

        {/* Stats */}
        <div className="border-2 border-red-500 p-6 mb-8 bg-red-500/10 inline-block"
          style={{
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
          }}
        >
          <div className="grid grid-cols-3 gap-8 font-mono">
            <div>
              <div className="text-xs text-red-500/70 mb-2">SURVIVED</div>
              <div className="text-3xl text-red-500">23:14</div>
            </div>
            <div>
              <div className="text-xs text-red-500/70 mb-2">KILLS</div>
              <div className="text-3xl text-red-500">487</div>
            </div>
            <div>
              <div className="text-xs text-red-500/70 mb-2">SCORE</div>
              <div className="text-3xl text-red-500">12,340</div>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <CyberpunkButton
          onClick={onRestart}
          variant="danger"
          className="px-12 py-4 text-xl animate-pulse"
        >
          REBOOT SYSTEM
        </CyberpunkButton>

        {/* Bottom Text */}
        <div className="mt-8 text-red-500/50 font-mono text-xs">
          PRESS ANY KEY TO CONTINUE
        </div>
      </div>

      {/* Glitch Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-red-500"
            style={{
              top: `${Math.random() * 100}%`,
              opacity: flicker && Math.random() > 0.5 ? 0.5 : 0,
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)',
              animation: `glitchSlide ${0.5 + Math.random()}s linear infinite`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
        
        @keyframes glitchSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
