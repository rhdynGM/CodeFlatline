export function Scanlines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div 
        className="w-full h-full opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0f0 2px, #0f0 4px)',
          animation: 'scanline 8s linear infinite'
        }}
      />
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}
