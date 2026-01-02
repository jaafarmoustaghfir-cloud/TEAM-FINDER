
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { MOCK_TEAMS } from '../constants';
import { 
  MapPin, Calendar, Target, Info, ShieldCheck, Mail, Users, 
  Plus, Edit2, Trash2, X, User, Activity, ShieldAlert, Award,
  Camera, Play, FileImage, Image as ImageIcon, Video as VideoIcon,
  Search, Briefcase, ChevronRight, Phone, MessageSquare, Instagram, Lock, Globe,
  Navigation, ExternalLink, Map as MapIcon
} from 'lucide-react';
import { useApp } from '../App';
import ContactModal from '../components/ContactModal';
import MediaUpload from '../components/MediaUpload';
import { Position, Player, MediaItem, RecruitmentNeed, SkillLevel, Team } from '../types';

const TeamProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { role } = useApp();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isRecruitmentModalOpen, setIsRecruitmentModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [isContactRevealed, setIsContactRevealed] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [linkInput, setLinkInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`team_profile_${id}`);
    if (saved) {
      setTeamData(JSON.parse(saved));
    } else {
      const mock = MOCK_TEAMS.find(t => t.id === id);
      if (mock) setTeamData(mock);
    }
  }, [id]);

  useEffect(() => {
    if (teamData) {
      setLocationInput(teamData.location);
      setLinkInput(teamData.locationLink || '');
    }
  }, [teamData]);

  const saveTeam = (updated: Team) => {
    setTeamData(updated);
    localStorage.setItem(`team_profile_${id}`, JSON.stringify(updated));
  };

  if (!teamData) return <Navigate to="/search?tab=teams" />;

  const isOwner = (role === 'team' && teamData.id === id) || role === 'admin';
  const isGuest = role === 'guest';
  const canViewContacts = role === 'player' || role === 'admin' || isOwner;

  const handleRevealContact = () => {
    if (isGuest) {
      alert("Please sign in to view contact details.");
      return;
    }
    if (!canViewContacts) {
      alert("Contact details are reserved for verified athletes and scouts.");
      return;
    }
    setIsContactRevealed(true);
  };

  const handleUpdateLocation = (e: React.FormEvent) => {
    e.preventDefault();
    saveTeam({ ...teamData, location: locationInput, locationLink: linkInput });
    setIsLocationModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-24 bg-zinc-950">
      {/* Header */}
      <div className="relative h-[450px] bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
           <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2400" className="w-full h-full object-cover opacity-20 grayscale" alt="Stadium" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10 w-full animate-in fade-in slide-in-from-bottom-6">
            <div className="relative group">
               <img src={teamData.logo} alt={teamData.name} className="w-52 h-52 md:w-64 md:h-64 rounded-[4rem] object-cover border-[6px] border-zinc-950 shadow-2xl" />
               {isOwner && <button onClick={() => setIsMediaModalOpen(true)} className="absolute bottom-2 right-2 bg-blue-600 p-4 rounded-3xl border-4 border-zinc-950 shadow-xl"><Camera className="w-5 h-5 text-white" /></button>}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                 <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{teamData.level}</span>
                 <button 
                  onClick={() => isOwner && setIsLocationModalOpen(true)}
                  className="bg-zinc-800/80 backdrop-blur text-zinc-300 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 transition-colors"
                 >
                   <MapPin className="w-3.5 h-3.5 text-blue-500" /> {teamData.location}
                 </button>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">{teamData.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-zinc-400 font-medium">
                <div className="flex items-center gap-2.5 text-sm uppercase font-black text-xs tracking-widest"><Calendar className="w-5 h-5 text-blue-500" /> {teamData.trainingSchedule}</div>
                {teamData.locationLink && (
                  <a href={teamData.locationLink} target="_blank" className="flex items-center gap-2.5 text-sm uppercase font-black text-xs tracking-widest text-blue-400 hover:text-white transition-colors">
                    <Navigation className="w-5 h-5" /> Official Venue
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-4">
               {role === 'player' && (
                  <button onClick={() => setIsContactModalOpen(true)} className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-all">Apply to Club</button>
               )}
               {isOwner && (
                  <button onClick={() => setIsLocationModalOpen(true)} className="px-10 py-5 bg-zinc-800 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl hover:bg-zinc-700 transition-all">Update Info</button>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-24">
          {/* SECTION 3: Official Contact Registry */}
          <section id="contact-details">
            <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center gap-4">
              <Phone className="w-8 h-8 text-blue-500" /> Club Contact Registry
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 shadow-xl relative overflow-hidden">
               {!isContactRevealed ? (
                 <div className="py-12 text-center">
                   <Lock className="w-16 h-16 text-zinc-700 mx-auto mb-8" />
                   <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Registry Access Protocol</h4>
                   <p className="text-zinc-500 text-sm mb-12 max-w-sm mx-auto">Only verified users can access official club recruitment details.</p>
                   <button onClick={handleRevealContact} className="bg-white text-zinc-950 px-12 py-5 rounded-[2.5rem] font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">Reveal Registry Data</button>
                 </div>
               ) : (
                 <div className="animate-in fade-in zoom-in-95">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="flex items-center gap-6 p-8 bg-zinc-950 rounded-[2rem] border border-zinc-800">
                         <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-blue-500 shadow-inner"><Phone className="w-6 h-6" /></div>
                         <div><p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Office Line</p><p className="text-white font-black text-xl">{teamData.contactInfo.phone}</p></div>
                       </div>
                       <div className="flex items-center gap-6 p-8 bg-zinc-950 rounded-[2rem] border border-zinc-800">
                         <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-blue-500 shadow-inner"><Mail className="w-6 h-6" /></div>
                         <div><p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Official Email</p><p className="text-white font-black text-xl break-all">{teamData.contactInfo.email}</p></div>
                       </div>
                    </div>
                    <div className="mt-12 flex justify-center">
                       <button onClick={() => setIsContactRevealed(false)} className="text-zinc-500 hover:text-white font-black uppercase text-[10px] tracking-[0.2em] transition-colors">Terminate Session</button>
                    </div>
                 </div>
               )}
            </div>
          </section>

          {/* Background */}
          <section id="about-club">
            <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center gap-4">
              <Info className="w-8 h-8 text-blue-500" /> Club Philosophy
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-[3.5rem] text-zinc-400 text-xl font-medium shadow-2xl leading-relaxed relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldCheck className="w-40 h-40" /></div>
               <p className="relative z-10">{teamData.description}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
           {/* SECTION 3: Official Venue Card */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] p-10 sticky top-32 shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3">
                <MapIcon className="w-6 h-6 text-blue-500" /> Training Venue
              </h3>
              <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-800 mb-8">
                 <p className="text-white font-bold mb-4 leading-relaxed">{teamData.location}</p>
                 {teamData.locationLink && (
                    <a 
                      href={teamData.locationLink} 
                      target="_blank" 
                      className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Open in Maps <ExternalLink className="w-3 h-3" />
                    </a>
                 )}
              </div>
              
              {isOwner && (
                <button onClick={() => setIsLocationModalOpen(true)} className="w-full py-5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all">Update Venue Data</button>
              )}
           </div>
        </aside>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} recipientName={teamData.name} recipientType="Team" />

      {/* SECTION 3: Location/Venue Management Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl" onClick={() => setIsLocationModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[3.5rem] p-12 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Venue Management</h3>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Update official training location</p>
               </div>
               <button onClick={() => setIsLocationModalOpen(false)} className="p-3 bg-zinc-900 text-zinc-500 hover:text-white rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleUpdateLocation} className="space-y-8">
               <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-3 block tracking-widest">Venue Name / Address</label>
                  <input 
                    type="text" 
                    value={locationInput} 
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-white outline-none focus:border-blue-600 font-bold transition-all" 
                    placeholder="e.g. Manchester Sports Park, Pitch 4" 
                    required
                  />
               </div>
               <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-3 block tracking-widest">Maps Link or GPS (Optional)</label>
                  <input 
                    type="text" 
                    value={linkInput} 
                    onChange={(e) => setLinkInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-white outline-none focus:border-blue-600 font-bold transition-all" 
                    placeholder="https://maps.google.com/..." 
                  />
               </div>
               <button type="submit" className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Apply Venue Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamProfile;
