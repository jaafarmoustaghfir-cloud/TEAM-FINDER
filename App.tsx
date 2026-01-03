
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Mail, Instagram, ShieldAlert, UserCircle, Phone } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import TeamProfile from './pages/TeamProfile';
import PlayerProfile from './pages/PlayerProfile';
import Register from './pages/Register';

// Simple Auth & Config Context
type UserRole = 'guest' | 'player' | 'team' | 'admin';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  recommendationsEnabled: boolean;
  setRecommendationsEnabled: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-zinc-900 py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="text-2xl font-black tracking-tighter text-white mb-6">TEAM<span className="text-orange-500">FINDER</span></div>
        <p className="text-zinc-500 max-sm:text-sm max-w-sm mb-8">
          The global digital marketplace for football talent and recruitment. Connecting dreams to reality through technology.
        </p>
        <div className="flex flex-col gap-4">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Connect With Us</p>
          <div className="flex gap-4 items-center">
            <a href="https://instagram.com/teamfinder_x" target="_blank" className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 hover:text-orange-500 transition-all border border-zinc-800" title="Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="mailto:jaafarmoustaghfir@gmail.com" className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 hover:text-orange-500 transition-all border border-zinc-800" title="Email"><Mail className="w-5 h-5" /></a>
            <a href="tel:0772908456" className="h-10 px-4 bg-zinc-900 rounded-xl flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-all border border-zinc-800" title="Phone Support">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-black tracking-widest">0772908456</span>
            </a>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Platform</h4>
        <ul className="space-y-4 text-sm text-zinc-500 font-medium">
          <li><a href="#/search" className="hover:text-orange-500 transition-colors">Find Teams</a></li>
          <li><a href="#/register" className="hover:text-orange-500 transition-colors">Player Registration</a></li>
          <li><a href="#/about" className="hover:text-orange-500 transition-colors">Scouting Network</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
        <ul className="space-y-4 text-sm text-zinc-500 font-medium">
          <li><a href="tel:0772908456" className="hover:text-orange-500 transition-colors">Help Center: 0772908456</a></li>
          <li><a href="mailto:jaafarmoustaghfir@gmail.com" className="hover:text-orange-500 transition-colors">Email Support</a></li>
          <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
      &copy; {new Date().getFullYear()} Team Finder Network. All rights reserved.
    </div>
  </footer>
);

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(() => (localStorage.getItem('user_role') as UserRole) || 'guest');
  const [recommendationsEnabled, setRecommendationsEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('user_role', role);
  }, [role]);

  return (
    <AppContext.Provider value={{ role, setRole, recommendationsEnabled, setRecommendationsEnabled }}>
      <Router>
        <div className="min-h-screen flex flex-col bg-zinc-950 selection:bg-orange-500 selection:text-white">
          {role === 'admin' && (
            <div className="bg-orange-600 text-white px-4 py-2 flex items-center justify-between text-[10px] font-black uppercase tracking-widest sticky top-0 z-[60]">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin Environment
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span>Dynamic Recs: {recommendationsEnabled ? 'ON' : 'OFF'}</span>
                  <input type="checkbox" checked={recommendationsEnabled} onChange={(e) => setRecommendationsEnabled(e.target.checked)} className="w-3.5 h-3.5 accent-zinc-950" />
                </label>
              </div>
            </div>
          )}

          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/player/:id" element={<PlayerProfile />} />
              <Route path="/team/:id" element={<TeamProfile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={
                <div className="max-w-4xl mx-auto py-32 px-4 text-center">
                  <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase">The Future of Scouting</h1>
                  <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-medium">
                    Team Finder bridges the gap between raw talent and professional opportunities. Our platform uses verified data and video evidence to ensure the best players find the best teams.
                  </p>
                </div>
              } />
              <Route path="/contact" element={<Navigate to="/" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
