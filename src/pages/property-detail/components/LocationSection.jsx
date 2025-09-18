import React from 'react';
import Icon from 'components/AppIcon';

const LocationSection = ({ location, coordinates }) => {
  // Mock nearby attractions and amenities
  const nearbyPlaces = [
    {
      name: "Malibu Pier",
      distance: "0.8 miles",
      type: "Attraction",
      icon: "MapPin",
      description: "Historic pier with restaurants and fishing"
    },
    {
      name: "Surfrider Beach",
      distance: "1.2 miles",
      type: "Beach",
      icon: "Waves",
      description: "World-famous surfing spot"
    },
    {
      name: "Malibu Country Mart",
      distance: "2.1 miles",
      type: "Shopping",
      icon: "ShoppingBag",
      description: "Upscale shopping and dining"
    },
    {
      name: "Point Dume State Beach",
      distance: "3.5 miles",
      type: "Beach",
      icon: "Mountain",
      description: "Scenic beach with hiking trails"
    },
    {
      name: "Whole Foods Market",
      distance: "1.8 miles",
      type: "Grocery",
      icon: "ShoppingCart",
      description: "Organic grocery store"
    },
    {
      name: "Malibu Lagoon State Beach",
      distance: "2.8 miles",
      type: "Beach",
      icon: "Trees",
      description: "Protected wetland and beach area"
    }
  ];

  const neighborhoodHighlights = [
    {
      title: "Beach Access",
      description: "Direct access to pristine private beach",
      icon: "Waves"
    },
    {
      title: "Scenic Drives",
      description: "Pacific Coast Highway with stunning ocean views",
      icon: "Car"
    },
    {
      title: "Fine Dining",
      description: "World-class restaurants within walking distance",
      icon: "Utensils"
    },
    {
      title: "Outdoor Activities",
      description: "Hiking, surfing, and water sports nearby",
      icon: "Activity"
    }
  ];

  return (
    <div className="border-b border-border pb-8">
      <h2 className="text-xl font-semibold text-text-primary mb-6 font-heading">
        Where you'll be
      </h2>

      {/* Location Info */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <span className="text-lg font-medium text-text-primary">{location}</span>
        </div>
        <p className="text-text-secondary leading-relaxed">
          Located in the heart of Malibu, this stunning beachfront property offers the perfect blend of luxury and natural beauty. 
          You'll be just steps away from pristine beaches, world-class dining, and iconic California attractions while enjoying 
          complete privacy and tranquility.
        </p>
      </div>

      {/* Interactive Map */}
      <div className="mb-8">
        <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Property Location"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=14&output=embed`}
            className="w-full h-full"
          />
        </div>
        <p className="text-xs text-text-tertiary mt-2">
          Exact location will be provided after booking confirmation
        </p>
      </div>

      {/* Neighborhood Highlights */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-text-primary mb-4 font-heading">
          Neighborhood highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {neighborhoodHighlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-surface-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={highlight.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">{highlight.title}</h4>
                <p className="text-sm text-text-secondary">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Places */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4 font-heading">
          What's nearby
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nearbyPlaces.map((place, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-surface-50 rounded-lg transition-colors duration-200">
              <div className="w-8 h-8 bg-surface-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={place.icon} size={16} className="text-text-secondary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-text-primary">{place.name}</h4>
                  <span className="text-sm text-text-secondary">{place.distance}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-surface-200 text-text-secondary px-2 py-1 rounded-full">
                    {place.type}
                  </span>
                  <span className="text-xs text-text-tertiary">{place.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transportation */}
      <div className="mt-8 p-4 bg-surface-50 rounded-lg">
        <h4 className="font-medium text-text-primary mb-2 flex items-center space-x-2">
          <Icon name="Car" size={16} />
          <span>Getting around</span>
        </h4>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center justify-between">
            <span>LAX Airport</span>
            <span>45 minutes by car</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Santa Monica</span>
            <span>25 minutes by car</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Beverly Hills</span>
            <span>35 minutes by car</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Downtown LA</span>
            <span>50 minutes by car</span>
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-3">
          <Icon name="Info" size={12} className="inline mr-1" />
          Car recommended for exploring the area
        </p>
      </div>
    </div>
  );
};

export default LocationSection;