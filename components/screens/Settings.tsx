import { useState } from 'react';
import { Scanlines } from '../Scanlines';
import { CyberpunkButton } from '../CyberpunkButton';
import { X, Volume2, Eye, Zap, Shield } from 'lucide-react';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const [volume, setVolume] = useState([75]);
  const [brightness, setBrightness] = useState([60]);
  const [particles, setParticles] = useState([40]);
  const [scanlineIntensity, setScanlineIntensity] = useState([50]);
  
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [glitchEffects, setGlitchEffects] = useState(true);
  const [lowPowerMode, setLowPowerMode] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Scanlines />
      
      {/* Header */}
      <div className="border-b border-green-500 p-4 bg-black/80 flex items-center justify-between">
        <div className="text-green-500 font-mono">
          [SYSTEM CONFIG] // TERMINAL SETTINGS
        </div>
        <button 
          onClick={onClose}
          className="text-green-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-8 h-[calc(100vh-80px)] overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Audio Settings */}
          <div className="border border-green-500 p-6 bg-green-500/5">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-500/30">
              <Volume2 className="text-green-500" size={24} />
              <h3 className="text-green-500 font-mono">AUDIO CONFIGURATION</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-green-500 font-mono text-xs">MASTER VOLUME</span>
                  <span className="text-cyan-500 font-mono text-xs">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-green-500/30 p-4 bg-black">
                  <div className="text-xs text-green-700 font-mono mb-2">SFX VOLUME</div>
                  <div className="text-cyan-500 font-mono">80%</div>
                </div>
                <div className="border border-green-500/30 p-4 bg-black">
                  <div className="text-xs text-green-700 font-mono mb-2">MUSIC VOLUME</div>
                  <div className="text-cyan-500 font-mono">60%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Settings */}
          <div className="border border-cyan-500 p-6 bg-cyan-500/5">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-cyan-500/30">
              <Eye className="text-cyan-500" size={24} />
              <h3 className="text-cyan-500 font-mono">VISUAL CONFIGURATION</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-cyan-500 font-mono text-xs">BRIGHTNESS</span>
                  <span className="text-green-500 font-mono text-xs">{brightness[0]}%</span>
                </div>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-cyan-500 font-mono text-xs">PARTICLE DENSITY</span>
                  <span className="text-green-500 font-mono text-xs">{particles[0]}%</span>
                </div>
                <Slider
                  value={particles}
                  onValueChange={setParticles}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-cyan-500 font-mono text-xs">SCANLINE INTENSITY</span>
                  <span className="text-green-500 font-mono text-xs">{scanlineIntensity[0]}%</span>
                </div>
                <Slider
                  value={scanlineIntensity}
                  onValueChange={setScanlineIntensity}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="border border-green-500 p-6 bg-green-500/5">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-green-500/30">
              <Zap className="text-green-500" size={24} />
              <h3 className="text-green-500 font-mono">SYSTEM OPTIONS</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-green-500/30 bg-black">
                <div>
                  <div className="text-green-500 font-mono text-xs mb-1">NOTIFICATIONS</div>
                  <div className="text-green-700 font-mono text-xs">Enable system alerts and warnings</div>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-green-500/30 bg-black">
                <div>
                  <div className="text-green-500 font-mono text-xs mb-1">AUTO-SAVE</div>
                  <div className="text-green-700 font-mono text-xs">Automatically save progress every 5 minutes</div>
                </div>
                <Switch 
                  checked={autoSave} 
                  onCheckedChange={setAutoSave}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-green-500/30 bg-black">
                <div>
                  <div className="text-green-500 font-mono text-xs mb-1">GLITCH EFFECTS</div>
                  <div className="text-green-700 font-mono text-xs">Enable visual glitch and distortion effects</div>
                </div>
                <Switch 
                  checked={glitchEffects} 
                  onCheckedChange={setGlitchEffects}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-green-500/30 bg-black">
                <div>
                  <div className="text-green-500 font-mono text-xs mb-1">LOW POWER MODE</div>
                  <div className="text-green-700 font-mono text-xs">Reduce visual effects to save resources</div>
                </div>
                <Switch 
                  checked={lowPowerMode} 
                  onCheckedChange={setLowPowerMode}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="border border-red-500 p-6 bg-red-500/5">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-red-500/30">
              <Shield className="text-red-500" size={24} />
              <h3 className="text-red-500 font-mono">SECURITY & PRIVACY</h3>
            </div>

            <div className="space-y-3">
              <CyberpunkButton variant="danger" className="w-full">
                Change Password
              </CyberpunkButton>
              <CyberpunkButton variant="secondary" className="w-full">
                Enable 2FA
              </CyberpunkButton>
              <CyberpunkButton variant="secondary" className="w-full">
                View Activity Log
              </CyberpunkButton>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <CyberpunkButton 
              onClick={onClose}
              variant="secondary" 
              className="flex-1"
            >
              Cancel
            </CyberpunkButton>
            <CyberpunkButton 
              onClick={onClose}
              className="flex-1"
            >
              Save Settings
            </CyberpunkButton>
          </div>

          {/* System Info */}
          <div className="border border-green-500/30 p-4 bg-green-500/5">
            <div className="text-green-500 font-mono text-xs mb-3">SYSTEM INFO:</div>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-green-700">VERSION:</span>
                <span className="text-cyan-500 ml-2">v2.47.3</span>
              </div>
              <div>
                <span className="text-green-700">BUILD:</span>
                <span className="text-cyan-500 ml-2">20251029</span>
              </div>
              <div>
                <span className="text-green-700">UPTIME:</span>
                <span className="text-green-500 ml-2">47:23:11</span>
              </div>
              <div>
                <span className="text-green-700">STATUS:</span>
                <span className="text-green-500 ml-2">OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
