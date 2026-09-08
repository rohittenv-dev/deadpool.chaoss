import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPopSound, playClickSound, playPunchSound } from '../utils/audio';
import { HelpCircle, Heart, Shield, Sparkles, MessageSquare, Flame } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Wait, isn't this website breaking the 4th wall?",
      a: "Breaking it? Sweetheart, we took a sledgehammer to the 4th wall, sold the rubble on eBay, and used the profits to buy hot sauce."
    },
    {
      q: "Why red and yellow colors everywhere?",
      a: "Red so bad guys don't see me bleed. Yellow because it looks like mustard on a hot dog and makes the buttons pop! Also, it matches Wolverine's classic spandex suit which drives him crazy."
    },
    {
      q: "Is that really a synthesized audio engine?",
      a: "Yes! Zero external MP3 downloads to fail, zero CORS errors, pure browser Web Audio frequency oscillators. Maximum developer craft, minimum loading lag!"
    },
    {
      q: "How many chimichangas can one mercenary eat?",
      a: "The limit does not exist. Scientifically, my stomach regenerates as fast as I can chew."
    }
  ];

  return (
    <div id="about-section" className="relative max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-yellow-400 text-zinc-950 font-bangers text-sm px-3.5 py-1 rounded-full comic-border shadow-comic mb-2">
          DOSSIER & BIOGRAPHY
        </div>
        <h2 className="font-bangers text-4xl sm:text-6xl text-yellow-300 drop-shadow-[3px_3px_0px_#000]">
          ABOUT THE MERC WITH A MOUTH
        </h2>
        <p className="font-comic text-zinc-300 font-bold text-base sm:text-lg max-w-xl mx-auto">
          Everything you never knew you needed to know about Wade Wilson.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Antihero Comic Bio Card */}
        <div className="bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 text-center relative overflow-hidden">
          <div className="w-24 h-24 bg-red-600 rounded-full comic-border-thick flex items-center justify-center mx-auto mb-4 relative shadow-comic">
            <span className="text-5xl">🎭</span>
          </div>

          <h3 className="font-bangers text-3xl text-yellow-400 mb-1">
            WADE WILSON
          </h3>
          <div className="text-xs font-comic font-bold text-red-400 uppercase tracking-widest mb-4">
            FREELANCE PROBLEM SOLVER / TACO ENTHUSIAST
          </div>

          <div className="space-y-2 text-left text-xs font-comic font-bold text-zinc-300 bg-zinc-950 p-4 rounded-xl comic-border">
            <div className="flex justify-between border-b border-zinc-800 pb-1">
              <span className="text-zinc-500">Healing Factor:</span>
              <span className="text-emerald-400">Ridiculously OP</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-1">
              <span className="text-zinc-500">Favorite Food:</span>
              <span className="text-yellow-400">Chimichanga (Extra Spicy)</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-1">
              <span className="text-zinc-500">Best Friend:</span>
              <span className="text-yellow-400">Wolverine (He denies it)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Moral Alignment:</span>
              <span className="text-red-400">Chaotic Good-ish</span>
            </div>
          </div>
        </div>

        {/* Comic FAQ Section */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-6 h-6 text-yellow-400" />
            <h3 className="font-bangers text-2xl sm:text-3xl text-yellow-400">
              INTERVIEW WITH WADE (Q & A)
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl comic-border bg-zinc-950 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-4 flex items-center justify-between text-left font-bangers text-lg sm:text-xl text-yellow-300 hover:text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-red-500 font-bold ml-2">{isOpen ? '▲' : '▼'}</span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 pt-1 font-comic font-bold text-sm text-zinc-300 border-t border-zinc-800"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
