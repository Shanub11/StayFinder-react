import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import TermsAndPrivacy from './components/TermsAndPrivacy';

const UserRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleRegistrationSuccess = (email) => {
    setUserEmail(email);
    setShowEmailVerification(true);
  };

  const handleResendVerification = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 2000);
  };

  const handleVerificationComplete = () => {
    navigate('/user-login');
  };

  if (showEmailVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-success-100 rounded-full flex items-center justify-center">
                <Icon name="Mail" size={32} className="text-success-700" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2 font-heading">
                Check Your Email
              </h1>
              <p className="text-text-secondary font-body">
                We've sent a verification link to
              </p>
              <p className="text-primary font-medium font-body">
                {userEmail}
              </p>
            </div>

            {/* Verification Card */}
            <div className="bg-background border border-border rounded-lg shadow-card p-6 mb-6">
              <div className="text-center mb-6">
                <p className="text-text-secondary mb-4 font-body">
                  Click the link in your email to verify your account and complete registration.
                </p>
                <p className="text-sm text-text-tertiary font-body">
                  Didn't receive the email? Check your spam folder or request a new one.
                </p>
              </div>

              <button
                onClick={handleResendVerification}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-600 disabled:bg-surface-300 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Icon name="RefreshCw" size={20} />
                    <span>Resend Verification Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/user-login"
                className="inline-flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={16} />
                <span className="font-medium">Back to Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80"
          alt="Beautiful property background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/property-search-browse" className="inline-flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Icon name="Home" size={24} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-heading font-bold text-text-primary tracking-tight">
                StayFinder
              </span>
            </Link>
            
            <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">
              Join StayFinder
            </h1>
            <p className="text-text-secondary font-body">
              Create your account to start hosting or booking amazing stays
            </p>
          </div>

          {/* Social Registration */}
          <SocialRegistration />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-text-tertiary font-body">or</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Registration Form */}
          <RegistrationForm 
            onSuccess={handleRegistrationSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          {/* Terms and Privacy */}
          <TermsAndPrivacy />

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-text-secondary font-body">
              Already have an account?{' '}
              <Link
                to="/user-login"
                className="text-primary hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;