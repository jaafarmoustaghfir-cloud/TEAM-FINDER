
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, Shield, Sparkles, Target, Activity, MapPin, Scale, Lock } from 'lucide-react';
import { MOCK_TEAMS, MOCK_PLAYERS } from '../constants';
import TeamCard from '../components/TeamCard';
import RecommendationEngine from '../components/RecommendationEngine';
import { Position, SkillLevel, PlayerType, TeamNeeds } from '../types';
import { useApp } from '../App';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'recruitment' ? 'recruitment' : 'teams';
  const { role, recommendationsEnabled } = useApp();
  
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  
  // Recruitment Form State
  const [needs, setNeeds] = useState<TeamNeeds>({
    position: 'Any',
    playerType: 'Any',
    ageRange: [15, 35],
    weightRange: [50, 110],
    heightRange: [150, 210],
    skillLevel: 'Any',
    minSkills: { speed: 40, shooting: 40, passing: 40, dribbling: 40, defense: 40 },
    preferredFoot: 'Any',
    location: ''
  });

  const filteredData = useMemo(() => {
    // Only filtering teams now as per request to remove all player profiles/cards
    return MOCK_TEAMS.filter(t => {
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase()) || t.location.toLowerCase().includes(query.toLowerCase());
      return matchesQuery;
    });
  }, [query]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleNeedsChange = (field: string, value: any) => {
    setNeeds(prev => ({ ...prev, [field]: value }));
  };

  const handleRangeChange = (field: 'ageRange' | 'weightRange' | 'heightRange', index: 0 | 1, value: number) => {
    setNeeds(prev => {
      const newRange = [...prev[field]] as [number, number];
      newRange[index] = value;
      return { ...prev, [field]: newRange };
    });
  };

  const handleSkillThreshold = (skill: string, value: number) => {
    setNeeds(prev => ({
      ...prev,
      minSkills: { ...prev.minSkills, [skill]: value }
    }));
  };

  const playerTypes: PlayerType[] = ['Defensive', 'Offensive', 'Playmaker', 'Winger', 'Striker', 'Box-to-Box', 'Target Man', 'Sweeper'];

  // Verification if recruitment feature is allowed
  const canUseRecruitment = (role === 'team' || role === 'admin') && recommendationsEnabled;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Team Directory</h1>
          <p className="text-zinc-500 font-medium">Find the perfect squad or manage recruitment requirements</p>
        </div>

        <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
          <button
            onClick={() => handleTabChange('teams')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-xs uppercase ${
              activeTab === 'teams' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            Teams
          </button>
          <button
            onClick={() => handleTabChange('recruitment')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-xs uppercase ${
              activeTab === 'recruitment' ? 'bg-zinc-100 text-zinc-950 shadow-lg shadow-white/10' : 'text-orange-500 hover:bg-orange-500/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Smart Match
          </button>
        </div>
      </div>

      {activeTab === 'recruitment' ? (
        !canUseRecruitment ? (
          <div className="max-w-xl mx-auto py-24 text-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-800">
               <Lock className="w-8 h-8 text-zinc-500" />
            </div>
            {!recommendationsEnabled ? (
              <>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Feature Temporarily Disabled</h3>
                <p className="text-zinc-500 mb-8">The Smart Match engine is undergoing maintenance. Please use manual search in the meantime.</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Team Exclusive Feature</h3>
                <p className="text-zinc-500 mb-8">Access to the Recommendation Engine is reserved for verified Football Teams and Academies.</p>
                <div className="flex gap-4 justify-center">
                   <Link to="/register?role=team" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs">Register as Team</Link>
                   <button onClick={() => handleTabChange('teams')} className="bg-zinc-800 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs">Manual Search</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Recruitment Form */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 sticky top-24 shadow-2xl">
                <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tighter">
                  <Target className="w-5 h-5 text-orange-500" />
                  Scouting Criteria
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Position & Role</label>
                    <div className="grid grid-cols-1 gap-4">
                      <select 
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs outline-none focus:border-orange-500 transition-colors"
                        value={needs.position}
                        onChange={(e) => handleNeedsChange('position', e.target.value)}
                      >
                        <option value="Any">Any Position</option>
                        {Object.values(Position).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <select 
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs outline-none focus:border-orange-500 transition-colors"
                        value={needs.playerType}
                        onChange={(e) => handleNeedsChange('playerType', e.target.value)}
                      >
                        <option value="Any">Any Player Type</option>
                        {playerTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Foot</label>
                      <select 
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs outline-none"
                        onChange={(e) => handleNeedsChange('preferredFoot', e.target.value)}
                      >
                        <option value="Any">Any</option>
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Min Level</label>
                      <select 
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs outline-none"
                        onChange={(e) => handleNeedsChange('skillLevel', e.target.value)}
                      >
                        <option value="Any">Any</option>
                        {Object.values(SkillLevel).map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                     <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest flex items-center gap-2">
                       <MapPin className="w-3 h-3 text-orange-500" /> Location Preference
                     </label>
                     <input 
                      type="text"
                      placeholder="e.g. London, Spain..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs outline-none focus:border-orange-500 transition-colors"
                      value={needs.location}
                      onChange={(e) => handleNeedsChange('location', e.target.value)}
                     />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between">
                      <label className="text-zinc-500 text-[10px] uppercase font-black block tracking-widest">Age Range</label>
                      <span className="text-xs font-bold text-white">{needs.ageRange[0]} - {needs.ageRange[1]}</span>
                    </div>
                    <div className="flex gap-2">
                      <input type="range" min="15" max="45" value={needs.ageRange[0]} onChange={(e) => handleRangeChange('ageRange', 0, parseInt(e.target.value))} className="w-full accent-orange-500" />
                      <input type="range" min="15" max="45" value={needs.ageRange[1]} onChange={(e) => handleRangeChange('ageRange', 1, parseInt(e.target.value))} className="w-full accent-orange-500" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <label className="text-zinc-500 text-[10px] uppercase font-black block tracking-widest flex items-center gap-2">
                      <Activity className="w-3 h-3 text-orange-500" /> Technical Thresholds
                    </label>
                    {['speed', 'shooting', 'passing', 'dribbling', 'defense'].map(skill => (
                      <div key={skill} className="flex items-center gap-4">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold w-16">{skill}</span>
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={(needs.minSkills as any)[skill]}
                          onChange={(e) => handleSkillThreshold(skill, parseInt(e.target.value))}
                          className="flex-1 accent-orange-500" 
                        />
                        <span className="text-[10px] font-bold text-orange-500 w-6">{(needs.minSkills as any)[skill]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Matches */}
            <main className="lg:col-span-8">
              <RecommendationEngine needs={needs} players={MOCK_PLAYERS} />
            </main>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-tighter">
                  <Filter className="w-4 h-4 text-orange-500" />
                  Filter Teams
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 block">Keywords</label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Team name, city..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-orange-500 outline-none transition-all text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-700">
              {filteredData.map(team => <TeamCard key={team.id} team={team as any} />)}
            </div>
            {filteredData.length === 0 && (
              <div className="text-center py-24">
                <Shield className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                <h3 className="text-zinc-500 font-bold uppercase tracking-widest">No teams found matching your search</h3>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Search;
