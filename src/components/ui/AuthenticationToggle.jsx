import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationToggle = ({ onAuthChange, isMobile = false }) => {
  const location = useLocation();

  const handleLogin = () => {
    // Simulate login process
    setTimeout(() => {
      onAuthChange(true);
    }, 100);
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        <Link
          to="/user-login"
          onClick={handleLogin}
          className="flex items-center space-x-3 w-full px-3 py-3 text-left text-base font-medium text-text-secondary hover:text-primary hover:bg-surface-50 rounded-md transition-colors duration-200"
        >
          <Icon name="LogIn" size={20} />
          <span>Sign In</span>
        </Link>
        <Link
          to="/user-registration"
          className="flex items-center space-x-3 w-full px-3 py-3 text-left text-base font-medium bg-primary text-white hover:bg-primary-600 rounded-md transition-colors duration-200"
        >
          <Icon name="UserPlus" size={20} />
          <span>Sign Up</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Link
        to="/user-login"
        onClick={handleLogin}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 group ${
          location.pathname === '/user-login' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-50'
        }`}
      >
        <Icon 
          name="LogIn" 
          size={16} 
          className="transition-transform duration-200 group-hover:scale-110" 
        />
        <span>Sign In</span>
      </Link>
      
      <Link
        to="/user-registration"
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 group ${
          location.pathname === '/user-registration' ?'bg-primary-600 text-white' :'bg-primary text-white hover:bg-primary-600'
        }`}
      >
        <Icon 
          name="UserPlus" 
          size={16} 
          className="transition-transform duration-200 group-hover:scale-110" 
        />
        <span>Sign Up</span>
      </Link>
    </div>
  );
};

export default AuthenticationToggle;