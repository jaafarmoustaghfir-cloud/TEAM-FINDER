
import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../types';
import { MapPin, ArrowRight, Play, ShieldCheck } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden hover:border-orange-500/50 transition-all duration-500 shadow-2xl flex flex-col">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={player.photo}
          alt={player.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <Play className="w-8 h-8 text-white fill-white" />
           </div>
        </div>

        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="bg-orange-600 text-white text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-xl shadow-lg self-start">
            {player.position}
          </span>
          <div className="bg-zinc-950/80 backdrop-blur-md p-1.5 rounded-full text-emerald-500" title="Verified Athlete">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter leading-none">{player.name}</h3>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            {player.location.split(',')[0]}
          </div>
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'SPD', val: player.skills.speed },
            { label: 'SHT', val: player.skills.shooting },
            { label: 'DEF', val: player.skills.defense }
          ].map(s => (
            <div key={s.label} className="text-center bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800/50">
              <div className="text-orange-500 text-sm font-black">{s.val}</div>
              <div className="text-zinc-600 text-[8px] uppercase font-black tracking-tighter">{s.label}</div>
            </div>
          ))}
        </div>

        <Link
          to={`/player/${player.id}`}
          className="flex items-center justify-center gap-2 w-full py-4 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-black uppercase rounded-2xl transition-all group/btn shadow-xl active:scale-95 tracking-widest"
        >
          View Profile
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;
