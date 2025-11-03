import { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchInterval?: number;
}

export function GlitchText({ children, className = '', glitchInterval = 3000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [glitchInterval]);

  return (
    <span className={`relative ${className}`}>
      <span className={isGlitching ? 'opacity-0' : ''}>{children}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-red-500"
            style={{ transform: 'translate(-2px, 0)' }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-cyan-500"
            style={{ transform: 'translate(2px, 0)' }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}
