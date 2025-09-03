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
        { id: 'sell-gold', question: "How do I sell my gold?" },
        { id: 'lock-period', question: "Is there any lock-in period to sell gold?" },
        { id: 'money-transfer', question: "How long will it take to get the money in my bank account?" },
        { id: 'price-difference', question: "Why is the buy and sell price different on the same day?" }
      ]
    },
    {
      title: "eGold for Senior Citizens",
      hasLinks: true,
      items: [
        { id: 'digital-gold', question: "What can you do with your CaratLane Digital Gold?" },
        { id: 'buy-egold', question: "How can you buy eGold?" },
        { id: 'convert-jewellery', question: "How to convert digital gold balance into jewellery?" }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      {faqSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-12">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900">
              {section.title}
            </h2>
            {section.hasLinks && (
              <span className="text-blue-500 text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors">
                FAQs
              </span>
            )}
          </div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {section.items.map((item, index) => (
              <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between py-6 px-0 text-left hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-base sm:text-lg text-gray-900 pr-4 group-hover:text-gray-700 transition-colors">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 ml-auto">
                    {openItems[item.id] ? (
                      <Minus className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    )}
                  </div>
                </button>
                
                {/* Expandable Content */}
                {openItems[item.id] && (
                  <div className="pb-6 px-0">
                    <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {/* Placeholder content - you can replace with actual answers */}
                      This is where the answer to "{item.question}" would appear. You can add the detailed explanation or information here.
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}