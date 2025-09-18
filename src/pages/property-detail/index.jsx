import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import NavigationBreadcrumb from 'components/ui/NavigationBreadcrumb';
import ImageGallery from './components/ImageGallery';
import PropertyInfo from './components/PropertyInfo';
import BookingWidget from './components/BookingWidget';
import ReviewsSection from './components/ReviewsSection';
import LocationSection from './components/LocationSection';
import SimilarProperties from './components/SimilarProperties';

const PropertyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock property data
  const property = {
    id: 1,
    title: "Luxury Beachfront Villa with Private Pool",
    location: "Malibu, California, United States",
    coordinates: { lat: 34.0259, lng: -118.7798 },
    price: 450,
    currency: "USD",
    rating: 4.8,
    reviewCount: 127,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop"
    ],
    host: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 89,
      responseTime: "within an hour",
      responseRate: 100,
      joinedDate: "2019",
      isVerified: true,
      isSuperhost: true
    },
    propertyType: "Entire villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    beds: 5,
    description: `Experience the ultimate luxury getaway in this stunning beachfront villa located in the heart of Malibu. This exceptional property offers breathtaking ocean views, direct beach access, and world-class amenities that will make your stay unforgettable.

The villa features four spacious bedrooms, each with its own unique charm and spectacular views. The master suite includes a private balcony overlooking the Pacific Ocean, a king-size bed, and an en-suite bathroom with a soaking tub. The open-concept living area seamlessly blends indoor and outdoor living, with floor-to-ceiling windows that showcase the stunning coastline.

The gourmet kitchen is fully equipped with high-end appliances, perfect for preparing meals with fresh local ingredients. The outdoor space is truly spectacular, featuring a private infinity pool, hot tub, outdoor dining area, and direct access to a pristine stretch of private beach.

Located just minutes from Malibu's finest restaurants, shopping, and attractions, this villa offers the perfect combination of privacy and convenience. Whether you're looking to relax on the beach, explore the local wine country, or enjoy the vibrant Los Angeles scene, this property serves as the ideal base for your California adventure.`,
    amenities: [
      { name: "Private pool", icon: "Waves" },
      { name: "Beach access", icon: "MapPin" },
      { name: "WiFi", icon: "Wifi" },
      { name: "Kitchen", icon: "ChefHat" },
      { name: "Parking", icon: "Car" },
      { name: "Air conditioning", icon: "Wind" },
      { name: "Hot tub", icon: "Bath" },
      { name: "Ocean view", icon: "Eye" },
      { name: "Washer & dryer", icon: "Shirt" },
      { name: "TV", icon: "Tv" },
      { name: "Fireplace", icon: "Flame" },
      { name: "Gym", icon: "Dumbbell" },
      { name: "BBQ grill", icon: "Flame" },
      { name: "Balcony", icon: "Home" },
      { name: "Garden", icon: "Trees" }
    ],
    houseRules: [
      "Check-in: 3:00 PM - 10:00 PM",
      "Check-out: 11:00 AM",
      "No smoking",
      "No pets allowed",
      "No parties or events",
      "Quiet hours: 10:00 PM - 8:00 AM"
    ],
    availability: {
      minStay: 3,
      maxStay: 30,
      instantBook: true
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const handleBookNow = (bookingData) => {
    navigate('/booking-flow', { 
      state: { 
        property: property,
        bookingData: bookingData
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <NavigationBreadcrumb />

        {/* Mobile Header Actions */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-surface hover:bg-surface-200 transition-colors duration-200"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-surface hover:bg-surface-200 transition-colors duration-200"
            >
              <Icon name="Share" size={20} />
            </button>
            <button
              onClick={handleFavoriteToggle}
              className="p-2 rounded-full bg-surface hover:bg-surface-200 transition-colors duration-200"
            >
              <Icon 
                name={isFavorite ? "Heart" : "Heart"} 
                size={20} 
                className={isFavorite ? "text-primary fill-current" : "text-text-secondary"}
              />
            </button>
          </div>
        </div>

        {/* Property Title - Mobile */}
        <div className="mb-4 lg:hidden">
          <h1 className="text-2xl font-bold text-text-primary mb-2 font-heading">
            {property.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span className="font-medium">{property.rating}</span>
              <span>({property.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={property.images} title={property.title} />

        {/* Desktop Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Property Title - Desktop */}
            <div className="hidden lg:block mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-warning fill-current" />
                      <span className="font-medium">{property.rating}</span>
                      <span>({property.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface-50 rounded-md transition-colors duration-200"
                  >
                    <Icon name="Share" size={16} />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleFavoriteToggle}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface-50 rounded-md transition-colors duration-200"
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={isFavorite ? "text-primary fill-current" : ""}
                    />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <PropertyInfo 
              property={property}
              showFullDescription={showFullDescription}
              setShowFullDescription={setShowFullDescription}
              showAllAmenities={showAllAmenities}
              setShowAllAmenities={setShowAllAmenities}
            />

            {/* Reviews Section */}
            <ReviewsSection 
              rating={property.rating}
              reviewCount={property.reviewCount}
            />

            {/* Location Section */}
            <LocationSection 
              location={property.location}
              coordinates={property.coordinates}
            />
          </div>

          {/* Booking Widget - Desktop Sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <BookingWidget 
                property={property}
                onBookNow={handleBookNow}
              />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarProperties currentPropertyId={property.id} />
      </div>

      {/* Mobile Booking Widget - Sticky Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xl font-bold text-text-primary">${property.price}</span>
              <span className="text-sm text-text-secondary">/ night</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-text-secondary">({property.reviewCount})</span>
            </div>
          </div>
          <button
            onClick={() => handleBookNow({})}
            className="bg-primary hover:bg-primary-600 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;