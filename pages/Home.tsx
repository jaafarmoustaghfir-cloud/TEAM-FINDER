
import React, { useMemo, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Shield, Search, ArrowRight, Zap, Globe, 
  Target, Sparkles, Video, Star, Users, Briefcase,
  CheckCircle, MessageSquare, Award, Percent, ShieldCheck, MapPin,
  Trophy, TrendingUp, PlayCircle, ExternalLink
} from 'lucide-react';
import { MOCK_PLAYERS, MOCK_TEAMS } from '../constants';
import PlayerCard from '../components/PlayerCard';
import TeamCard from '../components/TeamCard';
import { useApp } from '../App';
import { Position, SkillLevel, Team, Player } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, recommendationsEnabled } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Simulated logged-in users for matching
  // In a real app, this would come from an Auth Context
  const currentPlayer = MOCK_PLAYERS.find(p => p.id === 'p3') || MOCK_PLAYERS[0];
  const currentTeam = MOCK_TEAMS[0];

  useEffect(() => {
    // Handle hash scrolling for #recommendations
    if (location.hash === '#recommendations') {
      const element = document.getElementById('recommendations');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location.hash]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const tab = role === 'team' ? 'players' : 'teams';
    navigate(`/search?tab=${tab}&q=${searchQuery}`);
  };

  /**
   * ACTIVE FEATURE HANDLER
   * Implements the requested functionality for the homepage cards
   */
  const handleFeatureClick = (feature: 'video' | 'matching' | 'access') => {
    // Guest Restriction
    if (role === 'guest') {
      navigate('/register');
      return;
    }

    switch (feature) {
      case 'video':
        if (role === 'player') {
          // Redirect to profile video section for uploading
          navigate(`/player/${currentPlayer.id}#skills-videos`);
        } else if (role === 'team' || role === 'admin') {
          // Teams go to search for video-verified players
          navigate('/search?tab=recruitment');
        }
        break;
      case 'matching':
        // Scroll to the recommendation feed if on home, or go to search
        const recSection = document.getElementById('recommendations');
        if (recSection) {
          recSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/search?tab=recruitment');
        }
        break;
      case 'access':
        // Direct access to the directory
        navigate('/search');
        break;
    }
  };

  // Matching Logic for Players (Finding Teams)
  const recommendedTeams = useMemo(() => {
    if (role !== 'player') return [];
    return MOCK_TEAMS.filter(team => {
      const posMatch = team.needs.position === 'Any' || team.needs.position === currentPlayer.position;
      const levelMatch = team.level === currentPlayer.skillLevel || team.level === 'Academy' || team.level === 'Professional';
      return posMatch && levelMatch;
    }).slice(0, 4);
  }, [role, currentPlayer]);

  // Matching Logic for Teams (Finding Players)
  const recommendedPlayers = useMemo(() => {
    if (role !== 'team' && role !== 'admin') return [];
    return MOCK_PLAYERS.filter(player => {
      // SECTION 1: Video Evidence Requirement
      // Only players with video evidence can be recommended to teams
      const hasVideos = player.isRecommended || (player.gallery && player.gallery.some(m => m.type === 'video'));
      if (!hasVideos) return false;

      const posMatch = currentTeam.needs.position === 'Any' || player.position === currentTeam.needs.position;
      const levelMatch = currentTeam.needs.skillLevel === 'Any' || player.skillLevel === currentTeam.needs.skillLevel;
      return posMatch && levelMatch && player.isApproved;
    }).slice(0, 4);
  }, [role, currentTeam]);

  // GUEST VIEW
  if (role === 'guest') {
    return (
      <div className="flex flex-col gap-24 pb-24 bg-zinc-950">
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-4">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2400" 
              className="w-full h-full object-cover opacity-20 grayscale"
              alt="Stadium Backdrop"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center animate-in fade-in zoom-in-95 duration-1000">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-[1.5rem] bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12">
              <Zap className="w-4 h-4 fill-current" />
              Verified Scouting Engine
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black text-white mb-10 leading-[0.85] tracking-tighter uppercase">
              Find Your Team.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 drop-shadow-2xl">Find Your Player.</span>
            </h1>
            <p className="text-xl md:text-3xl text-zinc-500 max-w-4xl mx-auto mb-16 leading-relaxed font-medium px-4">
              The premier scouting infrastructure for athletes and official clubs. Verified profiles, performance footage, and direct recruitment.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4">
              <Link to="/register?role=player" className="group px-14 py-7 bg-orange-600 hover:bg-orange-500 text-white rounded-[2.5rem] font-black text-xl transition-all flex items-center gap-4 active:scale-95 shadow-2xl uppercase tracking-widest">
                <User className="w-6 h-6" /> I am a Player
              </Link>
              <Link to="/register?role=team" className="group px-14 py-7 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded-[2.5rem] font-black text-xl transition-all flex items-center gap-4 active:scale-95 uppercase tracking-widest shadow-2xl">
                <Shield className="w-6 h-6" /> I am a Team
              </Link>
            </div>
          </div>
        </section>

        {/* ACTIVE FEATURE GRID FOR GUESTS */}
        <section className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { id: 'video', title: 'Video Evidence', desc: 'Verified performance proof. Max 500MB (MP4, WEBM). Click to start your athletic reel.', icon: <Video className="w-10 h-10 text-orange-500" /> },
             { id: 'matching', title: 'Smart Matching', desc: 'Algorithm-driven matching for your specific position and skill level. Discovery starts here.', icon: <Target className="w-10 h-10 text-orange-500" /> },
             { id: 'access', title: 'Direct Access', desc: 'Skip the agent. Trial invites and secure club inquiries are managed directly in-app.', icon: <MessageSquare className="w-10 h-10 text-orange-500" /> }
           ].map((feature, i) => (
             <button 
              key={i} 
              onClick={() => handleFeatureClick(feature.id as any)}
              className="group text-left bg-zinc-900 border border-zinc-800 p-12 rounded-[3.5rem] hover:border-orange-500/40 transition-all shadow-xl active:scale-95 relative overflow-hidden"
             >
               <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  <PlayCircle className="w-24 h-24 text-white" />
               </div>
               <div className="mb-8 group-hover:scale-110 transition-transform">{feature.icon}</div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{feature.title}</h3>
               <p className="text-zinc-500 font-medium leading-relaxed mb-6">{feature.desc}</p>
               <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest group-hover:text-orange-500 transition-colors">
                  Login to Activate <ArrowRight className="w-4 h-4" />
               </div>
             </button>
           ))}
        </section>
      </div>
    );
  }

  // LOGGED-IN VIEW
  return (
    <div className="flex flex-col gap-24 pb-24 pt-12 bg-zinc-950 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 w-full animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              <Sparkles className="w-4 h-4" /> Recruitment Dashboard Active
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Welcome, <span className={role === 'player' ? 'text-orange-500' : 'text-blue-500'}>
                {role === 'player' ? currentPlayer.name.split(' ')[0] : currentTeam.name}
              </span>
            </h1>
            <p className="text-zinc-500 mt-4 font-medium text-lg">
              {role === 'player' ? 'Upload "Skills Videos" to become visible to official club scouts.' : 'Review personalized player matches based on your active vacancies.'}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => handleFeatureClick('video')}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 shadow-xl"
            >
              <Video className="w-5 h-5" /> {role === 'player' ? 'Skills Videos' : 'Video Scouter'}
            </button>
            <button 
              onClick={() => handleFeatureClick('matching')}
              className="bg-white text-zinc-950 hover:bg-zinc-200 px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 shadow-2xl"
            >
              <Target className="w-5 h-5" /> Smart Match
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION HUB - ACTIVE FOR LOGGED IN */}
      <section className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { id: 'video', title: 'Video Portfolio', desc: role === 'player' ? 'Upload match highlights (MP4, WEBM). Required for elite recommendations.' : 'Scout verified performance videos from top candidates in the network.', icon: <Video className="w-10 h-10 text-orange-500" /> },
             { id: 'matching', title: 'Matching Engine', desc: 'Discovery matches based on position, level, and location logic. View your personalized list below.', icon: <Target className="w-10 h-10 text-orange-500" /> },
             { id: 'access', title: 'Scouting Access', desc: 'Secure contact registry for trial invites and official club recruitment inquiries.', icon: <MessageSquare className="w-10 h-10 text-orange-500" /> }
           ].map((feature, i) => (
             <button 
                key={i} 
                onClick={() => handleFeatureClick(feature.id as any)}
                className="group text-left bg-zinc-900 border border-zinc-800 p-12 rounded-[3.5rem] hover:border-blue-500/40 transition-all shadow-xl active:scale-95"
             >
               <div className="mb-8 group-hover:scale-110 transition-transform">{feature.icon}</div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{feature.title}</h3>
               <p className="text-zinc-500 font-medium leading-relaxed mb-6">{feature.desc}</p>
               <div className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-blue-500 transition-colors">
                  Open Feature <ArrowRight className="w-4 h-4" />
               </div>
             </button>
           ))}
      </section>

      {/* RECOMMENDATIONS ANCHOR */}
      {recommendationsEnabled && (
        <section id="recommendations" className="max-w-7xl mx-auto px-4 w-full scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 text-orange-500 font-black uppercase tracking-widest text-[10px] mb-4">
                <Star className="w-5 h-5 fill-current" /> Algorithm Recommendations
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                {role === 'player' ? 'Target Opportunities' : 'Scouting Recommendations'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {role === 'player' ? (
              recommendedTeams.length > 0 ? (
                recommendedTeams.map(team => <TeamCard key={team.id} team={team} />)
              ) : (
                <div className="col-span-full py-20 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-[3rem] text-center">
                   <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">No matches found. Try updating your position or location in settings.</p>
                </div>
              )
            ) : (
              recommendedPlayers.map(player => (
                <div key={player.id} className="relative group">
                  <PlayerCard player={player} />
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-orange-600 text-white px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3" /> Video Verified
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* GLOBAL DISCOVERY */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[4rem] p-16 md:p-24 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
            <Search className="w-80 h-80 text-white" />
          </div>
          <div className="max-w-4xl relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">Global Registry</h2>
            <p className="text-zinc-500 text-xl mb-14 font-medium">Search for verified clubs or elite players with performance footage.</p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-6">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={role === 'team' ? "Find strikers, goalkeepers, defenders..." : "Find semi-pro, academy, or amateur clubs..."}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-[2rem] py-8 px-8 text-white outline-none focus:border-blue-500 transition-all font-bold text-lg"
              />
              <button type="submit" className="bg-blue-600 text-white px-14 py-8 rounded-[2rem] font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-2xl text-[10px]">
                Search Registry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
