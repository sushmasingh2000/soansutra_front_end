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
      question: "How can I exchange my CaratLane Digital Gold for Physical Jewellery?"
    },
    {
      id: 2,
      question: "Why am I not able to match gram-to-gram for the jewellery I am exchanging?"
    },
    {
      id: 3,
      question: "Why do I have to pay GST for the jewellery when I have already paid GST at the time of CaratLane Digital Gold purchase?"
    },
    {
      id: 4,
      question: "Is there any lock-in period to exchange my CaratLane eGold Digital Gold for Physical Jewellery?"
    },
    {
      id: 5,
      question: "What is the minimum gold amount I can use to exchange my CaratLane eGold Digital Gold for Physical Jewellery"
    }
  ];

  const seniorCitizenFAQs = [
    {
      id: 6,
      question: "What can you do with your CaratLane Digital Gold?"
    },
    {
      id: 7,
      question: "How can you buy eGold?"
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
          <p className="text-yellow-600 text-sm leading-relaxed">
            Content for this FAQ item would go here. This is expandable content that provides detailed answers to the question.
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