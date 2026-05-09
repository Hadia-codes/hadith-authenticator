import React, { useState } from 'react';
import { Search, Loader2, Save, ExternalLink, CheckCircle2, AlertCircle, HelpCircle, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { verifyHadith, HadithVerification } from '../services/verificationService';
import { storage } from '../lib/storage';
import { cn } from '../lib/utils';

export default function HadithSearch() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HadithVerification | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setIsSaved(false);

    try {
      const data = await verifyHadith(input);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    storage.save(result);
    setIsSaved(true);
  };

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold mb-4">
          <History className="w-3 h-3" />
          Powered by Gemini 3.0 Flash
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Verify any Hadith <br />
          <span className="text-zinc-500">with AI precision.</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Paste a narration, text, or reference to analyze its authenticity, 
          source, and context through verified Hadith databases.
        </p>

        <form onSubmit={handleVerify} className="relative group pt-4">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-full" />
          <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-2 group-focus-within:border-emerald-500/50 transition-all duration-300">
            <Search className="w-5 h-5 text-zinc-500 ml-4 shrink-0" />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Hadith text or reference..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-100 px-4 py-3 min-h-[100px] resize-none text-base placeholder:text-zinc-600"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) handleVerify();
              }}
            />
            <button
              disabled={loading || !input.trim()}
              className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-3 flex items-center justify-center gap-1.5 uppercase tracking-widest font-semibold">
            Press CMD + Enter to verify
          </p>
        </form>
      </section>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-zinc-500 animate-pulse font-medium">Analyzing chains of narration...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-xl">
              <div className="p-8 space-y-8">
                {/* Header: Authenticity Badge */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Verification Status</p>
                    <div className="flex items-center gap-3">
                      <h2 className={cn(
                        "text-4xl font-black italic",
                        result.authenticity === 'Sahih' ? "text-emerald-500" :
                        result.authenticity === 'Hasan' ? "text-amber-400" :
                        "text-red-400"
                      )}>
                        {result.authenticity}
                      </h2>
                      {result.authenticity === 'Sahih' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleSave}
                      disabled={isSaved}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-semibold",
                        isSaved ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-100"
                      )}
                    >
                      <Save className="w-4 h-4" />
                      {isSaved ? 'Saved to Library' : 'Save Result'}
                    </button>
                    <button className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 transition-colors">
                      <ExternalLink className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800/50">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Source & Reference</p>
                      <p className="text-zinc-100 font-medium">{(result.source && result.reference) ? `${result.source} (${result.reference})` : (result.source || result.reference || 'N/A')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Grade Explanation</p>
                      <p className="text-zinc-300 text-sm leading-relaxed">{result.grade_explanation}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Contextual Background</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">{result.context}</p>
                  </div>
                </div>

                {/* Text Sections */}
                {result.original_text && (
                  <div className="space-y-4 pt-8 border-t border-zinc-800/50">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest text-center">Arabic Text</p>
                    <p className="text-3xl md:text-4xl text-white text-center font-serif leading-loose" dir="rtl">
                      {result.original_text}
                    </p>
                  </div>
                )}

                {result.translation && (
                  <div className="space-y-4 pt-8 border-t border-zinc-800/50">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Translation</p>
                    <p className="text-zinc-100 italic leading-relaxed text-lg font-serif">
                      "{result.translation}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
              <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-amber-500 text-sm font-bold uppercase tracking-tight">Scholarly Caution</p>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Verification is based on indexed databases of known collections. Large language models may contain hallucinations; 
                  always consult original physical texts for definitive religious rulings (Fatawa).
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
