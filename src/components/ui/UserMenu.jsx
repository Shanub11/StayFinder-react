import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserMenu = ({ onAuthChange, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/images/avatar-placeholder.jpg',
    isHost: true,
    unreadNotifications: 3
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMobile]);

  const handleLogout = () => {
    onAuthChange(false);
    setIsOpen(false);
    navigate('/property-search-browse');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      description: 'Manage bookings & listings'
    },
    {
      label: 'My Bookings',
      path: '/user-dashboard',
      icon: 'Calendar',
      description: 'View your reservations',
      badge: '2'
    },
    {
      label: 'My Listings',
      path: '/user-dashboard',
      icon: 'Home',
      description: 'Manage your properties',
      hostOnly: true
    },
    {
      label: 'Messages',
      path: '/user-dashboard',
      icon: 'MessageCircle',
      description: 'Chat with hosts & guests',
      badge: user.unreadNotifications > 0 ? user.unreadNotifications.toString() : null
    },
    {
      label: 'Account Settings',
      path: '/user-dashboard',
      icon: 'Settings',
      description: 'Profile & preferences'
    },
    {
      label: 'Help Center',
      path: '/user-dashboard',
      icon: 'HelpCircle',
      description: 'Get support'
    }
  ];

  const visibleMenuItems = menuItems.filter(item => 
    !item.hostOnly || (item.hostOnly && user.isHost)
  );

  if (isMobile) {
    return (
      <div className="space-y-2">
        {/* User Info */}
        <div className="flex items-center space-x-3 px-3 py-3 bg-surface-50 rounded-md">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-200 flex-shrink-0">
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate font-heading">
              {user.name}
            </p>
            <p className="text-xs text-text-secondary truncate font-caption">
              {user.email}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        {visibleMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center justify-between px-3 py-3 text-text-secondary hover:text-primary hover:bg-surface-50 rounded-md transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={item.icon} 
                size={20} 
                className="transition-transform duration-200 group-hover:scale-110" 
              />
              <div>
                <span className="text-sm font-medium">{item.label}</span>
                <p className="text-xs text-text-tertiary">{item.description}</p>
              </div>
            </div>
            {item.badge && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-3 py-3 text-left text-error hover:bg-error-50 rounded-md transition-colors duration-200 group"
        >
          <Icon 
            name="LogOut" 
            size={20} 
            className="transition-transform duration-200 group-hover:scale-110" 
          />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-surface-50 transition-colors duration-200 group"
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-200 ring-2 ring-transparent group-hover:ring-primary-200 transition-all duration-200">
          <Image
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary group-hover:text-primary transition-all duration-200" 
        />
        {user.unreadNotifications > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium">
            {user.unreadNotifications}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-md shadow-modal z-dropdown animate-scale-in">
          {/* User Info Header */}
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-200">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-text-primary truncate font-heading">
                  {user.name}
                </p>
                <p className="text-sm text-text-secondary truncate font-caption">
                  {user.email}
                </p>
                {user.isHost && (
                  <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-medium bg-secondary-100 text-secondary-700 rounded-full">
                    <Icon name="Star" size={12} className="mr-1" />
                    Host
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {visibleMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-text-secondary hover:text-primary hover:bg-surface-50 transition-colors duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    className="transition-transform duration-200 group-hover:scale-110" 
                  />
                  <div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <p className="text-xs text-text-tertiary">{item.description}</p>
                  </div>
                </div>
                {item.badge && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-error hover:bg-error-50 transition-colors duration-200 group"
            >
              <Icon 
                name="LogOut" 
                size={18} 
                className="transition-transform duration-200 group-hover:scale-110" 
              />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;