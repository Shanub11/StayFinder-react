import React from 'react';
import Icon from 'components/AppIcon';

const BookingSteps = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="bg-background rounded-lg shadow-card p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex items-center">
              <button
                onClick={() => onStepClick(step.id)}
                disabled={step.id > currentStep + 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${
                  step.id < currentStep
                    ? 'bg-success text-white'
                    : step.id === currentStep
                    ? 'bg-primary text-white'
                    : step.id === currentStep + 1
                    ? 'bg-surface-100 text-text-secondary hover:bg-surface-200 cursor-pointer' :'bg-surface-100 text-text-tertiary cursor-not-allowed'
                }`}
              >
                {step.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </button>
            </div>

            {/* Step Label */}
            <div className="ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${
                step.id <= currentStep ? 'text-text-primary' : 'text-text-tertiary'
              }`}>
                {step.title}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-0.5 ${
                  step.id < currentStep ? 'bg-success' : 'bg-surface-200'
                }`}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Step Labels */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-text-primary">
          Step {currentStep}: {steps.find(s => s.id === currentStep)?.title}
        </p>
      </div>
    </div>
  );
};

export default BookingSteps;