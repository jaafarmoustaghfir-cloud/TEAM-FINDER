
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, UserCircle, ChevronDown, LogOut } from 'lucide-react';
import { BRAND_ASSETS } from '../constants';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const { role, setRole } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search', icon: <Search className="w-4 h-4" /> },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center">
                <img 
                  src={BRAND_ASSETS.LOGO_URL} 
                  alt="Team Finder Logo" 
                  className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">
                  TEAM<span className="text-orange-500">FINDER</span>
                </span>
                <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase hidden sm:block">
                  {BRAND_ASSETS.SLOGAN}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 text-sm font-bold transition-colors uppercase tracking-wider ${
                  isActive(link.path) ? 'text-orange-500' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="h-4 w-px bg-zinc-800" />
            
            {/* Role Switcher (Simulated Login) */}
            <div className="relative">
              <button 
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl hover:border-zinc-700 transition-all group"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  role === 'admin' ? 'bg-red-500' : role === 'team' ? 'bg-blue-600' : role === 'player' ? 'bg-orange-600' : 'bg-zinc-700'
                }`}>
                  <UserCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-black uppercase text-white tracking-widest">
                  {role}
                </span>
                <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
                  <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-800">Switch Perspective</p>
                  {(['guest', 'player', 'team', 'admin'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => { setRole(r); setIsRoleMenuOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-xs font-bold uppercase transition-colors flex items-center justify-between ${
                        role === r ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      {r}
                      {role === r && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_orange]" />}
                    </button>
                  ))}
                  <div className="border-t border-zinc-800 mt-1">
                    <button 
                      onClick={() => { setRole('guest'); setIsRoleMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-xs font-bold uppercase text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3 h-3" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 animate-in slide-in-from-top-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-bold uppercase ${
                  isActive(link.path) ? 'text-orange-500 bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="p-3 border-t border-zinc-800 mt-2">
               <div className="flex gap-2">
                 {['player', 'team'].map(r => (
                   <button 
                    key={r}
                    onClick={() => {setRole(r as any); setIsOpen(false);}}
                    className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest ${role === r ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                   >
                     {r}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
