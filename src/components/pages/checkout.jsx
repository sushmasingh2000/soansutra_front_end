
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShieldIcon from '@mui/icons-material/Shield';
import { Stepper, Step, StepLabel } from '@mui/material';

const CheckoutHeader = ({ currentStep = 0, steps = ['Address', 'Payment'], onBackClick }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (currentStep > 0) {
      // Go to previous step
      if (typeof onBackClick === 'function') {
        onBackClick(); // Calls parent handlePreviousStep to decrement currentStep
      } else {
        console.warn('onBackClick is not a function. Cannot switch steps.');
      }
    } else {
      // Go to previous page
      navigate(-1); // Back to previous page in history
      // Or specific route: navigate('/cart');
    }
  };

  return (
    <div className="w-full bg-gray-50 p-3 shadow-md">
      {/* Mobile Layout */}
      <div className="flex justify-between items-center md:hidden bg-gray-50">
        <div className="flex items-center">
          <ArrowBackIcon
            className="mr-2 text-[BLACK] cursor-pointer"
            onClick={handleBackClick}
          />
          <h2 className="text-[0.9rem] text-black">{steps[currentStep]}</h2>
        </div>
        <WhatsAppIcon className="text-[#ca8a04]" />
      </div>

      {/* Step Indicator (Mobile) - Centered */}
      <div className="mt-4 text-[0.8rem] md:hidden flex justify-center bg-gray-50">
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': { color: 'black' },
                  '& .MuiStepIcon-root.Mui-active': {
                    backgroundColor: 'white',
                    color: '#ca8a04', // Gold color for the icon inside the active circle
                    borderRadius: '50%',
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center bg-gray-50">
        <div className="flex items-center">
          <ArrowBackIcon
            className="mr-2 text-[Black] cursor-pointer"
            onClick={handleBackClick}
          />
          <h2 className="text-xl text-black">{steps[currentStep]}</h2>
        </div>
        <div className="flex-1 flex justify-center">
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': { color: 'black' },
                    '& .MuiStepIcon-root.Mui-active': {
                      backgroundColor: 'white',
                      color: '#ca8a04', // Gold color for the icon inside the active circle
                      borderRadius: '50%',
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="flex items-center text-[#ca8a04]">
          <ShieldIcon className="mr-1" />
          <span className="text-black">100% SECURE</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;