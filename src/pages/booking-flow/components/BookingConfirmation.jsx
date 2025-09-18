import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BookingConfirmation = ({ bookingData }) => {
  const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalGuests = () => {
    return bookingData.guests.adults + bookingData.guests.children;
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={40} color="white" strokeWidth={3} />
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-4 font-heading">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-text-secondary font-body">
            Your reservation has been successfully processed
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-success-50 text-success-700 px-4 py-2 rounded-full">
            <Icon name="Calendar" size={16} />
            <span className="text-sm font-medium">Booking ID: {bookingId}</span>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-background rounded-lg shadow-card p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Property Information */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
                Your Reservation
              </h2>
              
              <div className="flex items-start space-x-4 mb-6">
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
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-text-primary">
                      {bookingData.property.rating}
                    </span>
                    <span className="text-sm text-text-secondary">
                      ({bookingData.property.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={18} className="text-primary" />
                    <span className="font-medium text-text-primary">Check-in</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-primary">{formatDate(bookingData.dates.checkIn)}</p>
                    <p className="text-sm text-text-secondary">After 3:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={18} className="text-accent" />
                    <span className="font-medium text-text-primary">Check-out</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-primary">{formatDate(bookingData.dates.checkOut)}</p>
                    <p className="text-sm text-text-secondary">Before 11:00 AM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={18} className="text-secondary" />
                    <span className="font-medium text-text-primary">Guests</span>
                  </div>
                  <p className="font-medium text-text-primary">
                    {getTotalGuests()} {getTotalGuests() === 1 ? 'guest' : 'guests'}
                    {bookingData.guests.infants > 0 && `, ${bookingData.guests.infants} infant${bookingData.guests.infants > 1 ? 's' : ''}`}
                  </p>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={18} className="text-text-secondary" />
                    <span className="font-medium text-text-primary">Duration</span>
                  </div>
                  <p className="font-medium text-text-primary">
                    {bookingData.dates.nights} {bookingData.dates.nights === 1 ? 'night' : 'nights'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
                Payment Summary
              </h2>
              
              <div className="bg-surface-50 rounded-lg p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary font-body">
                      ${bookingData.pricing.basePrice} × {bookingData.dates.nights} nights
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      ${(bookingData.pricing.basePrice * bookingData.dates.nights).toLocaleString()}
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

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-text-primary font-heading">
                      Total Paid
                    </span>
                    <span className="text-xl font-bold text-success">
                      ${bookingData.pricing.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6 flex items-center space-x-3 text-text-secondary">
                <Icon name="CreditCard" size={16} />
                <span className="text-sm font-body">Paid with Credit Card ending in ****1234</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-background rounded-lg shadow-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
            What's Next?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                Check Your Email
              </h3>
              <p className="text-sm text-text-secondary font-body">
                We've sent your booking confirmation and receipt to your email address.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" size={24} className="text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                Host Contact
              </h3>
              <p className="text-sm text-text-secondary font-body">
                Your host will contact you with check-in instructions 24 hours before arrival.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                Prepare for Trip
              </h3>
              <p className="text-sm text-text-secondary font-body">
                Review house rules and local recommendations in your booking details.
              </p>
            </div>
          </div>
        </div>

        {/* Host Information */}
        <div className="bg-background rounded-lg shadow-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
            Your Host
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={bookingData.property.host.avatar}
                alt={bookingData.property.host.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-text-primary font-heading">
                  {bookingData.property.host.name}
                </h3>
                {bookingData.property.host.superhost && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 rounded-full">
                    <Icon name="Award" size={12} className="mr-1" />
                    Superhost
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary font-body">
                Typically responds within an hour
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors duration-200">
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm font-medium">Message Host</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/user-dashboard"
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors duration-200 font-medium"
          >
            <Icon name="LayoutDashboard" size={20} />
            <span>View in Dashboard</span>
          </Link>
          
          <Link
            to="/property-search-browse"
            className="flex items-center justify-center space-x-2 px-8 py-4 border border-border text-text-secondary hover:text-primary hover:bg-surface-50 rounded-md transition-colors duration-200 font-medium"
          >
            <Icon name="Search" size={20} />
            <span>Book Another Stay</span>
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-text-secondary font-body mb-4">
            Need help with your booking?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-200">
              <Icon name="HelpCircle" size={16} />
              <span className="text-sm font-medium">Contact Support</span>
            </button>
            <button className="flex items-center justify-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-200">
              <Icon name="Phone" size={16} />
              <span className="text-sm font-medium">Call Us: 1-800-STAYFINDER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;