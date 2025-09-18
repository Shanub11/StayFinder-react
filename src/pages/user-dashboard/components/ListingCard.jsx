import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ListingCard = ({ listing, detailed = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'inactive':
        return 'bg-error-100 text-error-600';
      case 'pending':
        return 'bg-warning-100 text-warning-600';
      default:
        return 'bg-surface-100 text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle';
      case 'inactive':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No upcoming bookings';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200 group">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-10 bg-surface-200">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
            <Icon name={getStatusIcon(listing.status)} size={12} className="mr-1" />
            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
            <Icon name="Edit" size={14} className="text-text-secondary hover:text-primary" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
            <Icon name="MoreHorizontal" size={14} className="text-text-secondary hover:text-primary" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary font-heading mb-1 truncate">
              {listing.title}
            </h3>
            <div className="flex items-center space-x-1 text-text-secondary mb-2">
              <Icon name="MapPin" size={14} />
              <span className="text-sm font-body">{listing.location}</span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-text-primary">
                  {listing.rating}
                </span>
              </div>
              <span className="text-sm text-text-secondary">
                ({listing.reviewCount} reviews)
              </span>
            </div>
          </div>
          
          <div className="text-right ml-4">
            <div className="text-lg font-bold text-text-primary font-heading">
              ${listing.pricePerNight}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              per night
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-surface-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary font-heading">
              {listing.bookings}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Bookings
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success font-heading">
              ${listing.earnings.toLocaleString()}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Earned
            </div>
          </div>
        </div>

        {/* Next Booking */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={14} className="text-primary" />
            <span className="text-sm font-medium text-text-primary font-body">
              Next Booking
            </span>
          </div>
          <div className="text-sm text-text-secondary font-body">
            {formatDate(listing.nextBooking)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link
            to="/property-detail"
            className="flex-1 bg-primary hover:bg-primary-600 text-white text-center py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            View Listing
          </Link>
          
          {detailed && (
            <>
              <button className="flex items-center justify-center px-4 py-2.5 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-md transition-colors duration-200">
                <Icon name="BarChart3" size={16} />
              </button>
              
              <button className="flex items-center justify-center px-4 py-2.5 border border-border text-text-secondary hover:text-primary hover:border-primary rounded-md transition-colors duration-200">
                <Icon name="Settings" size={16} />
              </button>
            </>
          )}
        </div>

        {/* Performance Indicator */}
        {listing.status === 'active' && (
          <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  Performing well
                </span>
              </div>
              <button className="text-xs text-success hover:text-success-700 font-medium transition-colors duration-200">
                View Analytics
              </button>
            </div>
          </div>
        )}

        {listing.status === 'inactive' && (
          <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning-600" />
                <span className="text-sm font-medium text-warning-600">
                  Listing inactive
                </span>
              </div>
              <button className="text-xs text-warning-600 hover:text-warning-700 font-medium transition-colors duration-200">
                Reactivate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;