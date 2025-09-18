import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = ({ user }) => {
  const actions = [
    {
      label: 'Search Properties',
      icon: 'Search',
      path: '/property-search-browse',
      color: 'bg-primary hover:bg-primary-600',
      description: 'Find your next stay'
    },
    {
      label: 'List Your Space',
      icon: 'Plus',
      path: '/user-dashboard',
      color: 'bg-secondary hover:bg-secondary-700',
      description: 'Start earning as a host',
      hostAction: true
    },
    {
      label: 'Manage Bookings',
      icon: 'Calendar',
      path: '/user-dashboard',
      color: 'bg-accent hover:bg-accent-700',
      description: 'View your trips'
    }
  ];

  const visibleActions = actions.filter(action => 
    !action.hostAction || (action.hostAction && user.isHost)
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {visibleActions.map((action, index) => (
        <Link
          key={index}
          to={action.path}
          className={`${action.color} text-white px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 group hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          <Icon 
            name={action.icon} 
            size={16} 
            className="transition-transform duration-200 group-hover:scale-110" 
          />
          <span>{action.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;