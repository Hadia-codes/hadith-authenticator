import React from 'react';
import { motion } from 'motion/react';
import { Search, BookMarked, User, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'search' | 'library' | 'profile';
  setActiveTab: (tab: 'search' | 'library' | 'profile') => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  return (
    <div className="min-height-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              Hadith Authenticator
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <NavButton 
              active={activeTab === 'search'} 
              onClick={() => setActiveTab('search')}
              icon={<Search className="w-4 h-4" />}
              label="Verify"
            />
            <NavButton 
              active={activeTab === 'library'} 
              onClick={() => setActiveTab('library')}
              icon={<BookMarked className="w-4 h-4" />}
              label="Library"
            />
            <NavButton 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
              icon={<User className="w-4 h-4" />}
              label="Account"
            />
          </div>

          {/* Mobile indicator for active tab */}
          <div className="md:hidden text-zinc-500 text-sm font-medium">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 max-w-5xl mx-auto px-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-full shadow-2xl">
        <div className="flex items-center gap-8">
          <MobileNavButton 
            active={activeTab === 'search'} 
            onClick={() => setActiveTab('search')}
            icon={<Search className="w-5 h-5" />}
          />
          <MobileNavButton 
            active={activeTab === 'library'} 
            onClick={() => setActiveTab('library')}
            icon={<BookMarked className="w-5 h-5" />}
          />
          <MobileNavButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
            icon={<User className="w-5 h-5" />}
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 text-sm font-medium",
        active ? "text-emerald-500 bg-emerald-500/10" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function MobileNavButton({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-2.5 rounded-full transition-all duration-200",
        active ? "text-emerald-500 bg-emerald-500/10" : "text-zinc-400 hover:text-zinc-100"
      )}
    >
      {icon}
      {active && (
        <motion.div 
          layoutId="mobile-nav-active"
          className="absolute inset-0 bg-emerald-500/10 rounded-full -z-10"
        />
      )}
    </button>
  );
}
