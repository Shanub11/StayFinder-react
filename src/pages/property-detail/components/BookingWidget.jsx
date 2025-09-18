import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BookingWidget = ({ property, onBookNow }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  // Calculate nights and total price
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const nights = calculateNights();
  const basePrice = nights * property.price;
  const serviceFee = Math.round(basePrice * 0.14);
  const cleaningFee = 75;
  const taxes = Math.round((basePrice + serviceFee + cleaningFee) * 0.08);
  const totalPrice = basePrice + serviceFee + cleaningFee + taxes;

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const bookingData = {
      checkIn,
      checkOut,
      guests,
      nights,
      pricing: {
        basePrice,
        serviceFee,
        cleaningFee,
        taxes,
        totalPrice
      }
    };

    onBookNow(bookingData);
  };

  // Get today's date for min date restriction
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-background border border-border rounded-lg p-6 shadow-card">
      {/* Price Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-text-primary">${property.price}</span>
          <span className="text-text-secondary">night</span>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <Icon name="Star" size={14} className="text-warning fill-current" />
          <span className="font-medium">{property.rating}</span>
          <span className="text-text-secondary">({property.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || today}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Guest Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-text-primary mb-1">
            Guests
          </label>
          <button
            onClick={() => setShowGuestSelector(!showGuestSelector)}
            className="w-full px-3 py-2 border border-border rounded-md text-left focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary text-sm flex items-center justify-between"
          >
            <span>{guests} guest{guests !== 1 ? 's' : ''}</span>
            <Icon name={showGuestSelector ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>

          {showGuestSelector && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-modal z-10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Guests</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors duration-200"
                  >
                    <Icon name="Minus" size={14} />
                  </button>
                  <span className="w-8 text-center font-medium">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(property.guests, guests + 1))}
                    disabled={guests >= property.guests}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors duration-200"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-text-tertiary mt-2">
                Maximum {property.guests} guests
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reserve Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 rounded-md transition-colors duration-200 mb-4"
      >
        {property.availability.instantBook ? 'Reserve' : 'Request to book'}
      </button>

      {/* Instant Book Notice */}
      {property.availability.instantBook && (
        <p className="text-center text-sm text-text-secondary mb-4">
          You won't be charged yet
        </p>
      )}

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              ${property.price} × {nights} night{nights !== 1 ? 's' : ''}
            </span>
            <span className="text-text-primary">${basePrice}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Service fee</span>
            <span className="text-text-primary">${serviceFee}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Cleaning fee</span>
            <span className="text-text-primary">${cleaningFee}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Taxes</span>
            <span className="text-text-primary">${taxes}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border font-medium">
            <span className="text-text-primary">Total</span>
            <span className="text-text-primary">${totalPrice}</span>
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-6 space-y-2 text-xs text-text-tertiary">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} />
          <span>Your payment information is secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={14} />
          <span>Free cancellation for 48 hours</span>
        </div>
        {property.availability.instantBook && (
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={14} />
            <span>Instant booking available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWidget;