import { ButtonHTMLAttributes } from 'react';

interface CyberpunkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
  glow?: boolean;
}

export function CyberpunkButton({ 
  children, 
  variant = 'primary', 
  glow = true,
  className = '',
  ...props 
}: CyberpunkButtonProps) {
  const variantStyles = {
    primary: 'border-green-500 text-green-500 hover:bg-green-500/20',
    danger: 'border-red-500 text-red-500 hover:bg-red-500/20',
    secondary: 'border-cyan-500 text-cyan-500 hover:bg-cyan-500/20'
  };

  const glowStyles = {
    primary: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    danger: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    secondary: 'shadow-[0_0_10px_rgba(6,182,212,0.5)]'
  };

  return (
    <button
      className={`
        px-4 py-2 border-2 font-mono uppercase tracking-wider
        transition-all duration-200
        ${variantStyles[variant]}
        ${glow ? glowStyles[variant] : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
