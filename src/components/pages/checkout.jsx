import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShieldIcon from '@mui/icons-material/Shield';



const StepIndicator = ({ currentStep }) => {
  const steps = ["Address", "Payment"];

  return (
    <div className="flex justify-center md:justify-between w-full md:w-auto md:mx-auto space-x-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center ${currentStep >= index ? 'text-purple-600 ' : 'text-gray-400'
            }`}
        >
          {(index === 0 || currentStep >= index) && (
            <div
              className={`h-0.5 ${currentStep >= index ? 'bg-purple-600' : 'bg-gray-300'}`}
              style={{ width: '60px' }} // Adjust width as needed for design
            ></div>
          )}
          <div
            className={`w-4 h-4 rounded-full ${currentStep >= index ? 'bg-purple-600' : 'bg-gray-300'
              }`}
          ></div>
          <span className="ml-2">{step}</span>
        </div>
      ))}
    </div>
  );
};

const CheckoutHeader = ({ currentStep = 0, activeStepName = "Address" }) => {
  return (
    <>
      <div className="w-full bg-purple-50 p-3 shadow-md">
        {/* Mobile Layout */}
        <div className="flex justify-between items-center md:hidden">
          <div className="flex items-center">
            <ArrowBackIcon className=" mr-2 text-purple-600" />
            <h2 className="text-[0.9rem] ">{activeStepName}</h2>
          </div>
          <WhatsAppIcon className="text-purple-600" />
        </div>

        {/* Step Indicator (Mobile) - Centered */}
        <div className="mt-4 text-[0.8rem] md:hidden flex justify-center">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBackIcon className="mr-2 text-purple-600" />
            <h2 className="text-xl ">{activeStepName}</h2>
          </div>
          <div className="flex-1 flex justify-center">
            <StepIndicator currentStep={currentStep} />
          </div>
          <div className="flex items-center text-purple-600">
            <ShieldIcon className="mr-1" />
            <span>100% SECURE</span>
          </div>
        </div>
      </div>

      

    </>

  );
};

export default CheckoutHeader;
