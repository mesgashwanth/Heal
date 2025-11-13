
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { ICONS } from '../constants';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const result = await generateImage(prompt);
      if (result) {
        setImageUrl(result);
      } else {
        setError('Failed to generate image. Please try a different prompt.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg max-w-4xl mx-auto p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text">AI Image Generator</h2>
        <p className="text-text-secondary mt-2">
          Create a beautiful image. For example, "a serene watercolor of a mother holding her newborn baby."
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image description..."
          className="flex-1 w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark disabled:bg-slate-400 transition-colors flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            ICONS.imageSparkle
          )}
          <span>{isLoading ? 'Generating...' : 'Generate'}</span>
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-8 w-full aspect-square bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-text-secondary">Creating your image...</p>
          </div>
        )}
        {!isLoading && imageUrl && (
          <img src={imageUrl} alt={prompt} className="w-full h-full object-cover" />
        )}
        {!isLoading && !imageUrl && (
          <div className="text-center text-text-secondary p-4">
            {ICONS.imagePlaceholder}
            <p className="mt-2">Your generated image will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
