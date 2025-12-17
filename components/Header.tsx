import React from 'react';
import { Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4 ring-4 ring-indigo-500/5">
        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/30">
          <Zap className="w-6 h-6 text-white fill-white" />
        </div>
        <span className="ml-3 pr-2 text-xl font-bold tracking-tight text-white">Hookify</span>
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tight">
        Stop the Scroll.
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
        Generate viral hooks that grab attention in <span className="text-indigo-400 font-semibold">2 seconds</span>. 
        Powered by AI trained on top-performing content.
      </p>
    </div>
  );
};