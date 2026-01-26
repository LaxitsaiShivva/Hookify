import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HookForm } from './components/HookForm';
import { HookList } from './components/HookList';
import { StrategyCard } from './components/StrategyCard';
import { generateHooks } from './services/geminiService';
import { FormData, HookResponse, VideoStrategy } from './types';
import { Sparkles, AlertCircle, RefreshCcw } from 'lucide-react';

export default function App() {
  const [hooks, setHooks] = useState<string[]>([]);
  const [strategy, setStrategy] = useState<VideoStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (data: FormData) => {
    setLoading(true);
    setError(null);
    setHooks([]);
    setStrategy(null);

    try {
      const result: HookResponse = await generateHooks(data);
      if (result.hooks && result.hooks.length > 0) {
        setHooks(result.hooks);
        setStrategy(result.strategy);
      } else {
        setError("AI returned no results. Try making your topic more specific.");
      }
    } catch (err: any) {
      let message = err.message || "An unexpected error occurred.";
      
      // Handle the common "Overloaded" error gracefully
      if (message.includes("503") || message.toLowerCase().includes("overloaded")) {
        message = "Google's AI is currently very busy. Please wait 10 seconds and try clicking Generate again.";
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16">
        
        <Header />

        <main className="mt-12 space-y-12">
          <section className="relative z-10">
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full -z-10" />
            <HookForm onGenerate={handleGenerate} isLoading={loading} />
          </section>

          {error && (
            <div className="flex items-start gap-4 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 animate-in fade-in slide-in-from-top-4">
              <div className="p-2 bg-red-500/20 rounded-lg shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">Wait a moment...</p>
                <p className="text-slate-300 mt-1">{error}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button 
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Refresh Page
                  </button>
                </div>
              </div>
            </div>
          )}

          <section className="space-y-8">
            {loading && (
              <div className="text-center py-12 space-y-4">
                <div className="relative mx-auto w-16 h-16">
                  <div className="absolute inset-0 bg-indigo-500/30 rounded-full animate-ping"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-indigo-200">Crafting viral hooks...</h3>
                <p className="text-slate-500 text-sm">This usually takes about 3-5 seconds</p>
              </div>
            )}

            {!loading && hooks.length > 0 && (
               <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                  {strategy && <StrategyCard strategy={strategy} />}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        Generated Hooks
                      </h2>
                    </div>
                    <HookList hooks={hooks} />
                  </div>
               </div>
            )}
            
            {!loading && hooks.length === 0 && !error && (
              <div className="text-center py-20 opacity-50">
                <p className="text-slate-500 italic">"The hook is the most important part of your video." — Hookify</p>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-20 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Hookify • Stop the scroll.</p>
        </footer>
      </div>
    </div>
  );
}