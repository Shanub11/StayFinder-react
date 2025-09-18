import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import AuthenticationToggle from './AuthenticationToggle';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
    localStorage.setItem('isAuthenticated', authStatus.toString());
  };

  const Logo = () => (
    <Link to="/property-search-browse" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Icon name="Home" size={20} color="white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-heading font-semibold text-text-primary tracking-tight">
        StayFinder
      </span>
    </Link>
  );

  const navigationItems = [
    {
      label: 'Browse Properties',
      path: '/property-search-browse',
      icon: 'Search',
      requiresAuth: false,
      tooltip: 'Discover amazing places to stay'
    },
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      requiresAuth: true,
      tooltip: 'Manage your bookings and listings'
    }
  ];

  const visibleNavItems = navigationItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <SearchBar />
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-50'
                  }`}
                  title={item.tooltip}
                >
                  <Icon 
                    name={item.icon} 
                    size={16} 
                    className="transition-transform duration-200 group-hover:scale-110" 
                  />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Authentication/User Menu */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <UserMenu onAuthChange={handleAuthChange} />
              ) : (
                <AuthenticationToggle onAuthChange={handleAuthChange} />
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <SearchBar />
              </div>

              {/* Mobile Navigation Links */}
              {visibleNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-50'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Authentication */}
              <div className="px-3 py-2 border-t border-border mt-2 pt-4">
                {isAuthenticated ? (
                  <UserMenu onAuthChange={handleAuthChange} isMobile={true} />
                ) : (
                  <AuthenticationToggle onAuthChange={handleAuthChange} isMobile={true} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;