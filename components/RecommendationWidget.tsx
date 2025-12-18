
import React, { useState } from 'react';
import { getRecommendations } from '../services/geminiService';

const RecommendationWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState('Happy');
  const [genre, setGenre] = useState('Romance');
  const [extra, setExtra] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    const result = await getRecommendations({ mood, favoriteGenre: genre, extraInfo: extra });
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[40]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-tr from-pink-500 to-violet-600 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-white font-bold text-sm">Ask AI Buddy</span>
        </button>
      ) : (
        <div className="bg-slate-900 w-80 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-8 duration-300">
          <div className="p-4 bg-slate-800 flex justify-between items-center border-b border-slate-700">
            <h3 className="text-white font-bold text-sm">AI Drama Buddy</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto space-y-4">
            {!response ? (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Current Mood</label>
                  <select 
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-pink-500"
                  >
                    <option>Happy</option>
                    <option>Heartbroken</option>
                    <option>Adrenaline Seeking</option>
                    <option>In the mood for revenge</option>
                    <option>Bored</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Favorite Genre</label>
                  <select 
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-pink-500"
                  >
                    <option>Romance</option>
                    <option>Thriller</option>
                    <option>Historical (Sageuk)</option>
                    <option>Comedy</option>
                    <option>Fantasy</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Anything specific?</label>
                  <input 
                    type="text"
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    placeholder="e.g. No sad endings, strong female lead..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <button 
                  onClick={handleAsk}
                  disabled={loading}
                  className="w-full bg-pink-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-pink-500 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Finding Gems...' : 'Get Recommendations'}
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-800 p-3 rounded-xl border border-pink-500/20">
                  <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                    {response}
                  </p>
                </div>
                <button 
                  onClick={() => setResponse('')}
                  className="w-full text-pink-500 text-xs font-bold hover:underline"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationWidget;
