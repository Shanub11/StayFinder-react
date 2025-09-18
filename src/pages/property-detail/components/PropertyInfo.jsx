import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PropertyInfo = ({ 
  property, 
  showFullDescription, 
  setShowFullDescription,
  showAllAmenities,
  setShowAllAmenities 
}) => {
  const displayedAmenities = showAllAmenities ? property.amenities : property.amenities.slice(0, 8);
  const shortDescription = property.description.substring(0, 300) + '...';

  return (
    <div className="space-y-8">
      {/* Property Highlights */}
      <div className="border-b border-border pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary font-heading">
            {property.propertyType} hosted by {property.host.name}
          </h2>
        </div>
        
        <div className="flex items-center space-x-6 text-text-secondary mb-6">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} />
            <span>{property.guests} guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Bed" size={16} />
            <span>{property.bedrooms} bedrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Bath" size={16} />
            <span>{property.bathrooms} bathrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Home" size={16} />
            <span>{property.beds} beds</span>
          </div>
        </div>

        {/* Host Profile */}
        <div className="flex items-center space-x-4 p-4 bg-surface-50 rounded-lg">
          <div className="relative">
            <Image
              src={property.host.avatar}
              alt={property.host.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {property.host.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-text-primary">{property.host.name}</h3>
              {property.host.isSuperhost && (
                <span className="bg-primary-100 text-primary text-xs px-2 py-1 rounded-full font-medium">
                  Superhost
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span>{property.host.rating} ({property.host.reviewCount} reviews)</span>
              </div>
              <span>Joined in {property.host.joinedDate}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
              <span>Response rate: {property.host.responseRate}%</span>
              <span>Response time: {property.host.responseTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="border-b border-border pb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
          About this place
        </h2>
        <div className="text-text-secondary leading-relaxed">
          <p className="mb-4">
            {showFullDescription ? property.description : shortDescription}
          </p>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-primary hover:text-primary-600 font-medium underline transition-colors duration-200"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        </div>
      </div>

      {/* Amenities */}
      <div className="border-b border-border pb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
          What this place offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayedAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name={amenity.icon} size={20} className="text-text-secondary" />
              <span className="text-text-secondary">{amenity.name}</span>
            </div>
          ))}
        </div>
        {property.amenities.length > 8 && (
          <button
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="mt-4 px-6 py-2 border border-border text-text-primary hover:bg-surface-50 rounded-md font-medium transition-colors duration-200"
          >
            {showAllAmenities ? 'Show less amenities' : `Show all ${property.amenities.length} amenities`}
          </button>
        )}
      </div>

      {/* House Rules */}
      <div className="border-b border-border pb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
          House rules
        </h2>
        <div className="space-y-3">
          {property.houseRules.map((rule, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-text-secondary mt-0.5 flex-shrink-0" />
              <span className="text-text-secondary">{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Policies */}
      <div className="border-b border-border pb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
          Booking details
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Minimum stay</span>
            <span className="text-text-primary font-medium">{property.availability.minStay} nights</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Maximum stay</span>
            <span className="text-text-primary font-medium">{property.availability.maxStay} nights</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Instant booking</span>
            <div className="flex items-center space-x-2">
              {property.availability.instantBook ? (
                <>
                  <Icon name="Zap" size={16} className="text-secondary" />
                  <span className="text-secondary font-medium">Available</span>
                </>
              ) : (
                <span className="text-text-secondary">Request required</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;