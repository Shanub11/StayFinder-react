import React from 'react';
import Icon from 'components/AppIcon';

const TravelerInfo = ({ travelerData, onUpdate }) => {
  const handleInputChange = (field, value) => {
    onUpdate({
      ...travelerData,
      [field]: value
    });
  };

  const arrivalTimes = [
    { value: 'flexible', label: 'Flexible' },
    { value: '15:00-18:00', label: '3:00 PM - 6:00 PM' },
    { value: '18:00-21:00', label: '6:00 PM - 9:00 PM' },
    { value: '21:00-00:00', label: '9:00 PM - 12:00 AM' },
    { value: 'after-00:00', label: 'After 12:00 AM' }
  ];

  const purposes = [
    { value: 'leisure', label: 'Leisure/Vacation', icon: 'Palmtree' },
    { value: 'business', label: 'Business Travel', icon: 'Briefcase' },
    { value: 'family', label: 'Family Visit', icon: 'Users' },
    { value: 'other', label: 'Other', icon: 'MoreHorizontal' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
          Traveler Information
        </h2>
        <p className="text-text-secondary font-body">
          Please provide your details for the reservation and communication with your host.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-surface-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6 font-heading">
          Personal Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 font-body">
              First Name *
            </label>
            <input
              type="text"
              value={travelerData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
              placeholder="Enter your first name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 font-body">
              Last Name *
            </label>
            <input
              type="text"
              value={travelerData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 font-body">
              Email Address *
            </label>
            <input
              type="email"
              value={travelerData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
              placeholder="your.email@example.com"
              required
            />
            <p className="text-xs text-text-secondary mt-1 font-body">
              We'll send your booking confirmation here
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 font-body">
              Phone Number *
            </label>
            <input
              type="tel"
              value={travelerData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
              placeholder="+1 (555) 123-4567"
              required
            />
            <p className="text-xs text-text-secondary mt-1 font-body">
              For urgent booking-related communication
            </p>
          </div>
        </div>
      </div>

      {/* Trip Purpose */}
      <div className="bg-surface-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Purpose of Trip
        </h3>
        <p className="text-sm text-text-secondary mb-6 font-body">
          Help your host prepare for your stay
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purposes.map((purpose) => (
            <label
              key={purpose.value}
              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                travelerData.purpose === purpose.value
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <input
                type="radio"
                name="purpose"
                value={purpose.value}
                checked={travelerData.purpose === purpose.value}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                travelerData.purpose === purpose.value
                  ? 'bg-primary text-white' :'bg-surface-100 text-text-secondary'
              }`}>
                <Icon name={purpose.icon} size={20} />
              </div>
              <span className={`font-medium ${
                travelerData.purpose === purpose.value
                  ? 'text-primary' :'text-text-primary'
              }`}>
                {purpose.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Arrival Information */}
      <div className="bg-surface-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Arrival Information
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2 font-body">
            Expected Arrival Time
          </label>
          <select
            value={travelerData.arrivalTime}
            onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
          >
            <option value="">Select arrival time</option>
            {arrivalTimes.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-text-secondary mt-1 font-body">
            This helps your host prepare for your arrival
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2 font-body">
            Special Requests or Notes
          </label>
          <textarea
            value={travelerData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body resize-none"
            placeholder="Any special requests, accessibility needs, or additional information for your host..."
          />
          <p className="text-xs text-text-secondary mt-1 font-body">
            Optional - Let your host know about any special requirements
          </p>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-surface-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Communication Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="email-updates"
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary-200"
              defaultChecked
            />
            <div>
              <label htmlFor="email-updates" className="text-sm font-medium text-text-primary font-body">
                Email updates about my trip
              </label>
              <p className="text-xs text-text-secondary font-body">
                Receive booking confirmations, check-in instructions, and important updates
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="sms-updates"
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary-200"
            />
            <div>
              <label htmlFor="sms-updates" className="text-sm font-medium text-text-primary font-body">
                SMS notifications for urgent updates
              </label>
              <p className="text-xs text-text-secondary font-body">
                Get text messages for time-sensitive information only
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="marketing-emails"
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary-200"
            />
            <div>
              <label htmlFor="marketing-emails" className="text-sm font-medium text-text-primary font-body">
                Travel tips and special offers
              </label>
              <p className="text-xs text-text-secondary font-body">
                Receive personalized recommendations and exclusive deals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-primary-800 mb-2 font-heading">
              Your Privacy is Protected
            </h4>
            <p className="text-sm text-primary-700 font-body">
              Your personal information is securely encrypted and will only be shared with your host 
              for booking-related communication. We never sell your data to third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerInfo;