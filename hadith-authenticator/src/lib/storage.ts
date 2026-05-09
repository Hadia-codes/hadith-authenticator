import { HadithVerification } from "../services/verificationService";

export interface SavedHadith extends HadithVerification {
  id: string;
  savedAt: number;
}

const STORAGE_KEY = 'hadith_authenticator_library';

export const storage = {
  getSaved: (): SavedHadith[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  
  save: (hadith: HadithVerification) => {
    const saved = storage.getSaved();
    const newEntry: SavedHadith = {
      ...hadith,
      id: crypto.randomUUID(),
      savedAt: Date.now()
    };
    const updated = [newEntry, ...saved];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  },
  
  remove: (id: string) => {
    const saved = storage.getSaved();
    const updated = saved.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  isSaved: (text: string): boolean => {
    const saved = storage.getSaved();
    return saved.some(h => h.original_text === text || h.translation === text);
  }
};
