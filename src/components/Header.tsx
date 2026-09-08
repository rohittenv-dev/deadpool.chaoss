import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavSection, Language, UserProfile } from '../types';
import { translations } from '../utils/translations';
import { isAudioEnabled, toggleAudio, playClickSound, playPopSound, playPunchSound } from '../utils/audio';
import { Volume2, VolumeX, Menu, X, ShieldAlert, Sparkles, User, LogOut } from 'lucide-react';

interface HeaderProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: UserProfile;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
  missionsCompletedCount: number;
  totalMissions: number;
  isSecretUnlocked: boolean;
  onLogoEasterEgg: () => void;
  onOpenHotline?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  language,
  onLanguageChange,
  user,
  onOpenLogin,
  onOpenSignup,
  onLogout,
  missionsCompletedCount,
  totalMissions,
  isSecretUnlocked,
  onLogoEasterEgg,
  onOpenHotline
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(isAudioEnabled());
  const [logoClicks, setLogoClicks] = useState(0);
  const [languageReaction, setLanguageReaction] = useState<string | null>(null);
  const reactionTimeoutRef = useRef<number | null>(null);

  const t = translations[language];

  useEffect(() => {
    return () => {
      if (reactionTimeoutRef.current) {
        window.clearTimeout(reactionTimeoutRef.current);
      }
    };
  }, []);

  const languageReactions: Record<Language, string> = {
    en: "Back to English? Boring. 🙄",
    hi: "ओहो! अब हिंदी में बात करेंगे? ठीक है भाई! 💀",
    mr: "अरे वा! मराठी पण येते मला. आता खरी मजा सुरू झाली! 💀"
  };

  const handleLanguageClick = (lang: Language) => {
    playClickSound();
    onLanguageChange(lang);
    setLanguageReaction(languageReactions[lang]);
    if (reactionTimeoutRef.current) {
      window.clearTimeout(reactionTimeoutRef.current);
    }
    reactionTimeoutRef.current = window.setTimeout(() => {
      setLanguageReaction(null);
    }, 2500);
  };

  const handleSoundToggle = () => {
    const next = toggleAudio();
    setSoundActive(next);
    if (next) {
      playPopSound();
    }
  };

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    playPunchSound();
    if (next >= 5) {
      setLogoClicks(0);
      onLogoEasterEgg();
    }
  };

  const navItems: { id: NavSection; label: string; locked?: boolean }[] = [
    { id: 'hero', label: t.nav.hero },
    { id: 'hq', label: t.nav.hq },
    { id: 'memes', label: t.nav.memes },
    { id: 'chaos', label: t.nav.chaos },
    { id: 'missions', label: t.nav.missions },
    { id: 'armory', label: t.nav.armory },
    { id: 'secret', label: isSecretUnlocked ? 'SECRET AREA ⭐' : t.nav.secret, locked: !isSecretUnlocked },
    { id: 'about', label: t.nav.about }
  ];

  return (
    <header id="site-header" className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-b-4 border-black px-3 sm:px-6 py-2.5 shadow-comic">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo with Deadpool Mask */}
        <button
          id="header-logo-button"
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-left group cursor-pointer"
          title="Click 5 times for 4th wall breach!"
        >
          {/* Mini Comic Mask */}
          <div className="w-10 h-10 bg-red-600 rounded-full comic-border flex items-center justify-center relative overflow-hidden group-hover:rotate-12 transition-transform shadow-comic">
            <div className="absolute inset-0 bg-red-700 opacity-70" />
            <div className="relative z-10 flex gap-1 items-center px-1">
              <div className="w-3.5 h-4 bg-zinc-950 rounded-full flex items-center justify-center -rotate-6">
                <div className="w-1.5 h-2.5 bg-white rounded-full rotate-6" />
              </div>
              <div className="w-3.5 h-4 bg-zinc-950 rounded-full flex items-center justify-center rotate-6">
                <div className="w-1.5 h-2.5 bg-white rounded-full -rotate-6" />
              </div>
            </div>
          </div>
          <div>
            <div className="font-bangers text-2xl sm:text-3xl text-yellow-400 tracking-wider flex items-center gap-1 leading-none drop-shadow-[2px_2px_0px_#000]">
              DEADPOOL <span className="text-red-500">CHAOS</span>
            </div>
            <div className="text-[10px] font-comic font-bold text-zinc-400 tracking-widest uppercase">
              MAXIMUM EFFORT HUB {logoClicks > 0 && `(${logoClicks}/5)`}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl comic-border">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => {
                playClickSound();
                onNavigate(item.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-bangers text-base tracking-wide transition-all ${
                currentSection === item.id
                  ? 'bg-yellow-400 text-zinc-950 comic-border shadow-comic translate-y-[-1px]'
                  : 'text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800'
              } ${item.locked ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls: Sound, Language, Missions, Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Call Wade Hotline Button */}
          {onOpenHotline && (
            <button
              id="header-call-wade-btn"
              onClick={() => {
                playClickSound();
                onOpenHotline();
              }}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 rounded-lg comic-border shadow-comic font-bangers text-xs sm:text-sm tracking-wider cursor-pointer transition-transform hover:scale-105 active:scale-95"
              title="Fake Deadpool Hotline"
            >
              <span>📞</span>
              <span className="hidden xs:inline sm:inline">CALL WADE</span>
            </button>
          )}

          {/* Mission Progress Pill */}
          <button
            id="header-missions-badge"
            onClick={() => {
              playClickSound();
              onNavigate('missions');
            }}
            className="hidden sm:flex items-center gap-1.5 bg-red-950/80 text-yellow-400 px-2.5 py-1 rounded-lg comic-border border-yellow-400/40 text-xs font-bangers tracking-wider hover:scale-105 transition-transform"
            title="Missions completed"
          >
            <span>🎯</span>
            <span>{missionsCompletedCount}/{totalMissions}</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-button"
            onClick={handleSoundToggle}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg comic-border text-xs sm:text-sm font-bangers tracking-wider transition-all ${
              soundActive
                ? 'bg-yellow-400 text-zinc-950 shadow-comic'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
            title={soundActive ? t.common.soundOn : t.common.soundOff}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{soundActive ? t.common.soundOn : t.common.soundOff}</span>
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center bg-zinc-900 rounded-lg comic-border p-0.5">
            {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                id={`lang-button-${lang}`}
                onClick={() => handleLanguageClick(lang)}
                className={`px-2 py-0.5 rounded text-xs font-bangers uppercase transition-colors ${
                  language === lang
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : 'मरा'}
              </button>
            ))}

            {/* Deadpool Language Reaction Speech Bubble */}
            <AnimatePresence>
              {languageReaction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -6 }}
                  transition={{ type: "spring", stiffness: 450, damping: 24 }}
                  className="absolute top-full right-0 mt-2.5 z-50 bg-yellow-300 text-zinc-950 font-comic font-bold text-xs sm:text-sm px-3 py-2 rounded-xl comic-border shadow-comic w-max max-w-[260px] sm:max-w-xs pointer-events-none flex items-center gap-2"
                >
                  <span className="text-base shrink-0">💀</span>
                  <span className="leading-snug">{languageReaction}</span>
                  {/* Comic Speech Bubble Tail pointing up to the language button */}
                  <div className="absolute -top-1.5 right-6 w-3 h-3 bg-yellow-300 border-t-2 border-l-2 border-black rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Account / Auth */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2 bg-red-900/40 border border-red-500/50 px-2.5 py-1 rounded-lg">
              <div className="w-6 h-6 bg-red-600 rounded-full comic-border flex items-center justify-center text-xs font-bangers">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden xl:inline text-xs font-comic font-bold text-yellow-300">
                {user.name}
              </span>
              <button
                id="header-logout-button"
                onClick={() => {
                  playPopSound();
                  onLogout();
                }}
                className="text-zinc-400 hover:text-red-400 ml-1"
                title={t.common.logout}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                id="header-login-button"
                onClick={() => {
                  playClickSound();
                  onOpenLogin();
                }}
                className="hidden sm:inline-block px-2.5 py-1 rounded-lg comic-border bg-zinc-900 text-yellow-400 hover:bg-zinc-800 font-bangers text-xs sm:text-sm tracking-wide"
              >
                {t.common.login}
              </button>
              <button
                id="header-signup-button"
                onClick={() => {
                  playClickSound();
                  onOpenSignup();
                }}
                className="px-2.5 py-1 rounded-lg comic-border bg-red-600 text-white hover:bg-red-500 font-bangers text-xs sm:text-sm tracking-wide shadow-comic"
              >
                {t.common.signup}
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-1.5 rounded-lg comic-border bg-zinc-900 text-yellow-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t-2 border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playClickSound();
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg font-bangers text-sm text-center comic-border ${
                currentSection === item.id
                  ? 'bg-yellow-400 text-zinc-950 shadow-comic'
                  : 'bg-zinc-900 text-zinc-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          {onOpenHotline && (
            <button
              id="mobile-call-wade-btn"
              onClick={() => {
                playClickSound();
                onOpenHotline();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg font-bangers text-sm text-center comic-border bg-yellow-400 text-zinc-950 shadow-comic col-span-2"
            >
              📞 CALL WADE (HOTLINE)
            </button>
          )}
          {!user.isLoggedIn && (
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg font-bangers text-sm text-center comic-border bg-yellow-500 text-black col-span-2"
            >
              {t.common.login} / {t.common.signup}
            </button>
          )}
        </div>
      )}
    </header>
  );
};
