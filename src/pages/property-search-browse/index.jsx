import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

import SearchSection from './components/SearchSection';
import FilterChips from './components/FilterChips';
import PropertyCard from './components/PropertyCard';
import MapView from './components/MapView';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';

const PropertySearchBrowse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [0, 500],
    propertyTypes: [],
    amenities: [],
    rating: 0,
    instantBook: false
  });

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Luxury Beachfront Villa with Ocean Views",
      location: "Malibu, California",
      price: 450,
      rating: 4.9,
      reviewCount: 127,
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop"
      ],
      propertyType: "Villa",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Beach Access"],
      isInstantBook: true,
      isFavorite: false,
      coordinates: { lat: 34.0259, lng: -118.7798 }
    },
    {
      id: 2,
      title: "Cozy Mountain Cabin Retreat",
      location: "Aspen, Colorado",
      price: 280,
      rating: 4.7,
      reviewCount: 89,
      images: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ],
      propertyType: "Cabin",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["WiFi", "Fireplace", "Kitchen", "Parking", "Hot Tub"],
      isInstantBook: false,
      isFavorite: true,
      coordinates: { lat: 39.1911, lng: -106.8175 }
    },
    {
      id: 3,
      title: "Modern Downtown Loft",
      location: "New York, NY",
      price: 320,
      rating: 4.8,
      reviewCount: 203,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
      ],
      propertyType: "Apartment",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["WiFi", "Kitchen", "Gym", "Elevator", "City View"],
      isInstantBook: true,
      isFavorite: false,
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 4,
      title: "Charming Countryside Cottage",
      location: "Cotswolds, England",
      price: 195,
      rating: 4.6,
      reviewCount: 156,
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop"
      ],
      propertyType: "Cottage",
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["WiFi", "Garden", "Kitchen", "Parking", "Pet Friendly"],
      isInstantBook: false,
      isFavorite: false,
      coordinates: { lat: 51.8330, lng: -1.8433 }
    },
    {
      id: 5,
      title: "Tropical Paradise Bungalow",
      location: "Bali, Indonesia",
      price: 125,
      rating: 4.9,
      reviewCount: 298,
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop"
      ],
      propertyType: "Bungalow",
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Pool", "Kitchen", "Garden", "Beach Access"],
      isInstantBook: true,
      isFavorite: true,
      coordinates: { lat: -8.3405, lng: 115.0920 }
    },
    {
      id: 6,
      title: "Historic City Center Apartment",
      location: "Prague, Czech Republic",
      price: 89,
      rating: 4.5,
      reviewCount: 167,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
      ],
      propertyType: "Apartment",
      guests: 3,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Kitchen", "Historic Building", "City Center"],
      isInstantBook: false,
      isFavorite: false,
      coordinates: { lat: 50.0755, lng: 14.4378 }
    }
  ];

  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  useEffect(() => {
    // Handle search query from location state or URL params
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      handleSearch(location.state.searchQuery);
    }
  }, [location.state]);

  const handleSearch = (query) => {
    setLoading(true);
    setTimeout(() => {
      if (query) {
        const filtered = properties.filter(property =>
          property.title.toLowerCase().includes(query.toLowerCase()) ||
          property.location.toLowerCase().includes(query.toLowerCase()) ||
          property.propertyType.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProperties(filtered);
      } else {
        setFilteredProperties(properties);
      }
      setLoading(false);
    }, 800);
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filtered = [...properties];

    // Price range filter
    filtered = filtered.filter(property => 
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );

    // Property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyTypes.includes(property.propertyType)
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(property => property.rating >= filters.rating);
    }

    // Instant book filter
    if (filters.instantBook) {
      filtered = filtered.filter(property => property.isInstantBook);
    }

    setFilteredProperties(filtered);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    let sorted = [...filteredProperties];

    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProperties(sorted);
  };

  const toggleFavorite = (propertyId) => {
    setFilteredProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const handlePropertyClick = (property) => {
    navigate('/property-detail', { state: { property } });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.propertyTypes.length > 0) count++;
    if (activeFilters.amenities.length > 0) count++;
    if (activeFilters.rating > 0) count++;
    if (activeFilters.instantBook) count++;
    if (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 500) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Section */}
      <SearchSection 
        onSearch={handleSearch}
        initialQuery={searchQuery}
      />

      {/* Filter Chips */}
      <FilterChips 
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        filterCount={getActiveFilterCount()}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-heading font-semibold text-text-primary">
              {filteredProperties.length} stays found
              {searchQuery && (
                <span className="text-lg font-normal text-text-secondary ml-2">
                  for "{searchQuery}"
                </span>
              )}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <SortDropdown 
              sortBy={sortBy}
              onSort={handleSort}
            />

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 border border-border rounded-md hover:bg-surface-50 transition-colors duration-200"
            >
              <Icon name="Filter" size={16} />
              <span className="text-sm font-medium">Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-surface border border-border rounded-md p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'list' ?'bg-background text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name="List" size={16} />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'map' ?'bg-background text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name="Map" size={16} />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                isDesktop={true}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === 'list' ? (
              <div className="space-y-6">
                {loading ? (
                  // Loading Skeletons
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="bg-surface-200 h-48 rounded-md mb-4"></div>
                        <div className="space-y-2">
                          <div className="bg-surface-200 h-4 rounded w-3/4"></div>
                          <div className="bg-surface-200 h-4 rounded w-1/2"></div>
                          <div className="bg-surface-200 h-4 rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onFavoriteToggle={toggleFavorite}
                        onClick={() => handlePropertyClick(property)}
                      />
                    ))}
                  </div>
                ) : (
                  // No Results
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-surface-100 rounded-full flex items-center justify-center">
                      <Icon name="Search" size={48} className="text-text-tertiary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                      No properties found
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your search criteria or filters to find more results.
                    </p>
                    <button
                      onClick={() => {
                        setActiveFilters({
                          priceRange: [0, 500],
                          propertyTypes: [],
                          amenities: [],
                          rating: 0,
                          instantBook: false
                        });
                        setSearchQuery('');
                        setFilteredProperties(properties);
                      }}
                      className="btn-primary"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <MapView 
                properties={filteredProperties}
                onPropertyClick={handlePropertyClick}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {showFilters && (
        <FilterPanel
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilters(false)}
          isDesktop={false}
        />
      )}
    </div>
  );
};

export default PropertySearchBrowse;