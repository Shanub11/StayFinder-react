import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TermsAndPrivacy = () => {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleAgreementChange = (type) => {
    setAgreements(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="bg-surface-50 border border-border rounded-lg p-4 mt-6">
      <h4 className="text-sm font-semibold text-text-primary mb-3 font-heading">
        Terms & Agreements
      </h4>
      
      <div className="space-y-3">
        {/* Terms of Service */}
        <label className="flex items-start space-x-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={() => handleAgreementChange('terms')}
              className="sr-only"
              required
            />
            <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
              agreements.terms 
                ? 'bg-primary border-primary' :'border-border group-hover:border-primary'
            }`}>
              {agreements.terms && (
                <Icon name="Check" size={12} color="white" strokeWidth={3} />
              )}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary font-body">
              I agree to the{' '}
              <a 
                href="#" 
                className="text-primary hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a 
                href="#" 
                className="text-primary hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                Community Guidelines
              </a>
              <span className="text-error-500 ml-1">*</span>
            </p>
          </div>
        </label>

        {/* Privacy Policy */}
        <label className="flex items-start space-x-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => handleAgreementChange('privacy')}
              className="sr-only"
              required
            />
            <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
              agreements.privacy 
                ? 'bg-primary border-primary' :'border-border group-hover:border-primary'
            }`}>
              {agreements.privacy && (
                <Icon name="Check" size={12} color="white" strokeWidth={3} />
              )}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary font-body">
              I acknowledge that I have read and understood the{' '}
              <a 
                href="#" 
                className="text-primary hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>
              <span className="text-error-500 ml-1">*</span>
            </p>
          </div>
        </label>

        {/* Marketing Communications */}
        <label className="flex items-start space-x-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={agreements.marketing}
              onChange={() => handleAgreementChange('marketing')}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
              agreements.marketing 
                ? 'bg-primary border-primary' :'border-border group-hover:border-primary'
            }`}>
              {agreements.marketing && (
                <Icon name="Check" size={12} color="white" strokeWidth={3} />
              )}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary font-body">
              I would like to receive promotional emails, special offers, and updates about new features
              <span className="text-text-tertiary block text-xs mt-1">
                (Optional - you can unsubscribe at any time)
              </span>
            </p>
          </div>
        </label>
      </div>

      {/* Required Fields Notice */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-text-tertiary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-text-tertiary font-body">
            Fields marked with <span className="text-error-500">*</span> are required to create your account. 
            By creating an account, you confirm that you are at least 18 years old.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;