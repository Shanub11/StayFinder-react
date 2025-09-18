import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-primary-50 rounded-full flex items-center justify-center">
            <Icon name="Home" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4 font-heading">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4 font-heading">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8 font-body">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/property-search-browse"
            className="inline-flex items-center justify-center space-x-2 w-full bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200"
          >
            <Icon name="Home" size={20} />
            <span>Back to Home</span>
          </Link>
          
          <Link
            to="/property-search-browse"
            className="inline-flex items-center justify-center space-x-2 w-full border border-border text-text-secondary hover:text-primary hover:bg-surface-50 font-medium px-6 py-3 rounded-md transition-colors duration-200"
          >
            <Icon name="Search" size={20} />
            <span>Browse Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;