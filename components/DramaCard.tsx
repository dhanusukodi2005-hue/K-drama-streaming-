
import React from 'react';
import { Drama } from '../types';

interface DramaCardProps {
  drama: Drama;
  onClick: (drama: Drama) => void;
}

const DramaCard: React.FC<DramaCardProps> = ({ drama, onClick }) => {
  return (
    <div 
      onClick={() => onClick(drama)}
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
    >
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img 
          src={drama.image} 
          alt={drama.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg leading-tight">{drama.title}</h3>
        <p className="text-slate-400 text-xs mt-1">{drama.genres.join(' • ')}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-pink-500 text-sm font-bold">★ {drama.rating}</span>
          <span className="text-slate-400 text-xs">| {drama.year}</span>
        </div>
      </div>

      {drama.trending && (
        <div className="absolute top-2 right-2 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
          TRENDING
        </div>
      )}
    </div>
  );
};

export default DramaCard;
