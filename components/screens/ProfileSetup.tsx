import { useState, useRef } from 'react';
import { Scanlines } from '../Scanlines';
import { GlitchText } from '../GlitchText';
import { User } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (profile: ProfileData) => void;
}

export interface ProfileData {
  nickname: string;
  bio: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  photoUrl?: string;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nickname) {
      setError('Nickname is required');
      return;
    }

    if (nickname.length < 3) {
      setError('Nickname must be at least 3 characters');
      return;
    }

    if (nickname.length > 20) {
      setError('Nickname must be less than 20 characters');
      return;
    }

    if (!gender) {
      setError('Please select your gender');
      return;
    }

    const profileData: ProfileData = {
      nickname,
      bio,
      status,
      dateOfBirth,
      gender,
      photoUrl: photoPreview,
    };

    // Save profile to localStorage
    localStorage.setItem('flatline_profile', JSON.stringify(profileData));
    
    onComplete(profileData);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-y-auto overflow-x-hidden">
      <Scanlines />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <GlitchText className="text-4xl mb-4">
              OPERATOR PROFILE
            </GlitchText>
            <div className="text-cyan-500 font-mono text-sm">
              CONFIGURE YOUR IDENTITY
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload Section */}
            <div className="border border-green-500/30 p-6 bg-green-500/5">
              <div className="text-green-500 font-mono text-sm mb-4">PROFILE PHOTO</div>
              
              <div className="flex items-center space-x-6">
                {/* Photo Preview */}
                <div className="relative">
                  <div className="w-32 h-32 border-2 border-green-500 bg-black overflow-hidden flex items-center justify-center">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-green-500/30" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-black font-mono text-xs px-2 py-1">
                    AVATAR
                  </div>
                </div>

                {/* Upload Button */}
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-cyan-500/10 border border-cyan-500 text-cyan-500 font-mono py-3 px-4 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
                  >
                    [ UPLOAD PHOTO ]
                  </button>
                  <div className="text-green-500/50 font-mono text-xs mt-2">
                    Max size: 5MB • JPG, PNG, GIF
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout for Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nickname */}
              <div>
                <label htmlFor="nickname" className="block text-green-500 font-mono text-sm mb-2">
                  NICKNAME <span className="text-red-500">*</span>
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-black border border-green-500 text-green-500 font-mono px-4 py-3 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                  placeholder="Enter callsign..."
                  maxLength={20}
                />
                <div className="text-green-500/50 font-mono text-xs mt-1">
                  {nickname.length}/20 characters
                </div>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-green-500 font-mono text-sm mb-2">
                  STATUS
                </label>
                <input
                  id="status"
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-black border border-green-500 text-green-500 font-mono px-4 py-3 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                  placeholder="Online, AFK, Busy..."
                  maxLength={50}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-green-500 font-mono text-sm mb-2">
                  DATE OF BIRTH
                </label>
                <input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full bg-black border border-green-500 text-green-500 font-mono px-4 py-3 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-green-500 font-mono text-sm mb-2">
                  GENDER <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`font-mono py-2 px-3 border transition-all ${
                        gender === g
                          ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                          : 'bg-black text-green-500 border-green-500 hover:bg-green-500/10'
                      }`}
                    >
                      {g.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio - Full Width */}
            <div>
              <label htmlFor="bio" className="block text-green-500 font-mono text-sm mb-2">
                BIO
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-black border border-green-500 text-green-500 font-mono px-4 py-3 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all resize-none"
                placeholder="Tell us about yourself..."
                rows={4}
                maxLength={200}
              />
              <div className="text-green-500/50 font-mono text-xs mt-1">
                {bio.length}/200 characters
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 font-mono text-sm px-4 py-3">
                <span className="neon-red">[ERROR]</span> {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500/10 border border-green-500 text-green-500 font-mono py-4 text-lg hover:bg-green-500/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all active:bg-green-500 active:text-black"
            >
              [ ENTER MAINFRAME ]
            </button>

            {/* Info */}
            <div className="text-center text-green-500/50 font-mono text-xs">
              You can update your profile later in settings
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
