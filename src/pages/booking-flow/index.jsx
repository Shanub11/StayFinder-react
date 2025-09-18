import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

import NavigationBreadcrumb from 'components/ui/NavigationBreadcrumb';
import BookingSteps from './components/BookingSteps';
import TripDetails from './components/TripDetails';
import TravelerInfo from './components/TravelerInfo';
import PaymentSection from './components/PaymentSection';
import TripSummary from './components/TripSummary';
import BookingConfirmation from './components/BookingConfirmation';

const BookingFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Mock booking data - would come from previous page state
  const [bookingData, setBookingData] = useState({
    property: {
      id: 1,
      title: "Luxury Beachfront Villa with Ocean Views",
      location: "Malibu, California",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      host: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        superhost: true
      },
      rating: 4.9,
      reviewCount: 127
    },
    dates: {
      checkIn: new Date('2024-07-15'),
      checkOut: new Date('2024-07-22'),
      nights: 7
    },
    guests: {
      adults: 2,
      children: 1,
      infants: 0,
      pets: 0
    },
    pricing: {
      basePrice: 450,
      cleaningFee: 75,
      serviceFee: 89,
      taxes: 67,
      total: 3831
    }
  });

  const [travelerData, setTravelerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    arrivalTime: '',
    purpose: 'leisure'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    paymentMethod: 'card',
    agreeToTerms: false,
    agreeToCancellation: false
  });

  const steps = [
    { id: 1, title: 'Trip Details', icon: 'Calendar' },
    { id: 2, title: 'Traveler Info', icon: 'User' },
    { id: 3, title: 'Payment', icon: 'CreditCard' }
  ];

  const customBreadcrumbs = [
    { label: 'Home', path: '/property-search-browse', icon: 'Home' },
    { label: 'Browse Properties', path: '/property-search-browse', icon: 'Search' },
    { label: 'Property Details', path: '/property-detail', icon: 'MapPin' },
    { label: 'Book Now', path: '/booking-flow', icon: 'Calendar' }
  ];

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/user-login', { 
        state: { from: location.pathname, message: 'Please sign in to complete your booking' }
      });
    }
  }, [navigate, location]);

  const handleStepChange = (step) => {
    if (step <= currentStep + 1) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setBookingComplete(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true; // Trip details are pre-filled
      case 2:
        return travelerData.firstName && travelerData.lastName && travelerData.email && travelerData.phone;
      case 3:
        return paymentData.cardNumber && paymentData.expiryDate && paymentData.cvv && 
               paymentData.cardholderName && paymentData.agreeToTerms && paymentData.agreeToCancellation;
      default:
        return false;
    }
  };

  if (bookingComplete) {
    return <BookingConfirmation bookingData={bookingData} />;
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationBreadcrumb customBreadcrumbs={customBreadcrumbs} />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">
            Complete Your Booking
          </h1>
          <p className="text-text-secondary font-body">
            Review your trip details and complete your secure reservation
          </p>
        </div>

        {/* Progress Steps */}
        <BookingSteps 
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepChange}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Form Content */}
          <div className="lg:col-span-8">
            <div className="bg-background rounded-lg shadow-card p-6">
              {currentStep === 1 && (
                <TripDetails 
                  bookingData={bookingData}
                  onUpdate={setBookingData}
                />
              )}
              
              {currentStep === 2 && (
                <TravelerInfo 
                  travelerData={travelerData}
                  onUpdate={setTravelerData}
                />
              )}
              
              {currentStep === 3 && (
                <PaymentSection 
                  paymentData={paymentData}
                  onUpdate={setPaymentData}
                  bookingData={bookingData}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                    currentStep === 1
                      ? 'text-text-tertiary cursor-not-allowed' :'text-text-secondary hover:text-primary hover:bg-surface-50'
                  }`}
                >
                  <Icon name="ArrowLeft" size={20} />
                  <span>Back</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-md font-medium transition-colors duration-200 ${
                      isStepValid()
                        ? 'bg-primary hover:bg-primary-600 text-white' :'bg-surface-200 text-text-tertiary cursor-not-allowed'
                    }`}
                  >
                    <span>Continue</span>
                    <Icon name="ArrowRight" size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleBookingSubmit}
                    disabled={!isStepValid() || isLoading}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-md font-medium transition-colors duration-200 ${
                      isStepValid() && !isLoading
                        ? 'bg-primary hover:bg-primary-600 text-white' :'bg-surface-200 text-text-tertiary cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Lock" size={20} />
                        <span>Confirm and Pay</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Trip Summary Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <TripSummary bookingData={bookingData} />
            </div>
          </div>
        </div>

        {/* Mobile Summary Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
          <button
            onClick={() => setShowMobileSummary(true)}
            className="w-full flex items-center justify-between bg-primary hover:bg-primary-600 text-white px-6 py-4 rounded-md font-medium transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Receipt" size={20} />
              <span>View Summary</span>
            </div>
            <span className="text-lg font-semibold">
              ${bookingData.pricing.total.toLocaleString()}
            </span>
          </button>
        </div>

        {/* Mobile Summary Modal */}
        {showMobileSummary && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-background w-full max-h-[80vh] overflow-y-auto rounded-t-lg">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary font-heading">
                  Trip Summary
                </h3>
                <button
                  onClick={() => setShowMobileSummary(false)}
                  className="p-2 hover:bg-surface-50 rounded-md transition-colors duration-200"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>
              <div className="p-4">
                <TripSummary bookingData={bookingData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;