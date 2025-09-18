import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SearchSection = ({ onSearch, initialQuery = '' }) => {
  const [searchData, setSearchData] = useState({
    location: initialQuery,
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearchData(prev => ({ ...prev, location: initialQuery }));
    }
  }, [initialQuery]);

  const handleSearch = () => {
    onSearch(searchData.location);
  };

  const handleGuestChange = (type, operation) => {
    setSearchData(prev => ({
      ...prev,
      guests: operation === 'increment' 
        ? Math.min(prev.guests + 1, 16)
        : Math.max(prev.guests - 1, 1)
    }));
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date for checkout minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Find your perfect stay
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover unique accommodations around the world, from cozy apartments to luxury villas
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-lg shadow-card border border-border p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Where
                </label>
                <div className="relative">
                  <Icon 
                    name="MapPin" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                  <input
                    type="text"
                    placeholder="Search destinations"
                    value={searchData.location}
                    onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <Icon 
                    name="Calendar" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                  <input
                    type="date"
                    min={today}
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <Icon 
                    name="Calendar" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                  <input
                    type="date"
                    min={searchData.checkIn || tomorrowStr}
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Guests
                </label>
                <button
                  type="button"
                  onClick={() => setShowGuestPicker(!showGuestPicker)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-md hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={18} className="text-text-secondary" />
                    <span className="text-text-primary">
                      {searchData.guests} {searchData.guests === 1 ? 'guest' : 'guests'}
                    </span>
                  </div>
                  <Icon 
                    name={showGuestPicker ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-text-secondary" 
                  />
                </button>

                {/* Guest Picker Dropdown */}
                {showGuestPicker && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-modal z-dropdown">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">Guests</span>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => handleGuestChange('guests', 'decrement')}
                            disabled={searchData.guests <= 1}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <Icon name="Minus" size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {searchData.guests}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleGuestChange('guests', 'increment')}
                            disabled={searchData.guests >= 16}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <Icon name="Plus" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSearch}
                className="flex items-center space-x-2 bg-primary hover:bg-primary-600 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <Icon name="Search" size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;