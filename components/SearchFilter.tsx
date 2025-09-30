'use client';
import { useState, useEffect } from 'react';

interface SearchFilterProps {
  onSearch: (search: string) => void;
  onTagFilter: (tag: string) => void;
  selectedTag: string;
}

export default function SearchFilter({ onSearch, onTagFilter, selectedTag }: SearchFilterProps) {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then(setTags);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagFilter('')}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTag === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {Array.isArray(tags) && tags.map(tag => (
          <button
            key={tag}
            onClick={() => onTagFilter(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}