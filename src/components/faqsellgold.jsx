
// import React, { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';

// export default function FAQSellGold() {
//   const [openItems, setOpenItems] = useState({});

//   const toggleItem = (id) => {
//     setOpenItems(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const faqSections = [
//     {
//       title: "Selling the Gold",
//       hasLinks: true,
//       items: [
//         { 
//           id: 'sell-gold', 
//           question: "How do I sell my gold?", 
//           answer: "You can sell gold by clicking on the sell option on the top after logging in to your account.SonaSutra Digital Gold provides a live sell price.You can choose to sell any amount of eGold starting with a minimum of ₹100 to upto ₹50,000 per transaction.You can choose the bank account (previously saved) or enter a new bank account to get the money.The money will be credited to your bank account.For security reasons, newly added bank accounts will be verified by doing a penny drop bank verification—i.e., a small amount will be credited to your bank account for verification purposes." 
//         },
//         { 
//           id: 'lock-period', 
//           question: "Is there any lock-in period to sell gold?", 
//           answer: "Same-day selling is restricted, so you can sell the gold 72 hours after its purchase." 
//         },
//         { 
//           id: 'money-transfer', 
//           question: "How long will it take to get the money in my bank account?", 
//           answer: "The money will be transferred instantly within the next two hours. However, it can take a maximum of 72 hours in case of delays." 
//         },
//         { 
//           id: 'price-difference', 
//           question: "Why is the buy and sell price different on the same day?", 
//           answer: "The buy and sell price difference due to a 3% GST and costs such as bank charges, payment costs, technology costs, and hedging costs that SonaSutra Digital Gold undertakes." 
//         }
//       ]
//     },
//     {
//       title: "eGold for Senior Citizens",
//       hasLinks: true,
//       items: [
//         { 
//           id: 'digital-gold', 
//           question: "What can you do with your SonaSutra Digital Gold?", 
//           answer: "1.Invest in 24K gold hassle-free with SonaSutra eGold.Convenient, 24x7 access and 100% safe.2.Celebrate your beautiful bond:Redeem your gold investment to buy beautiful jewellery for special occasions, such as your daughter's wedding or even grandkid’s milestone birthdays.3.Gift yourself:6.Sell anytime to achieve your personal goals such as travelling abroad or paying for any medical emergencies." 
//         },
//         { 
//           id: 'buy-egold', 
//           question: "How can you buy eGold?", 
//           answer: "Buy digital gold in 3 easy steps:Step 1: Login and register with SonaSutra to complete your account setup with eKYC.Step 2: Enter the Amount in rupees or gold in grams to buy.Step 3: Make payment through UPI or even use PhonePe, Ausper and Khyaal as other applications to buy SonaSutra Digital Gold." 
//         },
//         { 
//           id: 'convert-jewellery', 
//           question: "How to convert digital gold balance into jewellery?", 
//           answer: "1.Shortlist your favourite designs on SonaSutra website / app or book Live Video Call or Try-At-Home appointment2.Visit the SonaSutra store /app /website to redeem your digital gold balance3.In addition to SonaSutra Digital Gold bought from SonaSutra, PhonePe, Ausper or Khyaal, you can also use your balance from digital gold service providers like Safegold and Augmont to buy beautiful SonaSutra jewellery." 
//         }
//       ]
//     }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
//       {faqSections.map((section, sectionIndex) => (
//         <div key={sectionIndex} className="mb-12">
//           {/* Section Header */}
//           <div className="flex items-center gap-3 mb-8">
//             <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
//               {section.title}
//             </h2>
//             {section.hasLinks && (
//               <span className="text-yellow-500 text-sm font-medium cursor-pointer hover:text-yellow-700 transition-colors">
//                 FAQs
//               </span>
//             )}
//           </div>

//           {/* FAQ Items */}
//           <div className="space-y-0">
//             {section.items.map((item, index) => (
//               <div key={item.id} className="border-b border-yellow-200 last:border-b-0">
//                 <button
//                   onClick={() => toggleItem(item.id)}
//                   className="w-full flex items-center justify-between py-6 px-0 text-left hover:bg-gray-50 transition-colors group"
//                 >
//                   <span className="text-base sm:text-lg text-gray-900 pr-4 group-hover:text-gray-700 transition-colors">
//                     {item.question}
//                   </span>
//                   <div className="flex-shrink-0 ml-auto">
//                     {openItems[item.id] ? (
//                       <Minus className="w-5 h-5 text-yellow-500 group-hover:text-gray-700 transition-colors" />
//                     ) : (
//                       <Plus className="w-5 h-5 text-yellow-500 group-hover:text-gray-700 transition-colors" />
//                     )}
//                   </div>
//                 </button>
                
//                 {/* Expandable Content */}
//                 {openItems[item.id] && (
//                   <div className="pb-6 px-0">
//                     <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                       {item.answer}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQSellGold() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqSections = [
    {
      title: "Selling the Gold",
      hasLinks: true,
      items: [
        { 
          id: 'sell-gold', 
          question: "How do I sell my gold?", 
          answer: "You can sell gold by clicking on the sell option on the top after logging in to your account.\nSonaSutra Digital Gold provides a live sell price.\nYou can choose to sell any amount of eGold starting with a minimum of ₹100 to up to ₹50,000 per transaction.\nYou can choose the bank account (previously saved) or enter a new bank account to get the money.\nThe money will be credited to your bank account.\nFor security reasons, newly added bank accounts will be verified by doing a penny drop bank verification—i.e., a small amount will be credited to your bank account for verification purposes."
        },
        { 
          id: 'lock-period', 
          question: "Is there any lock-in period to sell gold?", 
          answer: "Same-day selling is restricted, so you can sell the gold 72 hours after its purchase."
        },
        { 
          id: 'money-transfer', 
          question: "How long will it take to get the money in my bank account?", 
          answer: "The money will be transferred instantly within the next two hours. However, it can take a maximum of 72 hours in case of delays."
        },
        { 
          id: 'price-difference', 
          question: "Why is the buy and sell price different on the same day?", 
          answer: "The buy and sell price difference is due to a 3% GST and costs such as bank charges, payment costs, technology costs, and hedging costs that SonaSutra Digital Gold undertakes."
        }
      ]
    },
    {
      title: "eGold for Senior Citizens",
      hasLinks: true,
      items: [
        { 
          id: 'digital-gold', 
          question: "What can you do with your SonaSutra Digital Gold?", 
          answer: "Invest in 24K gold hassle-free with SonaSutra eGold.\n1. Convenient, 24x7 access and 100% safe.\n2. Celebrate your beautiful bond: Redeem your gold investment to buy beautiful jewellery for special occasions, such as your daughter's wedding or even grandkid’s milestone birthdays.\n3. Gift yourself: Sell anytime to achieve your personal goals such as travelling abroad or paying for any medical emergencies."
        },
        { 
          id: 'buy-egold', 
          question: "How can you buy eGold?", 
          answer: "Buy digital gold in 3 easy steps:\n1. Login and register with SonaSutra to complete your account setup with eKYC.\n2. Enter the Amount in rupees or gold in grams to buy.\n3. Make payment through UPI or even use PhonePe, Ausper and Khyaal as other applications to buy SonaSutra Digital Gold."
        },
        { 
          id: 'convert-jewellery', 
          question: "How to convert digital gold balance into jewellery?", 
          answer: "1. Shortlist your favourite designs on SonaSutra website / app or book Live Video Call or Try-At-Home appointment.\n2. Visit the SonaSutra store /app /website to redeem your digital gold balance.\n3. In addition to SonaSutra Digital Gold bought from SonaSutra, PhonePe, Ausper or Khyaal, you can also use your balance from digital gold service providers like Safegold and Augmont to buy beautiful SonaSutra jewellery."
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      {faqSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-12">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
              {section.title}
            </h2>
            {section.hasLinks && (
              <span className="text-yellow-500 text-sm font-medium cursor-pointer hover:text-yellow-700 transition-colors">
                FAQs
              </span>
            )}
          </div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {section.items.map((item, index) => (
              <div key={item.id} className="border-b border-yellow-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between py-6 px-0 text-left hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-base sm:text-lg text-gray-900 pr-4 group-hover:text-gray-700 transition-colors">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 ml-auto">
                    {openItems[item.id] ? (
                      <Minus className="w-5 h-5 text-yellow-500 group-hover:text-gray-700 transition-colors" />
                    ) : (
                      <Plus className="w-5 h-5 text-yellow-500 group-hover:text-gray-700 transition-colors" />
                    )}
                  </div>
                </button>
                
                {/* Expandable Content */}
                {openItems[item.id] && (
                  <div className="pb-6 px-0">
                    <div className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
