import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const SimilarProperties = ({ currentPropertyId }) => {
  const navigate = useNavigate();

  // Mock similar properties data
  const similarProperties = [
    {
      id: 2,
      title: "Modern Ocean View Condo",
      location: "Santa Monica, CA",
      price: 280,
      rating: 4.7,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      propertyType: "Entire condo",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      isNew: false,
      isSuperhost: true
    },
    {
      id: 3,
      title: "Luxury Hillside Retreat",
      location: "Beverly Hills, CA",
      price: 650,
      rating: 4.9,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
      propertyType: "Entire house",
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      isNew: false,
      isSuperhost: true
    },
    {
      id: 4,
      title: "Cozy Beach Cottage",
      location: "Manhattan Beach, CA",
      price: 320,
      rating: 4.6,
      reviewCount: 73,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      propertyType: "Entire cottage",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      isNew: true,
      isSuperhost: false
    },
    {
      id: 5,
      title: "Designer Loft with City Views",
      location: "West Hollywood, CA",
      price: 195,
      rating: 4.8,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1520637736862-4d197d17c93a?w=400&h=300&fit=crop",
      propertyType: "Entire loft",
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      isNew: false,
      isSuperhost: true
    },
    {
      id: 6,
      title: "Seaside Villa with Pool",
      location: "Redondo Beach, CA",
      price: 420,
      rating: 4.5,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      propertyType: "Entire villa",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      isNew: false,
      isSuperhost: false
    }
  ];

  const handlePropertyClick = (propertyId) => {
    navigate('/property-detail', { 
      state: { propertyId: propertyId } 
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
        Similar places to stay
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {similarProperties.map((property) => (
          <div
            key={property.id}
            onClick={() => handlePropertyClick(property.id)}
            className="bg-background rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-all duration-300 cursor-pointer group"
          >
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {property.isNew && (
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                )}
                {property.isSuperhost && (
                  <span className="bg-text-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Superhost
                  </span>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle favorite toggle
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Icon name="Heart" size={16} className="text-text-secondary hover:text-primary" />
              </button>
            </div>

            {/* Property Info */}
            <div className="p-4">
              {/* Location and Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary truncate">
                  {property.location}
                </span>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
              </div>

              {/* Property Title */}
              <h3 className="text-text-secondary text-sm mb-2 line-clamp-2 group-hover:text-text-primary transition-colors duration-200">
                {property.title}
              </h3>

              {/* Property Details */}
              <div className="flex items-center space-x-2 text-xs text-text-tertiary mb-3">
                <span>{property.guests} guests</span>
                <span>·</span>
                <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                <span>·</span>
                <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
              </div>

              {/* Price and Reviews */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg font-bold text-text-primary">
                    ${property.price}
                  </span>
                  <span className="text-sm text-text-secondary">night</span>
                </div>
                <span className="text-xs text-text-tertiary">
                  {property.reviewCount} reviews
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/property-search-browse')}
          className="px-8 py-3 border border-border text-text-primary hover:bg-surface-50 rounded-md font-medium transition-colors duration-200 inline-flex items-center space-x-2"
        >
          <Icon name="Search" size={16} />
          <span>View more properties</span>
        </button>
      </div>
    </div>
  );
};

export default SimilarProperties;