import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import NavigationBreadcrumb from 'components/ui/NavigationBreadcrumb';
import RecentActivity from './components/RecentActivity';
import BookingCard from './components/BookingCard';
import ListingCard from './components/ListingCard';
import QuickActions from './components/QuickActions';
import StatsCard from './components/StatsCard';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isHost: true,
    memberSince: "2022",
    totalBookings: 12,
    totalListings: 3,
    totalEarnings: 15420,
    upcomingTrips: 2,
    activeListings: 3,
    unreadMessages: 5,
    completedTrips: 10,
    hostRating: 4.8,
    guestRating: 4.9
  };

  // Mock upcoming bookings
  const upcomingBookings = [
    {
      id: 1,
      propertyName: "Cozy Downtown Apartment",
      propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      location: "New York, NY",
      checkIn: "2024-02-15",
      checkOut: "2024-02-18",
      guests: 2,
      totalPrice: 450,
      status: "confirmed",
      hostName: "Michael Chen",
      hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      daysUntil: 12
    },
    {
      id: 2,
      propertyName: "Beachfront Villa",
      propertyImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      location: "Miami, FL",
      checkIn: "2024-03-10",
      checkOut: "2024-03-15",
      guests: 4,
      totalPrice: 1200,
      status: "pending",
      hostName: "Elena Rodriguez",
      hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      daysUntil: 35
    }
  ];

  // Mock user listings
  const userListings = [
    {
      id: 1,
      title: "Modern Loft in Arts District",
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"],
      location: "Los Angeles, CA",
      pricePerNight: 120,
      rating: 4.9,
      reviewCount: 47,
      status: "active",
      bookings: 8,
      earnings: 3840,
      nextBooking: "2024-02-20"
    },
    {
      id: 2,
      title: "Charming Garden Studio",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"],
      location: "Portland, OR",
      pricePerNight: 85,
      rating: 4.7,
      reviewCount: 23,
      status: "active",
      bookings: 5,
      earnings: 2125,
      nextBooking: "2024-02-25"
    },
    {
      id: 3,
      title: "Luxury Penthouse Suite",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"],
      location: "San Francisco, CA",
      pricePerNight: 280,
      rating: 4.8,
      reviewCount: 31,
      status: "inactive",
      bookings: 12,
      earnings: 9455,
      nextBooking: null
    }
  ];

  // Mock saved properties
  const savedProperties = [
    {
      id: 1,
      title: "Rustic Mountain Cabin",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      location: "Aspen, CO",
      pricePerNight: 180,
      rating: 4.9,
      reviewCount: 89,
      priceAlert: true,
      originalPrice: 220
    },
    {
      id: 2,
      title: "Historic Brownstone",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      location: "Boston, MA",
      pricePerNight: 95,
      rating: 4.6,
      reviewCount: 34,
      priceAlert: false,
      originalPrice: 95
    }
  ];

  useEffect(() => {
    // Check authentication status
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/user-login');
      return;
    }
    setUser(mockUser);
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getDaysUntilTrip = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'trips', label: 'My Trips', icon: 'Calendar' },
    { id: 'listings', label: 'My Listings', icon: 'Home', hostOnly: true },
    { id: 'saved', label: 'Saved', icon: 'Heart' },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle', badge: user.unreadMessages }
  ];

  const visibleTabs = tabs.filter(tab => !tab.hostOnly || (tab.hostOnly && user.isHost));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationBreadcrumb />
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-200 ring-4 ring-white shadow-lg">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary font-heading">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-text-secondary font-body">
                  Member since {user.memberSince} • {user.isHost ? 'Host & Guest' : 'Guest'}
                </p>
                {user.isHost && (
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-text-primary">{user.hostRating}</span>
                      <span className="text-sm text-text-secondary">Host rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-text-primary">{user.guestRating}</span>
                      <span className="text-sm text-text-secondary">Guest rating</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <QuickActions user={user} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Trips"
            value={user.completedTrips}
            icon="MapPin"
            color="primary"
            subtitle="Completed"
          />
          <StatsCard
            title="Upcoming"
            value={user.upcomingTrips}
            icon="Calendar"
            color="secondary"
            subtitle="Trips planned"
          />
          {user.isHost && (
            <>
              <StatsCard
                title="Earnings"
                value={`$${user.totalEarnings.toLocaleString()}`}
                icon="DollarSign"
                color="accent"
                subtitle="Total earned"
              />
              <StatsCard
                title="Listings"
                value={user.activeListings}
                icon="Home"
                color="success"
                subtitle="Active properties"
              />
            </>
          )}
          {!user.isHost && (
            <>
              <StatsCard
                title="Saved"
                value={savedProperties.length}
                icon="Heart"
                color="accent"
                subtitle="Properties"
              />
              <StatsCard
                title="Messages"
                value={user.unreadMessages}
                icon="MessageCircle"
                color="warning"
                subtitle="Unread"
              />
            </>
          )}
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden mb-6">
          <div className="flex space-x-1 bg-surface rounded-lg p-1 overflow-x-auto">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 relative ${
                  activeTab === tab.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-surface-50'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-error text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-background border border-border rounded-lg p-6 sticky top-24">
              <nav className="space-y-2">
                {visibleTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-surface-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={tab.icon} size={18} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Upcoming Trips */}
                {upcomingBookings.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-text-primary font-heading">
                        Upcoming Trips
                      </h2>
                      <Link
                        to="/property-search-browse"
                        className="text-primary hover:text-primary-600 text-sm font-medium transition-colors duration-200"
                      >
                        Plan another trip
                      </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      {upcomingBookings.slice(0, 2).map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Host Listings */}
                {user.isHost && userListings.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-text-primary font-heading">
                        Your Listings
                      </h2>
                      <button className="text-primary hover:text-primary-600 text-sm font-medium transition-colors duration-200">
                        Manage all listings
                      </button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {userListings.slice(0, 3).map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div>
                  <h2 className="text-xl font-semibold text-text-primary font-heading mb-6">
                    Recent Activity
                  </h2>
                  <RecentActivity />
                </div>
              </div>
            )}

            {activeTab === 'trips' && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary font-heading mb-6">
                  My Trips
                </h2>
                <div className="space-y-6">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} detailed={true} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'listings' && user.isHost && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary font-heading">
                    My Listings
                  </h2>
                  <button className="btn-primary">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add New Listing
                  </button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} detailed={true} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary font-heading mb-6">
                  Saved Properties
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {savedProperties.map((property) => (
                    <div key={property.id} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-shadow duration-200">
                      <div className="relative">
                        <div className="aspect-w-16 aspect-h-10 bg-surface-200">
                          <Image
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                          <Icon name="Heart" size={16} className="text-primary fill-current" />
                        </button>
                        {property.priceAlert && (
                          <div className="absolute top-3 left-3 bg-success text-white px-2 py-1 rounded-md text-xs font-medium">
                            Price Drop!
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-text-primary mb-1 font-heading">
                          {property.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-2 font-body">
                          {property.location}
                        </p>
                        <div className="flex items-center space-x-2 mb-3">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-text-primary">
                            {property.rating}
                          </span>
                          <span className="text-sm text-text-secondary">
                            ({property.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {property.priceAlert && (
                              <span className="text-text-tertiary line-through text-sm">
                                ${property.originalPrice}
                              </span>
                            )}
                            <span className="text-text-primary font-semibold">
                              ${property.pricePerNight}
                            </span>
                            <span className="text-text-secondary text-sm"> / night</span>
                          </div>
                          <Link
                            to="/property-detail"
                            className="text-primary hover:text-primary-600 text-sm font-medium transition-colors duration-200"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary font-heading mb-6">
                  Messages
                </h2>
                <div className="bg-background border border-border rounded-lg p-8 text-center">
                  <Icon name="MessageCircle" size={48} className="text-text-tertiary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                    No messages yet
                  </h3>
                  <p className="text-text-secondary mb-6 font-body">
                    When you book a property or receive booking requests, your conversations will appear here.
                  </p>
                  <Link
                    to="/property-search-browse"
                    className="btn-primary"
                  >
                    Start Exploring
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;