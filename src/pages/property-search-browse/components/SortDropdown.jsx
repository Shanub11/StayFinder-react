import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SortDropdown = ({ sortBy, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'reviews', label: 'Most Reviewed', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSort = (sortOption) => {
    onSort(sortOption);
    setIsOpen(false);
  };

  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200"
      >
        <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">
          Sort: {currentSort?.label}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary" 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-md shadow-modal z-dropdown">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors duration-200 ${
                  sortBy === option.value
                    ? 'text-primary bg-primary-50' :'text-text-secondary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={sortBy === option.value ? 'text-primary' : 'text-text-tertiary'} 
                />
                <span className="text-sm font-medium">{option.label}</span>
                {sortBy === option.value && (
                  <Icon name="Check" size={16} className="text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;