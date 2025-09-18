import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SocialRegistration = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 text-text-primary border border-border',
      iconColor: 'text-red-500'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      iconColor: 'text-white'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-black hover:bg-gray-800 text-white',
      iconColor: 'text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    setLoadingProvider(provider);
    
    // Simulate social login process
    setTimeout(() => {
      setLoadingProvider(null);
      // In a real app, this would redirect to the social provider's OAuth flow
      console.log(`Registering with ${provider}`);
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-text-secondary mb-4 font-body">
        Quick signup with your social account
      </p>
      
      {socialProviders.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleSocialLogin(provider.name)}
          disabled={loadingProvider !== null}
          className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-md font-medium transition-all duration-200 ${provider.color} ${
            loadingProvider === provider.name ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loadingProvider === provider.name ? (
            <Icon name="Loader2" size={20} className="animate-spin" />
          ) : (
            <Icon name={provider.icon} size={20} className={provider.iconColor} />
          )}
          <span>
            {loadingProvider === provider.name 
              ? `Connecting to ${provider.name}...` 
              : `Continue with ${provider.name}`
            }
          </span>
        </button>
      ))}
    </div>
  );
};

export default SocialRegistration;