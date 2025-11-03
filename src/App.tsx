import React, { useEffect, useState } from "react";
import { GameProvider } from "./context/GameProvider";
import BootScreen from "./components/screens/BootScreen";
import LoginScreen from "./components/screens/LoginScreen";
import MainTerminal from "./components/screens/MainTerminal";

const AppInner: React.FC = () => {
  const [screen, setScreen] = useState<'boot' | 'login' | 'main'>('boot');

  useEffect(() => {
    if (screen === 'boot') {
      const t = setTimeout(() => setScreen('login'), 1800);
      return () => clearTimeout(t);
    }
  }, [screen]);

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'black' }}>
      {screen === 'boot' && <BootScreen onFinish={() => setScreen('login')} />}
      {screen === 'login' && <LoginScreen onLogin={() => setScreen('main')} />}
      {screen === 'main' && <MainTerminal />}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppInner />
    </GameProvider>
  );
}
