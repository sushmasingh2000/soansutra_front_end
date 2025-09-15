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
      question: "How do I buy CaratLane Digital Gold?",
      answer: "You can purchase CaratLane Digital Gold through the CaratLane website or mobile app. Simply create an account, complete the KYC verification process, choose your desired gold amount, and make payment using various available methods including UPI, net banking, debit/credit cards, or digital wallets. The gold will be instantly credited to your digital gold account upon successful payment."
    },
    {
      question: "What is the minimum and maximum gold amount I can purchase through CaratLane Digital Gold?",
      answer: "The minimum purchase amount for CaratLane Digital Gold is typically ₹100, allowing you to buy even small fractions of gold. The maximum purchase limit varies based on your KYC status and regulatory requirements. For fully KYC-verified customers, higher limits apply. You can check your specific limits in your account dashboard after completing the verification process."
    },
    {
      question: "Where is the Gold stored post buying?",
      answer: "Your purchased digital gold is stored in secure, insured vaults operated by MMTC-PAMP, one of India's leading precious metals refiners. The gold is stored in LBMA-approved vaults with full insurance coverage and 24/7 security monitoring. Each gram of gold you own is backed by physical gold stored in these secure facilities, ensuring complete safety and authenticity of your investment."
    },
    {
      question: "What is the purity of gold bought under CaratLane Digital Gold?",
      answer: "CaratLane Digital Gold maintains a purity of 24 karat (99.99% pure gold). The gold is sourced from MMTC-PAMP, which follows international standards for gold purity and quality. Each gold bar stored in the vault comes with proper certification and assaying, ensuring that your digital gold investment represents the highest purity gold available in the market."
    },
    {
      question: "Does the price include GST?",
      answer: "Yes, the displayed price for CaratLane Digital Gold includes all applicable taxes including GST (Goods and Services Tax). The price you see is the final amount you need to pay, with no hidden charges or additional taxes. GST on digital gold purchases is currently charged as per the prevailing government rates and regulations."
    },
    {
      question: "Why are the CaratLane Digital Gold rates different from CaratLane Jewellery gold rates?",
      answer: "CaratLane Digital Gold rates are based on live market prices for 24-karat pure gold and include minimal processing fees. Jewellery gold rates, however, include making charges, design costs, wastage charges, and other overhead expenses associated with crafting physical jewelry. Digital gold offers a pure investment opportunity without these additional costs, making it more affordable for investment purposes."
    },
    {
      question: "Where can I find my CaratLane Digital Gold balance and details for my past purchases?",
      answer: "You can view your digital gold balance and transaction history by logging into your CaratLane account and navigating to the 'Digital Gold' section. The dashboard displays your current gold holdings, purchase history, current market value, and profit/loss statements. You can also download detailed reports and track your investment performance over time through the same interface."
    },
    {
      question: "Where can I find the invoice of my past purchases?",
      answer: "Invoices for your digital gold purchases can be downloaded from your CaratLane account under the 'Digital Gold' section. Navigate to 'Transaction History' or 'Purchase History' where you'll find downloadable PDF invoices for each transaction. These invoices contain all necessary details including purchase amount, gold quantity, date of purchase, and tax information for your records."
    },
    {
      question: "What are the KYC requirements of CaratLane Digital Gold?",
      answer: "For CaratLane Digital Gold, you need to complete KYC (Know Your Customer) verification which includes providing a government-issued photo ID (Aadhaar, PAN, Passport, or Driving License), address proof, and a recent photograph. For purchases above certain limits, additional income verification may be required. The KYC process can be completed online by uploading clear images of your documents through the website or mobile app."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#231535' }}>
          Buying Gold
        </h1>
        <span className="text-sm font-medium bg-white px-1  mt-3 rounded-full" style={{ color: 'rgb(136, 99, 251)' }}>
          FAQs
        </span>
      </div>

      <div className="space-y-0 border border-gray Ferrara200 rounded-lg overflow-hidden">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
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
                    <Minus className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>
            </button>
            
            {openItems[index] && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                <div className="text-sm sm:text-base leading-relaxed" style={{ color: '#231535' }}>
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