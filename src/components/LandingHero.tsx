import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavSection, Language } from '../types';
import { translations } from '../utils/translations';
import { playPunchSound, playPopSound, playBoingSound, playRecordScratchSound } from '../utils/audio';
import { Sparkles, Skull, Flame, Zap, ArrowRight, ShieldAlert, AlertTriangle } from 'lucide-react';

interface LandingHeroProps {
  onStartAdventure: () => void;
  onNavigate: (section: NavSection) => void;
  language: Language;
  onWrongClick: (message: string) => void;
  onCollectChimichanga: () => void;
  hasFoundHeroChimichanga: boolean;
  onOpenHotline?: () => void;
  onTriggerRandomChaos?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartAdventure,
  onNavigate,
  language,
  onWrongClick,
  onCollectChimichanga,
  hasFoundHeroChimichanga,
  onOpenHotline,
  onTriggerRandomChaos
}) => {
  const [hoverReaction, setHoverReaction] = useState<string | null>(null);
  const t = translations[language];

  const handleWrongAreaClick = (label: string) => {
    playRecordScratchSound();
    const funnyMessages = [
      `Nice try clicking "${label}". That's just painted on the 4th wall!`,
      `Whoops! "${label}" is out of order. Wade spent the budget on chimichangas.`,
      `You clicked "${label}"! Did you really expect a polite popup?`,
      `ALERT: Clicking "${label}" has notified Francis. He's still unimpressed.`
    ];
    const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    onWrongClick(randomMsg);
  };

  return (
    <div id="landing-hero-section" className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Comic Halftone Background & Diagonal Slanted Panels */}
      <div className="absolute inset-0 pointer-events-none comic-halftone-red opacity-20" />

      {/* Decorative Comic Action Decals */}
      <motion.div
        animate={{ rotate: [-6, -2, -6], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="hidden md:block absolute top-8 left-6 bg-yellow-400 text-zinc-950 font-bangers text-2xl px-4 py-1.5 rounded-lg comic-border shadow-comic rotate-[-6deg]"
      >
        💥 BAM! NEW ADVENTURE
      </motion.div>

      <motion.div
        animate={{ rotate: [6, 10, 6], scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
        className="hidden md:block absolute top-12 right-8 bg-red-600 text-white font-bangers text-2xl px-4 py-1.5 rounded-lg comic-border shadow-comic rotate-[8deg]"
      >
        🌮 MAXIMUM EFFORT!
      </motion.div>

      {/* Hero Comic Panel Box */}
      <div className="relative max-w-4xl w-full bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-10 text-center z-10 overflow-hidden">
        {/* Top Comic Caution Tape Header */}
        <div className="comic-caution h-3 w-full -mt-6 -mx-6 sm:-mt-10 sm:-mx-10 mb-6" />

        {/* Humorous Tagline Pill */}
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-zinc-950 font-bangers text-sm sm:text-base px-3.5 py-1 rounded-full comic-border shadow-comic mb-4 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main Dramatic Title */}
        <motion.h1
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="font-bangers text-4xl sm:text-6xl md:text-7xl text-yellow-300 drop-shadow-[4px_4px_0px_#000] leading-none mb-4"
        >
          {t.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <p className="font-comic text-lg sm:text-2xl text-zinc-200 font-bold max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Interactive Hover Callout */}
        {hoverReaction && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block bg-red-600 text-yellow-300 font-bangers text-base sm:text-lg px-4 py-1 rounded-lg comic-border shadow-comic"
          >
            {hoverReaction}
          </motion.div>
        )}

        {/* Primary CTA Button: START THE ADVENTURE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <motion.button
            id="start-adventure-cta"
            onClick={() => {
              playPunchSound();
              onStartAdventure();
            }}
            onMouseEnter={() => {
              playPopSound();
              setHoverReaction("Warning: Doing this will drag you into chaotic mercenary business!");
            }}
            onMouseLeave={() => setHoverReaction(null)}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-yellow-300 font-bangers text-2xl sm:text-3xl rounded-2xl comic-border-thick shadow-comic-lg flex items-center justify-center gap-3 cursor-pointer group tracking-wider"
          >
            <span>{t.hero.cta}</span>
            <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>

          {/* Quick Jump to Chaos Button */}
          <motion.button
            id="hero-quick-chaos-btn"
            onClick={() => {
              playPunchSound();
              onNavigate('chaos');
            }}
            onMouseEnter={() => {
              playPopSound();
              setHoverReaction("You want to skip straight to destroying things? I respect that.");
            }}
            onMouseLeave={() => setHoverReaction(null)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-4 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-xl sm:text-2xl rounded-2xl comic-border shadow-comic flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flame className="w-6 h-6 text-red-600 fill-red-600" />
            <span>PRESS THE CHAOS BUTTON</span>
          </motion.button>
        </div>

        {/* Quick Interactive Features: Call Wade & Random Chaos */}
        {(onOpenHotline || onTriggerRandomChaos) && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {onOpenHotline && (
              <motion.button
                id="hero-call-wade-btn"
                onClick={() => {
                  playPunchSound();
                  onOpenHotline();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-lg rounded-xl comic-border shadow-comic flex items-center gap-1.5 cursor-pointer"
              >
                <span>📞 CALL WADE</span>
              </motion.button>
            )}
            {onTriggerRandomChaos && (
              <motion.button
                id="hero-cause-chaos-btn"
                onClick={() => {
                  playPunchSound();
                  onTriggerRandomChaos();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-yellow-300 font-bangers text-lg rounded-xl comic-border shadow-comic flex items-center gap-1.5 cursor-pointer"
              >
                <span>💥 CAUSE CHAOS</span>
              </motion.button>
            )}
          </div>
        )}

        {/* Interactive "Wrong Click" Decoy Traps for Comic Fun */}
        <div className="border-t-2 border-zinc-800 pt-6">
          <div className="text-xs font-comic font-bold text-zinc-400 uppercase tracking-widest mb-3">
            Suspect Areas (Click at your own risk)
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              id="decoy-free-tacos"
              onClick={() => handleWrongAreaClick("Free Tacos Link")}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 rounded-lg comic-border text-xs sm:text-sm font-bangers tracking-wider cursor-pointer transition-colors"
            >
              🌮 Claim 100 Free Tacos
            </button>

            <button
              id="decoy-emergency-exit"
              onClick={() => handleWrongAreaClick("Emergency Exit")}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-red-400 rounded-lg comic-border text-xs sm:text-sm font-bangers tracking-wider cursor-pointer transition-colors"
            >
              🚪 Emergency Normal Website Exit
            </button>

            <button
              id="decoy-pg13"
              onClick={() => handleWrongAreaClick("PG-13 Mode")}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-blue-300 rounded-lg comic-border text-xs sm:text-sm font-bangers tracking-wider cursor-pointer transition-colors"
            >
              😇 Switch to Polite PG-13 Mode
            </button>

            {/* Hidden Easter Egg Chimichanga on Hero */}
            {!hasFoundHeroChimichanga ? (
              <button
                id="hero-hidden-chimichanga"
                onClick={() => {
                  playBoingSound();
                  onCollectChimichanga();
                }}
                className="px-3 py-1.5 bg-yellow-950/60 hover:bg-yellow-800 text-yellow-300 rounded-lg border border-yellow-500/40 text-xs font-bangers tracking-wider cursor-pointer animate-pulse"
                title="Wait, is that a taco crumb?"
              >
                🌯 Suspicious Foil Wrap
              </button>
            ) : (
              <span className="px-3 py-1.5 bg-green-950/50 text-green-400 text-xs font-comic font-bold rounded-lg border border-green-600/30">
                ✓ Hero Chimichanga Found!
              </span>
            )}
          </div>
        </div>

        {/* Adventure Section Preview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          <div
            onClick={() => {
              playPopSound();
              onNavigate('hq');
            }}
            className="p-3 bg-zinc-950/90 rounded-xl comic-border hover:border-yellow-400 cursor-pointer transition-all hover:scale-105 text-left"
          >
            <div className="text-2xl mb-1">🏢</div>
            <div className="font-bangers text-lg text-yellow-400">THE HQ</div>
            <div className="text-xs font-comic text-zinc-400">Explore Wade's messy office</div>
          </div>

          <div
            onClick={() => {
              playPopSound();
              onNavigate('missions');
            }}
            className="p-3 bg-zinc-950/90 rounded-xl comic-border hover:border-red-500 cursor-pointer transition-all hover:scale-105 text-left"
          >
            <div className="text-2xl mb-1">🔍</div>
            <div className="font-bangers text-lg text-red-400">MISSIONS</div>
            <div className="text-xs font-comic text-zinc-400">Solve the Stolen Chimichanga</div>
          </div>

          <div
            onClick={() => {
              playPopSound();
              onNavigate('memes');
            }}
            className="p-3 bg-zinc-950/90 rounded-xl comic-border hover:border-yellow-400 cursor-pointer transition-all hover:scale-105 text-left"
          >
            <div className="text-2xl mb-1">😂</div>
            <div className="font-bangers text-lg text-yellow-400">MEME VAULT</div>
            <div className="text-xs font-comic text-zinc-400">Flip cards & generate chaos</div>
          </div>

          <div
            onClick={() => {
              playPopSound();
              onNavigate('armory');
            }}
            className="p-3 bg-zinc-950/90 rounded-xl comic-border hover:border-red-500 cursor-pointer transition-all hover:scale-105 text-left"
          >
            <div className="text-2xl mb-1">⚔️</div>
            <div className="font-bangers text-lg text-red-400">ARMORY</div>
            <div className="text-xs font-comic text-zinc-400">Katanas & rubber chickens</div>
          </div>
        </div>
      </div>
    </div>
  );
};
