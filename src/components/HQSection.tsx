import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playClickSound, playPopSound, playBoingSound, playPunchSound, playTacoCrunchSound, playRecordScratchSound } from '../utils/audio';
import { Phone, PhoneCall, Radio, Lock, Unlock, StickyNote, Award, CheckCircle2 } from 'lucide-react';

interface HQSectionProps {
  onCollectChimichanga: () => void;
  hasFoundHqChimichanga: boolean;
  onEnterHQMission: () => void;
}

export const HQSection: React.FC<HQSectionProps> = ({
  onCollectChimichanga,
  hasFoundHqChimichanga,
  onEnterHQMission
}) => {
  // Mark mission progress on visit
  React.useEffect(() => {
    onEnterHQMission();
  }, [onEnterHQMission]);

  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [phoneCallState, setPhoneCallState] = useState<'idle' | 'ringing' | 'connected'>('ringing');
  const [callMessage, setCallMessage] = useState<string | null>(null);
  const [openedLockers, setOpenedLockers] = useState<Record<number, boolean>>({});
  const [radioTrack, setRadioTrack] = useState<number>(0);

  const stickyNotes = [
    {
      id: 'target',
      title: '🎯 HIT LIST',
      color: 'bg-yellow-300 text-zinc-950',
      content: '1. Francis (Dealt with)\n2. People who talk at movie theaters\n3. The guy who stole my chimichanga'
    },
    {
      id: 'grocery',
      title: '🌯 SHOPPING LIST',
      color: 'bg-red-400 text-zinc-950',
      content: '• Chimichangas (x50)\n• Spicy Salsa Verde\n• Woolite for the red suit\n• Unicorn glitter'
    },
    {
      id: 'bills',
      title: '💸 BILLS TO IGNORE',
      color: 'bg-emerald-300 text-zinc-950',
      content: '• Xavier Institute Wall Repair: $45,000\n• Dopinder Taxi Tab: $680\n• Katanas sharpening subscription: $12'
    },
    {
      id: 'rules',
      title: '⚠️ MERC HOUSE RULES',
      color: 'bg-amber-300 text-zinc-950',
      content: '1. Do NOT wash white socks with red suit.\n2. No singing Wham! before 10 AM.\n3. Always tip the taxi driver.'
    }
  ];

  const radioTunes = [
    "📻 Tune 1: Careless Whisper (Synthesized Kazoo Remix)",
    "📻 Tune 2: 80s Montage Theme (Maximum Synth)",
    "📻 Tune 3: Chimichanga Jam in G-Major",
    "📻 Tune 4: Comic Elevator Muzak for Antiheroes"
  ];

  const handlePhoneClick = () => {
    if (phoneCallState === 'ringing' || phoneCallState === 'idle') {
      playClickSound();
      setPhoneCallState('connected');
      const callerQuips = [
        "Blind Al: 'Wade? Did you put the milk back in the freezer again? I can hear you breathing!'",
        "Colossus: 'Wade, please. You must attend breakfast at the mansion. We made wholesome porridge.'",
        "Dopinder: 'Mr. Pool! I am outside in the cab with the disco ball! Shall we play the romantic Bollywood songs?'",
        "Cable: 'Wade, stop ordering pineapple pizza to my timeline! The future is already terrible!'"
      ];
      const selected = callerQuips[Math.floor(Math.random() * callerQuips.length)];
      setCallMessage(selected);
    } else {
      playRecordScratchSound();
      setPhoneCallState('idle');
      setCallMessage(null);
    }
  };

  const handleLockerClick = (lockerIndex: number) => {
    playPopSound();
    setOpenedLockers(prev => ({ ...prev, [lockerIndex]: !prev[lockerIndex] }));
    if (lockerIndex === 3 && !hasFoundHqChimichanga) {
      playTacoCrunchSound();
      onCollectChimichanga();
    }
  };

  const handleRadioCycle = () => {
    playBoingSound();
    setRadioTrack(prev => (prev + 1) % radioTunes.length);
  };

  return (
    <div id="hq-section" className="relative max-w-6xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-yellow-400 text-zinc-950 font-bangers text-sm px-3 py-0.5 rounded-full comic-border shadow-comic mb-2">
          LOCATION: DEADPOOL'S MESSY SANCTUARY
        </div>
        <h2 className="font-bangers text-4xl sm:text-6xl text-yellow-300 drop-shadow-[3px_3px_0px_#000]">
          THE MERCENARY HQ
        </h2>
        <p className="font-comic text-zinc-300 font-bold text-base sm:text-lg max-w-xl mx-auto">
          Welcome to Wade's safehouse. Don't step on the stray bullets or question the suspicious stains.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Corkboard */}
        <div className="lg:col-span-2 bg-amber-950/60 p-6 rounded-3xl comic-border-thick shadow-comic-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b-2 border-amber-800/80 pb-2">
            <h3 className="font-bangers text-2xl text-yellow-400 flex items-center gap-2">
              <StickyNote className="w-6 h-6 text-yellow-400" />
              <span>THE MESSY CORKBOARD (CLICK TO READ)</span>
            </h3>
            <span className="text-xs font-comic text-amber-200">📌 Real Merc Paperwork</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stickyNotes.map((note) => (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  playClickSound();
                  setActiveNote(activeNote === note.id ? null : note.id);
                }}
                className={`p-4 rounded-xl comic-border shadow-comic cursor-pointer transition-all ${note.color} rotate-[-1deg]`}
              >
                <div className="font-bangers text-lg border-b-2 border-black/20 pb-1 mb-2 flex items-center justify-between">
                  <span>{note.title}</span>
                  <span className="text-xs font-comic font-bold opacity-75">
                    {activeNote === note.id ? 'Tap to close' : 'Tap to read'}
                  </span>
                </div>
                <div className="font-comic font-bold text-sm whitespace-pre-line leading-relaxed">
                  {activeNote === note.id ? note.content : `${note.content.split('\n')[0]}...`}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bulletin Board Secret Easter Egg */}
          <div className="mt-6 pt-4 border-t-2 border-amber-800/60 flex items-center justify-between">
            <span className="text-xs font-comic text-zinc-300">
              *Warning: Touching the corkboard may violate several health codes.
            </span>
            <button
              id="corkboard-extra-punch"
              onClick={() => {
                playPunchSound();
                alert("POW! You punched the corkboard. Your knuckles hurt, but you feel slightly more like Wade.");
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-yellow-300 font-bangers text-xs rounded-lg comic-border shadow-comic"
            >
              👊 Punch the Corkboard
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Gadgets (Phone, Lockers, Radio) */}
        <div className="space-y-6">
          {/* The Red Rotary Phone */}
          <div className="bg-zinc-900 p-5 rounded-2xl comic-border shadow-comic">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bangers text-xl text-yellow-400 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-500" />
                <span>THE RED MERC HOTLINE</span>
              </div>
              {phoneCallState === 'ringing' && (
                <span className="bg-red-600 text-white font-bangers text-xs px-2 py-0.5 rounded-full animate-bounce">
                  RINGING!
                </span>
              )}
            </div>

            <button
              id="hq-rotary-phone-btn"
              onClick={handlePhoneClick}
              className={`w-full py-3 px-4 rounded-xl font-bangers text-lg comic-border shadow-comic flex items-center justify-center gap-2 transition-all cursor-pointer ${
                phoneCallState === 'connected'
                  ? 'bg-red-600 text-white'
                  : phoneCallState === 'ringing'
                  ? 'bg-yellow-400 text-zinc-950 animate-pulse'
                  : 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700'
              }`}
            >
              <PhoneCall className="w-5 h-5" />
              <span>
                {phoneCallState === 'connected'
                  ? 'HANG UP HOTLINE'
                  : phoneCallState === 'ringing'
                  ? '📞 ANSWER INCOMING CALL!'
                  : 'DIAL BLIND AL / CABLE'}
              </span>
            </button>

            <AnimatePresence>
              {callMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-yellow-300 text-zinc-950 rounded-xl comic-border font-comic font-bold text-sm"
                >
                  {callMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* The 3 Lockers */}
          <div className="bg-zinc-900 p-5 rounded-2xl comic-border shadow-comic">
            <div className="font-bangers text-xl text-yellow-400 mb-3 flex items-center justify-between">
              <span>SUSPICIOUS LOCKERS</span>
              <span className="text-xs font-comic text-zinc-400">Search for loot!</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3].map((lockerNum) => {
                const isOpen = openedLockers[lockerNum];
                return (
                  <button
                    key={lockerNum}
                    id={`locker-btn-${lockerNum}`}
                    onClick={() => handleLockerClick(lockerNum)}
                    className={`p-3 rounded-xl comic-border shadow-comic text-center transition-all cursor-pointer ${
                      isOpen
                        ? 'bg-yellow-400 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <div className="text-xl mb-1">
                      {isOpen ? (
                        lockerNum === 1 ? '🐔' : lockerNum === 2 ? '🎭' : '🌯'
                      ) : (
                        <Lock className="w-5 h-5 mx-auto text-zinc-400" />
                      )}
                    </div>
                    <div className="font-bangers text-sm">
                      Locker #{lockerNum}
                    </div>
                    <div className="text-[10px] font-comic font-bold truncate">
                      {isOpen
                        ? (lockerNum === 1 ? 'Rubber Chicken' : lockerNum === 2 ? 'Spare Mask' : 'Chimichanga!')
                        : 'Tap Open'}
                    </div>
                  </button>
                );
              })}
            </div>

            {hasFoundHqChimichanga && (
              <div className="mt-3 p-2 bg-green-950/70 text-green-300 text-xs font-comic font-bold rounded-lg border border-green-500/40 text-center">
                ✓ You recovered the secret locker Chimichanga!
              </div>
            )}
          </div>

          {/* Boombox / Radio */}
          <div className="bg-zinc-900 p-4 rounded-2xl comic-border shadow-comic">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bangers text-lg text-yellow-400 flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-500" />
                <span>WADE'S CASSETTE BOOMBOX</span>
              </div>
            </div>
            <p className="text-xs font-comic text-zinc-300 mb-3">
              {radioTunes[radioTrack]}
            </p>
            <button
              id="cycle-radio-tune-btn"
              onClick={handleRadioCycle}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-sm rounded-lg comic-border shadow-comic cursor-pointer"
            >
              🎵 SWITCH CASSETTE TAPE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
