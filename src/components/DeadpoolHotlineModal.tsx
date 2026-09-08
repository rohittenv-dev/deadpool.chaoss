import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneOff, PhoneCall, X, Volume2 } from 'lucide-react';
import { playPhoneRingSound, playClickSound, playPopSound, playFailSound, playVictorySound } from '../utils/audio';

interface DeadpoolHotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeadpoolHotlineModal: React.FC<DeadpoolHotlineModalProps> = ({ isOpen, onClose }) => {
  const [callStatus, setCallStatus] = useState<'ringing' | 'accepted' | 'declined'>('ringing');
  const [messageIndex, setMessageIndex] = useState(0);

  const acceptedMessages = [
    "Finally! You picked up.",
    "Listen, I have absolutely no idea why you called me.",
    "Anyway... stay chaotic. Bye."
  ];

  // Play ringing sound periodically while ringing
  useEffect(() => {
    if (!isOpen) {
      setCallStatus('ringing');
      setMessageIndex(0);
      return;
    }

    if (callStatus === 'ringing') {
      playPhoneRingSound();
      const interval = setInterval(() => {
        playPhoneRingSound();
      }, 2200);
      return () => clearInterval(interval);
    }
  }, [isOpen, callStatus]);

  if (!isOpen) return null;

  const handleAccept = () => {
    playPopSound();
    setCallStatus('accepted');
    setMessageIndex(0);
  };

  const handleDecline = () => {
    playFailSound();
    setCallStatus('declined');
  };

  const handleNextMessage = () => {
    playClickSound();
    if (messageIndex < acceptedMessages.length - 1) {
      setMessageIndex(prev => prev + 1);
    } else {
      playVictorySound();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-sm bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 text-white overflow-hidden text-center"
      >
        {/* Top Caution Stripe */}
        <div className="comic-caution h-3 -mt-6 -mx-6 mb-5" />

        {/* Close Button */}
        <button
          id="close-hotline-modal-btn"
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white comic-border transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* RINGING STATE */}
        {callStatus === 'ringing' && (
          <div>
            {/* Animated avatar / phone indicator */}
            <motion.div
              animate={{ rotate: [-6, 6, -6], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="w-20 h-20 mx-auto mb-4 bg-red-600 rounded-full comic-border-thick flex items-center justify-center shadow-comic relative"
            >
              <PhoneCall className="w-10 h-10 text-yellow-300" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-400"></span>
              </span>
            </motion.div>

            <div className="font-bangers text-xs tracking-widest text-red-500 uppercase mb-1">
              INCOMING MERCENARY COMMUNICATOR
            </div>
            <h3 className="font-bangers text-3xl sm:text-4xl text-yellow-400 drop-shadow-[2px_2px_0px_#000] leading-none mb-1">
              WADE WILSON IS CALLING...
            </h3>
            <p className="font-comic font-bold text-xs text-zinc-400 mb-6">
              (Collect Call • 1-800-CHIMICHANGA)
            </p>

            {/* Accept / Decline Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                id="accept-hotline-btn"
                onClick={handleAccept}
                className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bangers text-xl rounded-2xl comic-border shadow-comic flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span>ACCEPT</span>
              </button>

              <button
                id="decline-hotline-btn"
                onClick={handleDecline}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-bangers text-xl rounded-2xl comic-border shadow-comic flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <PhoneOff className="w-5 h-5" />
                <span>DECLINE</span>
              </button>
            </div>
          </div>
        )}

        {/* ACCEPTED CALL SEQUENCE */}
        {callStatus === 'accepted' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-3 bg-red-600 rounded-full comic-border flex items-center justify-center text-3xl shadow-comic">
              🎭
            </div>

            <div className="font-bangers text-xs text-emerald-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CALL CONNECTED • LINE 01</span>
            </div>

            {/* Speech Bubble */}
            <div className="bg-yellow-300 text-zinc-950 p-4 rounded-2xl comic-border shadow-comic font-comic font-bold text-base sm:text-lg mb-6 min-h-[90px] flex items-center justify-center">
              "{acceptedMessages[messageIndex]}"
            </div>

            <div className="flex gap-2">
              <button
                id="next-hotline-msg-btn"
                onClick={handleNextMessage}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-yellow-300 font-bangers text-xl rounded-2xl comic-border shadow-comic cursor-pointer transition-transform hover:scale-102"
              >
                {messageIndex < acceptedMessages.length - 1 ? 'NEXT MESSAGE 💬' : 'HANG UP (BYE) 📞'}
              </button>
            </div>
          </div>
        )}

        {/* DECLINED CALL */}
        {callStatus === 'declined' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-3 bg-zinc-800 rounded-full comic-border flex items-center justify-center text-3xl shadow-comic">
              💀
            </div>

            <div className="font-bangers text-xs text-red-400 uppercase tracking-widest mb-2">
              CALL REJECTED
            </div>

            <div className="bg-zinc-950 text-red-400 p-4 rounded-2xl comic-border shadow-comic font-comic font-bold text-base sm:text-lg mb-6">
              "Wow. Rejected by YOU? That's cold. 💀"
            </div>

            <button
              id="close-declined-hotline-btn"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bangers text-lg rounded-xl comic-border shadow-comic cursor-pointer"
            >
              DISMISS CALL
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
