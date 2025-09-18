import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TripSummary = ({ bookingData }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateRange = () => {
    const checkIn = formatDate(bookingData.dates.checkIn);
    const checkOut = formatDate(bookingData.dates.checkOut);
    return `${checkIn} - ${checkOut}`;
  };

  const getTotalGuests = () => {
    return bookingData.guests.adults + bookingData.guests.children;
  };

  const calculateSubtotal = () => {
    return bookingData.pricing.basePrice * bookingData.dates.nights;
  };

  return (
    <div className="bg-background rounded-lg shadow-card p-6 sticky top-24">
      {/* Property Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={bookingData.property.image}
            alt={bookingData.property.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-primary mb-1 font-heading line-clamp-2">
            {bookingData.property.title}
          </h3>
          <div className="flex items-center space-x-1 mb-2">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm font-medium text-text-primary">
              {bookingData.property.rating}
            </span>
            <span className="text-sm text-text-secondary">
              ({bookingData.property.reviewCount})
            </span>
          </div>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="MapPin" size={14} />
            <span className="text-sm font-body truncate">{bookingData.property.location}</span>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Dates</span>
          </div>
          <span className="text-sm text-text-secondary font-body">
            {formatDateRange()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Guests</span>
          </div>
          <span className="text-sm text-text-secondary font-body">
            {getTotalGuests()} {getTotalGuests() === 1 ? 'guest' : 'guests'}
            {bookingData.guests.infants > 0 && `, ${bookingData.guests.infants} infant${bookingData.guests.infants > 1 ? 's' : ''}`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Duration</span>
          </div>
          <span className="text-sm text-text-secondary font-body">
            {bookingData.dates.nights} {bookingData.dates.nights === 1 ? 'night' : 'nights'}
          </span>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-4 mb-6">
        <h4 className="text-lg font-semibold text-text-primary font-heading">
          Price Details
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">
              ${bookingData.pricing.basePrice} × {bookingData.dates.nights} nights
            </span>
            <span className="text-sm font-medium text-text-primary">
              ${calculateSubtotal().toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">Cleaning fee</span>
            <span className="text-sm font-medium text-text-primary">
              ${bookingData.pricing.cleaningFee}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">Service fee</span>
            <span className="text-sm font-medium text-text-primary">
              ${bookingData.pricing.serviceFee}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-body">Taxes</span>
            <span className="text-sm font-medium text-text-primary">
              ${bookingData.pricing.taxes}
            </span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-text-primary font-heading">
            Total (USD)
          </span>
          <span className="text-xl font-bold text-text-primary">
            ${bookingData.pricing.total.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1 font-body">
          Includes all fees and taxes
        </p>
      </div>

      {/* Host Information */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={bookingData.property.host.avatar}
              alt={bookingData.property.host.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary font-body">
              Hosted by {bookingData.property.host.name}
            </p>
            {bookingData.property.host.superhost && (
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="Award" size={12} className="text-secondary" />
                <span className="text-xs text-secondary font-medium">Superhost</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start space-x-2">
          <Icon name="RotateCcw" size={16} className="text-text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary mb-1 font-body">
              Free cancellation
            </p>
            <p className="text-xs text-text-secondary font-body">
              Cancel before 48 hours of check-in for a full refund
            </p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="HelpCircle" size={16} />
          <span className="text-sm font-body">Need help?</span>
          <button className="text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200">
            Contact support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;