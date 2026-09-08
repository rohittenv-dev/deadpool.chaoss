import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemeItem, Language } from '../types';
import { translations } from '../utils/translations';
import { playClickSound, playPopSound, playBoingSound, playPunchSound, playTacoCrunchSound } from '../utils/audio';
import { Dices, Heart, Laugh, Meh, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface MemeVaultProps {
  language: Language;
  onViewMemeVaultMission?: () => void;
}

const INITIAL_MEMES: MemeItem[] = [
  {
    id: 'm1',
    setup: "WHEN YOU HAVE A TIGHT DEADLINE...",
    punchline: "...BUT YOU ALSO HAVE ZERO REGRETS AND 5 CHIMICHANGAS.",
    tags: ['Productivity', 'Zero Chill'],
    likes: 142,
    laughs: 89,
    cringes: 4
  },
  {
    id: 'm2',
    setup: "THE PLAN: BE ORGANIZED & COMPOSED",
    punchline: "THE REALITY: PURE UNFILTERED CHAOS & CONFETTI.",
    tags: ['Life Goals', 'Chaos'],
    likes: 215,
    laughs: 174,
    cringes: 7
  },
  {
    id: 'm3',
    setup: "DEVELOPER: 'THAT BUG IS NOT A BUG...'",
    punchline: "'...IT IS AN UNDOCUMENTED COMEDIC FEATURE!'",
    tags: ['Code', 'Features'],
    likes: 310,
    laughs: 260,
    cringes: 12
  },
  {
    id: 'm4',
    setup: "WHAT THEY THINK HERO LANDINGS LOOK LIKE:",
    punchline: "TOTALLY BADASS! (REALITY: TERRIBLE ON THE KNEES!)",
    tags: ['Superhero', 'Joint Pain'],
    likes: 180,
    laughs: 195,
    cringes: 2
  },
  {
    id: 'm5',
    setup: "FOURTH WALL INTEGRITY CHECK:",
    punchline: "STATUS: PERMANENTLY OBLITERATED. HI, USER! NICE MOUSE.",
    tags: ['4th Wall', 'Meta'],
    likes: 420,
    laughs: 390,
    cringes: 9
  },
  {
    id: 'm6',
    setup: "WOLVERINE'S CURRENT MOOD TOWARDS WADE:",
    punchline: "AGGRESSIVE EYE-ROLLING AND SIGHING IN ADAMANTIUM.",
    tags: ['BFFs', 'Logan'],
    likes: 275,
    laughs: 220,
    cringes: 5
  }
];

const CHAOS_SETUPS = [
  "WHEN THE CODE COMPILES ON THE FIRST TRY:",
  "MY DOCTOR: 'EAT MORE HEALTHY GREENS.'",
  "OPENING 57 CHROME TABS TO FIX ONE CSS MARGIN:",
  "ASKING FOR PERMISSION VS BEGGING FOR FORGIVENESS:",
  "WALKING INTO A HACKATHON JURY ROOM LIKE:",
  "WHEN SOMEONE SAYS 'LET'S BE REASONABLE':"
];

const CHAOS_PUNCHLINES = [
  "I SUSPECT WITCHCRAFT, ILLUMINATI, AND BAD UNIT TESTS.",
  "DOES JALAPEÑO GUACAMOLE COUNT AS SALAD? ASKING FOR A MERC.",
  "NOW MY LAPTOP FANS SOUND LIKE THE X-JET TAKING OFF!",
  "MAXIMUM EFFORT! NO REGRETS! RUN FOR THE EXIT!",
  "SURPRISE, JUDGES! WE BROUGHT COMEDY AND WEB AUDIO SYNTHESIS!",
  "I WOULD RATHER EAT A DRY CORN TORTILLA WITH NO SALSA."
];

export const MemeVault: React.FC<MemeVaultProps> = ({ language, onViewMemeVaultMission }) => {
  const [memes, setMemes] = useState<MemeItem[]>(INITIAL_MEMES);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [chaosCount, setChaosCount] = useState<number>(0);
  const t = translations[language];

  React.useEffect(() => {
    if (onViewMemeVaultMission) {
      onViewMemeVaultMission();
    }
  }, [onViewMemeVaultMission]);

  const handleCardFlip = (id: string) => {
    playPopSound();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReact = (id: string, type: 'like' | 'laugh' | 'cringe') => {
    playClickSound();
    setMemes(prev =>
      prev.map(m => {
        if (m.id !== id) return m;
        if (m.userReacted === type) return m; // Already reacted

        return {
          ...m,
          likes: type === 'like' ? m.likes + 1 : m.likes,
          laughs: type === 'laugh' ? m.laughs + 1 : m.laughs,
          cringes: type === 'cringe' ? m.cringes + 1 : m.cringes,
          userReacted: type
        };
      })
    );
  };

  const handleGenerateChaos = () => {
    playPunchSound();
    setChaosCount(prev => prev + 1);

    // Shuffle existing and generate 2 wild chaotic custom memes
    const shuffled = [...memes].sort(() => Math.random() - 0.5);

    const randomSetup = CHAOS_SETUPS[Math.floor(Math.random() * CHAOS_SETUPS.length)];
    const randomPunchline = CHAOS_PUNCHLINES[Math.floor(Math.random() * CHAOS_PUNCHLINES.length)];

    const chaoticMeme: MemeItem = {
      id: `chaos-${Date.now()}`,
      setup: `[CHAOS #${chaosCount + 1}] ${randomSetup}`,
      punchline: randomPunchline,
      tags: ['Chaos Gen', 'Fresh'],
      likes: Math.floor(Math.random() * 50) + 1,
      laughs: Math.floor(Math.random() * 40) + 1,
      cringes: Math.floor(Math.random() * 5)
    };

    setMemes([chaoticMeme, ...shuffled.slice(0, 5)]);
    // Auto flip all to tease
    setFlippedCards({});
  };

  return (
    <div id="meme-vault-section" className="relative max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-block bg-red-600 text-white font-bangers text-sm px-3 py-0.5 rounded-full comic-border shadow-comic mb-1">
            CERTIFIED DEADPOOL COMEDY ARCHIVE
          </div>
          <h2 className="font-bangers text-4xl sm:text-6xl text-yellow-300 drop-shadow-[3px_3px_0px_#000]">
            {t.memes.title}
          </h2>
          <p className="font-comic text-zinc-300 font-bold text-sm sm:text-base">
            {t.memes.subtitle} • <span className="text-yellow-400">{t.memes.flipHint}</span>
          </p>
        </div>

        {/* Generate Chaos Button */}
        <motion.button
          id="generate-chaos-memes-btn"
          onClick={handleGenerateChaos}
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-xl sm:text-2xl rounded-2xl comic-border shadow-comic flex items-center gap-2 cursor-pointer"
        >
          <Dices className="w-6 h-6 text-red-600" />
          <span>{t.memes.generate}</span>
        </motion.button>
      </div>

      {/* Meme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme, idx) => {
          const isFlipped = !!flippedCards[meme.id];
          return (
            <div
              key={meme.id}
              className="relative min-h-[300px] flex flex-col justify-between p-5 rounded-2xl comic-border-thick shadow-comic-lg bg-zinc-900 overflow-hidden group select-none transition-transform hover:-translate-y-1"
            >
              {/* Halftone Top Banner */}
              <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600" />

              {/* Tag and Meme # */}
              <div className="flex items-center justify-between mt-2 mb-3">
                <span className="font-bangers text-xs bg-zinc-800 text-yellow-300 px-2 py-0.5 rounded comic-border">
                  PANEL #{idx + 1}
                </span>
                <div className="flex gap-1">
                  {meme.tags.map(t => (
                    <span key={t} className="text-[10px] font-comic font-bold bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-600/40">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Flip Area */}
              <div
                onClick={() => handleCardFlip(meme.id)}
                className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl comic-border cursor-pointer transition-all bg-zinc-950 relative overflow-hidden"
              >
                <div className="absolute inset-0 comic-halftone opacity-30 pointer-events-none" />

                {!isFlipped ? (
                  <div className="text-center z-10">
                    <div className="text-3xl mb-2">🤔</div>
                    <div className="font-bangers text-xl sm:text-2xl text-yellow-400 tracking-wide leading-snug">
                      "{meme.setup}"
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 font-comic text-xs font-bold text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/40 animate-pulse">
                      <span>TAP TO REVEAL PUNCHLINE</span>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center z-10"
                  >
                    <div className="text-3xl mb-2">💥</div>
                    <div className="font-bangers text-2xl sm:text-3xl text-red-500 drop-shadow-[2px_2px_0px_#000] tracking-wide leading-snug">
                      {meme.punchline}
                    </div>
                    <div className="mt-3 text-xs font-comic text-zinc-400">
                      (Tap card to flip back)
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Reaction Buttons */}
              <div className="mt-4 pt-3 border-t-2 border-zinc-800 flex items-center justify-between text-xs font-bangers">
                <button
                  onClick={() => handleReact(meme.id, 'like')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg comic-border transition-colors cursor-pointer ${
                    meme.userReacted === 'like' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{meme.likes}</span>
                </button>

                <button
                  onClick={() => handleReact(meme.id, 'laugh')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg comic-border transition-colors cursor-pointer ${
                    meme.userReacted === 'laugh' ? 'bg-yellow-400 text-zinc-950' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <Laugh className="w-3.5 h-3.5" />
                  <span>{meme.laughs}</span>
                </button>

                <button
                  onClick={() => handleReact(meme.id, 'cringe')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg comic-border transition-colors cursor-pointer ${
                    meme.userReacted === 'cringe' ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <Meh className="w-3.5 h-3.5" />
                  <span>{meme.cringes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
