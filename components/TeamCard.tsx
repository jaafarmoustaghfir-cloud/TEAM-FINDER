
import React from 'react';
import { Link } from 'react-router-dom';
import { Team } from '../types';
import { MapPin, Users, Target, Calendar } from 'lucide-react';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <img
            src={team.logo}
            alt={team.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-full text-zinc-950">
            <Target className="w-3 h-3" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{team.name}</h3>
          <div className="flex items-center gap-1.5 text-zinc-500 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5" />
            {team.location}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-zinc-400 text-sm line-clamp-2">{team.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Fix: Property 'positions' does not exist on type 'TeamNeeds'. Using 'position' instead. */}
          {team.needs.position !== 'Any' && (
            <span className="bg-zinc-800 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
              Need: {team.needs.position}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <Calendar className="w-4 h-4" />
          {team.trainingSchedule.split(':')[0]} Schedule Available
        </div>
      </div>

      <Link
        to={`/team/${team.id}`}
        className="block w-full text-center py-3 border border-zinc-700 hover:border-blue-500 hover:bg-blue-500/10 text-white text-sm font-semibold rounded-xl transition-all"
      >
        View Team Requirements
      </Link>
    </div>
  );
};

export default TeamCard;
