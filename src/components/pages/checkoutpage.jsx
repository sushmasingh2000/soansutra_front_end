// import React, { useState } from 'react';
// import CheckoutHeader from './checkout';
// import CheckoutForm from '../checkoutform';
// import Payment from '../payment'; // Import the Payment component
// import WarrantyFeatures from '../trustBadge';
// import CheckoutOrderSummary from '../checkoutordersummary';

// const CheckoutPage = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [activeStepName, setActiveStepName] = useState('Address');

//   const handleNextStep = () => {
//     setCurrentStep(1);
//     setActiveStepName('Payment');
//   };

//   const handlePreviousStep = () => {
//     setCurrentStep(0);
//     setActiveStepName('Address');
//   };

//   return (
//     <div>
//       <CheckoutHeader
//         currentStep={currentStep}
//         activeStepName={activeStepName}
//         onBackClick={handlePreviousStep}
//       />
//       <div className="w-full min-h-screen flex flex-col md:flex-row overflow-y-auto">
//         <CheckoutOrderSummary className="flex-shrink-0 order-1 md:order-2" />
//         {activeStepName === 'Address' ? (
//           <CheckoutForm className="flex-1 order-2 md:order-1" onSaveContinue={handleNextStep} />
//         ) : (
//           <Payment className="flex-1 order-2 md:order-1" />
//         )}
//       </div>
//       <div className="overflow-x-hidden">
//         <WarrantyFeatures />
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
import React, { useState } from 'react';
import CheckoutHeader from './checkout';
import CheckoutForm from '../checkoutform';
import Payment from '../payment'; // Import the Payment component
import WarrantyFeatures from '../trustBadge';
import CheckoutOrderSummary from '../checkoutordersummary';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeStepName, setActiveStepName] = useState('Address');

  const handleNextStep = () => {
    setCurrentStep(1);
    setActiveStepName('Payment');
  };

  const handlePreviousStep = () => {
    setCurrentStep(0);
    setActiveStepName('Address');
  };

  return (
    <div>
      <CheckoutHeader
        currentStep={currentStep}
        activeStepName={activeStepName}
        onBackClick={handlePreviousStep}
      />
      <div className="w-full min-h-screen flex flex-col md:flex-row overflow-y-auto">
        
      <div className="w-full min-h-screen flex flex-col md:flex-row overflow-y-auto">
        
        {/* Order Summary - Shows first on mobile (top), second on desktop (right side) */}
        <div className="md:w-[500px] md:flex-shrink-0 order-1 md:order-2">
          <CheckoutOrderSummary />
        </div>

        {/* Form/Payment - Shows second on mobile (bottom), first on desktop (left side) */}
        <div className="flex-1 order-2 md:order-1">
          {activeStepName === 'Address' ? (
            <CheckoutForm onSaveContinue={handleNextStep} />
          ) : (
            <Payment />
          )}
        </div>
        
      </div>
        
      </div>
      <div className="overflow-x-hidden">
        <WarrantyFeatures />
      </div>
    </div>
  );
};

export default CheckoutPage;