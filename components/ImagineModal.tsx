
import React, { useState } from 'react';
import { imagineDramaPoster } from '../services/geminiService';

interface ImagineModalProps {
  onClose: () => void;
}

const ImagineModal: React.FC<ImagineModalProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    const result = await imagineDramaPoster(prompt);
    if (result) {
      setImage(result);
    } else {
      setError('Failed to generate poster. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative bg-slate-900 rounded-2xl w-full max-w-lg overflow-hidden border border-pink-500/30 shadow-[0_0_50px_-12px_rgba(236,72,153,0.3)] p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Imagine a K-Drama</h2>
        <p className="text-slate-400 text-sm mb-6">Describe your dream K-drama plot and our AI will visualize the poster for you.</p>
        
        {!image ? (
          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cyberpunk romance between a delivery driver and a reclusive AI programmer in a neon-lit Seoul 2099..."
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Poster'
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-slate-700">
              <img src={image} alt="Generated Poster" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setImage(null)}
                className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700"
              >
                Try Another
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagineModal;
