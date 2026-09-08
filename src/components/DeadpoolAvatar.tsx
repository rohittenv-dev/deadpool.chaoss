import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playBoingSound, playPunchSound, playTacoCrunchSound } from '../utils/audio';

interface DeadpoolAvatarProps {
  externalQuip?: string | null;
  onAvatarClick?: (clickCount: number) => void;
}

export const DeadpoolAvatar: React.FC<DeadpoolAvatarProps> = ({ externalQuip, onAvatarClick }) => {
  const [clickCount, setClickCount] = useState(0);
  const [currentQuip, setCurrentQuip] = useState<string>("Hey! Click around, break things, have fun!");
  const [eyeState, setEyeState] = useState<'normal' | 'squint' | 'wide' | 'annoyed' | 'wink'>('normal');
  const [isWiggling, setIsWiggling] = useState(false);

  // Quip escalation array
  const quips = [
    "Seriously?",
    "You're really committed to this, huh?",
    "STOP CLICKING ME.",
    "...okay, one more.",
    "Look at my eyes. Do I look amused? (Yes, because my mask is awesome.)",
    "Did you come here looking for Wolverine? Wrong movie, bub.",
    "Click me 10 times and I'll give you absolutely nothing. Deal?",
    "OUCH! That's my regenerative healing factor you're testing!",
    "FINE! HERE IS A TACO: 🌮. Now go solve the chimichanga mystery!",
    "I'm breaking the 4th wall right now to tell you to look at the CHAOS ROOM!",
    "Are you enjoying the sweet red and yellow color palette?",
    "Okay, you win the Persistence Award. Go press the DO NOT PRESS button!"
  ];

  const handleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    const quipIndex = (nextCount - 1) % quips.length;
    setCurrentQuip(quips[quipIndex]);

    // Expressive eyes switch
    if (nextCount % 5 === 1) {
      setEyeState('squint');
      playBoingSound();
    } else if (nextCount % 5 === 2) {
      setEyeState('annoyed');
      playBoingSound();
    } else if (nextCount % 5 === 3) {
      setEyeState('wide');
      playPunchSound();
    } else if (nextCount % 5 === 4) {
      setEyeState('wink');
      playBoingSound();
    } else {
      setEyeState('normal');
      playTacoCrunchSound();
    }

    if (onAvatarClick) {
      onAvatarClick(nextCount);
    }
  };

  const displayQuip = externalQuip || currentQuip;

  return (
    <div id="deadpool-interactive-avatar" className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-auto">
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayQuip}
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="max-w-[220px] sm:max-w-[280px] mb-2 mr-2 bg-yellow-300 text-zinc-950 font-bangers text-lg sm:text-xl p-3 rounded-2xl comic-border comic-shadow relative tracking-wide select-none"
        >
          <div className="leading-tight">
            {displayQuip}
          </div>
          <div className="text-[10px] font-comic font-bold text-zinc-800 text-right mt-1 opacity-75">
            — THE MERC WITH A MOUTH
          </div>
          {/* Speech triangle tail pointing down-right */}
          <div 
            className="absolute -bottom-2.5 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-yellow-300"
            style={{ filter: "drop-shadow(0 2px 0 #000)" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Avatar Container */}
      <motion.button
        id="avatar-character-button"
        onClick={handleClick}
        whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.92 }}
        animate={isWiggling ? { x: [-4, 4, -4, 4, 0], rotate: [-5, 5, -5, 5, 0] } : {}}
        className="relative group cursor-pointer focus:outline-none"
        title="Click to bother Deadpool!"
      >
        {/* Comic Backplate / Halo */}
        <div className="absolute inset-0 bg-yellow-400 rounded-full comic-border -rotate-6 scale-105 group-hover:rotate-12 transition-transform shadow-comic" />

        {/* Katana Cross behind back */}
        <div className="absolute -top-3 -left-3 w-16 h-2 bg-zinc-800 comic-border rotate-45 pointer-events-none rounded-sm">
          <div className="w-4 h-full bg-yellow-400 border-r-2 border-black" />
        </div>
        <div className="absolute -top-3 -right-3 w-16 h-2 bg-zinc-800 comic-border -rotate-45 pointer-events-none rounded-sm">
          <div className="w-4 h-full bg-yellow-400 border-l-2 border-black ml-auto" />
        </div>

        {/* Original SVG Comic Mask */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-red-600 rounded-full comic-border-thick overflow-hidden shadow-comic-lg flex items-center justify-center">
          {/* Subtle center seam line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-950 opacity-40 -translate-x-1/2" />

          {/* Mask Dark Red Gradient highlights */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-red-600 to-red-800 opacity-90" />

          {/* Black Leather Eye Patches */}
          <div className="relative z-10 w-full h-full flex items-center justify-between px-2.5 sm:px-3">
            {/* Left Eye Patch */}
            <div className="relative w-7 h-9 sm:w-8 sm:h-11 bg-zinc-950 rounded-[45%_55%_55%_45%] comic-border flex items-center justify-center -rotate-6 shadow-inner">
              {/* Eye shape based on state */}
              {eyeState === 'squint' && (
                <div className="w-4 h-1.5 bg-white rounded-full border border-black" />
              )}
              {eyeState === 'annoyed' && (
                <div className="w-4 h-2 bg-white rounded-t-full border border-black mt-1" />
              )}
              {eyeState === 'wide' && (
                <div className="w-5 h-6 bg-white rounded-full border border-black" />
              )}
              {eyeState === 'wink' && (
                <div className="w-4 h-1 bg-white rounded-full rotate-12" />
              )}
              {eyeState === 'normal' && (
                <div className="w-4 h-5 sm:w-4.5 sm:h-6 bg-white rounded-[60%_40%_40%_60%] rotate-6 border border-black shadow-sm" />
              )}
            </div>

            {/* Right Eye Patch */}
            <div className="relative w-7 h-9 sm:w-8 sm:h-11 bg-zinc-950 rounded-[55%_45%_45%_55%] comic-border flex items-center justify-center rotate-6 shadow-inner">
              {eyeState === 'squint' && (
                <div className="w-4 h-1.5 bg-white rounded-full border border-black" />
              )}
              {eyeState === 'annoyed' && (
                <div className="w-4 h-2 bg-white rounded-b-full border border-black mb-1" />
              )}
              {eyeState === 'wide' && (
                <div className="w-5 h-6 bg-white rounded-full border border-black" />
              )}
              {eyeState === 'wink' && (
                <div className="w-4 h-5 sm:w-4.5 sm:h-6 bg-white rounded-[40%_60%_60%_40%] -rotate-6 border border-black shadow-sm" />
              )}
              {eyeState === 'normal' && (
                <div className="w-4 h-5 sm:w-4.5 sm:h-6 bg-white rounded-[40%_60%_60%_40%] -rotate-6 border border-black shadow-sm" />
              )}
            </div>
          </div>

          {/* Chin strap/collar detail */}
          <div className="absolute bottom-0 inset-x-0 h-3 bg-zinc-950 border-t-2 border-black" />
        </div>

        {/* Mini Click Badge */}
        <div className="absolute -bottom-1 -left-2 bg-yellow-400 text-zinc-950 text-xs font-bangers px-2 py-0.5 rounded-md comic-border shadow-comic rotate-[-6deg]">
          CLICKS: {clickCount}
        </div>
      </motion.button>
    </div>
  );
};
