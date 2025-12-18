
import React, { useEffect, useState } from 'react';
import { Drama } from '../types';
import { getDramaSummary } from '../services/geminiService';

interface DramaModalProps {
  drama: Drama;
  onClose: () => void;
}

const DramaModal: React.FC<DramaModalProps> = ({ drama, onClose }) => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      const summary = await getDramaSummary(drama.title);
      setAiSummary(summary);
      setLoading(false);
    }
    fetchSummary();
  }, [drama.title]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-slate-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-950/50 rounded-full text-white hover:bg-slate-950 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 aspect-[2/3] md:aspect-auto">
            <img 
              src={drama.image} 
              alt={drama.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:w-2/3 p-6 sm:p-8 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">{drama.title}</h2>
                <p className="text-slate-400 font-medium">{drama.originalTitle} • {drama.year}</p>
              </div>
              <div className="bg-slate-800 px-3 py-1 rounded-lg">
                <span className="text-pink-500 font-bold">★ {drama.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {drama.genres.map(g => (
                <span key={g} className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                  {g}
                </span>
              ))}
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                {drama.episodes} Episodes
              </span>
            </div>

            <div className="space-y-6">
              <section>
                <h4 className="text-slate-200 font-semibold mb-2">Synopsis</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {drama.description}
                </p>
              </section>

              <section className="bg-slate-800/50 p-4 rounded-xl border border-pink-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <h4 className="text-pink-400 font-bold text-xs tracking-wider uppercase">AI Insights</h4>
                </div>
                {loading ? (
                  <div className="flex gap-2">
                    <div className="h-4 w-3/4 bg-slate-700 rounded animate-pulse" />
                  </div>
                ) : (
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    "{aiSummary}"
                  </p>
                )}
              </section>
            </div>

            <div className="mt-auto pt-8 flex gap-4">
              <button className="flex-1 bg-white text-slate-950 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>
              <button className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">
                Add to My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DramaModal;
