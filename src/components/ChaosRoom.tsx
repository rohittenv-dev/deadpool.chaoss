import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { playChaosSound, playPunchSound, playBoingSound, playVictorySound } from '../utils/audio';
import { AlertOctagon, Flame, Skull, Sparkles, Zap, Lock, Unlock } from 'lucide-react';
import { TruthDetector } from './TruthDetector';

interface ChaosRoomProps {
  language: Language;
  onChaosLevelChange: (level: number) => void;
  isSecretUnlocked: boolean;
  onUnlockSecret: () => void;
  chaosPoints?: number;
  onTriggerRandomChaos?: () => void;
  onAddChaosPoints?: (points: number) => void;
}

export const ChaosRoom: React.FC<ChaosRoomProps> = ({
  language,
  onChaosLevelChange,
  isSecretUnlocked,
  onUnlockSecret,
  chaosPoints,
  onTriggerRandomChaos,
  onAddChaosPoints
}) => {
  const [chaosLevel, setChaosLevel] = useState<number>(0);
  const [screenGlitch, setScreenGlitch] = useState<boolean>(false);
  const [chaosMessage, setChaosMessage] = useState<string>("Whatever you do, DO NOT TOUCH the shiny red button.");
  const [floatingDecals, setFloatingDecals] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const t = translations[language];

  const chaosEscalations = [
    { level: 1, text: "CHAOS LEVEL 01: You pressed it. Of course you did.", quip: t.chaos.warning1 },
    { level: 2, text: "CHAOS LEVEL 02: Seriously? The warning label is in bold caps!", quip: t.chaos.warning2 },
    { level: 3, text: "CHAOS LEVEL 03: The screen is shaking! You're breaking the CSS!", quip: t.chaos.warning3 },
    { level: 4, text: "CHAOS LEVEL 04: WHY ARE YOU STILL DOING THIS?! ARE YOU AN AGENT OF FRANCIS?!", quip: "My suit is turning slightly more magenta from sheer stress!" },
    { level: 5, text: "💥 CHAOS LEVEL 05: MAXIMUM EFFORT ACHIEVED! THE 4TH WALL HAS CRACKED!", quip: t.chaos.secretUnlocked },
    { level: 6, text: "CHAOS LEVEL 06+: Okay, you have unlocked transcendent madness.", quip: "At this point, you might as well open the SECRET AREA in the top nav!" }
  ];

  const comicWords = ["POW!", "BAM!", "CHIMICHANGA!", "SIKEE!", "CRASH!", "OUCH!", "4TH WALL!"];

  const handlePressChaos = () => {
    const nextLevel = chaosLevel + 1;
    setChaosLevel(nextLevel);
    onChaosLevelChange(nextLevel);
    playChaosSound(nextLevel);

    // Trigger visual screen glitch
    setScreenGlitch(true);
    setTimeout(() => setScreenGlitch(false), 450);

    const step = chaosEscalations.find(e => e.level === nextLevel) || chaosEscalations[chaosEscalations.length - 1];
    setChaosMessage(`${step.text} - ${step.quip}`);

    // Spawn comic action decal
    const randomWord = comicWords[Math.floor(Math.random() * comicWords.length)];
    const newDecal = {
      id: Date.now(),
      text: randomWord,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20
    };
    setFloatingDecals(prev => [...prev.slice(-6), newDecal]);

    // Unlock secret area if level 5 reached
    if (nextLevel >= 5 && !isSecretUnlocked) {
      playVictorySound();
      onUnlockSecret();
    }
  };

  const handleResetChaos = () => {
    playBoingSound();
    setChaosLevel(0);
    setChaosMessage("Chaos reset to 0. Wade can breathe again... for now.");
  };

  return (
    <div id="chaos-room-section" className={`relative max-w-5xl mx-auto px-4 py-8 transition-transform duration-100 ${screenGlitch ? 'scale-[1.02] rotate-[-1deg]' : ''}`}>
      {/* Dynamic Comic Decal Spawns */}
      {floatingDecals.map(decal => (
        <motion.div
          key={decal.id}
          initial={{ scale: 0, rotate: -20, opacity: 1 }}
          animate={{ scale: [1, 1.4, 1.2], rotate: [0, 15, -5], opacity: [1, 1, 0] }}
          transition={{ duration: 1.5 }}
          style={{ left: `${decal.x}%`, top: `${decal.y}%` }}
          className="absolute z-20 pointer-events-none bg-yellow-400 text-zinc-950 font-bangers text-3xl px-4 py-1 rounded-xl comic-border shadow-comic"
        >
          {decal.text}
        </motion.div>
      ))}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-600 text-yellow-300 font-bangers text-sm px-4 py-1 rounded-full comic-border shadow-comic mb-2 uppercase">
          <AlertOctagon className="w-4 h-4" />
          <span>RESTRICTED ZONE • MAXIMUM RISK</span>
        </div>
        <h2 className="font-bangers text-4xl sm:text-7xl text-yellow-300 drop-shadow-[4px_4px_0px_#000]">
          THE CHAOS ROOM
        </h2>
        <p className="font-comic text-zinc-300 font-bold text-base sm:text-xl max-w-xl mx-auto">
          Whatever you do, absolutely do NOT push the giant radioactive red button below.
        </p>
      </div>

      {/* Chaos Chamber Box */}
      <div className="bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-12 text-center relative overflow-hidden">
        {/* Caution border bars */}
        <div className="comic-caution h-4 w-full -mt-6 -mx-6 sm:-mt-12 sm:-mx-12 mb-8" />

        {/* Live Chaos Gauge */}
        <div className="max-w-md mx-auto mb-8 bg-zinc-950 p-4 rounded-2xl comic-border shadow-comic">
          <div className="flex items-center justify-between text-yellow-400 font-bangers text-lg mb-2">
            <span>{t.chaos.level}: {chaosLevel.toString().padStart(2, '0')}</span>
            <span className="text-red-500">{chaosLevel >= 5 ? 'MAX LEVEL' : `${chaosLevel}/5`}</span>
          </div>
          <div className="w-full bg-zinc-800 h-6 rounded-full comic-border overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(chaosLevel * 20, 100)}%` }}
            />
          </div>
        </div>

        {/* THE FAMOUS "DO NOT PRESS" BUTTON */}
        <div className="py-4 relative inline-block">
          <motion.button
            id="do-not-press-chaos-btn"
            onClick={handlePressChaos}
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.88 }}
            className="relative group w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-red-600 hover:bg-red-500 comic-border-thick shadow-[0px_14px_0px_#7f1d1d,0px_20px_0px_#000] active:translate-y-3 active:shadow-[0px_2px_0px_#000] flex flex-col items-center justify-center cursor-pointer transition-all mx-auto select-none"
          >
            {/* Button Surface Highlight */}
            <div className="absolute top-4 inset-x-8 h-12 bg-white/20 rounded-full blur-xs" />
            <Flame className="w-12 h-12 text-yellow-300 mb-1 group-hover:animate-bounce" />
            <span className="font-bangers text-3xl sm:text-4xl text-yellow-300 drop-shadow-[2px_2px_0px_#000] tracking-wider leading-none">
              {t.chaos.button}
            </span>
            <span className="font-comic font-bold text-xs text-white/90 mt-1 uppercase tracking-widest">
              (DANGER: RATED R)
            </span>
          </motion.button>
        </div>

        {/* Escalating Quip Box */}
        <div className="mt-8 max-w-xl mx-auto p-4 rounded-2xl comic-border shadow-comic bg-yellow-300 text-zinc-950 font-bangers text-xl sm:text-2xl leading-tight">
          {chaosMessage}
        </div>

        {/* Feature 3: Random Chaos Button */}
        {onTriggerRandomChaos && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              id="cause-chaos-btn"
              onClick={onTriggerRandomChaos}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-xl sm:text-2xl rounded-2xl comic-border shadow-comic cursor-pointer transition-all flex items-center gap-2"
            >
              <span>💥 CAUSE CHAOS</span>
              {chaosPoints !== undefined && (
                <span className="bg-red-600 text-yellow-300 font-comic font-bold text-xs px-2.5 py-0.5 rounded-full border-2 border-black">
                  {chaosPoints} pts
                </span>
              )}
            </motion.button>
          </div>
        )}

        {/* Secret Unlock Banner when Level 5 reached */}
        {isSecretUnlocked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-4 rounded-2xl comic-border shadow-comic bg-emerald-400 text-zinc-950 max-w-lg mx-auto flex items-center justify-between"
          >
            <div className="text-left">
              <div className="font-bangers text-2xl flex items-center gap-2">
                <Unlock className="w-6 h-6 text-red-600" />
                <span>SECRET AREA UNLOCKED!</span>
              </div>
              <div className="font-comic font-bold text-xs">
                You broke the game! Click "Secret Area" in the top bar to claim Wade's secret loot!
              </div>
            </div>
            <Sparkles className="w-8 h-8 text-yellow-800" />
          </motion.div>
        )}

        {/* Reset Button */}
        {chaosLevel > 0 && (
          <div className="mt-6">
            <button
              id="reset-chaos-btn"
              onClick={handleResetChaos}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bangers text-sm rounded-lg comic-border cursor-pointer transition-colors"
            >
              🔄 Reset Chaos Counter to Zero (Bor-ing!)
            </button>
          </div>
        )}
      </div>

      {/* Feature 1: Deadpool Is Lying — Truth Detector */}
      <TruthDetector onAddChaosPoints={onAddChaosPoints} />
    </div>
  );
};
