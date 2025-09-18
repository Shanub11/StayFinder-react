import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RegistrationForm = ({ onSuccess, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profilePhoto: null,
    bio: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, profilePhoto: 'File size must be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
        setFormData(prev => ({ ...prev, profilePhoto: file }));
        setErrors(prev => ({ ...prev, profilePhoto: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(formData.email);
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-error-500';
    if (passwordStrength <= 3) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="bg-background border border-border rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Personal Information
        </h3>

        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2 font-body">
            Full Name *
          </label>
          <div className="relative">
            <Icon name="User" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-body ${
                errors.fullName 
                  ? 'border-error-500 focus:ring-error-200' :'border-border focus:ring-primary-200 focus:border-primary'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-error-600 font-body">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2 font-body">
            Email Address *
          </label>
          <div className="relative">
            <Icon name="Mail" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-body ${
                errors.email 
                  ? 'border-error-500 focus:ring-error-200' :'border-border focus:ring-primary-200 focus:border-primary'
              }`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error-600 font-body">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2 font-body">
            Phone Number *
          </label>
          <div className="relative">
            <Icon name="Phone" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-body ${
                errors.phone 
                  ? 'border-error-500 focus:ring-error-200' :'border-border focus:ring-primary-200 focus:border-primary'
              }`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-error-600 font-body">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Account Security Section */}
      <div className="bg-background border border-border rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Account Security
        </h3>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2 font-body">
            Password *
          </label>
          <div className="relative">
            <Icon name="Lock" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-body ${
                errors.password 
                  ? 'border-error-500 focus:ring-error-200' :'border-border focus:ring-primary-200 focus:border-primary'
              }`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-surface-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-medium font-body ${
                  passwordStrength <= 1 ? 'text-error-600' :
                  passwordStrength <= 3 ? 'text-warning-600' : 'text-success-600'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-sm text-error-600 font-body">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2 font-body">
            Confirm Password *
          </label>
          <div className="relative">
            <Icon name="Lock" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-body ${
                errors.confirmPassword 
                  ? 'border-error-500 focus:ring-error-200' :'border-border focus:ring-primary-200 focus:border-primary'
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error-600 font-body">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Optional Profile Details Section */}
      <div className="bg-background border border-border rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Profile Details <span className="text-sm font-normal text-text-tertiary">(Optional)</span>
        </h3>

        {/* Profile Photo Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2 font-body">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-200 flex items-center justify-center">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={24} className="text-text-tertiary" />
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label
                htmlFor="profilePhoto"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:text-primary hover:border-primary cursor-pointer transition-colors duration-200"
              >
                <Icon name="Upload" size={16} />
                <span>Upload Photo</span>
              </label>
              <p className="text-xs text-text-tertiary mt-1 font-body">
                Max file size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
            </div>
          </div>
          {errors.profilePhoto && (
            <p className="mt-1 text-sm text-error-600 font-body">{errors.profilePhoto}</p>
          )}
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-text-primary mb-2 font-body">
            Brief Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body resize-none"
            placeholder="Tell us a bit about yourself..."
            maxLength={200}
          />
          <p className="text-xs text-text-tertiary mt-1 font-body">
            {formData.bio.length}/200 characters
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-600 disabled:bg-surface-300 text-white font-medium px-6 py-4 rounded-md transition-colors duration-200 text-lg"
      >
        {isLoading ? (
          <>
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <Icon name="UserPlus" size={20} />
            <span>Create Account</span>
          </>
        )}
      </button>
    </form>
  );
};

export default RegistrationForm;