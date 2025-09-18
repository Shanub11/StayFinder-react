import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ activeFilters, onFilterChange, onClose, isDesktop = false }) => {
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: 'Building' },
    { id: 'house', label: 'House', icon: 'Home' },
    { id: 'villa', label: 'Villa', icon: 'Crown' },
    { id: 'cabin', label: 'Cabin', icon: 'TreePine' },
    { id: 'cottage', label: 'Cottage', icon: 'Flower' },
    { id: 'bungalow', label: 'Bungalow', icon: 'Waves' }
  ];

  const amenities = [
    { id: 'wifi', label: 'WiFi', icon: 'Wifi' },
    { id: 'kitchen', label: 'Kitchen', icon: 'ChefHat' },
    { id: 'parking', label: 'Parking', icon: 'Car' },
    { id: 'pool', label: 'Pool', icon: 'Waves' },
    { id: 'gym', label: 'Gym', icon: 'Dumbbell' },
    { id: 'petFriendly', label: 'Pet Friendly', icon: 'Heart' },
    { id: 'airConditioning', label: 'Air Conditioning', icon: 'Wind' },
    { id: 'heating', label: 'Heating', icon: 'Flame' },
    { id: 'washer', label: 'Washer', icon: 'Shirt' },
    { id: 'dryer', label: 'Dryer', icon: 'Wind' },
    { id: 'tv', label: 'TV', icon: 'Tv' },
    { id: 'fireplace', label: 'Fireplace', icon: 'Flame' }
  ];

  const handlePropertyTypeToggle = (type) => {
    const newTypes = localFilters.propertyTypes.includes(type)
      ? localFilters.propertyTypes.filter(t => t !== type)
      : [...localFilters.propertyTypes, type];
    
    setLocalFilters(prev => ({ ...prev, propertyTypes: newTypes }));
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = localFilters.amenities.includes(amenity)
      ? localFilters.amenities.filter(a => a !== amenity)
      : [...localFilters.amenities, amenity];
    
    setLocalFilters(prev => ({ ...prev, amenities: newAmenities }));
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...localFilters.priceRange];
    newRange[index] = parseInt(value);
    setLocalFilters(prev => ({ ...prev, priceRange: newRange }));
  };

  const handleRatingChange = (rating) => {
    setLocalFilters(prev => ({ ...prev, rating }));
  };

  const handleInstantBookToggle = () => {
    setLocalFilters(prev => ({ ...prev, instantBook: !prev.instantBook }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    if (!isDesktop && onClose) {
      onClose();
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 500],
      propertyTypes: [],
      amenities: [],
      rating: 0,
      instantBook: false
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Price Range
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Min Price
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={localFilters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-1 text-sm font-medium text-text-primary">
                ${localFilters.priceRange[0]}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Max Price
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={localFilters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-1 text-sm font-medium text-text-primary">
                ${localFilters.priceRange[1]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Property Type
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handlePropertyTypeToggle(type.label)}
              className={`flex items-center space-x-3 p-3 rounded-md border transition-all duration-200 ${
                localFilters.propertyTypes.includes(type.label)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-surface-50'
              }`}
            >
              <Icon name={type.icon} size={20} />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Minimum Rating
        </h3>
        <div className="flex space-x-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md border transition-all duration-200 ${
                localFilters.rating === rating
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-surface-50'
              }`}
            >
              <Icon name="Star" size={16} className="fill-current" />
              <span className="text-sm font-medium">
                {rating === 0 ? 'Any' : `${rating}+`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Amenities
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {amenities.map((amenity) => (
            <button
              key={amenity.id}
              onClick={() => handleAmenityToggle(amenity.label)}
              className={`flex items-center space-x-3 p-3 rounded-md border transition-all duration-200 ${
                localFilters.amenities.includes(amenity.label)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-surface-50'
              }`}
            >
              <Icon name={amenity.icon} size={20} />
              <span className="text-sm font-medium">{amenity.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instant Book */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Booking Options
        </h3>
        <button
          onClick={handleInstantBookToggle}
          className={`flex items-center justify-between w-full p-3 rounded-md border transition-all duration-200 ${
            localFilters.instantBook
              ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-surface-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={20} />
            <div className="text-left">
              <div className="text-sm font-medium">Instant Book</div>
              <div className="text-xs text-text-secondary">Book without waiting for host approval</div>
            </div>
          </div>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            localFilters.instantBook
              ? 'border-primary bg-primary' :'border-border'
          }`}>
            {localFilters.instantBook && (
              <Icon name="Check" size={12} color="white" />
            )}
          </div>
        </button>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Filters
          </h2>
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
          >
            Clear all
          </button>
        </div>
        <FilterContent />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-end sm:items-center justify-center">
      <div className="bg-background w-full sm:max-w-2xl sm:mx-4 rounded-t-lg sm:rounded-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-50 flex items-center justify-center transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <FilterContent />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface-50">
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
          >
            Clear all
          </button>
          <button
            onClick={applyFilters}
            className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;