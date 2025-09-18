import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';


const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        // Redirect to intended destination or dashboard
        const from = location.state?.from?.pathname || '/user-dashboard';
        navigate(from, { replace: true });
      } else {
        // Failed login
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      navigate('/user-dashboard', { replace: true });
    }, 1000);
  };

  const handleForgotPassword = () => {
    // In a real app, this would trigger password reset flow
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80"
            alt="Beautiful property interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/60 to-background/80"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon name="Home" size={32} color="white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-text-primary font-heading mb-2">
                Welcome Back
              </h1>
              <p className="text-text-secondary font-body">
                Sign in to your StayFinder account
              </p>
            </div>

            {/* Login Form Card */}
            <div className="bg-background rounded-xl shadow-modal p-8 border border-border">
              {/* Social Login Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-border rounded-md hover:bg-surface-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Icon name="Chrome" size={20} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
                  <span className="text-sm font-medium text-text-primary">Continue with Google</span>
                </button>

                <button
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-border rounded-md hover:bg-surface-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Icon name="Facebook" size={20} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
                  <span className="text-sm font-medium text-text-primary">Continue with Facebook</span>
                </button>

                <button
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-border rounded-md hover:bg-surface-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Icon name="Apple" size={20} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
                  <span className="text-sm font-medium text-text-primary">Continue with Apple</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-text-secondary font-body">or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Error */}
                {errors.general && (
                  <div className="bg-error-50 border border-error-200 rounded-md p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-error-600" />
                      <p className="text-sm text-error-600 font-medium">{errors.general}</p>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2 font-body">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Mail" size={18} className="text-text-tertiary" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-body ${
                        errors.email
                          ? 'border-error-300 focus:ring-error-200 focus:border-error-500' :'border-border focus:ring-primary-200 focus:border-primary'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-error-600 font-body">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2 font-body">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Lock" size={18} className="text-text-tertiary" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-body ${
                        errors.password
                          ? 'border-error-300 focus:ring-error-200 focus:border-error-500' :'border-border focus:ring-primary-200 focus:border-primary'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Icon 
                        name={showPassword ? "EyeOff" : "Eye"} 
                        size={18} 
                        className="text-text-tertiary hover:text-text-secondary transition-colors duration-200" 
                      />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-error-600 font-body">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary-200 border-border rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-text-secondary font-body">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={18} className="animate-spin mr-2" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" size={18} className="mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-surface-50 rounded-md border border-border">
                <p className="text-xs text-text-secondary font-body mb-2">Demo Credentials:</p>
                <div className="text-xs text-text-primary font-mono space-y-1">
                  <p>Email: {mockCredentials.email}</p>
                  <p>Password: {mockCredentials.password}</p>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-text-secondary font-body">
                New to StayFinder?{' '}
                <Link
                  to="/user-registration"
                  className="font-medium text-primary hover:text-primary-600 transition-colors duration-200"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;