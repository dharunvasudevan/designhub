import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  onSearch?: (term: string) => void;
  className?: string;
  size?: 'md' | 'lg';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  placeholder = 'Search tools, categories, or use cases...',
  onSearch,
  className = '',
  size = 'lg',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate(`/explore?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const isLarge = size === 'lg';

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-900/5 transition-all ${
        isLarge ? 'p-1.5 sm:p-2' : 'p-1'
      } ${className}`}
    >
      <div className="pl-3 pr-2 text-slate-400 shrink-0">
        <Search className={isLarge ? 'w-5 h-5' : 'w-4 h-4'} />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="grow px-2 py-1.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-hidden"
      />

      <button
        type="submit"
        className="bg-slate-950 hover:bg-slate-800 text-white font-medium px-5 py-2 rounded-lg text-xs sm:text-sm shrink-0 transition-colors cursor-pointer shadow-xs"
      >
        Explore
      </button>
    </form>
  );
};
