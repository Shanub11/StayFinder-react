import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TripDetails = ({ bookingData, onUpdate }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleGuestChange = (type, increment) => {
    const newGuests = {
      ...bookingData.guests,
      [type]: Math.max(0, bookingData.guests[type] + increment)
    };
    
    onUpdate({
      ...bookingData,
      guests: newGuests
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
          Review Your Trip Details
        </h2>
        <p className="text-text-secondary font-body">
          Confirm your dates, guests, and property details before proceeding.
        </p>
      </div>

      {/* Property Summary */}
      <div className="bg-surface-50 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={bookingData.property.image}
              alt={bookingData.property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
              {bookingData.property.title}
            </h3>
            <div className="flex items-center space-x-2 text-text-secondary mb-2">
              <Icon name="MapPin" size={16} />
              <span className="text-sm font-body">{bookingData.property.location}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="text-sm font-medium text-text-primary">
                  {bookingData.property.rating}
                </span>
                <span className="text-sm text-text-secondary">
                  ({bookingData.property.reviewCount} reviews)
                </span>
              </div>
              {bookingData.property.host.superhost && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 rounded-full">
                  <Icon name="Award" size={12} className="mr-1" />
                  Superhost
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dates Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary font-heading">Check-in</h4>
              <p className="text-text-secondary text-sm font-body">After 3:00 PM</p>
            </div>
          </div>
          <p className="text-lg font-medium text-text-primary">
            {formatDate(bookingData.dates.checkIn)}
          </p>
        </div>

        <div className="bg-surface-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-accent" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary font-heading">Check-out</h4>
              <p className="text-text-secondary text-sm font-body">Before 11:00 AM</p>
            </div>
          </div>
          <p className="text-lg font-medium text-text-primary">
            {formatDate(bookingData.dates.checkOut)}
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="bg-surface-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-secondary" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary font-heading">Duration</h4>
              <p className="text-text-secondary text-sm font-body">Total stay length</p>
            </div>
          </div>
          <p className="text-xl font-bold text-text-primary">
            {bookingData.dates.nights} {bookingData.dates.nights === 1 ? 'night' : 'nights'}
          </p>
        </div>
      </div>

      {/* Guests Section */}
      <div className="bg-surface-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-text-primary font-heading">Guests</h4>
            <p className="text-text-secondary text-sm font-body">Adjust guest count if needed</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Adults */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-text-primary">Adults</p>
              <p className="text-sm text-text-secondary">Ages 13 or above</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleGuestChange('adults', -1)}
                disabled={bookingData.guests.adults <= 1}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                  bookingData.guests.adults <= 1
                    ? 'border-surface-200 text-text-tertiary cursor-not-allowed' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-8 text-center font-medium text-text-primary">
                {bookingData.guests.adults}
              </span>
              <button
                onClick={() => handleGuestChange('adults', 1)}
                className="w-8 h-8 rounded-full border border-border text-text-secondary hover:border-primary hover:text-primary flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-text-primary">Children</p>
              <p className="text-sm text-text-secondary">Ages 2-12</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleGuestChange('children', -1)}
                disabled={bookingData.guests.children <= 0}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                  bookingData.guests.children <= 0
                    ? 'border-surface-200 text-text-tertiary cursor-not-allowed' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-8 text-center font-medium text-text-primary">
                {bookingData.guests.children}
              </span>
              <button
                onClick={() => handleGuestChange('children', 1)}
                className="w-8 h-8 rounded-full border border-border text-text-secondary hover:border-primary hover:text-primary flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-text-primary">Infants</p>
              <p className="text-sm text-text-secondary">Under 2</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleGuestChange('infants', -1)}
                disabled={bookingData.guests.infants <= 0}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                  bookingData.guests.infants <= 0
                    ? 'border-surface-200 text-text-tertiary cursor-not-allowed' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-8 text-center font-medium text-text-primary">
                {bookingData.guests.infants}
              </span>
              <button
                onClick={() => handleGuestChange('infants', 1)}
                className="w-8 h-8 rounded-full border border-border text-text-secondary hover:border-primary hover:text-primary flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-warning-800 mb-2 font-heading">
              Important Information
            </h4>
            <ul className="text-sm text-warning-700 space-y-1 font-body">
              <li>• Check-in is available from 3:00 PM onwards</li>
              <li>• Check-out must be completed by 11:00 AM</li>
              <li>• Maximum occupancy is strictly enforced</li>
              <li>• Please review house rules before arrival</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;