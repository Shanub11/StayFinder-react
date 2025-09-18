import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Default breadcrumb mapping based on routes
  const routeBreadcrumbs = {
    '/property-search-browse': [
      { label: 'Home', path: '/property-search-browse', icon: 'Home' },
      { label: 'Browse Properties', path: '/property-search-browse', icon: 'Search' }
    ],
    '/property-detail': [
      { label: 'Home', path: '/property-search-browse', icon: 'Home' },
      { label: 'Browse Properties', path: '/property-search-browse', icon: 'Search' },
      { label: 'Property Details', path: '/property-detail', icon: 'MapPin' }
    ],
    '/booking-flow': [
      { label: 'Home', path: '/property-search-browse', icon: 'Home' },
      { label: 'Browse Properties', path: '/property-search-browse', icon: 'Search' },
      { label: 'Property Details', path: '/property-detail', icon: 'MapPin' },
      { label: 'Book Now', path: '/booking-flow', icon: 'Calendar' }
    ],
    '/user-dashboard': [
      { label: 'Home', path: '/property-search-browse', icon: 'Home' },
      { label: 'Dashboard', path: '/user-dashboard', icon: 'LayoutDashboard' }
    ],
    '/user-registration': [
      { label: 'Home', path: '/property-search-browse', icon: 'Home' },
      { label: 'Sign Up', path: '/user-registration', icon: 'UserPlus' }
    ],
    '/user-login': [
      { label: 'Home', path: '/property-search-browse', icon: 'Home' },
      { label: 'Sign In', path: '/user-login', icon: 'LogIn' }
    ]
  };

  // Use custom breadcrumbs if provided, otherwise use route-based breadcrumbs
  const breadcrumbs = customBreadcrumbs || routeBreadcrumbs[location.pathname];

  // Don't render breadcrumbs on home page or if no breadcrumbs defined
  if (!breadcrumbs || location.pathname === '/property-search-browse') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isActive = location.pathname === crumb.path;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-text-tertiary mx-2" 
                />
              )}
              
              {isLast || isActive ? (
                <span className="flex items-center space-x-1.5 text-text-primary font-medium">
                  {crumb.icon && (
                    <Icon 
                      name={crumb.icon} 
                      size={14} 
                      className="text-primary" 
                    />
                  )}
                  <span>{crumb.label}</span>
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="flex items-center space-x-1.5 text-text-secondary hover:text-primary transition-colors duration-200 group"
                >
                  {crumb.icon && (
                    <Icon 
                      name={crumb.icon} 
                      size={14} 
                      className="transition-transform duration-200 group-hover:scale-110" 
                    />
                  )}
                  <span className="hover:underline">{crumb.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumb;