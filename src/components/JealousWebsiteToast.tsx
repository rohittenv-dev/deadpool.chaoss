import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

interface JealousWebsiteToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const JealousWebsiteToast: React.FC<JealousWebsiteToastProps> = ({ message, onDismiss }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 5 }}
          transition={{ type: 'spring', damping: 15, stiffness: 250 }}
          className="fixed bottom-24 right-6 z-50 max-w-sm cursor-pointer select-none"
          onClick={onDismiss}
        >
          {/* Speech Bubble Arrow */}
          <div className="relative bg-yellow-300 text-zinc-950 p-4 sm:p-5 rounded-3xl comic-border-thick shadow-comic-lg">
            <div className="flex items-start gap-3">
              <div className="bg-red-600 text-yellow-300 p-2 rounded-2xl comic-border shrink-0">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="font-bangers text-xs text-red-600 uppercase tracking-wider mb-0.5">
                  💥 WEBSITE IS GETTING JEALOUS!
                </div>
                <div className="font-comic font-extrabold text-base sm:text-lg leading-tight">
                  "{message}"
                </div>
              </div>
            </div>
            {/* Speech pointer tail */}
            <div className="absolute -bottom-3 right-8 w-6 h-6 bg-yellow-300 comic-border border-t-0 border-l-0 rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
