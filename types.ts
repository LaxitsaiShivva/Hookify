export interface FormData {
  topic: string;
  platform: Platform;
  tone: Tone;
  audience: string;
  hookStyle: HookStyle;
  hookLength: HookLength;
  emojiMode: boolean;
  ctaMode: boolean;
  language: Language;
  mode: GeneratorMode;
  userHook?: string;
}

export enum GeneratorMode {
  GENERATE = 'Generate Hooks',
  IMPROVE = 'Improve My Hook'
}

export enum Platform {
  INSTAGRAM = 'Instagram Reels',
  YOUTUBE = 'YouTube Shorts',
  TWITTER = 'Twitter/X',
  LINKEDIN = 'LinkedIn',
  TIKTOK = 'TikTok',
  FACEBOOK = 'Facebook Reels',
  THREADS = 'Threads',
  PINTEREST = 'Pinterest',
  GENERAL = 'General Social Media'
}

export enum Tone {
  BOLD = 'Bold',
  CASUAL = 'Casual',
  PROFESSIONAL = 'Professional',
  EMOTIONAL = 'Emotional',
  SAVAGE = 'Savage'
}

export enum HookStyle {
  CURIOSITY = 'Curiosity',
  PAIN = 'Pain',
  BOLD_CLAIM = 'Bold Claim',
  STORY = 'Story',
  CONTRARIAN = 'Contrarian'
}

export enum HookLength {
  SHORT = 'Short',
  MEDIUM = 'Medium',
  LONG = 'Long'
}

export enum Language {
  ENGLISH = 'English',
  HINGLISH = 'Hinglish'
}

export interface VideoStrategy {
  visualHook: string;
  pacing: string;
  audioSuggestion: string;
  captionTip: string;
}

export interface HookResponse {
  hooks: string[];
  strategy: VideoStrategy;
}