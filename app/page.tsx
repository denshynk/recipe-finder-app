'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('');
  const [maxReadyTime, setMaxReadyTime] = useState<string>('');
  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (cuisine) params.set('cuisine', cuisine);
    if (maxReadyTime) params.set('maxReadyTime', maxReadyTime);

    router.push(`/dishes?${params.toString()}`);
  };

  const handleInputChange = () => {
    setIsNextEnabled(query || cuisine || maxReadyTime ? true : false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#bef264] to-[#4d7c0f]">
      <div className="backdrop-blur-3xl bg-white/85 rounded-lg shadow-xl p-8 mx-2 max-w-md w-full">
        <h1 className="text-[64px] font-bold text-center text-gray-800 mb-6">
          Recipe Finder
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Find delicious recipes based on your preferences.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700"
              >
                Search for a recipe
              </label>
              <input
                type="text"
                placeholder="Enter dish name"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleInputChange();
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              {' '}
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium text-gray-700"
              >
                Cuisine
              </label>
              <select
                value={cuisine}
                onChange={(e) => {
                  setCuisine(e.target.value);
                  handleInputChange();
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
            <div>
              {' '}
              <label
                htmlFor="maxTime"
                className="block text-sm font-medium text-gray-700"
              >
                Max Preparation Time (in minutes)
              </label>{' '}
              <input
                type="number"
                placeholder="Max preparation time (minutes)"
                value={maxReadyTime}
                onChange={(e) => {
                  setMaxReadyTime(e.target.value);
                  handleInputChange();
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!isNextEnabled}
            title={
              !isNextEnabled
                ? 'Please enter a dish name or preparation time in minutes.'
                : ''
            }
            className={`w-full p-3 rounded-md text-white font-semibold ${
              !isNextEnabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-300`}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
