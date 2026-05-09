import { User, Mail, Shield, Settings, LogOut, Key } from 'lucide-react';

export default function Profile() {
  // Mock user data since Firebase setup is pending environment configuration
  const user = {
    email: 'visitor@hadithauthenticator.ai',
    name: 'Guest User',
    joined: 'May 2024'
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <User className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Account Status</p>
            <p className="text-sm font-medium text-emerald-500 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verified Guest
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Member Since</p>
            <p className="text-sm font-medium text-zinc-300">{user.joined}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest px-4">Account Settings</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <MenuButton icon={<Settings className="w-4 h-4" />} label="General Settings" />
          <MenuButton icon={<Key className="w-4 h-4" />} label="Security & Privacy" />
          <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-red-400">
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Clear All Data & Logout</span>
            </div>
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 text-center">
        <p className="text-zinc-500 text-xs">
          Your saved library is currently stored locally on this device. <br />
          Cloud sync will be available once the account system is fully initialized.
        </p>
      </div>
    </div>
  );
}

function MenuButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors text-zinc-300">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
    </button>
  );
}
