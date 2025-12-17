import React, { useState } from 'react';
import { FormData, Platform, Tone, HookStyle, HookLength, Language, GeneratorMode } from '../types';
import { PLATFORMS, TONES, HOOK_STYLES, HOOK_LENGTHS, LANGUAGES } from '../constants';
import { Wand2, Zap, RefreshCw } from 'lucide-react';

interface HookFormProps {
  onGenerate: (data: FormData) => void;
  isLoading: boolean;
}

export const HookForm: React.FC<HookFormProps> = ({ onGenerate, isLoading }) => {
  const [mode, setMode] = useState<GeneratorMode>(GeneratorMode.GENERATE);
  const [topic, setTopic] = useState('');
  const [userHook, setUserHook] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [tone, setTone] = useState<Tone>(Tone.BOLD);
  const [hookStyle, setHookStyle] = useState<HookStyle>(HookStyle.CURIOSITY);
  const [hookLength, setHookLength] = useState<HookLength>(HookLength.MEDIUM);
  const [emojiMode, setEmojiMode] = useState(false);
  const [ctaMode, setCtaMode] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === GeneratorMode.GENERATE && !topic.trim()) return;
    if (mode === GeneratorMode.IMPROVE && !userHook.trim()) return;
    
    onGenerate({
      mode,
      topic: mode === GeneratorMode.GENERATE ? topic : 'Improving a hook',
      userHook,
      audience,
      platform,
      tone,
      hookStyle,
      hookLength,
      emojiMode,
      ctaMode,
      language
    });
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Mode Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          type="button"
          onClick={() => setMode(GeneratorMode.GENERATE)}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            mode === GeneratorMode.GENERATE
              ? 'bg-indigo-600/10 text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          Generate Hooks
        </button>
        <button
          type="button"
          onClick={() => setMode(GeneratorMode.IMPROVE)}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            mode === GeneratorMode.IMPROVE
              ? 'bg-indigo-600/10 text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Improve My Hook
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        
        {/* Main Input based on Mode */}
        <div className="space-y-4">
          {mode === GeneratorMode.GENERATE ? (
            <div className="space-y-2">
              <label htmlFor="topic" className="block text-sm font-medium text-slate-300">
                What is your content about?
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How to use AI for marketing, Healthy meal prep for beginners..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none h-24"
                disabled={isLoading}
                required={mode === GeneratorMode.GENERATE}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="userHook" className="block text-sm font-medium text-slate-300">
                Paste your hook here
              </label>
              <textarea
                id="userHook"
                value={userHook}
                onChange={(e) => setUserHook(e.target.value)}
                placeholder="e.g., Check out this new tip for better sleep..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none h-24"
                disabled={isLoading}
                required={mode === GeneratorMode.IMPROVE}
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="audience" className="block text-sm font-medium text-slate-300">
              Who is your target audience? <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <input
              id="audience"
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Freelancers, College Students, Tech Enthusiasts"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Platform */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
            >
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>{t.label} - {t.desc}</option>
              ))}
            </select>
          </div>

          {/* Style */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Hook Style</label>
            <select
              value={hookStyle}
              onChange={(e) => setHookStyle(e.target.value as HookStyle)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
            >
              {HOOK_STYLES.map((s) => (
                <option key={s.value} value={s.value}>{s.label} - {s.desc}</option>
              ))}
            </select>
          </div>

           {/* Length */}
           <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Length</label>
            <select
              value={hookLength}
              onChange={(e) => setHookLength(e.target.value as HookLength)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
            >
              {HOOK_LENGTHS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggles & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
           <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-3 sm:pt-6">
            <input
              id="emojiMode"
              type="checkbox"
              checked={emojiMode}
              onChange={(e) => setEmojiMode(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
            <label htmlFor="emojiMode" className="text-sm font-medium text-slate-300 select-none cursor-pointer">
              Enable Emojis
            </label>
          </div>

          <div className="flex items-center space-x-3 sm:pt-6">
            <input
              id="ctaMode"
              type="checkbox"
              checked={ctaMode}
              onChange={(e) => setCtaMode(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
            <label htmlFor="ctaMode" className="text-sm font-medium text-slate-300 select-none cursor-pointer">
              Include CTA
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || (mode === GeneratorMode.GENERATE ? !topic.trim() : !userHook.trim())}
          className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-px focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01] mt-6"
        >
          <div className="relative flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-transparent group-hover:bg-transparent transition-colors rounded-xl px-6 py-4 text-white font-semibold text-lg">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Thinking...
              </span>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                {mode === GeneratorMode.GENERATE ? 'Generate Viral Hooks' : 'Improve My Hook'}
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};