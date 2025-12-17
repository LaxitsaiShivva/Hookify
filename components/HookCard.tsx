import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface HookCardProps {
  text: string;
  index: number;
}

export const HookCard: React.FC<HookCardProps> = ({ text, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="pr-10">
        <p className="text-lg sm:text-xl font-medium text-slate-200 leading-snug">
          {text.split(" - Created by Hookify")[0]}
        </p>
        <div className="mt-4 flex items-center justify-between">
           <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/30 px-2 py-1 rounded border border-indigo-500/20">
             Hook #{index + 1}
           </span>
           <span className="text-xs text-slate-600 italic">
             Created by Hookify
           </span>
        </div>
      </div>
    </div>
  );
};