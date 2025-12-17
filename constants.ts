import { Platform, Tone, HookStyle, HookLength, Language } from './types';

export const PLATFORMS = [
  { value: Platform.INSTAGRAM, label: 'Instagram Reels', icon: '📸' },
  { value: Platform.YOUTUBE, label: 'YouTube Shorts', icon: '▶️' },
  { value: Platform.TWITTER, label: 'Twitter / X', icon: '🐦' },
  { value: Platform.LINKEDIN, label: 'LinkedIn', icon: '💼' },
  { value: Platform.TIKTOK, label: 'TikTok', icon: '🎵' },
  { value: Platform.FACEBOOK, label: 'Facebook Reels', icon: '📱' },
  { value: Platform.THREADS, label: 'Threads', icon: '🧵' },
  { value: Platform.PINTEREST, label: 'Pinterest', icon: '📌' },
];

export const TONES = [
  { value: Tone.BOLD, label: 'Bold', desc: 'Confident & Direct' },
  { value: Tone.CASUAL, label: 'Casual', desc: 'Friendly & Relaxed' },
  { value: Tone.PROFESSIONAL, label: 'Professional', desc: 'Business & Formal' },
  { value: Tone.EMOTIONAL, label: 'Emotional', desc: 'Deep & Resonant' },
  { value: Tone.SAVAGE, label: 'Savage', desc: 'Raw & Unfiltered' },
];

export const HOOK_STYLES = [
  { value: HookStyle.CURIOSITY, label: 'Curiosity', desc: 'Spark interest' },
  { value: HookStyle.PAIN, label: 'Pain Point', desc: 'Address problems' },
  { value: HookStyle.BOLD_CLAIM, label: 'Bold Claim', desc: 'Shock value' },
  { value: HookStyle.STORY, label: 'Story', desc: 'Narrative lead' },
  { value: HookStyle.CONTRARIAN, label: 'Contrarian', desc: 'Against the grain' },
];

export const HOOK_LENGTHS = [
  { value: HookLength.SHORT, label: 'Short (5-7 words)' },
  { value: HookLength.MEDIUM, label: 'Medium (8-14 words)' },
  { value: HookLength.LONG, label: 'Long (Story style)' },
];

export const LANGUAGES = [
  { value: Language.ENGLISH, label: 'English' },
  { value: Language.HINGLISH, label: 'Hinglish' },
];