import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, AlertCircle, Award } from 'lucide-react';

interface NotificationBannerProps {
  message: string | null;
  onDismiss: () => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-18 right-4 z-50 max-w-sm pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          onClick={onDismiss}
          className="p-4 bg-yellow-400 text-zinc-950 rounded-2xl comic-border shadow-comic-lg cursor-pointer flex items-start gap-3"
        >
          <span className="text-3xl">💥</span>
          <div className="flex-1">
            <div className="font-bangers text-lg leading-tight text-red-600">
              COMMUNICATION FROM WADE:
            </div>
            <div className="font-comic font-bold text-xs sm:text-sm text-zinc-900 mt-0.5 leading-snug">
              {message}
            </div>
            <div className="text-[10px] font-comic font-bold text-zinc-700 mt-1 opacity-70">
              (Click to dismiss)
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
