import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavSection, Language, UserProfile, MissionProgress } from './types';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { HQSection } from './components/HQSection';
import { MemeVault } from './components/MemeVault';
import { ChaosRoom } from './components/ChaosRoom';
import { MissionsSection } from './components/MissionsSection';
import { ArmorySection } from './components/ArmorySection';
import { SecretArea } from './components/SecretArea';
import { AboutSection } from './components/AboutSection';
import { DeadpoolAvatar } from './components/DeadpoolAvatar';
import { AuthModals } from './components/AuthModals';
import { NotificationBanner } from './components/NotificationBanner';
import { DeadpoolHotlineModal } from './components/DeadpoolHotlineModal';
import { DeadpoolEyeFollower } from './components/DeadpoolEyeFollower';
import { JealousWebsiteToast } from './components/JealousWebsiteToast';
import { playVictorySound, playPunchSound, playPopSound, playTacoCrunchSound, playBoingSound, playChaosSound } from './utils/audio';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('hero');
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile>({
    name: 'Wade Fan #1',
    email: '',
    isLoggedIn: false,
    avatarTitle: 'Recruit'
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [hotlineModalOpen, setHotlineModalOpen] = useState(false);
  const [chaosPoints, setChaosPoints] = useState(100);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [avatarQuip, setAvatarQuip] = useState<string | null>(null);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [suitTheme, setSuitTheme] = useState<string>('classic');

  // Feature 2: Website Gets Jealous State & Effect
  const [jealousMessage, setJealousMessage] = useState<string | null>(null);
  const lastJealousTriggerRef = useRef<number>(0);

  useEffect(() => {
    // Reset 20-second timer on currentSection change
    const timer = setTimeout(() => {
      const now = Date.now();
      // Cooldown check (35 seconds)
      if (now - lastJealousTriggerRef.current < 35000) {
        return;
      }

      const sectionReactions: Record<NavSection, string[]> = {
        memes: [
          "You like the Meme Vault more than me? 😭",
          "HELLO?! Other sections exist too! 😤",
          "You're spending WAY too much time here. 💀"
        ],
        armory: [
          "Still playing with weapons? I'm getting jealous. 💀",
          "HEY! I have other things to show you!",
          "Wow... ignoring the rest of the website. Nice."
        ],
        missions: [
          "HELLO?! There are other sections!",
          "Spending all day on missions? What about me? 😭",
          "You're spending WAY too much time here. 💀"
        ],
        secret: [
          "Oh, so THIS is where you spend all your time...",
          "You like the Secret Area more than me? 😭",
          "HEY! I have other things to show you!"
        ],
        hq: [
          "HELLO?! Other sections exist too! 😤",
          "Wow... ignoring the rest of the website. Nice.",
          "You're spending WAY too much time here. 💀"
        ],
        hero: [
          "HEY! I have other things to show you!",
          "HELLO?! Other sections exist too! 😤",
          "Wow... ignoring the rest of the website. Nice."
        ],
        chaos: [
          "HELLO?! Other sections exist too! 😤",
          "You're spending WAY too much time here. 💀",
          "HEY! I have other things to show you!"
        ],
        about: [
          "HELLO?! Other sections exist too! 😤",
          "Wow... ignoring the rest of the website. Nice.",
          "You're spending WAY too much time here. 💀"
        ]
      };

      const options = sectionReactions[currentSection] || [
        "HELLO?! Other sections exist too! 😤",
        "Wow... ignoring the rest of the website. Nice.",
        "HEY! I have other things to show you!",
        "You're spending WAY too much time here. 💀"
      ];

      const chosenMessage = options[Math.floor(Math.random() * options.length)];
      lastJealousTriggerRef.current = now;
      setJealousMessage(chosenMessage);

      // Automatically hide after 3.5 seconds
      setTimeout(() => {
        setJealousMessage(null);
      }, 3500);
    }, 20000); // 20 seconds of prolonged interaction

    return () => clearTimeout(timer);
  }, [currentSection]);

  // Mission progress tracking
  const [progress, setProgress] = useState<MissionProgress>({
    enteredHq: false,
    foundFirstClue: false,
    solvedChimichanga: false,
    chaosLevelThree: false,
    unlockedSecretRoom: false
  });

  // Hidden Chimichangas collectibles
  const [foundChimichangas, setFoundChimichangas] = useState<Record<string, boolean>>({
    hero: false,
    hq: false,
    mission: false
  });

  // Calculate completed missions count
  const completedMissionsCount = Object.values(progress).filter(Boolean).length;
  const totalMissions = 5;

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const handleCollectChimichanga = (locationKey: string) => {
    if (!foundChimichangas[locationKey]) {
      setFoundChimichangas(prev => ({ ...prev, [locationKey]: true }));
      playTacoCrunchSound();
      showToast("🌯 CHIMICHANGA FOUND! Hot, crispy, and ready for action!");
      setAvatarQuip("YOU FOUND ONE OF MY CHIMICHANGAS! Give it back! Just kidding, you earned it.");
    }
  };

  const handleMissionComplete = (key: keyof MissionProgress) => {
    if (!progress[key]) {
      setProgress(prev => {
        const next = { ...prev, [key]: true };
        return next;
      });
      playVictorySound();
      showToast("🎯 MISSION MILESTONE UNLOCKED! Check your mission progress in the top bar!");
    }
  };

  const handleChaosLevelChange = (level: number) => {
    if (level >= 3 && !progress.chaosLevelThree) {
      handleMissionComplete('chaosLevelThree');
    }
    if (level >= 5 && !progress.unlockedSecretRoom) {
      setProgress(prev => ({ ...prev, unlockedSecretRoom: true }));
      showToast("💥 CHAOS REACHED MAXIMUM! Secret Area has been unlocked in the top bar!");
      setAvatarQuip("YOU MADMAN! You broke the game into pieces! The secret area is open!");
    }
  };

  const handleUnlockSecret = () => {
    setProgress(prev => ({ ...prev, unlockedSecretRoom: true }));
    showToast("🔓 Top Secret Area Unlocked! Head over to inspect the 4th Wall Control Matrix!");
  };

  const handleTriggerRandomChaos = useCallback(() => {
    // Perform subtle, lightweight screen shake
    setIsScreenShaking(true);
    setTimeout(() => setIsScreenShaking(false), 350);

    const events = [
      {
        text: "You gained +50 Chaos Points! 💀",
        action: () => {
          setChaosPoints(prev => prev + 50);
          playVictorySound();
        }
      },
      {
        text: "Deadpool stole your cursor.",
        action: () => {
          playPunchSound();
          const prevCursor = document.body.style.cursor;
          document.body.style.cursor = 'none';
          setTimeout(() => {
            document.body.style.cursor = prevCursor;
          }, 3000);
        }
      },
      {
        text: "Mission updated... because I said so.",
        action: () => {
          playPopSound();
        }
      },
      {
        text: "WARNING: Too much chaos detected.",
        action: () => {
          playChaosSound(3);
        }
      },
      {
        text: "Congratulations. You did absolutely nothing useful.",
        action: () => {
          playBoingSound();
        }
      },
      {
        text: "Secret chaos level unlocked! 🔥",
        action: () => {
          setProgress(prev => ({ ...prev, unlockedSecretRoom: true }));
          playVictorySound();
        }
      },
      {
        text: "WHY DID YOU CLICK THAT?!",
        action: () => {
          playPunchSound();
        }
      }
    ];

    const chosen = events[Math.floor(Math.random() * events.length)];
    chosen.action();
    showToast(chosen.text);
    setAvatarQuip(chosen.text);
  }, [showToast]);

  const handleLogoEasterEgg = () => {
    setIsPartyMode(true);
    playVictorySound();
    showToast("🎉 FOURTH WALL COLLAPSE: PARTY MODE ACTIVATED! Look at all the glorious tacos!");
    setAvatarQuip("WHOA! You clicked my handsome mask 5 times! Confetti protocol engaged!");
    setTimeout(() => {
      setIsPartyMode(false);
    }, 6000);
  };

  // Keyboard shortcut easter egg (Press 'C' for Chimichanga, or Konami-style)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        // Chimichanga hotkey
        playTacoCrunchSound();
        showToast("🌯 Secret Hotkey 'C' pressed! Chimichanga craving satisfied!");
      } else if (e.key === 'x' || e.key === 'X') {
        playPunchSound();
        showToast("⚔️ Secret Hotkey 'X' pressed! Katana blades ready!");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  return (
    <div className={`min-h-screen relative font-comic overflow-x-hidden ${isScreenShaking ? 'comic-shake' : ''} ${
      suitTheme === 'xforce' ? 'bg-zinc-950 text-zinc-100' :
      suitTheme === 'golden' ? 'bg-[#1a1505] text-amber-100' :
      suitTheme === 'pink' ? 'bg-[#210915] text-pink-100' :
      'bg-zinc-950 text-white'
    }`}>
      {/* 4th Wall Party Mode Raining Decals */}
      {isPartyMode && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {Array.from({ length: 35 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, x: `${Math.random() * 100}vw`, rotate: 0 }}
              animate={{ y: '105vh', rotate: 720 }}
              transition={{ duration: 3 + Math.random() * 2, ease: 'linear' }}
              className="absolute text-4xl"
            >
              {i % 3 === 0 ? '🌯' : i % 3 === 1 ? '💥' : '🌮'}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <Header
        currentSection={currentSection}
        onNavigate={(section) => {
          setCurrentSection(section);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          const reaction =
            lang === 'hi' ? "ओहो! अब हिंदी में बात करेंगे? ठीक है भाई! 💀" :
            lang === 'mr' ? "अरे वा! मराठी पण येते मला. आता खरी मजा सुरू झाली! 💀" :
            "Back to English? Boring. 🙄";
          setAvatarQuip(reaction);
          setTimeout(() => {
            setAvatarQuip(null);
          }, 2600);
        }}
        user={user}
        onOpenLogin={() => {
          setAuthModalMode('login');
          setAuthModalOpen(true);
        }}
        onOpenSignup={() => {
          setAuthModalMode('signup');
          setAuthModalOpen(true);
        }}
        onLogout={() => {
          setUser({ name: 'Freelancer', email: '', isLoggedIn: false, avatarTitle: 'Merc' });
          showToast("You logged out. Wade will miss you (or at least your snacks).");
        }}
        missionsCompletedCount={completedMissionsCount}
        totalMissions={totalMissions}
        isSecretUnlocked={progress.unlockedSecretRoom}
        onLogoEasterEgg={handleLogoEasterEgg}
        onOpenHotline={() => setHotlineModalOpen(true)}
      />

      {/* Main View Display with Animated Transitions */}
      <main className="relative z-10 pb-28">
        <AnimatePresence mode="wait">
          {currentSection === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <LandingHero
                onStartAdventure={() => setCurrentSection('hq')}
                onNavigate={(sec) => setCurrentSection(sec)}
                language={language}
                onWrongClick={(msg) => {
                  showToast(msg);
                  setAvatarQuip("Did you really think that button worked? Amateur hour!");
                }}
                onCollectChimichanga={() => handleCollectChimichanga('hero')}
                hasFoundHeroChimichanga={foundChimichangas.hero}
                onOpenHotline={() => setHotlineModalOpen(true)}
                onTriggerRandomChaos={handleTriggerRandomChaos}
              />
            </motion.div>
          )}

          {currentSection === 'hq' && (
            <motion.div
              key="hq"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <HQSection
                onCollectChimichanga={() => handleCollectChimichanga('hq')}
                hasFoundHqChimichanga={foundChimichangas.hq}
                onEnterHQMission={() => handleMissionComplete('enteredHq')}
              />
            </motion.div>
          )}

          {currentSection === 'memes' && (
            <motion.div
              key="memes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <MemeVault language={language} />
            </motion.div>
          )}

          {currentSection === 'chaos' && (
            <motion.div
              key="chaos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ChaosRoom
                language={language}
                onChaosLevelChange={handleChaosLevelChange}
                isSecretUnlocked={progress.unlockedSecretRoom}
                onUnlockSecret={handleUnlockSecret}
                chaosPoints={chaosPoints}
                onTriggerRandomChaos={handleTriggerRandomChaos}
                onAddChaosPoints={(pts) => setChaosPoints(prev => prev + pts)}
              />
            </motion.div>
          )}

          {currentSection === 'missions' && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <MissionsSection
                language={language}
                progress={progress}
                onMissionComplete={handleMissionComplete}
                onCollectChimichanga={() => handleCollectChimichanga('mission')}
                hasFoundMissionChimichanga={foundChimichangas.mission}
              />
            </motion.div>
          )}

          {currentSection === 'armory' && (
            <motion.div
              key="armory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ArmorySection />
            </motion.div>
          )}

          {currentSection === 'secret' && (
            <motion.div
              key="secret"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <SecretArea
                isUnlocked={progress.unlockedSecretRoom}
                onUnlockSecret={handleUnlockSecret}
                onColorThemeChange={(theme) => setSuitTheme(theme)}
                chimichangasCount={Object.values(foundChimichangas).filter(Boolean).length}
              />
            </motion.div>
          )}

          {currentSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <AboutSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Interactive Comic Antihero Avatar */}
      <DeadpoolAvatar
        externalQuip={avatarQuip}
        onAvatarClick={(count) => {
          if (count === 3) {
            showToast("Wade is getting annoyed. Continue at your own peril!");
          } else if (count === 6) {
            handleCollectChimichanga('avatar');
          }
        }}
      />

      {/* Interactive Deadpool Cursor / Eye Follower */}
      <DeadpoolEyeFollower />

      {/* Fake Deadpool Hotline Modal */}
      <DeadpoolHotlineModal
        isOpen={hotlineModalOpen}
        onClose={() => setHotlineModalOpen(false)}
      />

      {/* Comic Notification Toast */}
      <NotificationBanner
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />

      {/* Feature 2: Website Gets Jealous Speech Bubble Toast */}
      <JealousWebsiteToast
        message={jealousMessage}
        onDismiss={() => setJealousMessage(null)}
      />

      {/* Auth Modals */}
      <AuthModals
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(newUser) => {
          setUser(newUser);
          showToast(`Welcome aboard, Mercenary ${newUser.name}! Your fake credentials are safe with Wade!`);
          setAvatarQuip(`Look who joined the team! Welcome, ${newUser.name}! Grab a taco!`);
        }}
      />

      {/* Comic Footer Bar */}
      <footer className="border-t-4 border-black bg-zinc-950 py-6 px-4 text-center select-none relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-comic font-bold text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌮</span>
            <span>DEADPOOL COMIC CHAOS HUB • MAXIMUM EFFORT EDITION</span>
          </div>
          <div className="text-zinc-500 text-center sm:text-right">
            Original comic homage built for hackathon delight. Press 'C' or 'X' anytime!
          </div>
        </div>
      </footer>
    </div>
  );
}
