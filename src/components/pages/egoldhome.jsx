
import React, { useState } from 'react';
import { Plus, Minus, Star, Shield, Award, Zap, View } from 'lucide-react';
import EgoldHeader from '../egoldheader';
import ViewMyVault from '../myvaultegold';
import HowToRedeem from '../howtoredeem';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';
import { apiConnectorGet, usequeryBoolean } from '../../utils/ApiConnector';
import { useQuery } from 'react-query';
import { endpoint } from '../../utils/APIRoutes';

const SonaSutraDigitalGoldHome = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
 
  
  const faqs = [
    {
      question: "What is digital gold?",
      answer: "Digital gold is a way to buy, sell, and store gold online. It represents physical gold stored in secure vaults, allowing you to invest in gold without physically holding it."
    },
    {
      question: "How much do I pay when I buy gold?",
      answer: "You pay the current market price of gold plus applicable taxes and small transaction fees. The price is updated in real-time based on international gold rates."
    },
    {
      question: "Why should I buy CaratLane Digital Gold?",
      answer: "CaratLane Digital Gold offers 24K pure gold, secure storage, insurance coverage, instant liquidity, and the ability to convert to physical jewelry anytime."
    },
    {
      question: "How do I know my gold is safe?",
      answer: "Your gold is stored in secure, insured vaults with leading custodians. Each purchase is backed by physical gold and you receive proper documentation and certificates."
    },
    {
      question: "What if my account is not linked with Aadhaar upon login?",
      answer: "You can still buy digital gold, but for compliance with regulations, linking your Aadhaar is recommended for higher transaction limits and better account security."
    },
    {
      question: "Can I make recurring investment?",
      answer: "Yes, you can set up SIP (Systematic Investment Plan) to automatically invest a fixed amount in digital gold at regular intervals."
    },
    {
      question: "What is the minimum buy/sell order allowed?",
      answer: "You can start investing in digital gold with as low as ₹100. There's no maximum limit for purchases."
    },
    {
      question: "Is there any transaction fee?",
      answer: "A nominal transaction fee of 3% applies on purchases. Selling digital gold may have minimal charges which will be clearly displayed before confirmation."
    },
    {
      question: "Can I convert digital gold to physical jewellery?",
      answer: "Yes, you can convert your digital gold to beautiful CaratLane jewelry. The gold value will be adjusted against your jewelry purchase."
    },
    {
      question: "How can I sell my Digital Gold?",
      answer: "You can sell your digital gold anytime through the app or website. The amount will be credited to your registered bank account within 2-3 business days."
    },
    {
      question: "How long does it take for the gold amount to reflect in my account?",
      answer: "Digital gold purchases are reflected instantly in your account. For selling, the proceeds typically take 2-3 business days to reach your bank account."
    },
    {
      question: "Why is buy rate different from sell rate of gold?",
      answer: "The difference in buy and sell rates covers operational costs, storage, insurance, and provides market liquidity. This spread is competitive and transparent."
    },
    {
      question: "Is there any lock-in period during the gold purchase?",
      answer: "No, there's no lock-in period. You can sell your digital gold anytime you want at prevailing market rates."
    },
    {
      question: "If I lose my account access will I lose my gold?",
      answer: "No, your digital gold is safe. You can recover your account through proper verification processes. Your gold holdings are securely maintained in our systems."
    },
    {
      question: "How can I see the gold amount in my account?",
      answer: "You can view your gold holdings anytime through your CaratLane account dashboard, which shows current quantity, value, and transaction history."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-hidden">
         <Header/>
    <NavigationBar/>
        <EgoldHeader/>

      {/* Hero Section */}
      <div className="relative">
        {/* Desktop Banner */}
        <div className="hidden md:block h-[400px] lg:h-[466px] bg-cover bg-center relative" 
             style={{backgroundImage: 'url(https://cdn.caratlane.com/media/static/images/V4/2024/CL/10_OCT/Banner/Egold/1/E_Gold_desktop_1132x466.jpg)'}}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4">
            <div className="text-white max-w-2xl">
              <h1 className="text-2xl lg:text-3xl  mb-4">CaratLane Digital Gold</h1>
              <p className="text-[15px] mb-6">Invest in Pure 24k Gold online -100% Safe & trustworthy</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Buy Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="block md:hidden h-[400px] bg-cover bg-center relative" 
             style={{backgroundImage: 'url(https://cdn.caratlane.com/media/static/images/V4/2024/CL/10_OCT/Banner/Egold/1/E-Gold_banner_Mobile_780x800.jpg)'}}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex items-center h-full px-4 ">
            <div className="text-white w-full text-center mb-40">
              <h1 className="text-2xl  mb-4 mt-1">CaratLane Digital Gold</h1>
              <p className="text-[14px] mb-6">Invest in Pure 24k Gold online -100% Safe & trustworthy</p>
              <button className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold w-[1/2] max-w-xs">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
<ViewMyVault/>
<HowToRedeem/>
      {/* Features Section */}
      

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 ">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl  text-center mb-5 ">Have questions about CaratLane eGOLD? Share your number and we will call you back!</h2>
          
          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="flex gap-4 mb-4">
              <input 
                type="tel" 
                placeholder="Enter your mobile number" 
                className="flex-1 border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold whitespace-nowrap">
                Call Me Back
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">General</h3>
            {faqs.slice(0, 6).map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}

            <h3 className="text-xl font-bold mb-6 mt-12">Buy</h3>
            {faqs.slice(6, 10).map((faq, index) => {
              const faqIndex = index + 6;
              return (
                <div key={faqIndex} className="bg-white rounded-lg shadow-sm">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(faqIndex)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFaq === faqIndex ? (
                      <Minus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === faqIndex && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <h3 className="text-xl font-bold mb-6 mt-12">Sell</h3>
            {faqs.slice(10, 13).map((faq, index) => {
              const faqIndex = index + 10;
              return (
                <div key={faqIndex} className="bg-white rounded-lg shadow-sm">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(faqIndex)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFaq === faqIndex ? (
                      <Minus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === faqIndex && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <h3 className="text-xl font-bold mb-6 mt-12">Exchange</h3>
            {faqs.slice(13, 15).map((faq, index) => {
              const faqIndex = index + 13;
              return (
                <div key={faqIndex} className="bg-white rounded-lg shadow-sm">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(faqIndex)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFaq === faqIndex ? (
                      <Minus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === faqIndex && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default SonaSutraDigitalGoldHome;
