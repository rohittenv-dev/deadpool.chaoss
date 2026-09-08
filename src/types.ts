export type NavSection = 'hero' | 'hq' | 'memes' | 'chaos' | 'missions' | 'armory' | 'secret' | 'about';

export type Language = 'en' | 'hi' | 'mr';

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatarTitle: string;
}

export interface MemeItem {
  id: string;
  setup: string;
  punchline: string;
  tags: string[];
  likes: number;
  laughs: number;
  cringes: number;
  userReacted?: 'like' | 'laugh' | 'cringe';
}

export interface MissionProgress {
  enteredHq: boolean;
  foundFirstClue: boolean;
  solvedChimichanga: boolean;
  chaosLevelThree: boolean;
  unlockedSecretRoom: boolean;
}

export interface ClueItem {
  id: string;
  title: string;
  description: string;
  found: boolean;
}
