import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPopSound } from '../utils/audio';

export const DeadpoolEyeFollower: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const hideBubbleTimerRef = useRef<number | null>(null);
  const nextAllowedIdleRef = useRef<number>(Date.now() + 4000);

  const idleQuips = [
    "Still there? 👀",
    "I can see you.",
    "Stop staring at me."
  ];

  // Detect touch device & listen to cursor
  useEffect(() => {
    const checkTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    setIsTouchDevice(checkTouch);

    if (checkTouch) {
      return; // Disable mouse following on touch devices gracefully
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Clear previous idle timer
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }

      // Calculate eye angle and offset
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.hypot(dx, dy) / 40, 4); // Max 4px travel
        setEyeOffset({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
        });
      }

      // Schedule idle check
      idleTimerRef.current = window.setTimeout(() => {
        if (Date.now() >= nextAllowedIdleRef.current) {
          const randomQuip = idleQuips[Math.floor(Math.random() * idleQuips.length)];
          setSpeechBubble(randomQuip);
          nextAllowedIdleRef.current = Date.now() + 10000; // Wait at least 10s before next

          // Hide after 2.6s
          hideBubbleTimerRef.current = window.setTimeout(() => {
            setSpeechBubble(null);
          }, 2600);
        }
      }, 4000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      if (hideBubbleTimerRef.current) window.clearTimeout(hideBubbleTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="deadpool-eye-follower"
      className="fixed bottom-4 left-4 z-30 select-none pointer-events-auto flex items-end gap-2"
    >
      {/* Eye Follower Comic Face */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playPopSound();
          setSpeechBubble(idleQuips[Math.floor(Math.random() * idleQuips.length)]);
          setTimeout(() => setSpeechBubble(null), 2500);
        }}
        className="w-14 h-14 bg-red-600 rounded-full comic-border shadow-comic flex items-center justify-center relative overflow-hidden cursor-pointer group"
        title="Deadpool Eye Tracker (I'm watching your cursor!)"
      >
        {/* Subtle Shading */}
        <div className="absolute inset-0 bg-red-700 opacity-50 pointer-events-none" />

        {/* Comic Eye Patches */}
        <div className="relative z-10 flex gap-1.5 items-center px-1">
          {/* Left Eye Patch */}
          <div className="w-4 h-5 bg-zinc-950 rounded-[40%] flex items-center justify-center -rotate-6 shadow-inner relative overflow-hidden">
            <div
              className="w-2 h-3 bg-white rounded-full transition-transform duration-75 ease-out"
              style={{
                transform: !isTouchDevice ? `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` : 'none'
              }}
            />
          </div>

          {/* Right Eye Patch */}
          <div className="w-4 h-5 bg-zinc-950 rounded-[40%] flex items-center justify-center rotate-6 shadow-inner relative overflow-hidden">
            <div
              className="w-2 h-3 bg-white rounded-full transition-transform duration-75 ease-out"
              style={{
                transform: !isTouchDevice ? `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` : 'none'
              }}
            />
          </div>
        </div>

        {/* Mini Label */}
        <div className="absolute bottom-0.5 inset-x-0 text-center font-bangers text-[8px] text-yellow-300 leading-none opacity-80 group-hover:opacity-100">
          STALKER
        </div>
      </motion.div>

      {/* Occasional Idle Speech Bubble */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            className="mb-2 bg-yellow-300 text-zinc-950 px-3 py-1.5 rounded-xl comic-border shadow-comic font-comic font-bold text-xs whitespace-nowrap relative"
          >
            {speechBubble}
            {/* Comic arrow pointer */}
            <div className="absolute -bottom-1.5 left-3 w-2.5 h-2.5 bg-yellow-300 border-r-2 border-b-2 border-black rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
