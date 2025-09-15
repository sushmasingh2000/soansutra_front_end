import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TreasureChestFaqToggleComponent = () => {
  const [activeTab, setActiveTab] = useState('faqs');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      id: 'cancel-plan',
      category: 'Cancellation/Refund',
      question: 'Can I cancel my CaratLane Treasure Chest plan at any time?'
    },
    {
      id: 'what-is-edge',
      category: 'CaratLane Treasure Chest Edge',
      question: 'What is CaratLane Treasure Chest Edge Scheme?'
    },
    {
      id: 'edge-benefits',
      category: 'CaratLane Treasure Chest Edge',
      question: 'What are the benefits of the CaratLane Treasure Chest Edge Scheme?'
    },
    {
      id: 'switch-schemes',
      category: 'CaratLane Treasure Chest Edge',
      question: 'Can I switch between CaratLane Treasure Chest Schemes during the term?'
    },
    {
      id: 'cancel-edge',
      category: 'CaratLane Treasure Chest Edge',
      question: 'Can I cancel my CaratLane Treasure Chest Edge Scheme?'
    },
    {
      id: 'eligible-products',
      category: 'CaratLane Treasure Chest Edge',
      question: 'Which products are eligible for redemption under the CaratLane Treasure Chest Edge Scheme?'
    },
    {
      id: 'redeem-gold',
      category: 'CaratLane Treasure Chest Edge',
      question: 'Can I redeem my CaratLane Treasure Chest Edge on 22KT/Gold Coin/ Unstudded designs?'
    }
  ];

  const termsDefinitions = [
    {
      id: 1,
      text: "Enrolment Date means the date of payment of the first instalment."
    },
    {
      id: 2,
      text: "Company or CaratLane means CaratLane Trading Private Limited."
    },
    {
      id: 3,
      text: "Scheme means CaratLane Treasure Chest Scheme."
    },
    {
      id: 4,
      text: "Scheme Term means the period ending 270 days from the enrolment date."
    },
    {
      id: 5,
      text: "Instalment Term means the period ending 240 days from the enrolment date."
    },
    {
      id: 6,
      text: "Cool Off Period means the duration of 30 days commencing from the completion of Instalment Term (i.e. Between 241st day to 270th Day) and the culmination of the Scheme Term."
    },
    {
      id: 7,
      text: "Redemption Window means the 60 days duration from the completion of the Cool Off Period (i.e. Between 271st day to 350th day)."
    },
    {
      id: 8,
      text: "Cancellation by Customer means when the Customer expressly opts out of the Scheme during the Instalment term or if the Customer expressly opts out of the Scheme during the Cool Off Period."
    },
    {
      id: 9,
      text: "Cancellation by Company means when the Customer has defaulted in making the monthly instalment amount under the Scheme for a consecutive period of 3 months, the Company shall cancel the Scheme."
    },
    {
      id: 10,
      text: "Customer means any Customer who participates in the Scheme by submitting such documents as may be required by the Company and also by complying with the terms of the Scheme as mandated by the Company."
    }
  ];

  const enrolmentTerms = [
    {
      text: "Under the CaratLane Treasure Chest Scheme, the individual is required to make payment for nine fixed monthly instalments. After the payment of the ninth monthly instalment, CaratLane will offer a discount/ benefit as mentioned below:"
    },
    {
      text: "In case of purchase of any Diamond / Gemstone / Platinum / Preset Solitaires / Shaya (Silver) Jewellery / loose solitaire, CaratLane will offer a discount equal to the amount of one month instalment."
    },
    {
      text: "In case of purchase of Plain gold jewellery (unstudded), CaratLane will offer a discount equal to 30% of the amount of one month instalment."
    },
    {
      text: "The date on which the first monthly instalment is paid by the customer shall be considered as enrolment date. For the purpose of this Scheme, the due date shall be same as the Enrolment Date for the subsequent months."
    }
  ];

  const renderFAQs = () => (
    <div className="space-y-6">
      {/* Cancellation/Refund Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancellation/Refund</h3>
        <div className="space-y-2">
          {faqData.filter(item => item.category === 'Cancellation/Refund').map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-700 font-medium text-sm md:text-base">{item.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
                    openItems[item.id] ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openItems[item.id] && (
                <div className="px-4 pb-4 text-gray-600 text-sm">
                  Answer content would go here...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CaratLane Treasure Chest Edge Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">CaratLane Treasure Chest Edge</h3>
        <div className="space-y-2">
          {faqData.filter(item => item.category === 'CaratLane Treasure Chest Edge').map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-700 font-medium text-sm md:text-base">{item.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
                    openItems[item.id] ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openItems[item.id] && (
                <div className="px-4 pb-4 text-gray-600 text-sm">
                  Answer content would go here...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="space-y-6">
      {/* Definition Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Definition:</h3>
        <div className="space-y-3">
          {termsDefinitions.map((item) => (
            <div key={item.id} className="flex text-sm">
              <span className="text-gray-600 mr-2 font-medium">{item.id}.</span>
              <span className="text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolment Terms Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolment Terms:</h3>
        <div className="space-y-4">
          <div className="text-sm text-gray-700">
            {enrolmentTerms[0].text}
          </div>
          <div className="space-y-3 ml-4">
            {enrolmentTerms.slice(1).map((item, index) => (
              <div key={index} className="flex text-sm">
                <span className="text-gray-600 mr-2">◦</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Toggle Buttons */}
      <div className="flex bg-purple-100 rounded-lg p-1 mb-6 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'faqs'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          FAQs
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'terms'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Terms & Conditions
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        {activeTab === 'faqs' ? renderFAQs() : renderTerms()}
      </div>
    </div>
  );
};

export default TreasureChestFaqToggleComponent;