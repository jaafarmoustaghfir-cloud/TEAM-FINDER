
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { MOCK_PLAYERS } from '../constants';
import { 
  MapPin, Calendar, Footprints, Ruler, Weight, History, Star, 
  Play, Info, Activity, ShieldCheck, Mail, Video, Image as ImageIcon, 
  Phone, MessageSquare, Instagram, Lock, FileVideo, Award, Plus, Trash2, X,
  Trophy, CheckCircle
} from 'lucide-react';
import ContactModal from '../components/ContactModal';
import MediaUpload from '../components/MediaUpload';
import { useApp } from '../App';
import { Player, MediaItem } from '../types';

const PlayerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { role } = useApp();
  const location = useLocation();
  
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isContactRevealed, setIsContactRevealed] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'photos'>('video');
  const [videoCategory, setVideoCategory] = useState<'highlight' | 'match' | 'training'>('highlight');

  useEffect(() => {
    const savedPlayer = localStorage.getItem(`player_profile_${id}`);
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
    } else {
      const mock = MOCK_PLAYERS.find(p => p.id === id);
      setPlayer(mock);
    }
  }, [id]);

  useEffect(() => {
    if (location.hash === '#skills-videos') {
      const el = document.getElementById('skills-videos');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 500);
    }
  }, [location.hash, player]);

  const savePlayer = (updatedPlayer: Player) => {
    setPlayer(updatedPlayer);
    localStorage.setItem(`player_profile_${id}`, JSON.stringify(updatedPlayer));
  };

  if (!player) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-zinc-500 font-black uppercase tracking-widest animate-pulse">Athlete Registry...</div>
    </div>
  );

  const isOwner = (role === 'player' && player.id === id) || role === 'admin';
  const isTeam = role === 'team';
  const isGuest = role === 'guest';
  const canViewContacts = isOwner || isTeam;

  if (!player.isApproved && !isOwner) {
    return <Navigate to="/" />;
  }

  const handleRevealContact = () => {
    if (isGuest) {
      alert("Please sign in to view contact details.");
      return;
    }
    if (!canViewContacts) {
      alert("Contact details are reserved for verified scouting networks.");
      return;
    }
    setIsContactRevealed(true);
  };

  const addMedia = (data: { url: string; type: 'image' | 'video'; mimeType: string; name: string }) => {
    const newItem: MediaItem = {
      id: `media_${Date.now()}`,
      ...data,
      category: activeMediaTab === 'video' ? videoCategory : undefined
    };
    
    const updatedGallery = [...(player.gallery || []), newItem];
    const hasVideo = updatedGallery.some(m => m.type === 'video');
    savePlayer({ ...player, gallery: updatedGallery, isRecommended: hasVideo });
    setIsUploadModalOpen(false);
  };

  const removeMedia = (mediaId: string) => {
    const updatedGallery = (player.gallery || []).filter(m => m.id !== mediaId);
    const hasVideo = updatedGallery.some(m => m.type === 'video');
    savePlayer({ ...player, gallery: updatedGallery, isRecommended: hasVideo });
  };

  const videoClips = player.gallery?.filter(m => m.type === 'video' && (m.category === videoCategory || (!m.category && videoCategory === 'highlight'))) || [];
  const photos = player.gallery?.filter(m => m.type === 'image') || [];

  return (
    <div className="min-h-screen pb-24 bg-zinc-950">
      <div className="relative h-[550px] bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2400" 
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Pitch Atmosphere"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="relative group">
               <img
                src={player.photo}
                alt={player.name}
                className="w-56 h-56 md:w-72 md:h-72 rounded-[3.5rem] object-cover border-[8px] border-zinc-950 shadow-2xl transition-transform hover:scale-[1.02]"
              />
              {player.isApproved && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-950 px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ring-8 ring-zinc-950 shadow-2xl">
                  <ShieldCheck className="w-4 h-4" /> Certified Player
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                 <span className="bg-zinc-800/80 backdrop-blur-md text-zinc-300 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-zinc-700">{player.position}</span>
                 <span className="bg-orange-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">{player.skillLevel}</span>
                 {player.isRecommended && (
                    <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 fill-current" /> Recommended Pro
                    </span>
                 )}
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">{player.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-10 text-zinc-400 font-medium">
                <div className="flex items-center gap-2.5 text-sm uppercase font-black text-xs tracking-widest">
                  <MapPin className="w-5 h-5 text-orange-500" /> {player.location}
                </div>
                <div className="flex items-center gap-2.5 text-sm uppercase font-black text-xs tracking-widest">
                  <Calendar className="w-5 h-5 text-orange-500" /> {player.age} Years
                </div>
                <div className="flex items-center gap-2.5 text-sm uppercase font-black text-xs tracking-widest">
                  <Activity className="w-5 h-5 text-orange-500" /> {player.availability}
                </div>
              </div>
            </div>

            <div className="flex gap-4 self-center md:self-end">
              {isTeam && (
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex items-center gap-3 px-12 py-6 rounded-[2rem] font-black transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-xs bg-white hover:bg-zinc-200 text-zinc-950"
                >
                  <Trophy className="w-4 h-4" />
                  Invite to Trial
                </button>
              )}
              {isOwner && (
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center gap-3 px-10 py-6 rounded-[2rem] font-black transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-xs bg-orange-600 hover:bg-orange-500 text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Video Proof
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-24">
          
          <section id="skills-videos" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                  <Video className="w-10 h-10 text-orange-500" /> Performance Proof
                </h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Professional proof of technical ability (MP4, WEBM)</p>
              </div>
              <div className="flex bg-zinc-900 p-1 rounded-[1.5rem] border border-zinc-800 shadow-xl overflow-hidden">
                <button onClick={() => { setActiveMediaTab('video'); setVideoCategory('highlight'); }} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMediaTab === 'video' && videoCategory === 'highlight' ? 'bg-orange-600 text-white' : 'text-zinc-500 hover:text-white'}`}>Highlights</button>
                <button onClick={() => { setActiveMediaTab('video'); setVideoCategory('match'); }} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMediaTab === 'video' && videoCategory === 'match' ? 'bg-orange-600 text-white' : 'text-zinc-500 hover:text-white'}`}>Match Clips</button>
                <button onClick={() => { setActiveMediaTab('video'); setVideoCategory('training'); }} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMediaTab === 'video' && videoCategory === 'training' ? 'bg-orange-600 text-white' : 'text-zinc-500 hover:text-white'}`}>Training</button>
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] overflow-hidden aspect-video relative group shadow-2xl">
              {activeMediaTab === 'video' ? (
                videoClips.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 h-full overflow-y-auto custom-scrollbar bg-zinc-950/50">
                    {videoClips.map(vid => (
                      <div key={vid.id} className="relative aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 group/clip shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover/clip:bg-black/30 transition-all cursor-pointer">
                           <Play className="w-12 h-12 text-white fill-white drop-shadow-2xl" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4"><p className="text-[9px] font-black text-white uppercase tracking-widest bg-zinc-950/90 backdrop-blur px-3 py-1.5 rounded-lg inline-block border border-white/10">{vid.name}</p></div>
                        {isOwner && <button onClick={() => removeMedia(vid.id)} className="absolute top-4 right-4 p-2.5 bg-red-600 text-white rounded-xl opacity-0 group-hover/clip:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-20 text-center animate-in fade-in zoom-in-95">
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800"><FileVideo className="w-8 h-8 text-zinc-700" /></div>
                    <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">No {videoCategory} Footage Uploaded</h4>
                    <p className="text-zinc-500 text-xs mb-8 uppercase font-bold">Uploaded videos are required to be recommended to teams.</p>
                    {isOwner && (
                      <button onClick={() => setIsUploadModalOpen(true)} className="bg-white text-zinc-950 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-xl">
                        Upload Video Evidence
                      </button>
                    )}
                  </div>
                )
              ) : null}
            </div>
          </section>

          <section id="contact-info">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                <Phone className="w-10 h-10 text-orange-500" /> Secure Contact Registry
              </h2>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] p-12 relative overflow-hidden shadow-2xl">
              {!isContactRevealed ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-zinc-950 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-800"><Lock className="w-10 h-10 text-zinc-600" /></div>
                  <h4 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Contact Access Restricted</h4>
                  <p className="text-zinc-500 text-sm mb-12">Registry details are strictly reserved for verified club scouts.</p>
                  <button onClick={handleRevealContact} className="bg-white text-zinc-950 px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-2xl">Authenticate to Connect</button>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="p-8 bg-zinc-950 rounded-[2rem] border border-zinc-800 flex items-center gap-6">
                        <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-orange-500"><Phone className="w-6 h-6" /></div>
                        <div><p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Phone</p><p className="text-white font-black text-xl">{player.contactInfo.phone}</p></div>
                      </div>
                      <div className="p-8 bg-zinc-950 rounded-[2rem] border border-zinc-800 flex items-center gap-6">
                        <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-orange-500"><Mail className="w-6 h-6" /></div>
                        <div><p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Email</p><p className="text-white font-black text-xl break-all">{player.contactInfo.email}</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 flex justify-center">
                    <button onClick={() => setIsContactRevealed(false)} className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest">Close Secure Registry Session</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-10">
           <div className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] p-10 sticky top-32 shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center gap-3">
                <Activity className="w-8 h-8 text-orange-500" /> Attributes
              </h3>
              <div className="space-y-10">
                {Object.entries(player.skills).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between items-center mb-4 px-1">
                      <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{skill}</span>
                      <span className="text-white font-black text-sm bg-zinc-950 px-2.5 py-1.5 rounded-xl border border-zinc-800">{value}%</span>
                    </div>
                    <div className="h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 p-1">
                      <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_15px_rgba(245,130,32,0.3)]" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </aside>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        recipientName={player.name} 
        recipientType="Player" 
        initialSubject="Scouting Invitation / Trial Inquiry" 
      />

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl" onClick={() => setIsUploadModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Add Evidence Reel</h3>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">MP4, WEBM (Max 500MB)</p>
               </div>
               <button onClick={() => setIsUploadModalOpen(false)} className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="mb-8 p-1 bg-zinc-950 rounded-2xl border border-zinc-800 flex">
               {(['video', 'photos'] as const).map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveMediaTab(tab)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMediaTab === tab ? 'bg-orange-600 text-white' : 'text-zinc-500 hover:text-white'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            <MediaUpload 
              accept={activeMediaTab === 'video' ? 'video/*' : 'image/*'} 
              label={`Select ${videoCategory.toUpperCase()} File`} 
              onUpload={addMedia} 
            />
            <button onClick={() => setIsUploadModalOpen(false)} className="w-full mt-8 py-4 text-zinc-500 uppercase font-black text-[10px] tracking-widest">Cancel Upload</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerProfile;
