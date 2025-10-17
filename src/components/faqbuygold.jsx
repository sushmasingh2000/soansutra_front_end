// import React, { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';

// const FAQBuyGold = () => {
//   const [openItems, setOpenItems] = useState({});

//   const toggleItem = (index) => {
//     setOpenItems(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   const faqData = [
//     {
//       question: "How do I buy SonaSutra Digital Gold?",
//       answer: "Just go to SonaSutra.com/Digigold/buy and enter the grams/amount that you want to buy.First-time buyers will have to register by providing the email, mobile number, address, and PAN details.For an existing customer, just logging in is enough.After confirming the value of the gold you want to buy, pay the amount and the gold will get credited to your SonaSutra Digital Gold balance.The prices are linked to the live gold rate. Therefore, the gold price is subject to change every five minutes."
//     },
//     {
//       question: "What is the minimum and maximum gold amount I can purchase through SonaSutra Digital Gold?",
//       answer: "Min is Rs. 10. Max is Rs. 50000."
//     },
//      {
//       question:"Where is the Gold stored post buying?",
//       answer:"The gold purchased on your behalf is stored with BVC, one of the safe keepers of precious metals.The gold is insured, both for storage and transit when being delivered to you.Further, the external Administrator has a charge on all gold stored in the vault in your favour.This ensures that your gold is protected at all times regardless of any external events."
//     },
//     {
//       question:"What is the purity of gold bought under SonaSutra Digital Gold?",
//       answer:"SonaSutra Digital Gold offers 24-karat gold of 999 fineness (99.99% pure) or higher.SonaSutra sources “good delivery” bars from trusted sources for the digital gold offered to you."
//     },
//     {
//       question:"Does the price include GST?",
//       answer:"Yes, our buy price is inclusive of 3% GST, the break-up of which can be seen on your invoice."
//     },
//     {
//       question:"Why are the SonaSutra Digital Gold rates different from SonaSutra Jewellery gold rates?",
//       answer:"SonaSutra Digital Gold is in bullion form and is safely stored in a central vault.There is no movement for this gold. But for jewellery, the gold has to travel between multiple entities to get the product manufactured.The logistics costs incurred by the jewellery gold are substantially different from the gold stored in the central vault. Hence, the jewellery gold rate will always be higher than the digital gold."
//     },
//     {
//       question:"Where can I find the invoice of my past purchases?",
//       answer:"An invoice will be emailed to you as an attachment after each successful transaction. It is also available on the platform, by clicking on the invoice button."
//     },
//     {
//       question:"What are the KYC requirements of SonaSutra Digital Gold?",
//       answer:"Your name, email, mobile, address, pin code, and PAN details are mandatory."
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="mb-8 flex items-center gap-4">
//         <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#231535' }}>
//           Buying Gold
//         </h1>
//         <span className="text-sm font-medium bg-white px-1  mt-3 rounded-full text-yellow-500" >
//           FAQs
//         </span>
//       </div>

//       <div className="space-y-0  Ferrara200 rounded-lg overflow-hidden">
//         {faqData.map((item, index) => (
//           <div key={index} className="border-b border-yellow-200 last:border-b-0">
//             <button
//               onClick={() => toggleItem(index)}
//               className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="text-sm sm:text-base font-medium pr-4 leading-relaxed" style={{ color: '#231535' }}>
//                   {item.question}
//                 </span>
//                 <div className="flex-shrink-0 ml-2">
//                   {openItems[index] ? (
//                     <Minus className="w-5 h-5 text-yellow-600" />
//                   ) : (
//                     <Plus className="w-5 h-5 text-yellow-600" />
//                   )}
//                 </div>
//               </div>
//             </button>
            
//             {openItems[index] && (
//               <div className="px-4 sm:px-6 pb-4 sm:pb-5">
//                 <div className="text-sm sm:text-base leading-relaxed" style={{ color: '#231535' }}>
//                   {item.answer}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQBuyGold;

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQBuyGold = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "How do I buy SonaSutra Digital Gold?",
      answer: "Just go to sonaSutra.com/Digigold/buy and enter the grams/amount that you want to buy.\nFirst-time buyers will have to register by providing the email, mobile number, address, and PAN details.\nFor an existing customer, just logging in is enough.\nAfter confirming the value of the gold you want to buy, pay the amount and the gold will get credited to your SonaSutra Digital Gold balance.\nThe prices are linked to the live gold rate. Therefore, the gold price is subject to change every five minutes."
    },
    {
      question: "What is the minimum and maximum gold amount I can purchase through SonaSutra Digital Gold?",
      answer: "Min is Rs. 10. Max is Rs. 50000."
    },
    {
      question: "Where is the Gold stored post buying?",
      answer: "The gold purchased on your behalf is stored with BVC, one of the safe keepers of precious metals.\nThe gold is insured, both for storage and transit when being delivered to you.\nFurther, the external Administrator has a charge on all gold stored in the vault in your favour.\nThis ensures that your gold is protected at all times regardless of any external events."
    },
    {
      question: "What is the purity of gold bought under SonaSutra Digital Gold?",
      answer: "SonaSutra Digital Gold offers 24-karat gold of 999 fineness (99.99% pure) or higher.\nSonaSutra sources “good delivery” bars from trusted sources for the digital gold offered to you."
    },
    {
      question: "Does the price include GST?",
      answer: "Yes, our buy price is inclusive of 3% GST, the break-up of which can be seen on your invoice."
    },
    {
      question: "Why are the SonaSutra Digital Gold rates different from SonaSutra Jewellery gold rates?",
      answer: "SonaSutra Digital Gold is in bullion form and is safely stored in a central vault.\nThere is no movement for this gold. But for jewellery, the gold has to travel between multiple entities to get the product manufactured.\nThe logistics costs incurred by the jewellery gold are substantially different from the gold stored in the central vault. Hence, the jewellery gold rate will always be higher than the digital gold."
    },
    {
      question: "Where can I find the invoice of my past purchases?",
      answer: "An invoice will be emailed to you as an attachment after each successful transaction.\nIt is also available on the platform, by clicking on the invoice button."
    },
    {
      question: "What are the KYC requirements of SonaSutra Digital Gold?",
      answer: "Your name, email, mobile, address, pin code, and PAN details are mandatory."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#231535' }}>
          Buying Gold
        </h1>
        <span className="text-sm font-medium bg-white px-1  mt-3 rounded-full text-yellow-500" >
          FAQs
        </span>
      </div>

      <div className="space-y-0  Ferrara200 rounded-lg overflow-hidden">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-yellow-200 last:border-b-0">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base font-medium pr-4 leading-relaxed" style={{ color: '#231535' }}>
                  {item.question}
                </span>
                <div className="flex-shrink-0 ml-2">
                  {openItems[index] ? (
                    <Minus className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
              </div>
            </button>
            
            {openItems[index] && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                <div className="text-sm sm:text-base leading-relaxed whitespace-pre-line" style={{ color: '#231535' }}>
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQBuyGold;