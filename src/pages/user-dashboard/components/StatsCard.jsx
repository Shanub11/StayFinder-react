import React from 'react';
import Icon from 'components/AppIcon';

const StatsCard = ({ title, value, icon, color, subtitle }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary',
          value: 'text-primary'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary-50',
          icon: 'text-secondary',
          value: 'text-secondary'
        };
      case 'accent':
        return {
          bg: 'bg-accent-50',
          icon: 'text-accent',
          value: 'text-accent'
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          icon: 'text-success',
          value: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          icon: 'text-warning-600',
          value: 'text-warning-600'
        };
      default:
        return {
          bg: 'bg-surface-50',
          icon: 'text-text-secondary',
          value: 'text-text-primary'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-card transition-all duration-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
          <Icon name={icon} size={24} className={colorClasses.icon} />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className={`text-2xl font-bold ${colorClasses.value} font-heading`}>
          {value}
        </div>
        <div className="text-sm font-medium text-text-primary font-body">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-text-secondary font-caption">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;