
import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onImagineClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onImagineClick }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent cursor-pointer">
              K-HUB
            </h1>
            <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-300">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">TV Shows</a>
              <a href="#" className="hover:text-white transition-colors">Movies</a>
              <a href="#" className="hover:text-white transition-colors">New & Popular</a>
              <button 
                onClick={onImagineClick}
                className="text-pink-400 hover:text-pink-300 transition-colors animate-pulse"
              >
                AI Imagine
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <form onSubmit={handleSubmit} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search dramas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-900 text-slate-200 text-sm rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500/50 w-64 border border-slate-800"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
