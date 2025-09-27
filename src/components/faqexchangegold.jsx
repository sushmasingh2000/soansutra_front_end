

import { useState } from 'react';

export default function ExchangeRedeemFAQ() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const exchangeFAQs = [
    {
      id: 1,
      question: "How can I exchange my SonaSutra Digital Gold for Physical Jewellery?",
      answer: "Exchange for physical jewellery can be done in three easy steps:\na. Browse the entire product catalog. Add the coin or jewellery that you like to the cart.\nb. Authenticate using OTP and check SonaSutra Digital Gold balance at the checkout page.\nc. Pay fully or partially through SonaSutra Digital Gold in value terms."
    },
    {
      id: 2,
      question: "Why am I not able to match gram-to-gram for the jewellery I am exchanging?",
      answer: "SonaSutra Digital Gold rates will always be lower than the jewellery rates. Additionally, the same physical gold is not used for making the actual jewellery. Therefore, taxes for the jewellery need to be paid separately. Gram-to-gram matching of Digital Gold to physical gold is not possible due to the above-mentioned reasons."
    },
    {
      id: 3,
      question: "Why do I have to pay GST for the jewellery when I have already paid GST at the time of SonaSutra Digital Gold purchase?",
      answer: "As per taxation laws, the same physical gold has to be used to make the jewellery to avoid GST again. The same physical gold (stored via Digital Gold) is not used for making the actual jewellery. Hence, you have to pay a separate tax for the jewellery."
    },
    {
      id: 4,
      question: "Is there any lock-in period to exchange my SonaSutra eGold Digital Gold for Physical Jewellery?",
      answer: "Same-day exchange is restricted, so you can exchange for physical jewellery 24 hours after its purchase."
    },
    {
      id: 5,
      question: "What is the minimum gold amount I can use to exchange my SonaSutra eGold Digital Gold for Physical Jewellery",
      answer: "You can choose to exchange any amount of eGold Digital Gold starting with a minimum of ₹10."
    },
  ];

  const seniorCitizenFAQs = [
    {
      id: 6,
      question: "What can you do with your SonaSutra Digital Gold?",
      answer: "Invest in 24K gold hassle-free with SonaSutra eGold.\n1. Convenient, 24x7 access and 100% safe.\n2. Celebrate your beautiful bond: Redeem your gold investment to buy beautiful jewellery for special occasions, such as your daughter's wedding or even grandkid’s milestone birthdays.\n3. Gift yourself: Sell anytime to achieve your personal goals such as travelling abroad or paying for any medical emergencies."
    },
    {
      id: 7,
      question: "How can you buy eGold?",
      answer: "Buy digital gold in 3 easy steps:\n1. Login and register with SonaSutra to complete your account setup with eKYC.\n2. Enter the Amount in rupees or gold in grams to buy.\n3. Make payment through UPI or even use PhonePe, Ausper and Khyaal as other applications to buy SonaSutra Digital Gold."
    },
    {
      id: 8,
      question: "How to convert digital gold balance into jewellery?",
      answer: "1. Shortlist your favourite designs on SonaSutra website / app or book Live Video Call or Try-At-Home appointment.\n2. Visit the SonaSutra store /app /website to redeem your digital gold balance.\n3. In addition to SonaSutra Digital Gold bought from SonaSutra, PhonePe, Ausper or Khyaal, you can also use your balance from digital gold service providers like Safegold and Augmont to buy beautiful SonaSutra jewellery."
    }
  ];

  const FAQItem = ({ item }) => (
    <div className="border-b border-yellow-200 last:border-b-0">
      <button
        onClick={() => toggleItem(item.id)}
        className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-gray-800 text-base font-normal pr-4 leading-relaxed">
          {item.question}
        </span>
        <div className="flex-shrink-0 ml-4">
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
              expandedItems[item.id] ? 'rotate-45' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </button>
      {expandedItems[item.id] && (
        <div className="pb-6 -mt-2">
          <p className="text-yellow-600 text-sm leading-relaxed whitespace-pre-line">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white mb-10">
      {/* Exchange Section */}
      <div className="mb-12">
       <div className="mb-8 flex items-baseline gap-2">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
            Exchange
          </h2>
          <span className="text-yellow-500 text-sm font-normal">
            FAQs
          </span>
        </div>

        <div className="space-y-0">
          {exchangeFAQs.map((faq) => (
            <FAQItem key={faq.id} item={faq} />
          ))}
        </div>
      </div>

      {/* eGold for Senior Citizens Section */}
      <div>
        <div className="mb-8 flex items-baseline gap-2">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
            eGold for Senior Citizens
          </h2>
          <span className="text-yellow-500 text-sm font-normal">
            FAQs
          </span>
        </div>

        <div className="space-y-0">
          {seniorCitizenFAQs.map((faq) => (
            <FAQItem key={faq.id} item={faq} />
          ))}
        </div>
      </div>
    </div>
  );
}