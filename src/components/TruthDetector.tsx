import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Trophy, Skull } from 'lucide-react';
import { playVictorySound, playFailSound } from '../utils/audio';

interface StatementItem {
  id: number;
  statement: string;
  correctAnswer: 'TRUE' | 'LIE';
}

const STATEMENTS: StatementItem[] = [
  { id: 1, statement: "I have never broken the fourth wall.", correctAnswer: 'LIE' },
  { id: 2, statement: "I am definitely the most responsible superhero.", correctAnswer: 'LIE' },
  { id: 3, statement: "I always follow the rules.", correctAnswer: 'LIE' },
  { id: 4, statement: "I have never talked directly to the audience.", correctAnswer: 'LIE' },
  { id: 5, statement: "I totally read the instruction manual.", correctAnswer: 'LIE' },
  { id: 6, statement: "I am a perfectly normal hero.", correctAnswer: 'LIE' },
  { id: 7, statement: "I hate chimichangas and refuse to eat tacos.", correctAnswer: 'LIE' },
  { id: 8, statement: "Francis is my absolute favorite person in the whole universe.", correctAnswer: 'LIE' }
];

const CORRECT_REACTIONS = [
  "WAIT... YOU ACTUALLY GOT THAT RIGHT?! 💀",
  "Okay, you're smarter than you look.",
  "Fine. You caught me."
];

const WRONG_REACTIONS = [
  "HAHA! You actually believed me?! 😂",
  "That was obviously a lie!",
  "Congratulations. You just got fooled by Deadpool."
];

interface TruthDetectorProps {
  onAddChaosPoints?: (points: number) => void;
}

export const TruthDetector: React.FC<TruthDetectorProps> = ({ onAddChaosPoints }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'TRUE' | 'LIE' | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [reactionText, setReactionText] = useState<string>('');
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const currentStatement = STATEMENTS[currentIndex];

  const handleAnswer = (answer: 'TRUE' | 'LIE') => {
    if (selectedAnswer !== null) return; // Prevent double click before NEXT LIE

    setSelectedAnswer(answer);
    const correct = answer === currentStatement.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      playVictorySound();
      const randomReaction = CORRECT_REACTIONS[Math.floor(Math.random() * CORRECT_REACTIONS.length)];
      setReactionText(randomReaction);
      setScore(prev => prev + 1);

      if (onAddChaosPoints) {
        onAddChaosPoints(10);
      }
    } else {
      playFailSound();
      const randomReaction = WRONG_REACTIONS[Math.floor(Math.random() * WRONG_REACTIONS.length)];
      setReactionText(randomReaction);
    }

    setTotalAnswered(prev => prev + 1);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setReactionText('');
    setCurrentIndex(prev => (prev + 1) % STATEMENTS.length);
  };

  return (
    <div className="mt-10 bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-8 relative overflow-hidden text-center select-none">
      {/* Decorative Top Badge */}
      <div className="inline-flex items-center gap-2 bg-yellow-400 text-zinc-950 font-bangers text-sm sm:text-base px-4 py-1 rounded-full comic-border shadow-comic mb-4 uppercase">
        <HelpCircle className="w-4 h-4" />
        <span>TRUTH DETECTOR</span>
      </div>

      {/* Main Feature Title */}
      <h3 className="font-bangers text-3xl sm:text-5xl text-yellow-300 drop-shadow-[3px_3px_0px_#000] mb-2 flex items-center justify-center gap-2">
        <span>🕵️</span> DEADPOOL IS LYING
      </h3>

      <p className="font-comic font-bold text-zinc-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
        Wade makes bold claims. Can you catch him in a lie, or will you fall for his comic-book traps?
      </p>

      {/* Score Tracker */}
      <div className="inline-flex items-center gap-4 bg-zinc-950 px-4 py-2 rounded-2xl comic-border shadow-comic mb-6 text-sm font-bangers text-yellow-400">
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>SCORE: {score}</span>
        </div>
        <span className="text-zinc-600">|</span>
        <div className="flex items-center gap-1">
          <Skull className="w-4 h-4 text-red-500" />
          <span>ANSWERED: {totalAnswered}</span>
        </div>
      </div>

      {/* Statement Box */}
      <div className="bg-zinc-950 p-6 rounded-2xl comic-border shadow-comic max-w-xl mx-auto mb-6 relative">
        <span className="text-yellow-400 text-xs font-bangers block mb-1 tracking-wider uppercase">
          STATEMENT #{currentIndex + 1} OF {STATEMENTS.length}
        </span>
        <p className="font-comic font-extrabold text-xl sm:text-2xl text-white drop-shadow-[1px_1px_0px_#000]">
          "{currentStatement.statement}"
        </p>
      </div>

      {/* Action Buttons: TRUE / LIE */}
      {selectedAnswer === null ? (
        <div className="flex items-center justify-center gap-4 sm:gap-6 my-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer('TRUE')}
            className="flex-1 max-w-[160px] py-3 px-6 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bangers text-2xl comic-border shadow-comic tracking-wide transition-all cursor-pointer"
          >
            TRUE
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer('LIE')}
            className="flex-1 max-w-[160px] py-3 px-6 rounded-2xl bg-red-600 hover:bg-red-500 text-yellow-300 font-bangers text-2xl comic-border shadow-comic tracking-wide transition-all cursor-pointer"
          >
            LIE
          </motion.button>
        </div>
      ) : (
        /* Result Feedback Area */
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-4 max-w-xl mx-auto"
          >
            {/* Answer Status Badge */}
            <div className={`inline-flex items-center gap-2 font-bangers text-xl px-5 py-2 rounded-2xl comic-border shadow-comic ${
              isCorrect ? 'bg-green-500 text-zinc-950' : 'bg-red-600 text-yellow-300'
            }`}>
              {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              <span>{isCorrect ? 'CORRECT! YOU CAUGHT HIM!' : 'WRONG! FOOLED BY WADE!'}</span>
            </div>

            {/* Deadpool Reaction Speech Bubble */}
            <div className="bg-yellow-300 text-zinc-950 font-bangers text-xl sm:text-2xl p-4 rounded-2xl comic-border shadow-comic">
              {reactionText}
            </div>

            {/* Next Lie Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="inline-flex items-center gap-2 py-3 px-8 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-2xl comic-border shadow-comic tracking-wider transition-all cursor-pointer mt-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>NEXT LIE</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
