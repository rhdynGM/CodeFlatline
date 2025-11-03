import { useState } from 'react';
import { Scanlines } from '../Scanlines';
import { GlitchText } from '../GlitchText';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Save to localStorage to persist game progress
    localStorage.setItem('flatline_user_email', email);
    localStorage.setItem('flatline_logged_in', 'true');
    
    onLogin();
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <Scanlines />
      
      <div className="relative z-10 w-full max-w-md px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <GlitchText className="text-5xl mb-4">
            CODE:FLATLINE
          </GlitchText>
          <div className="text-cyan-500 font-mono text-sm">
            {isLogin ? 'LOGIN TO CONTINUE' : 'CREATE NEW ACCOUNT'}
          </div>
        </div>

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-green-500 font-mono text-sm mb-2">
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-green-500 text-green-500 font-mono px-4 py-3 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
              placeholder="operator@flatline.net"
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-green-500 font-mono text-sm mb-2">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-green-500 text-green-500 font-mono px-4 py-3 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
              placeholder="••••••••"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 font-mono text-sm px-4 py-2">
              <span className="neon-red">[ERROR]</span> {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500/10 border border-green-500 text-green-500 font-mono py-3 hover:bg-green-500/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all active:bg-green-500 active:text-black"
          >
            {isLogin ? '[ LOGIN ]' : '[ CREATE ACCOUNT ]'}
          </button>

          {/* Toggle Login/Register */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-cyan-500 font-mono text-sm hover:text-cyan-400 transition-colors"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-8 text-center">
          <div className="text-green-500/50 font-mono text-xs space-y-1">
            <div>SERVER STATUS: <span className="text-green-500">ONLINE</span></div>
            <div>PING: <span className="text-green-500">12ms</span></div>
            <div>CONNECTED OPERATORS: <span className="text-cyan-500">2,847</span></div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-8 right-8 text-green-500/30 font-mono text-xs text-center">
          Your progress will be saved securely
        </div>
      </div>
    </div>
  );
}
