import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking_confirmed',
      title: 'Booking confirmed',
      description: 'Your reservation at Cozy Downtown Apartment has been confirmed by Michael Chen.',
      timestamp: '2 hours ago',
      icon: 'CheckCircle',
      iconColor: 'text-success',
      iconBg: 'bg-success-50',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=60&h=60&fit=crop',
      actionLabel: 'View Booking',
      actionPath: '/user-dashboard'
    },
    {
      id: 2,
      type: 'message_received',
      title: 'New message from Elena Rodriguez',
      description: 'Thanks for your interest in my Beachfront Villa! I have some additional information about the property.',
      timestamp: '5 hours ago',
      icon: 'MessageCircle',
      iconColor: 'text-primary',
      iconBg: 'bg-primary-50',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      actionLabel: 'Reply',
      actionPath: '/user-dashboard'
    },
    {
      id: 3,
      type: 'price_alert',
      title: 'Price drop alert',
      description: 'The price for Rustic Mountain Cabin in Aspen, CO has dropped from $220 to $180 per night.',
      timestamp: '1 day ago',
      icon: 'TrendingDown',
      iconColor: 'text-accent',
      iconBg: 'bg-accent-50',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=60&h=60&fit=crop',
      actionLabel: 'Book Now',
      actionPath: '/property-detail'
    },
    {
      id: 4,
      type: 'listing_booked',
      title: 'Your listing was booked',
      description: 'Great news! Your Modern Loft in Arts District has been booked for March 15-18.',
      timestamp: '2 days ago',
      icon: 'Calendar',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary-50',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=60&h=60&fit=crop',
      actionLabel: 'View Details',
      actionPath: '/user-dashboard'
    },
    {
      id: 5,
      type: 'review_received',
      title: 'New review received',
      description: 'Jessica Martinez left you a 5-star review: "Amazing host! The place was exactly as described and Sarah was very responsive."',
      timestamp: '3 days ago',
      icon: 'Star',
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-50',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      actionLabel: 'View Review',
      actionPath: '/user-dashboard'
    },
    {
      id: 6,
      type: 'payment_received',
      title: 'Payment received',
      description: 'You received $340 for your recent booking at Charming Garden Studio.',
      timestamp: '4 days ago',
      icon: 'DollarSign',
      iconColor: 'text-success',
      iconBg: 'bg-success-50',
      image: null,
      actionLabel: 'View Earnings',
      actionPath: '/user-dashboard'
    }
  ];

  const getActivityIcon = (activity) => {
    if (activity.image && (activity.type === 'message_received' || activity.type === 'review_received')) {
      return (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-200 flex-shrink-0">
          <Image
            src={activity.image}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (activity.image && activity.type !== 'payment_received') {
      return (
        <div className="relative">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-200 flex-shrink-0">
            <Image
              src={activity.image}
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${activity.iconBg} rounded-full flex items-center justify-center border-2 border-white`}>
            <Icon name={activity.icon} size={12} className={activity.iconColor} />
          </div>
        </div>
      );
    }

    return (
      <div className={`w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
        <Icon name={activity.icon} size={20} className={activity.iconColor} />
      </div>
    );
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Recent Activity
          </h3>
          <button className="text-primary hover:text-primary-600 text-sm font-medium transition-colors duration-200">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-surface-50 transition-colors duration-200">
            <div className="flex items-start space-x-4">
              {getActivityIcon(activity)}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-text-primary font-heading mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-text-secondary font-body leading-relaxed mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-text-tertiary font-caption">
                        {activity.timestamp}
                      </span>
                      {activity.actionLabel && (
                        <button className="text-xs text-primary hover:text-primary-600 font-medium transition-colors duration-200">
                          {activity.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <button className="p-1 text-text-tertiary hover:text-text-secondary transition-colors duration-200 ml-4">
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="p-6 border-t border-border text-center">
        <button className="text-primary hover:text-primary-600 text-sm font-medium transition-colors duration-200">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;