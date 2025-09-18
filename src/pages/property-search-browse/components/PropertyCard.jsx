import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PropertyCard = ({ property, onFavoriteToggle, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(property.id);
  };

  return (
    <div 
      className="bg-background rounded-lg shadow-card hover:shadow-elevation border border-border cursor-pointer transition-all duration-200 group"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="aspect-w-16 aspect-h-10 h-48">
          <Image
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-background bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-background bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 bg-background bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label={property.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={property.isFavorite ? "text-primary fill-current" : "text-text-secondary"} 
          />
        </button>

        {/* Instant Book Badge */}
        {property.isInstantBook && (
          <div className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded text-xs font-medium">
            <Icon name="Zap" size={12} className="inline mr-1" />
            Instant Book
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-2">
          <h3 className="font-heading font-semibold text-text-primary text-lg mb-1 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-text-secondary text-sm flex items-center">
            <Icon name="MapPin" size={14} className="mr-1" />
            {property.location}
          </p>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
          <span className="flex items-center">
            <Icon name="Users" size={14} className="mr-1" />
            {property.guests} guests
          </span>
          <span className="flex items-center">
            <Icon name="Bed" size={14} className="mr-1" />
            {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center">
            <Icon name="Bath" size={14} className="mr-1" />
            {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-surface-100 text-text-secondary px-2 py-1 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-text-tertiary text-xs px-2 py-1">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm font-medium text-text-primary">
              {property.rating}
            </span>
            <span className="text-sm text-text-secondary">
              ({property.reviewCount})
            </span>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-heading font-semibold text-text-primary">
              ${property.price}
              <span className="text-sm font-normal text-text-secondary"> /night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;