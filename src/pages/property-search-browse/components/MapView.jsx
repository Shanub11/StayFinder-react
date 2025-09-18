import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const MapView = ({ properties, onPropertyClick }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Mock map center coordinates (San Francisco)
  const mapCenter = { lat: 37.7749, lng: -122.4194 };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handlePropertyClick = (property) => {
    onPropertyClick(property);
  };

  return (
    <div className="relative h-96 md:h-[600px] bg-surface-100 rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Property Locations Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=10&output=embed`}
        className="absolute inset-0"
      />

      {/* Property Pins Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {properties.map((property, index) => {
          // Calculate position based on property coordinates (mock positioning)
          const leftPercent = 20 + (index * 15) % 60;
          const topPercent = 20 + (index * 10) % 60;

          return (
            <div
              key={property.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button
                onClick={() => handlePropertySelect(property)}
                className={`relative bg-background border-2 rounded-lg px-3 py-2 shadow-card hover:shadow-modal transition-all duration-200 ${
                  selectedProperty?.id === property.id
                    ? 'border-primary scale-110 z-10' :'border-border hover:border-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-heading font-semibold text-text-primary">
                    ${property.price}
                  </span>
                </div>
                
                {/* Pin pointer */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background"></div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Property Details Card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-background rounded-lg shadow-modal border border-border overflow-hidden">
          <div className="relative">
            <div className="h-32 overflow-hidden">
              <Image
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-background bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Close property details"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="p-4">
            <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-2">
              {selectedProperty.title}
            </h3>
            
            <p className="text-text-secondary text-sm mb-2 flex items-center">
              <Icon name="MapPin" size={14} className="mr-1" />
              {selectedProperty.location}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm font-medium text-text-primary">
                  {selectedProperty.rating}
                </span>
                <span className="text-sm text-text-secondary">
                  ({selectedProperty.reviewCount})
                </span>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-heading font-semibold text-text-primary">
                  ${selectedProperty.price}
                  <span className="text-sm font-normal text-text-secondary"> /night</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
              <span className="flex items-center">
                <Icon name="Users" size={14} className="mr-1" />
                {selectedProperty.guests} guests
              </span>
              <span className="flex items-center">
                <Icon name="Bed" size={14} className="mr-1" />
                {selectedProperty.bedrooms} bed{selectedProperty.bedrooms !== 1 ? 's' : ''}
              </span>
            </div>

            <button
              onClick={() => handlePropertyClick(selectedProperty)}
              className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-background border border-border rounded-md flex items-center justify-center hover:bg-surface-50 transition-colors duration-200">
          <Icon name="Plus" size={16} />
        </button>
        <button className="w-10 h-10 bg-background border border-border rounded-md flex items-center justify-center hover:bg-surface-50 transition-colors duration-200">
          <Icon name="Minus" size={16} />
        </button>
      </div>

      {/* Results Counter */}
      <div className="absolute top-4 left-4 bg-background border border-border rounded-md px-3 py-2 shadow-card">
        <span className="text-sm font-medium text-text-primary">
          {properties.length} properties
        </span>
      </div>
    </div>
  );
};

export default MapView;