import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { playPunchSound, playVictorySound, playFailSound, playPopSound } from '../utils/audio';
import { X, ShieldAlert, Sparkles, UserPlus, LogIn, Lock } from 'lucide-react';

interface AuthModalsProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Comical validations
    if (mode === 'signup' && !name.trim()) {
      playFailSound();
      setErrorMsg("Even Deadpool fills this in! Give us your mercenary alias!");
      return;
    }

    if (!email.trim()) {
      playFailSound();
      setErrorMsg("Empty email? Even Blind Al can see you missed a field!");
      return;
    }

    if (!email.includes('@')) {
      playFailSound();
      setErrorMsg("Missing '@' sign! Are you sending this by carrier pigeon?");
      return;
    }

    if (!password.trim()) {
      playFailSound();
      setErrorMsg("Nice try. The password has escaped! Type something!");
      return;
    }

    if (password.length < 4) {
      playFailSound();
      setErrorMsg("Password is too short. At least make it longer than Wolverine's patience!");
      return;
    }

    if (password.toLowerCase() === 'password' || password === '1234') {
      playFailSound();
      setErrorMsg("Did you really just type '1234'? I'm breaking the 4th wall in disappointment.");
      return;
    }

    // Success!
    playVictorySound();
    const newUser: UserProfile = {
      name: mode === 'signup' ? name.trim() : (email.split('@')[0] || 'Mercenary'),
      email: email.trim(),
      isLoggedIn: true,
      avatarTitle: 'Agent of Chaos'
    };

    onSuccess(newUser);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="relative w-full max-w-md bg-zinc-900 rounded-3xl comic-border-thick shadow-comic-lg p-6 sm:p-8 text-white overflow-hidden"
        >
          {/* Top Danger Bar */}
          <div className="comic-caution h-3 -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-6" />

          {/* Close button */}
          <button
            id="close-auth-modal-btn"
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white comic-border transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-red-600 rounded-full comic-border flex items-center justify-center mx-auto mb-2 text-2xl shadow-comic">
              {mode === 'signup' ? '🌮' : '🔑'}
            </div>
            <h3 className="font-bangers text-3xl sm:text-4xl text-yellow-400 drop-shadow-[2px_2px_0px_#000]">
              {mode === 'signup' ? 'JOIN THE MERC CORPS' : 'MERCENARY LOG-IN'}
            </h3>
            <p className="font-comic font-bold text-xs text-zinc-400">
              {mode === 'signup'
                ? 'Sign up to officially become Wade Wilson’s unpaid intern.'
                : 'Enter your credentials before Cable audits this page.'}
            </p>
          </div>

          {/* Humorous Error Alert */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-950 border-2 border-red-500 text-red-200 rounded-xl font-comic font-bold text-xs flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block font-bangers text-sm text-yellow-300 mb-1">
                  MERCENARY ALIAS (NAME)
                </label>
                <input
                  id="auth-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="e.g. Chimichanga Kid"
                  className="w-full px-4 py-2.5 bg-zinc-950 rounded-xl comic-border text-white font-comic font-bold text-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
            )}

            <div>
              <label className="block font-bangers text-sm text-yellow-300 mb-1">
                TOP SECRET EMAIL
              </label>
              <input
                id="auth-email-input"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="wadewilson@maximum-effort.com"
                className="w-full px-4 py-2.5 bg-zinc-950 rounded-xl comic-border text-white font-comic font-bold text-sm focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block font-bangers text-sm text-yellow-300 mb-1">
                SECRET PASSPHRASE
              </label>
              <input
                id="auth-password-input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-zinc-950 rounded-xl comic-border text-white font-comic font-bold text-sm focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-yellow-300 font-bangers text-xl rounded-xl comic-border shadow-comic cursor-pointer transition-transform hover:scale-102 mt-2"
            >
              {mode === 'signup' ? 'CREATE MERC ACCOUNT' : 'UNSEAL THE VAULT'}
            </button>
          </form>

          {/* Toggle between Login and Sign Up */}
          <div className="mt-6 text-center text-xs font-comic font-bold text-zinc-400">
            {mode === 'signup' ? (
              <div>
                Already an agent of chaos?{' '}
                <button
                  id="switch-to-login-btn"
                  onClick={() => {
                    playPopSound();
                    setMode('login');
                    setErrorMsg(null);
                  }}
                  className="text-yellow-400 underline hover:text-yellow-300 cursor-pointer"
                >
                  Log In instead!
                </button>
              </div>
            ) : (
              <div>
                New to the mercenary life?{' '}
                <button
                  id="switch-to-signup-btn"
                  onClick={() => {
                    playPopSound();
                    setMode('signup');
                    setErrorMsg(null);
                  }}
                  className="text-yellow-400 underline hover:text-yellow-300 cursor-pointer"
                >
                  Sign Up here!
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
