import React from 'react';
import { VideoStrategy } from '../types';
import { Eye, Zap, Music, PenTool, Video } from 'lucide-react';

interface StrategyCardProps {
  strategy: VideoStrategy;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <Video className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-white">AI Video Strategy</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <span className="block text-sm font-medium text-slate-400">Visual Hook (0-3s)</span>
              <p className="text-slate-200">{strategy.visualHook}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <span className="block text-sm font-medium text-slate-400">Pacing & Edit</span>
              <p className="text-slate-200">{strategy.pacing}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Music className="w-5 h-5 text-pink-400 mt-0.5 shrink-0" />
            <div>
              <span className="block text-sm font-medium text-slate-400">Audio Vibe</span>
              <p className="text-slate-200">{strategy.audioSuggestion}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <PenTool className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="block text-sm font-medium text-slate-400">Caption Tip</span>
              <p className="text-slate-200">{strategy.captionTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};