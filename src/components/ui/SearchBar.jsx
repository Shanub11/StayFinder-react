import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === '/property-search-browse';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsExpanded(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/property-search-browse', { 
        state: { searchQuery: searchQuery.trim() } 
      });
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!searchQuery) {
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const popularSearches = [
    'Beach houses',
    'Mountain cabins',
    'City apartments',
    'Luxury villas',
    'Pet-friendly'
  ];

  return (
    <div className="relative" ref={inputRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative flex items-center transition-all duration-300 ${
          isExpanded || isSearchPage 
            ? 'w-full' :'w-64 hover:w-72'
        }`}>
          <div className={`relative flex items-center w-full bg-surface border border-border rounded-md transition-all duration-200 ${
            isFocused 
              ? 'ring-2 ring-primary-200 border-primary shadow-card' 
              : 'hover:border-border-dark hover:shadow-card'
          }`}>
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 text-text-secondary transition-colors duration-200" 
            />
            
            <input
              type="text"
              placeholder="Search destinations, properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full pl-10 pr-10 py-2.5 bg-transparent text-sm font-body placeholder-text-tertiary focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-10 p-1 text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                aria-label="Clear search"
              >
                <Icon name="X" size={14} />
              </button>
            )}

            <button
              type="submit"
              className="absolute right-2 p-1.5 text-primary hover:text-primary-600 transition-colors duration-200"
              aria-label="Search"
            >
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>

        {/* Search Suggestions Dropdown */}
        {isFocused && (isExpanded || isSearchPage) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-modal z-dropdown animate-fade-in">
            <div className="p-4">
              <h4 className="text-sm font-medium text-text-primary mb-3 font-heading">
                Popular Searches
              </h4>
              <div className="space-y-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSearchQuery(search);
                      navigate('/property-search-browse', { 
                        state: { searchQuery: search } 
                      });
                      setIsExpanded(false);
                      inputRef.current?.blur();
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-primary hover:bg-surface-50 rounded-md transition-colors duration-200 group"
                  >
                    <Icon 
                      name="TrendingUp" 
                      size={14} 
                      className="text-text-tertiary group-hover:text-primary transition-colors duration-200" 
                    />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;