import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BookingCard = ({ booking, detailed = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-700';
      case 'pending':
        return 'bg-warning-100 text-warning-600';
      case 'cancelled':
        return 'bg-error-100 text-error-600';
      default:
        return 'bg-surface-100 text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getDaysUntil = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil(booking.checkIn);

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200 group">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-10 bg-surface-200">
          <Image
            src={booking.propertyImage}
            alt={booking.propertyName}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            <Icon name={getStatusIcon(booking.status)} size={12} className="mr-1" />
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Days Until */}
        {daysUntil > 0 && daysUntil <= 30 && (
          <div className="absolute top-3 right-3 bg-primary text-white px-2.5 py-1 rounded-full text-xs font-medium">
            {daysUntil} days
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary font-heading mb-1 truncate">
              {booking.propertyName}
            </h3>
            <div className="flex items-center space-x-1 text-text-secondary mb-2">
              <Icon name="MapPin" size={14} />
              <span className="text-sm font-body">{booking.location}</span>
            </div>
          </div>
          
          <div className="text-right ml-4">
            <div className="text-lg font-bold text-text-primary font-heading">
              ${booking.totalPrice}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              total
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center space-x-4 mb-4 p-3 bg-surface-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <div>
              <div className="text-xs text-text-secondary font-caption">Check-in</div>
              <div className="text-sm font-medium text-text-primary font-body">
                {formatDate(booking.checkIn)}
              </div>
            </div>
          </div>
          
          <div className="w-8 h-px bg-border"></div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-secondary" />
            <div>
              <div className="text-xs text-text-secondary font-caption">Check-out</div>
              <div className="text-sm font-medium text-text-primary font-body">
                {formatDate(booking.checkOut)}
              </div>
            </div>
          </div>
          
          <div className="ml-auto flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-text-tertiary" />
            <span className="text-sm text-text-secondary font-body">
              {booking.guests} guest{booking.guests > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-200">
            <Image
              src={booking.hostAvatar}
              alt={booking.hostName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary font-body">
              Hosted by {booking.hostName}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link
            to="/property-detail"
            className="flex-1 bg-primary hover:bg-primary-600 text-white text-center py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            View Details
          </Link>
          
          {detailed && (
            <>
              <button className="flex items-center justify-center px-4 py-2.5 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-md transition-colors duration-200">
                <Icon name="MessageCircle" size={16} />
              </button>
              
              <button className="flex items-center justify-center px-4 py-2.5 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-md transition-colors duration-200">
                <Icon name="MoreHorizontal" size={16} />
              </button>
            </>
          )}
        </div>

        {/* Trip Countdown */}
        {daysUntil > 0 && daysUntil <= 7 && (
          <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Your trip starts in {daysUntil} day{daysUntil > 1 ? 's' : ''}!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;