import { useEffect, useState } from 'react';
import { Scanlines } from '../Scanlines';

const bootMessages = [
  'INITIALIZING CODE:FLATLINE OS v2.47.3',
  'LOADING KERNEL MODULES...',
  'MOUNTING ENCRYPTED FILESYSTEMS...',
  'CHECKING NETWORK INTERFACES...',
  'ESTABLISHING SECURE TUNNELS...',
  'LOADING WEAPON SYSTEMS...',
  'INITIALIZING MAINFRAME CONNECTION...',
  'SCANNING FOR HOSTILE INTRUSIONS...',
  'ALL SYSTEMS NOMINAL',
  'WELCOME, OPERATOR',
  '',
  'BOOTING TERMINAL...'
];

export function BootScreen() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setVisibleLines(prev => [...prev, bootMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <Scanlines />
      
      <div className="w-full max-w-4xl px-8 font-mono">
        {visibleLines.map((line, index) => (
          <div
            key={index}
            className="text-green-500 mb-2 animate-pulse"
            style={{
              textShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
              animationDelay: `${index * 0.1}s`,
              animationDuration: '0.5s'
            }}
          >
            <span className="text-green-700">[{String(index).padStart(2, '0')}]</span> {line}
          </div>
        ))}
        <div className="text-green-500 animate-pulse inline-block">▮</div>
      </div>

      <div className="absolute bottom-8 left-8 text-green-500/50 font-mono text-xs">
        CODE:FLATLINE // UNAUTHORIZED ACCESS PROHIBITED
      </div>
    </div>
  );
}
