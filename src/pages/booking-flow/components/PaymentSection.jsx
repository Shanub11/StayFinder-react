import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PaymentSection = ({ paymentData, onUpdate, bookingData }) => {
  const [showBillingForm, setShowBillingForm] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      onUpdate({
        ...paymentData,
        [parent]: {
          ...paymentData[parent],
          [child]: value
        }
      });
    } else {
      onUpdate({
        ...paymentData,
        [field]: value
      });
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit or Debit Card', icon: 'CreditCard', popular: true },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet', popular: false },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone', popular: false },
    { id: 'google', name: 'Google Pay', icon: 'Smartphone', popular: false }
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
          Payment Information
        </h2>
        <p className="text-text-secondary font-body">
          Complete your secure payment to confirm your reservation.
        </p>
      </div>

      {/* Payment Methods */}
      <div className="bg-surface-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6 font-heading">
          Choose Payment Method
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`relative flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                paymentData.paymentMethod === method.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:bg-surface-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentData.paymentMethod === method.id}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                paymentData.paymentMethod === method.id
                  ? 'bg-primary text-white' :'bg-surface-100 text-text-secondary'
              }`}>
                <Icon name={method.icon} size={20} />
              </div>
              <div className="flex-1">
                <span className={`font-medium ${
                  paymentData.paymentMethod === method.id
                    ? 'text-primary' :'text-text-primary'
                }`}>
                  {method.name}
                </span>
                {method.popular && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium bg-success-100 text-success-700 rounded-full">
                    Popular
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Card Payment Form */}
      {paymentData.paymentMethod === 'card' && (
        <div className="bg-surface-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary font-heading">
              Card Information
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">Secure Payment</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                Card Number *
              </label>
              <input
                type="text"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-mono"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-mono"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                  CVV *
                </label>
                <input
                  type="text"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-mono"
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={paymentData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
                placeholder="Name as it appears on card"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Other Payment Methods */}
      {paymentData.paymentMethod !== 'card' && (
        <div className="bg-surface-50 rounded-lg p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={paymentMethods.find(m => m.id === paymentData.paymentMethod)?.icon} size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
              {paymentMethods.find(m => m.id === paymentData.paymentMethod)?.name}
            </h3>
            <p className="text-text-secondary font-body">
              You'll be redirected to complete your payment securely.
            </p>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="bg-surface-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Billing Address
          </h3>
          <button
            type="button"
            onClick={() => setShowBillingForm(!showBillingForm)}
            className="text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200"
          >
            {showBillingForm ? 'Hide' : 'Add'} Billing Address
          </button>
        </div>

        {showBillingForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                Street Address
              </label>
              <input
                type="text"
                value={paymentData.billingAddress.street}
                onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                  City
                </label>
                <input
                  type="text"
                  value={paymentData.billingAddress.city}
                  onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
                  placeholder="New York"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                  State/Province
                </label>
                <input
                  type="text"
                  value={paymentData.billingAddress.state}
                  onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  value={paymentData.billingAddress.zipCode}
                  onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
                  placeholder="10001"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2 font-body">
                  Country
                </label>
                <select
                  value={paymentData.billingAddress.country}
                  onChange={(e) => handleInputChange('billingAddress.country', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-colors duration-200 font-body"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terms and Policies */}
      <div className="bg-surface-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6 font-heading">
          Terms and Policies
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={paymentData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary-200"
              required
            />
            <div>
              <label htmlFor="terms" className="text-sm font-medium text-text-primary font-body">
                I agree to the Terms of Service and Privacy Policy *
              </label>
              <p className="text-xs text-text-secondary font-body">
                By checking this box, you agree to our terms and conditions
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="cancellation"
              checked={paymentData.agreeToCancellation}
              onChange={(e) => handleInputChange('agreeToCancellation', e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary-200"
              required
            />
            <div>
              <label htmlFor="cancellation" className="text-sm font-medium text-text-primary font-body">
                I understand the cancellation policy *
              </label>
              <p className="text-xs text-text-secondary font-body">
                Free cancellation until 48 hours before check-in
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-success-800 mb-2 font-heading">
              Secure Payment Processing
            </h4>
            <p className="text-sm text-success-700 font-body">
              Your payment information is encrypted and processed securely. We use industry-standard 
              SSL encryption and never store your complete card details on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;