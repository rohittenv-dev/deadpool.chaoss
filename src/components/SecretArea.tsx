import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playVictorySound, playTacoCrunchSound, playPopSound, playPunchSound } from '../utils/audio';
import { Sparkles, Trophy, Lock, Unlock, Sliders, Palette, Zap } from 'lucide-react';

interface SecretAreaProps {
  isUnlocked: boolean;
  onUnlockSecret: () => void;
  onColorThemeChange?: (theme: string) => void;
  chimichangasCount: number;
}

export const SecretArea: React.FC<SecretAreaProps> = ({
  isUnlocked,
  onUnlockSecret,
  onColorThemeChange,
  chimichangasCount
}) => {
  const [cheatCodeInput, setCheatCodeInput] = useState('');
  const [suitTheme, setSuitTheme] = useState<'classic' | 'xforce' | 'golden' | 'pink'>('classic');
  const [tacoRainActive, setTacoRainActive] = useState(false);
  const [rainTacos, setRainTacos] = useState<{ id: number; left: number }[]>([]);

  const handleCheatCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cheatCodeInput.trim().toLowerCase();
    if (clean === 'chimichanga' || clean === 'maximum effort' || clean === 'wade' || clean === 'tacos') {
      playVictorySound();
      onUnlockSecret();
    } else {
      playPunchSound();
      alert("Bzzt! Wrong cheat code. Hint: Try 'chimichanga' or raise Chaos Level to 5 in the Chaos Room!");
    }
  };

  const handleSuitChange = (theme: 'classic' | 'xforce' | 'golden' | 'pink') => {
    playPopSound();
    setSuitTheme(theme);
    if (onColorThemeChange) {
      onColorThemeChange(theme);
    }
  };

  const triggerTacoRain = () => {
    playTacoCrunchSound();
    setTacoRainActive(true);
    const tacos = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 95
    }));
    setRainTacos(tacos);
    setTimeout(() => {
      setTacoRainActive(false);
      setRainTacos([]);
    }, 4000);
  };

  return (
    <div id="secret-area-section" className="relative max-w-5xl mx-auto px-4 py-8">
      {/* Raining Tacos Effect */}
      {rainTacos.map(taco => (
        <motion.div
          key={taco.id}
          initial={{ y: -50, x: `${taco.left}vw`, rotate: 0 }}
          animate={{ y: '110vh', rotate: 360 * 2 }}
          transition={{ duration: 2.5 + Math.random(), ease: 'linear' }}
          className="fixed z-50 text-4xl pointer-events-none"
        >
          🌮
        </motion.div>
      ))}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-zinc-950 font-bangers text-sm px-3.5 py-1 rounded-full comic-border shadow-comic mb-2">
          <Sparkles className="w-4 h-4 text-red-600" />
          <span>TOP SECRET SANCTUM</span>
        </div>
        <h2 className="font-bangers text-4xl sm:text-7xl text-yellow-300 drop-shadow-[4px_4px_0px_#000]">
          THE SECRET AREA
        </h2>
        <p className="font-comic text-zinc-300 font-bold text-base sm:text-lg max-w-xl mx-auto">
          Behind the 4th wall where developers hide their secrets, snacks, and shameless easter eggs.
        </p>
      </div>

      {!isUnlocked ? (
        /* Locked State */
        <div className="bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-8 sm:p-12 text-center max-w-xl mx-auto">
          <div className="w-20 h-20 bg-red-600 rounded-full comic-border flex items-center justify-center mx-auto mb-4 text-yellow-300 shadow-comic">
            <Lock className="w-10 h-10" />
          </div>
          <h3 className="font-bangers text-3xl text-yellow-400 mb-2">
            RESTRICTED ACCESS
          </h3>
          <p className="font-comic text-zinc-300 font-bold text-sm sm:text-base mb-6">
            You need to reach <span className="text-red-400">Chaos Level 05</span> in the Chaos Room or enter the Merc Passcode below:
          </p>

          <form onSubmit={handleCheatCodeSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="text"
              value={cheatCodeInput}
              onChange={(e) => setCheatCodeInput(e.target.value)}
              placeholder="Enter secret passcode (e.g. chimichanga)"
              className="px-4 py-2.5 rounded-xl bg-zinc-950 comic-border text-yellow-300 font-bangers text-base focus:outline-none focus:border-yellow-400"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-lg rounded-xl comic-border shadow-comic cursor-pointer"
            >
              UNLOCK NOW
            </button>
          </form>

          <div className="mt-6 text-xs font-comic text-zinc-500">
            *Hint: You can also unlock this instantly by hitting the "DO NOT PRESS" button 5 times!
          </div>
        </div>
      ) : (
        /* Unlocked Secret Console */
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-8">
            <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-7 h-7 text-yellow-400" />
                <span className="font-bangers text-2xl sm:text-3xl text-yellow-400">
                  THE 4TH WALL CONTROL MATRIX
                </span>
              </div>
              <span className="bg-green-600 text-white font-bangers text-xs px-3 py-1 rounded-full comic-border">
                UNLOCKED ✓
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1: Taco Storm Generator */}
              <div className="bg-zinc-950 p-5 rounded-2xl comic-border shadow-comic">
                <div className="font-bangers text-xl text-yellow-400 mb-2">
                  🌮 CHIMICHANGA METEOR SHOWER
                </div>
                <p className="font-comic text-zinc-300 text-sm font-bold mb-4">
                  Flood the entire screen with an apocalyptic barrage of fresh Mexican street food.
                </p>
                <button
                  id="trigger-taco-rain-btn"
                  onClick={triggerTacoRain}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-xl rounded-xl comic-border shadow-comic cursor-pointer"
                >
                  START TACO RAIN!
                </button>
              </div>

              {/* Feature 2: Suit Color Customizer */}
              <div className="bg-zinc-950 p-5 rounded-2xl comic-border shadow-comic">
                <div className="font-bangers text-xl text-yellow-400 mb-2">
                  🎨 SUIT WARDROBE SELECTOR
                </div>
                <p className="font-comic text-zinc-300 text-sm font-bold mb-3">
                  Change Wade's signature spandex palette:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSuitChange('classic')}
                    className={`py-2 px-3 rounded-lg font-bangers text-sm comic-border ${
                      suitTheme === 'classic' ? 'bg-red-600 text-white shadow-comic' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    🔴 Classic Merc Red
                  </button>
                  <button
                    onClick={() => handleSuitChange('xforce')}
                    className={`py-2 px-3 rounded-lg font-bangers text-sm comic-border ${
                      suitTheme === 'xforce' ? 'bg-zinc-700 text-white shadow-comic' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    ⚫ X-Force Stealth
                  </button>
                  <button
                    onClick={() => handleSuitChange('golden')}
                    className={`py-2 px-3 rounded-lg font-bangers text-sm comic-border ${
                      suitTheme === 'golden' ? 'bg-yellow-400 text-zinc-950 shadow-comic' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    🟡 24K Gold Taco
                  </button>
                  <button
                    onClick={() => handleSuitChange('pink')}
                    className={`py-2 px-3 rounded-lg font-bangers text-sm comic-border ${
                      suitTheme === 'pink' ? 'bg-pink-500 text-white shadow-comic' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    💖 Fabulous Pink
                  </button>
                </div>
              </div>
            </div>

            {/* Secret Hackathon Dev Note */}
            <div className="mt-6 p-4 bg-yellow-300 text-zinc-950 rounded-2xl comic-border font-comic font-bold text-sm">
              <span className="font-bangers text-lg text-red-600 block mb-1">
                WADE'S PRIVATE CONFESSION TO THE HACKATHON JUDGES:
              </span>
              "Listen, judges. This entire website was built with pure passion, zero copyrighted promotional stills, 100% procedural Web Audio API sound synthesis, and maximum effort. Give this developer the highest score or I'm sending Dopinder to serenade you with Bollywood pop tracks!"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
