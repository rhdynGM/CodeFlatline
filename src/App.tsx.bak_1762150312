import { useState, useEffect } from 'react';
import { BootScreen } from './components/screens/BootScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { ProfileSetup, type ProfileData } from './components/screens/ProfileSetup';
import { MainTerminal } from './components/screens/MainTerminal';
import { DeployPanel } from './components/screens/DeployPanel';
import { UpgradeBench } from './components/screens/UpgradeBench';
import { ChannelLobby } from './components/screens/ChannelLobby';
import { ChannelWarHUD } from './components/screens/ChannelWarHUD';
import { NetworkGrid } from './components/screens/NetworkGrid';
import { Leaderboard } from './components/screens/Leaderboard';
import { VirusAlert } from './components/screens/VirusAlert';
import { TradeMarket } from './components/screens/TradeMarket';
import { Settings } from './components/screens/Settings';
import { FlatlineScreen } from './components/screens/FlatlineScreen';

export type Screen = 
  | 'boot'
  | 'login'
  | 'profile'
  | 'main'
  | 'deploy'
  | 'upgrade'
  | 'lobby'
  | 'war'
  | 'network'
  | 'leaderboard'
  | 'virus'
  | 'market'
  | 'settings'
  | 'flatline';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('boot');
  const [showNav, setShowNav] = useState(false);
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Check if user is already logged in and has profile
    const isLoggedIn = localStorage.getItem('flatline_logged_in');
    const savedProfile = localStorage.getItem('flatline_profile');
    
    if (isLoggedIn === 'true' && savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    // Auto-transition from boot to login after 3 seconds
    if (currentScreen === 'boot') {
      const timer = setTimeout(() => {
        // Check if user already has profile saved
        const isLoggedIn = localStorage.getItem('flatline_logged_in');
        const savedProfile = localStorage.getItem('flatline_profile');
        
        if (isLoggedIn === 'true' && savedProfile) {
          // User is logged in with profile, go directly to main
          setUserProfile(JSON.parse(savedProfile));
          setCurrentScreen('main');
          setShowNav(true);
        } else if (isLoggedIn === 'true') {
          // User is logged in but no profile, go to profile setup
          setCurrentScreen('profile');
        } else {
          // User needs to login
          setCurrentScreen('login');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    setCurrentScreen('profile');
  };

  const handleProfileComplete = (profile: ProfileData) => {
    setUserProfile(profile);
    setCurrentScreen('main');
    setShowNav(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'boot':
        return <BootScreen />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'profile':
        return <ProfileSetup onComplete={handleProfileComplete} />;
      case 'main':
        return <MainTerminal onNavigate={setCurrentScreen} userProfile={userProfile} />;
      case 'deploy':
        return <DeployPanel onClose={() => setCurrentScreen('main')} />;
      case 'upgrade':
        return <UpgradeBench onClose={() => setCurrentScreen('main')} />;
      case 'lobby':
        return <ChannelLobby onClose={() => setCurrentScreen('main')} />;
      case 'war':
        return <ChannelWarHUD onClose={() => setCurrentScreen('main')} />;
      case 'network':
        return <NetworkGrid onClose={() => setCurrentScreen('main')} />;
      case 'leaderboard':
        return <Leaderboard onClose={() => setCurrentScreen('main')} />;
      case 'virus':
        return <VirusAlert onClose={() => setCurrentScreen('main')} />;
      case 'market':
        return <TradeMarket onClose={() => setCurrentScreen('main')} />;
      case 'settings':
        return <Settings onClose={() => setCurrentScreen('main')} />;
      case 'flatline':
        return <FlatlineScreen onRestart={() => setCurrentScreen('boot')} />;
      default:
        return <MainTerminal onNavigate={setCurrentScreen} userProfile={userProfile} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {renderScreen()}
      
      {/* Dev Navigation - can be toggled with ESC key */}
      {showNav && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowNav(!showNav)}
            className="px-3 py-1 bg-cyan-500/20 border border-cyan-500 text-cyan-500 font-mono text-xs mb-2"
          >
            {showNav ? 'Hide Nav' : 'Show Nav'}
          </button>
          <div className="bg-black/90 border border-cyan-500 p-4 font-mono text-xs space-y-1 max-h-[80vh] overflow-auto">
            <div className="text-cyan-500 mb-2">SCREEN SELECT:</div>
            {(['boot', 'login', 'profile', 'main', 'deploy', 'upgrade', 'lobby', 'war', 'network', 'leaderboard', 'virus', 'market', 'settings', 'flatline'] as Screen[]).map((screen) => (
              <button
                key={screen}
                onClick={() => setCurrentScreen(screen)}
                className={`block w-full text-left px-2 py-1 ${
                  currentScreen === screen
                    ? 'bg-cyan-500 text-black'
                    : 'text-green-500 hover:bg-green-500/20'
                }`}
              >
                {screen.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
