import React from 'react';
import Icon from 'components/AppIcon';

const FilterChips = ({ activeFilters, onFilterChange, filterCount }) => {
  const removeFilter = (filterType, value = null) => {
    const newFilters = { ...activeFilters };
    
    switch (filterType) {
      case 'propertyType':
        newFilters.propertyTypes = newFilters.propertyTypes.filter(type => type !== value);
        break;
      case 'amenity':
        newFilters.amenities = newFilters.amenities.filter(amenity => amenity !== value);
        break;
      case 'rating':
        newFilters.rating = 0;
        break;
      case 'instantBook':
        newFilters.instantBook = false;
        break;
      case 'priceRange':
        newFilters.priceRange = [0, 500];
        break;
      default:
        break;
    }
    
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({
      priceRange: [0, 500],
      propertyTypes: [],
      amenities: [],
      rating: 0,
      instantBook: false
    });
  };

  const getFilterChips = () => {
    const chips = [];

    // Property types
    activeFilters.propertyTypes.forEach(type => {
      chips.push({
        id: `propertyType-${type}`,
        label: type,
        onRemove: () => removeFilter('propertyType', type)
      });
    });

    // Amenities
    activeFilters.amenities.forEach(amenity => {
      chips.push({
        id: `amenity-${amenity}`,
        label: amenity,
        onRemove: () => removeFilter('amenity', amenity)
      });
    });

    // Rating
    if (activeFilters.rating > 0) {
      chips.push({
        id: 'rating',
        label: `${activeFilters.rating}+ stars`,
        onRemove: () => removeFilter('rating')
      });
    }

    // Instant Book
    if (activeFilters.instantBook) {
      chips.push({
        id: 'instantBook',
        label: 'Instant Book',
        onRemove: () => removeFilter('instantBook')
      });
    }

    // Price Range
    if (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 500) {
      chips.push({
        id: 'priceRange',
        label: `$${activeFilters.priceRange[0]} - $${activeFilters.priceRange[1]}`,
        onRemove: () => removeFilter('priceRange')
      });
    }

    return chips;
  };

  const filterChips = getFilterChips();

  if (filterChips.length === 0) {
    return null;
  }

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
            <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
              Active filters:
            </span>
            
            <div className="flex items-center space-x-2">
              {filterChips.map((chip) => (
                <div
                  key={chip.id}
                  className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                >
                  <span>{chip.label}</span>
                  <button
                    onClick={chip.onRemove}
                    className="hover:bg-primary-100 rounded-full p-0.5 transition-colors duration-200"
                    aria-label={`Remove ${chip.label} filter`}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {filterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap ml-4"
            >
              <Icon name="X" size={14} />
              <span>Clear all</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;