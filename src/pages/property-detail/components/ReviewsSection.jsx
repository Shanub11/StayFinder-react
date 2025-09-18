import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ReviewsSection = ({ rating, reviewCount }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "Emily Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        location: "San Francisco, CA"
      },
      rating: 5,
      date: "2024-01-15",
      comment: `This place exceeded all our expectations! The ocean views are absolutely breathtaking, and the house is even more beautiful in person. Sarah was an incredible host - super responsive and provided great local recommendations. The private beach access was a dream come true. We spent hours just relaxing by the pool and watching the sunset. The kitchen was fully equipped, which made cooking meals a pleasure. Can't wait to come back!`,
      photos: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop"
      ]
    },
    {
      id: 2,
      user: {
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        location: "Austin, TX"
      },
      rating: 5,
      date: "2024-01-08",
      comment: `Perfect getaway spot! The location is unbeatable - right on the beach with stunning views. The house is spacious, clean, and has everything you need. Sarah's communication was excellent throughout our stay. The hot tub was amazing after long beach walks. Highly recommend for couples or families looking for a luxury beach experience.`,
      photos: []
    },
    {
      id: 3,
      user: {
        name: "Jessica Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        location: "Denver, CO"
      },
      rating: 4,
      date: "2023-12-28",
      comment: `Beautiful property with amazing amenities. The infinity pool and ocean views are incredible. The house is well-maintained and decorated tastefully. Only minor issue was the WiFi was a bit slow, but honestly, it was nice to disconnect. Sarah provided excellent local restaurant recommendations. Would definitely stay again!`,
      photos: [
        "https://images.unsplash.com/photo-1520637736862-4d197d17c93a?w=200&h=150&fit=crop"
      ]
    },
    {
      id: 4,
      user: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        location: "Seattle, WA"
      },
      rating: 5,
      date: "2023-12-20",
      comment: `This was our dream vacation rental! Everything was perfect from check-in to check-out. The house is exactly as pictured, if not better. The private beach access is a huge plus, and the outdoor spaces are incredible for entertaining. Sarah thought of every detail. We'll be back for sure!`,
      photos: []
    },
    {
      id: 5,
      user: {
        name: "Amanda Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        location: "Portland, OR"
      },
      rating: 5,
      date: "2023-12-10",
      comment: `Absolutely stunning property! The photos don't do it justice. Waking up to ocean views every morning was magical. The house is impeccably clean and well-appointed. Sarah was incredibly helpful and responsive. The location is perfect - private but close to great restaurants and activities. 10/10 would recommend!`,
      photos: []
    }
  ];

  // Rating distribution for the chart
  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 7, percentage: 6 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="border-b border-border pb-8">
      <div className="flex items-center space-x-4 mb-6">
        <Icon name="Star" size={24} className="text-warning fill-current" />
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          {rating} · {reviewCount} reviews
        </h2>
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center space-x-3">
              <span className="text-sm text-text-secondary w-6">
                {item.stars}
              </span>
              <div className="flex-1 bg-surface-200 rounded-full h-2">
                <div 
                  className="bg-text-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-text-secondary w-8 text-right">
                {item.count}
              </span>
            </div>
          ))}
        </div>

        {/* Review Categories */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Cleanliness</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Communication</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Check-in</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Accuracy</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Location</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-sm font-medium">4.7</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Value</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-sm font-medium">4.6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-surface-200 pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <Image
                src={review.user.avatar}
                alt={review.user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary">{review.user.name}</h4>
                  <span className="text-sm text-text-tertiary">·</span>
                  <span className="text-sm text-text-secondary">{review.user.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < review.rating ? "text-warning fill-current" : "text-surface-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {formatDate(review.date)}
                  </span>
                </div>

                <p className="text-text-secondary leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Review Photos */}
                {review.photos.length > 0 && (
                  <div className="flex space-x-2">
                    {review.photos.map((photo, index) => (
                      <div key={index} className="w-20 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Reviews Button */}
      {reviews.length > 3 && (
        <div className="mt-6">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-2 border border-border text-text-primary hover:bg-surface-50 rounded-md font-medium transition-colors duration-200"
          >
            {showAllReviews ? 'Show fewer reviews' : `Show all ${reviewCount} reviews`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;