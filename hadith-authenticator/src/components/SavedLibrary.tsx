import React, { useState, useEffect } from 'react';
import { BookMarked, Trash2, Calendar, ChevronRight, Clock } from 'lucide-react';
import { storage, SavedHadith } from '../lib/storage';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function SavedLibrary() {
  const [items, setItems] = useState<SavedHadith[]>([]);

  useEffect(() => {
    setItems(storage.getSaved());
  }, []);

  const handleDelete = (id: string) => {
    storage.remove(id);
    setItems(items.filter(i => i.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <BookMarked className="w-8 h-8 text-zinc-700" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-zinc-100">Your library is empty</h2>
          <p className="text-zinc-500 max-w-sm">Verified Hadiths you save will appear here for offline reference and easier access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          Saved Library
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">{items.length}</span>
        </h2>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800",
                        item.authenticity === 'Sahih' ? "text-emerald-500" : 
                        item.authenticity === 'Hasan' ? "text-amber-400" : "text-red-400"
                      )}>
                        {item.authenticity}
                      </span>
                      <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(item.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100 line-clamp-1">
                      {item.source || 'Unknown Source'}
                    </h3>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-zinc-400 text-sm line-clamp-3 italic font-serif">
                  "{item.translation}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" />
                      Ref: {item.reference || 'N/A'}
                    </div>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-tighter text-emerald-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
