
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
import { useNavigate } from 'react-router-dom';

const SonaSutraDigitalGoldHome = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
 const navigate = useNavigate();
 
  
  const faqs = [
    {
      question: "What is digital gold?",
      answer: "Digital Gold is an organised and transparent method of buying 24-Carat gold in compliance with all applicable laws and regulations.Digital Gold is neither a financial product nor a deposit but a method of purchasing gold for your personal needs.Digital Gold gives the flexibility for customers to accumulate gold in any denomination, say as low as Rs. 10.Physical gold will be bought by service providers and stored in very safe vaults for the customer. Customers need not go through the hassle of storing and securing the gold.At the same time, customers have the flexibility to sell the gold at any time, convert to physical gold and ask for delivery or exchange digital gold for physical jewellery at a SonaSutra website or store."
    },
    {
      question: "What is SonaSutra Digital Gold?",
      answer: "SonaSutra Digital Gold is a service offered by SonaSutra to enable customers to accumulate digital gold, sell at any time, or exchange for physical Jewellery on the SonaSutra website or at SonaSutra outlets.SonaSutra takes care of selling gold to the customers, storing, and buyback from customers, while providing a seamless experience for customers to buy any jewellery from SonaSutra through the sale proceeds of customers' gold balance."
    },
    {
      question: "Why should I buy SonaSutra Digital Gold?",
      answer: "SonaSutra Digital Gold has the SonaSutra Seal of Trust and guarantees purity. Our digital gold is easily redeemable for Jewellery anytime, on the SonaSutra website or across any of our jewellery outlets.We offer the flexibility of redemption across all our  physical outlets and online stores as well. Customers have the option to choose from our unique and exclusive 8000+ designs and purchase using the accumulated SonaSutra Digital Gold value."
    },
    {
      question: "How to buy SonaSutra Digital Gold?",
      answer: "Gold can be accumulated under the SonaSutra Digital Gold Program by buying through:SonaSutra.com"
    },
    {
      question: "Where will the Digital Gold be stored after I buy it?",
      answer: "The Digital Gold purchased on your behalf is stored with BVC the safe keeper of precious metals in India.The gold is insured, both for storage and transit, when being delivered to you. Further, the external administrator has a charge on all gold stored in the vault in your favour.This ensures that your gold is protected at all times regardless of any external events."
    },
    {
      question: "What is the purity of gold bought under SonaSutra Digital Gold?",
      answer: "SonaSutra Digital Gold offers 24-Carat gold of 999 fineness (99.99% pure) or higher.SonaSutra sources “good delivery” bars from trusted sources for the digital gold offered to you."
    },
    {
      question: "Why are the SonaSutra Digital Gold rates different from SonaSutra Jewellery gold rates?",
      answer: "SonaSutra Digital Gold is in bullion form and is safely stored in a central vault.There is no movement for this gold. But for jewellery, the gold has to travel between multiple entities to get the product manufactured.The logistics costs incurred by the jewellery gold are substantially different from the gold stored in the central vault. Hence, the jewellery gold rate will always be higher than the digital gold."
    },
    {
      question: "I have some other queries about my SonaSutra Digital Gold Account. Who can I get in touch with?",
      answer: "You can write to contactus@sonasutra.com or call us at +91-7068454247 or WhatsApp at +91 7068454247"
    },
    {
      question: "Is my SonaSutra Digital Gold kept in safe custody?",
      answer: "Yes. The gold purchased on your behalf is stored with BVC, one of the leading safe keepers of precious metals across the world.The gold is insured, both for storage and transit when being delivered to you. Further, the external administrator has a charge on all gold stored in the vault in your favour.This ensures that your gold is protected at all times regardless of any external events"
    },
    {
      question: "Is the Physical Vault Insured?",
      answer: "Yes. The secure storage provider (BVC) has a comprehensive, global insurance policy that includes the insurance cover on your gold stored in their vaults"
    },
    {
      question: "What is the role of the “the external administrator”?",
      answer: "SonaSutra has entered into a relationship with an external administrator to act as a the external administrator for all digital gold customers.The external administrator is entitled to act on your behalf and ensure that your interests are protected.The external administrator will have a charge on the gold associated with accumulations held by you.“Click here to find The eGold vault statement from the external administrator”"
    },
    {
      question: "What will happen to the gold associated with accumulations in my account, in the unlikely event of the SonaSutra going into liquidation?",
      answer: "The gold associated with the accumulations in your account is separate from the other assets of the SonaSutra.An external administrator, acts for and on your behalf.The gold purchased by the Company associated with the accumulations in your accounts is held with the Custodian.When you ask for delivery, the requisite quantity of gold will be removed from the Custodian and delivered to you through a reputed courier service.Since the the external administrator has a charge over the gold, any unlikely adverse event happening to the company will not affect the gold associated with the accumulations in your account.Further, the title of the gold clearly rests with you and the physical gold stored with the Custodian on account of SonaSutra customers is not an asset of SonaSutra in any way."
    },
    {
      question: "Is there an automatic saving plan for SonaSutra Digital Gold?",
      answer: "No, we don’t offer this feature now. But will notify you if we launch in the future."
    },
    {
      question: "What happens in the unlikely event of my death during the plan?",
      answer: "In the event of your death—as per the process specifically allowed by SonaSutra Digital Gold and subject to the required due diligence—the title to your Gold lying in the vault and your account shall transfer to your legal heir."
    },
    {
      question: "Will my digital gold balance be affected by gold rate fluctuations?",
      answer: "No, your digital gold balance remains unchanged. However, its value may vary based on marked gold rates, as the price of gold fluctuates."
    },
    {
      question:"How do I buy SonaSutra Digital Gold?",
      answer:"Just go to SonaSutra.com/Digigold/buy and enter the grams/amount that you want to buy.First-time buyers will have to register by providing the email, mobile number, address, and PAN details.For an existing customer, just logging in is enough.After confirming the value of the gold you want to buy, pay the amount and the gold will get credited to your SonaSutra Digital Gold balance.The prices are linked to the live gold rate. Therefore, the gold price is subject to change every five minutes."
    },
    {
      question:"What is the minimum and maximum gold amount I can purchase through SonaSutra Digital Gold?",
      answer:"Min is Rs. 10. Max is Rs. 50000."
    },
    {
      question:"Where is the Gold stored post buying?",
      answer:"The gold purchased on your behalf is stored with BVC, one of the safe keepers of precious metals.The gold is insured, both for storage and transit when being delivered to you.Further, the external Administrator has a charge on all gold stored in the vault in your favour.This ensures that your gold is protected at all times regardless of any external events."
    },
    {
      question:"What is the purity of gold bought under SonaSutra Digital Gold?",
      answer:"SonaSutra Digital Gold offers 24-karat gold of 999 fineness (99.99% pure) or higher.SonaSutra sources “good delivery” bars from trusted sources for the digital gold offered to you."
    },
    {
      question:"Does the price include GST?",
      answer:"Yes, our buy price is inclusive of 3% GST, the break-up of which can be seen on your invoice."
    },
    {
      question:"Why are the SonaSutra Digital Gold rates different from SonaSutra Jewellery gold rates?",
      answer:"SonaSutra Digital Gold is in bullion form and is safely stored in a central vault.There is no movement for this gold. But for jewellery, the gold has to travel between multiple entities to get the product manufactured.The logistics costs incurred by the jewellery gold are substantially different from the gold stored in the central vault. Hence, the jewellery gold rate will always be higher than the digital gold."
    },
    {
      question:"Where can I find the invoice of my past purchases?",
      answer:"An invoice will be emailed to you as an attachment after each successful transaction. It is also available on the platform, by clicking on the invoice button."
    },
    {
      question:"What are the KYC requirements of SonaSutra Digital Gold?",
      answer:"Your name, email, mobile, address, pin code, and PAN details are mandatory."
    },
    {
      question:"How do I sell my gold?",
      answer:"You can sell gold by clicking on the sell option on the top after logging in to your account.SonaSutra Digital Gold provides a live sell price.You can choose to sell any amount of eGold starting with a minimum of ₹100 to upto ₹50,000 per transaction.You can choose the bank account (previously saved) or enter a new bank account to get the money.The money will be credited to your bank account.For security reasons, newly added bank accounts will be verified by doing a penny drop bank verification—i.e., a small amount will be credited to your bank account for verification purposes."
    },
    {
      question:"Is there any lock-in period to sell gold?",
      answer:"Same-day selling is restricted, so you can sell the gold 72 hours after its purchase."
    },
    {
      question:"How long will it take to get the money in my bank account?",
      answer:"The money will be transferred instantly within the next two hours. However, it can take a maximum of 72 hours in case of delays."
    },
    {
      question:"Why is the buy and sell price different on the same day?",
      answer:"The buy and sell price difference due to a 3% GST and costs such as bank charges, payment costs, technology costs, and hedging costs that SonaSutra Digital Gold undertakes."
    },
    {
      question:"How can I exchange my SonaSutra Digital Gold for Physical Jewellery?",
      answer:"Exchange for physical jewellery can be done in three easy steps:a.Browse the entire product catalog. Add the coin or jewellery that you like to the cart.b.Authenticate using OTP and check SonaSutra Digital Gold balance at the checkout page.c.Pay fully or partially through SonaSutra Digital Gold in value terms."
    },
    {
      question:"Why am I not able to match gram-to-gram for the jewellery I am exchanging?",
      answer:"SonaSutra Digital Gold rates will always be lower than the jewellery rates.Additionally, the same physical gold is not used for making the actual jewellery. Therefore, taxes for the jewellery needs to be paid separately.Gram-to-gram matching of Digital Gold to physical gold is not possible due to the above-mentioned reasons."
    },
    {
      question:"Why do I have to pay GST for the jewellery when I have already paid GST at the time of SonaSutra Digital Gold purchase?",
      answer:"As per taxation laws, the same physical gold has to be used to make the jewellery to avoid GST again.The same physical gold (stored via Digital Gold) is not used for making the actual jewellery. Hence, you have to pay a separate tax for the jewellery."
    },
    {
      question:"Is there any lock-in period to exchange my SonaSutra eGold Digital Gold for Physical Jewellery?",
      answer:"Same-day exchange is restricted, so you can exchange for physical jwellery 24 hours after its purchase."
    },
    {
      question:"What is the minimum gold amount I can use to exchange my SonaSutra eGold Digital Gold for Physical Jewellery",
      answer:"You can choose to exchange any amount of eGold Digital Gold starting with a minimum of ₹10."
    },
    {
      question:"What can you do with your SonaSutra Digital Gold?",
      answer:"Invest in 24K gold hassle-free with SonaSutra eGold.1.Convenient, 24x7 access and 100% safe      2.Celebrate your beautiful bond:3.Redeem your gold investment to buy beautiful jewellery for special occasions, such as your daughter's wedding or even grandkid’s milestone birthdays.4.Gift yourself:5.Sell anytime to achieve your personal goals such as travelling abroad or paying for any medical emergencies."
    },
    {
      question:"How can you buy eGold?",
      answer:"Buy digital gold in 3 easy steps:Step 1: Login and register with SonaSutra to complete your account setup with eKYC.Step 2: Enter the Amount in rupees or gold in grams to buy.Step 3: Make payment through UPI or even use PhonePe, Ausper and Khyaal as other applications to buy SonaSutra Digital Gold."
    },
    {
      question:"How to convert digital gold balance into jewellery?",
      answer:"1.Shortlist your favourite designs on SonaSutra website / app or book Live Video Call or Try-At-Home appointment2.Visit the SonaSutra store /app /website to redeem your digital gold balance3.In addition to SonaSutra Digital Gold bought from SonaSutra, PhonePe, Ausper or Khyaal, you can also use your balance from digital gold service providers like Safegold and Augmont to buy beautiful SonaSutra jewellery."
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
             style={{backgroundImage: 'url(/image/e-suvarna-home-big-screen-background.jpg)'}}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex items-center h-full max-w-9xl mx-auto px-4">
            <div className="text-white max-w-2xl">
              <h1 className="text-2xl lg:text-3xl  mb-4">SonaSutra Digital Gold</h1>
              <p className="text-[15px] mb-6">Invest in Pure 24k Gold online -100% Safe & trustworthy</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                 onClick={()=>navigate('/buy-gold')}>
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
             style={{backgroundImage: 'url(/image/e-swarna_home_mobile_background.jpg)'}}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex items-center h-full px-4 ">
            <div className="text-white w-full text-center mb-40">
              <h1 className="text-2xl  mb-4 mt-1">SonaSutra Digital Gold</h1>
              <p className="text-[14px] mb-6">Invest in Pure 24k Gold online -100% Safe & trustworthy</p>
              <button className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold w-[1/2] max-w-xs"
              onClick={()=>navigate('/buy-gold')}>
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
          <h2 className="text-2xl  text-center mb-5 ">Have questions about SonaSutra eGOLD? Share your number and we will call you back!</h2>
          
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
            {faqs.slice(0, 15).map((faq, index) => (
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
            {faqs.slice(15, 23).map((faq, index) => {
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
            {faqs.slice(23, 27).map((faq, index) => {
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
            {faqs.slice(27, 32).map((faq, index) => {
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

             <h3 className="text-xl font-bold mb-6 mt-12">e-suvarna for senior citizen</h3>
            {faqs.slice(32, 35).map((faq, index) => {
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
