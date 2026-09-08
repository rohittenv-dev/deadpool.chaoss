import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, MissionProgress } from '../types';
import { translations } from '../utils/translations';
import { playClickSound, playPopSound, playPunchSound, playVictorySound, playFailSound, playTacoCrunchSound } from '../utils/audio';
import { Search, Footprints, ShieldQuestion, CheckCircle2, RotateCcw, Award, AlertCircle } from 'lucide-react';

interface MissionsSectionProps {
  language: Language;
  progress: MissionProgress;
  onMissionComplete: (key: keyof MissionProgress) => void;
  onCollectChimichanga: () => void;
  hasFoundMissionChimichanga: boolean;
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({
  language,
  progress,
  onMissionComplete,
  onCollectChimichanga,
  hasFoundMissionChimichanga
}) => {
  const [adventureStage, setAdventureStage] = useState<1 | 2 | 3 | 4>(1);
  const [dialogueHistory, setDialogueHistory] = useState<string[]>([
    "Wade: 'MY ULTRA-SPICY DELUXE CHIMICHANGA IS GONE! The fridge door is wide open! Whoever did this will face my dual katanas! Inspect the clues below!'"
  ]);
  const [cluesFoundCount, setCluesFoundCount] = useState<number>(0);

  const t = translations[language];

  const handleStage1Choice = (choice: 'note' | 'trail' | 'blame') => {
    if (choice === 'note') {
      playPopSound();
      setDialogueHistory(prev => [
        ...prev,
        "📜 You inspected the ransom note: 'Roses are red, your swords are neat, your spicy chimichanga was delicious to eat. Signed, A Mysterious Frenemy.'",
        "Wade: 'A poet?! Who writes rhyming ransom notes?! We need more evidence!'"
      ]);
      setCluesFoundCount(c => c + 1);
      onMissionComplete('foundFirstClue');
    } else if (choice === 'trail') {
      playClickSound();
      setDialogueHistory(prev => [
        ...prev,
        "👣 You followed a trail of fiery habanero hot sauce drops leading toward the fire escape alleyway!",
        "Wade: 'AHA! The culprit has sloppy salsa discipline! Let's advance into the alley!'"
      ]);
      setCluesFoundCount(c => c + 1);
      setAdventureStage(2);
      onMissionComplete('foundFirstClue');
    } else {
      playPunchSound();
      setDialogueHistory(prev => [
        ...prev,
        "🐺 You called Wolverine to accuse him of taco theft.",
        "Logan's voicemail: 'Wade, if you call me about Mexican food one more time, I will shred your phone into confetti.'",
        "Wade: 'Well, he sounds busy being Canadian. Let's look at the hot sauce trail instead.'"
      ]);
    }
  };

  const handleStage2Choice = (choice: 'pigeon' | 'dumpster' | 'dopinder') => {
    if (choice === 'pigeon') {
      playPopSound();
      setDialogueHistory(prev => [
        ...prev,
        "🐦 You interrogated a suspicious pigeon wearing a tiny fedora.",
        "Pigeon: 'Coo coo, I saw a red-suited maniac running around with a silver wrapper at 3 AM.'",
        "Wade: 'Wait... red-suited maniac? That narrows it down to me, Santa, or Spider-Man!'"
      ]);
      setAdventureStage(3);
    } else if (choice === 'dumpster') {
      playTacoCrunchSound();
      setDialogueHistory(prev => [
        ...prev,
        "🗑️ You pried open the dumpster with Wade's katana. Inside you find empty spicy salsa packets and a security camera tape!",
        "Wade: 'Jackpot! Let's review the footage at the taco cart!'"
      ]);
      if (!hasFoundMissionChimichanga) {
        onCollectChimichanga();
      }
      setAdventureStage(3);
    } else {
      playClickSound();
      setDialogueHistory(prev => [
        ...prev,
        "🚕 Dopinder arrives in the taxi playing loud upbeat music!",
        "Dopinder: 'Mr. Pool! Did you know you ordered 4 chimichangas last night and fell asleep on my backseat singing romantic songs?'",
        "Wade: '...Wait, what did you just say?!'"
      ]);
      setAdventureStage(3);
    }
  };

  const handleStage3Choice = (choice: 'camera' | 'interrogate_self' | 'blame_cable') => {
    if (choice === 'camera' || choice === 'interrogate_self') {
      playVictorySound();
      setDialogueHistory(prev => [
        ...prev,
        "📹 YOU PLAY THE SECURITY TAPE: At 3:17 AM, Wade Wilson enters the kitchen in unicorn slippers, devours the chimichanga in two bites, and whispers 'Nobody will ever know.'",
        "Wade: '...OH. IT WAS ME. I ATE IT IN MY SLEEP! Case closed, maximum detective effort!'",
        "🎉 MISSION COMPLETED: You successfully solved the case of the Stolen Chimichanga!"
      ]);
      setAdventureStage(4);
      onMissionComplete('solvedChimichanga');
    } else {
      playFailSound();
      setDialogueHistory(prev => [
        ...prev,
        "⏱️ Cable suddenly time-travels in: 'Wade, I came back from 2085 to tell you that YOU ATE THE CHIMICHANGA YOURSELF.'",
        "Wade: 'Ah, classic me. Thanks, Cable! Now go back to being grumpy!'",
        "🎉 MISSION COMPLETED: Mystery solved!"
      ]);
      setAdventureStage(4);
      onMissionComplete('solvedChimichanga');
    }
  };

  const handleRestart = () => {
    playPopSound();
    setAdventureStage(1);
    setDialogueHistory([
      "Wade: 'Let's run the investigation again! Maybe this time Francis stole it!'"
    ]);
  };

  return (
    <div id="missions-section" className="relative max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-zinc-950 font-bangers text-sm px-3.5 py-1 rounded-full comic-border shadow-comic mb-2">
          <Search className="w-4 h-4" />
          <span>OFFICIAL ANTIHERO INVESTIGATION</span>
        </div>
        <h2 className="font-bangers text-4xl sm:text-6xl text-yellow-300 drop-shadow-[3px_3px_0px_#000]">
          {t.missions.title}
        </h2>
        <p className="font-comic text-zinc-300 font-bold text-base sm:text-lg max-w-xl mx-auto">
          {t.missions.subtitle}
        </p>
      </div>

      {/* Comic Detective Dashboard */}
      <div className="bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-8 relative overflow-hidden">
        {/* Mission Status Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-950 p-4 rounded-2xl comic-border shadow-comic mb-6">
          <div className="flex items-center gap-2 font-bangers text-lg text-yellow-400">
            <span className="text-2xl">🌯</span>
            <span>{t.missions.activeMission}</span>
          </div>

          <div className="flex items-center gap-2 font-bangers text-sm bg-red-950 text-red-300 px-3 py-1 rounded-xl border border-red-500/50">
            <span>INVESTIGATION STAGE: {adventureStage}/3</span>
            {adventureStage === 4 && <span className="text-green-400">✓ SOLVED!</span>}
          </div>
        </div>

        {/* Comic Dialogue / Clue Stream Box */}
        <div className="bg-zinc-950 rounded-2xl comic-border p-4 sm:p-6 mb-6 max-h-[260px] overflow-y-auto space-y-3">
          {dialogueHistory.map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-xl comic-border font-comic text-sm font-bold ${
                text.startsWith('Wade:')
                  ? 'bg-yellow-300 text-zinc-950'
                  : text.startsWith('🎉')
                  ? 'bg-emerald-400 text-zinc-950 text-base font-bangers'
                  : 'bg-zinc-900 text-zinc-200'
              }`}
            >
              {text}
            </motion.div>
          ))}
        </div>

        {/* Interactive Investigation Choices */}
        <div className="border-t-2 border-zinc-800 pt-6">
          <div className="font-bangers text-xl text-yellow-400 mb-3 flex items-center gap-2">
            <span>WHAT WILL YOU DO NEXT, DETECTIVE?</span>
          </div>

          {adventureStage === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                id="mission-choice-note"
                onClick={() => handleStage1Choice('note')}
                className="p-4 bg-zinc-800 hover:bg-zinc-700 text-yellow-300 rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                📜 Read Suspicious Ransom Note
              </button>

              <button
                id="mission-choice-trail"
                onClick={() => handleStage1Choice('trail')}
                className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                👣 Follow Habanero Salsa Trail
              </button>

              <button
                id="mission-choice-blame"
                onClick={() => handleStage1Choice('blame')}
                className="p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                🐺 Blame Wolverine Immediately
              </button>
            </div>
          )}

          {adventureStage === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                id="mission-choice-pigeon"
                onClick={() => handleStage2Choice('pigeon')}
                className="p-4 bg-zinc-800 hover:bg-zinc-700 text-yellow-300 rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                🐦 Interrogate the Fedora Pigeon
              </button>

              <button
                id="mission-choice-dumpster"
                onClick={() => handleStage2Choice('dumpster')}
                className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                🗑️ Pry Open Dumpster for Loot
              </button>

              <button
                id="mission-choice-dopinder"
                onClick={() => handleStage2Choice('dopinder')}
                className="p-4 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                🚕 Flag Down Dopinder's Taxi
              </button>
            </div>
          )}

          {adventureStage === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                id="mission-choice-camera"
                onClick={() => handleStage3Choice('camera')}
                className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                📹 Review Security Cam Footage
              </button>

              <button
                id="mission-choice-interrogate"
                onClick={() => handleStage3Choice('interrogate_self')}
                className="p-4 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                🤔 Interrogate Wade's Sleep Habits
              </button>

              <button
                id="mission-choice-cable"
                onClick={() => handleStage3Choice('blame_cable')}
                className="p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl comic-border shadow-comic font-bangers text-lg text-left cursor-pointer transition-all hover:scale-103"
              >
                ⏱️ Summon Cable for Time-Audit
              </button>
            </div>
          )}

          {adventureStage === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-zinc-950 font-bangers text-2xl px-6 py-2 rounded-2xl comic-border shadow-comic">
                <Award className="w-8 h-8 text-red-600" />
                <span>CASE CLOSED! YOU RECEIVED: MASTER DETECTIVE BADGE</span>
              </div>
              <div>
                <button
                  id="mission-replay-btn"
                  onClick={handleRestart}
                  className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-yellow-300 font-bangers text-base rounded-xl comic-border cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 inline mr-1" /> Replay This Case
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
