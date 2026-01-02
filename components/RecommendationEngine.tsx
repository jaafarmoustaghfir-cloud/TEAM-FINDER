
import React from 'react';
import { Player, TeamNeeds } from '../types';
import { Sparkles, UserCheck, ShieldCheck, ArrowRight, Video } from 'lucide-react';
import PlayerCard from './PlayerCard';

interface RecommendationEngineProps {
  needs: TeamNeeds;
  players: Player[];
}

const RecommendationEngine: React.FC<RecommendationEngineProps> = ({ needs, players }) => {
  const matches = players.filter(player => {
    // Basic approval check
    if (!player.isApproved) return false;

    // SECTION 1 - VIDEO EVIDENCE REQUIREMENT
    // Logic: Players with uploaded skills videos can be recommended to teams.
    const hasVideoEvidence = player.isRecommended || (player.gallery && player.gallery.some(m => m.type === 'video'));
    if (!hasVideoEvidence) return false;

    // SECTION 2 - SMART MATCHING PARAMETERS
    // 1. Position Match
    if (needs.position !== 'Any' && player.position !== needs.position) return false;

    // 2. Player Type Match
    if (needs.playerType !== 'Any' && player.playerType !== needs.playerType) return false;

    // 3. Age Range
    if (player.age < needs.ageRange[0] || player.age > needs.ageRange[1]) return false;

    // 4. Skill Level
    if (needs.skillLevel !== 'Any' && player.skillLevel !== needs.skillLevel) return false;

    // 5. Preferred Foot
    if (needs.preferredFoot !== 'Any' && player.preferredFoot !== needs.preferredFoot) return false;

    // 6. Technical Thresholds (Strict Match)
    if (player.skills.speed < needs.minSkills.speed) return false;
    if (player.skills.shooting < needs.minSkills.shooting) return false;
    if (player.skills.passing < needs.minSkills.passing) return false;
    if (player.skills.dribbling < needs.minSkills.dribbling) return false;
    if (player.skills.defense < needs.minSkills.defense) return false;

    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-900/20">
            <Sparkles className="w-5 h-5 text-zinc-950" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Smart Match Results</h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Verified Players with Video Evidence</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-orange-500" />
          <span className="text-white font-bold text-sm">{matches.length} Candidates Found</span>
        </div>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {matches.map(player => (
            <div key={player.id} className="relative group">
              <PlayerCard player={player} />
              <div className="absolute top-4 right-4 z-20 pointer-events-none flex flex-col gap-2">
                <div className="bg-emerald-500 text-zinc-950 px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest flex items-center gap-1 shadow-2xl">
                  <ShieldCheck className="w-3.5 h-3.5" /> High Match
                </div>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest flex items-center gap-1 shadow-2xl">
                  <Video className="w-3.5 h-3.5" /> Video Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-[2.5rem] py-24 text-center">
           <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-10 h-10 text-zinc-700" />
           </div>
           <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">No Verified Matches</h3>
           <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed text-sm font-medium px-4">
             Teams only see players who have uploaded verified video evidence. Encourage players to update their profiles with match highlights.
           </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationEngine;
