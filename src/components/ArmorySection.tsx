import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPunchSound, playPopSound, playBoingSound, playTacoCrunchSound, playChaosSound, playClickSound } from '../utils/audio';
import { Shield, Sparkles, Sword, Crosshair, Heart } from 'lucide-react';

interface ArmoryItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  stats: { damage: string; comedy: string; reload: string };
  actionLabel: string;
}

export const ArmorySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('katanas');
  const [testActionMessage, setTestActionMessage] = useState<string | null>(null);
  const [flyingTacos, setFlyingTacos] = useState<{ id: number; x: number; y: number }[]>([]);

  const armoryItems: ArmoryItem[] = [
    {
      id: 'katanas',
      name: 'TWIN KATANAS ("BEA" & "ARTHUR")',
      icon: '⚔️',
      category: 'Melee / Sarcasm',
      description: 'Hand-forged carbon steel blades named after the legendary Golden Girl. Razor sharp, perfect for slicing chimichangas or deflecting bullets with zero CGI.',
      stats: { damage: '9,001', comedy: 'Golden Girls/10', reload: 'Instant' },
      actionLabel: 'TEST SLASH "SWOOSH!"'
    },
    {
      id: 'chicken',
      name: 'TACTICAL RUBBER CHICKEN',
      icon: '🐔',
      category: 'Psychological Warfare',
      description: 'Produces high-decibel squeaks capable of distracting Hydra henchmen and annoying Cable beyond human endurance.',
      stats: { damage: 'Emotional: 100', comedy: 'Infinite', reload: 'Squeeze again' },
      actionLabel: 'SQUEEZE RUBBER CHICKEN'
    },
    {
      id: 'unicorn',
      name: 'EMOTIONAL SUPPORT UNICORN',
      icon: '🦄',
      category: 'Mental Health',
      description: 'Ultra-soft, glitter-infused plushie. Wade takes this on every mission to stay spiritually aligned and fabulous.',
      stats: { damage: '0 (Only Love)', comedy: 'Sparkles', reload: 'Cuddle' },
      actionLabel: 'CUDDLE THE UNICORN'
    },
    {
      id: 'launcher',
      name: 'CHIMICHANGA LAUNCHER 3000',
      icon: '🌯',
      category: 'Heavy Ordnance',
      description: 'Spring-loaded pneumatic cannon capable of launching deep-fried Mexican delicacies up to 400 yards directly into Wade’s mouth.',
      stats: { damage: 'Spicy Salsa AOE', comedy: 'Delicious', reload: '10 Tacos/sec' },
      actionLabel: 'FIRE TACO BARRAGE!'
    },
    {
      id: 'c4',
      name: 'EXCESSIVE C-4 PLASTIC EXPLOSIVES',
      icon: '🧨',
      category: 'Diplomacy',
      description: 'Used whenever talking things out reasonably takes longer than 3 seconds. Also useful for opening stubborn pickle jars.',
      stats: { damage: 'YES', comedy: 'Michael Bay Level', reload: 'Run!' },
      actionLabel: 'PRANK DETONATION'
    }
  ];

  const currentItem = armoryItems.find(i => i.id === selectedItem) || armoryItems[0];

  const handleTestGear = (item: ArmoryItem) => {
    if (item.id === 'katanas') {
      playPunchSound();
      setTestActionMessage("⚔️ SCHWING! Bea & Arthur cleanly sliced through the fourth wall! Watch your fingers!");
    } else if (item.id === 'chicken') {
      playBoingSound();
      setTestActionMessage("🐔 *SQUEEEEEEAAAK!* Wolverine in the next room just punched a hole through his wall.");
    } else if (item.id === 'unicorn') {
      playPopSound();
      setTestActionMessage("🦄 Rainbow sparkles filled the room! Wade's heart grew three sizes, then shrank back to normal.");
    } else if (item.id === 'launcher') {
      playTacoCrunchSound();
      setTestActionMessage("🌯 THWUMP! A hot chicken chimichanga was launched across the container!");
      // Spawn flying taco animation
      setFlyingTacos(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 40 + 30 }]);
    } else if (item.id === 'c4') {
      playChaosSound(4);
      setTestActionMessage("🧨 BOOM! Confetti and smoke everywhere! Fortunately, Wade has regenerative healing.");
    }
  };

  return (
    <div id="armory-section" className="relative max-w-6xl mx-auto px-4 py-8">
      {/* Flying tacos from launcher */}
      {flyingTacos.map(t => (
        <motion.div
          key={t.id}
          initial={{ x: -100, y: 300, rotate: 0, scale: 0.5 }}
          animate={{ x: window.innerWidth, y: -200, rotate: 720, scale: 1.5 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="fixed text-5xl z-50 pointer-events-none"
        >
          🌯
        </motion.div>
      ))}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-red-600 text-white font-bangers text-sm px-3.5 py-1 rounded-full comic-border shadow-comic mb-2">
          ARSENAL OF RIDICULOUS WEAPONS
        </div>
        <h2 className="font-bangers text-4xl sm:text-6xl text-yellow-300 drop-shadow-[3px_3px_0px_#000]">
          ARMORY & GEAR RACK
        </h2>
        <p className="font-comic text-zinc-300 font-bold text-base sm:text-lg max-w-xl mx-auto">
          Every seasoned antihero needs proper gear. Mostly sharp swords, snacks, and plush toys.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Weapon Select List */}
        <div className="space-y-3">
          {armoryItems.map(item => (
            <button
              key={item.id}
              id={`armory-item-${item.id}`}
              onClick={() => {
                playClickSound();
                setSelectedItem(item.id);
                setTestActionMessage(null);
              }}
              className={`w-full p-4 rounded-2xl comic-border text-left transition-all flex items-center gap-3 cursor-pointer ${
                selectedItem === item.id
                  ? 'bg-yellow-400 text-zinc-950 shadow-comic translate-x-1.5'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <div className="font-bangers text-lg sm:text-xl leading-tight">
                  {item.name}
                </div>
                <div className="text-xs font-comic font-bold opacity-80">
                  {item.category}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Detailed Weapon Inspection Chamber */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-9xl pointer-events-none select-none">
            {currentItem.icon}
          </div>

          <div>
            <div className="inline-block bg-zinc-800 text-yellow-300 px-3 py-1 rounded-md text-xs font-bangers mb-2 comic-border">
              {currentItem.category.toUpperCase()}
            </div>
            <h3 className="font-bangers text-3xl sm:text-4xl text-yellow-400 drop-shadow-[2px_2px_0px_#000] mb-3">
              {currentItem.name}
            </h3>
            <p className="font-comic text-zinc-200 text-base sm:text-lg leading-relaxed mb-6 font-bold">
              {currentItem.description}
            </p>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-zinc-950 p-3 rounded-xl comic-border">
                <div className="text-[10px] font-comic font-bold text-zinc-400 uppercase">Damage</div>
                <div className="font-bangers text-base sm:text-lg text-red-500">{currentItem.stats.damage}</div>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl comic-border">
                <div className="text-[10px] font-comic font-bold text-zinc-400 uppercase">Comedy Rating</div>
                <div className="font-bangers text-base sm:text-lg text-yellow-400">{currentItem.stats.comedy}</div>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl comic-border">
                <div className="text-[10px] font-comic font-bold text-zinc-400 uppercase">Reload Speed</div>
                <div className="font-bangers text-base sm:text-lg text-emerald-400">{currentItem.stats.reload}</div>
              </div>
            </div>
          </div>

          {/* Test Action Trigger */}
          <div>
            <AnimatePresence>
              {testActionMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 p-3 bg-yellow-300 text-zinc-950 rounded-xl comic-border font-bangers text-lg leading-snug shadow-comic"
                >
                  {testActionMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              id="armory-test-weapon-btn"
              onClick={() => handleTestGear(currentItem)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-red-600 hover:bg-red-500 text-yellow-300 font-bangers text-2xl rounded-2xl comic-border shadow-comic flex items-center justify-center gap-2 cursor-pointer tracking-wider"
            >
              <Crosshair className="w-6 h-6" />
              <span>{currentItem.actionLabel}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
