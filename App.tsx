
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import DramaCard from './components/DramaCard';
import DramaModal from './components/DramaModal';
import RecommendationWidget from './components/RecommendationWidget';
import ImagineModal from './components/ImagineModal';
import { MOCK_DRAMAS } from './constants';
import { Drama } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);
  const [isImagineOpen, setIsImagineOpen] = useState(false);

  const filteredDramas = useMemo(() => {
    if (!searchQuery) return MOCK_DRAMAS;
    return MOCK_DRAMAS.filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const trendingDramas = useMemo(() => MOCK_DRAMAS.filter(d => d.trending), []);
  const popularDramas = useMemo(() => MOCK_DRAMAS.filter(d => d.popular), []);

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        onSearch={setSearchQuery} 
        onImagineClick={() => setIsImagineOpen(true)}
      />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={MOCK_DRAMAS[0].banner} 
            alt="Hero Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
        </div>
        
        <div className="absolute bottom-20 left-4 sm:left-12 max-w-2xl px-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Exclusive Original
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
            {MOCK_DRAMAS[0].title}
          </h1>
          <p className="text-slate-300 text-lg mb-8 line-clamp-3 font-medium leading-relaxed drop-shadow-lg">
            {MOCK_DRAMAS[0].description}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setSelectedDrama(MOCK_DRAMAS[0])}
              className="bg-white text-slate-950 px-8 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-xl"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Now
            </button>
            <button 
              onClick={() => setSelectedDrama(MOCK_DRAMAS[0])}
              className="bg-slate-800/50 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 border border-slate-700 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Search Results / Full Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Continue Watching'}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredDramas.map(drama => (
              <DramaCard key={drama.id} drama={drama} onClick={setSelectedDrama} />
            ))}
          </div>
          {filteredDramas.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No dramas found matching your search.
            </div>
          )}
        </section>

        {/* Trending Section */}
        {!searchQuery && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-pink-600 pl-4">Trending Now</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {trendingDramas.map(drama => (
                <DramaCard key={drama.id} drama={drama} onClick={setSelectedDrama} />
              ))}
            </div>
          </section>
        )}

        {/* Popular Section */}
        {!searchQuery && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-violet-600 pl-4">All-Time Favorites</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {popularDramas.map(drama => (
                <DramaCard key={drama.id} drama={drama} onClick={setSelectedDrama} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modals & Overlays */}
      {selectedDrama && (
        <DramaModal drama={selectedDrama} onClose={() => setSelectedDrama(null)} />
      )}
      
      {isImagineOpen && (
        <ImagineModal onClose={() => setIsImagineOpen(false)} />
      )}

      <RecommendationWidget />

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-slate-900 bg-slate-950 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-white/50">K-HUB</span>
            <p className="text-sm">© 2024 K-HUB Entertainment. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
