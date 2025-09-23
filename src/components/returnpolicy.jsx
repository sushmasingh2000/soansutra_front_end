
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, ArrowLeftRight, ShoppingBag } from 'lucide-react';
import Header from './Header1';
import NavigationBar from './navigationbar';
import Footer from './Footer1';
import { Link } from 'react-router-dom';
import WarrantyPolicyUI from './warrentyui'

const ReturnPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const policyItems = [
    {
      id: 'diamond-gemstone',
      title: 'Diamond and Gemstone Studded/ Gold/ Platinum',
      content: {
        moneyBack: {
          title: '15 DAY MONEY-BACK',
          description: 'Applicable only on Online orders! For stores & TAH orders: We\'ve upgraded to a 15-Day Full Value Exchange! You can exchange your purchase for full value. No balance retained!',
          value: '100%',
          valueText: 'of Invoice value*',
          conditions: [
            '*UPTO ₹1,00,000 for Diamond and Gemstone Studded/ Gold/ Platinum',
            'Applicable ONLY on online orders in India',
            '*UPTO $1,500',
            'For orders delivered in USA and Canada',
            'Not applicable on Orders delivered to Australia, United Kingdom, Singapore, Dubai and other countries.'
          ]
        },
        lifetimeExchange: {
          title: 'LIFETIME EXCHANGE',
          description: 'Exchange or upgrade your jewellery anytime.',
          details: {
            'Gold/ Platinum': {
              value: '100%',
              text: 'value of metal weight at the prevailing metal rate*'
            },
            'Diamond': {
              value: '100%',
              text: 'of the prevailing diamond value* But 15-day Exchange, Buyback, or Return policies are not applicable on www.sonasutra.in, at the New Jersey sonasutra store, or at trunk shows in the U.S. for orders placed on www.sonasutra.in'
            },
            'Gemstone': {
              value: '90%',
              text: 'of the prevailing gemstone value*'
            },
            'Not applicable on international orders': {
              text: '* In case of any discount given during the original purchase on the metal and stone value, an equivalent amount will be deducted from the Exchange amount (Maximum value of Rs. 10 lakhs). The xCLusive Points used while placing an order will be deducted from the Lifetime Exchange value.'
            }
          }
        },
        lifetimeBuyback: {
          title: 'LIFETIME BUYBACK',
          description: 'Sell your diamond jewellery back to us.',
          details: {
            'Diamond Jewellery': {
              text: 'Additional 10% will be deducted from the LTE value*'
            },
            'Plain Gold /Platinum/ Gemstone Jewellery': {
              text: 'Additional 3% will be deducted from the LTE value*',
              note: '*Maximum value of Rs. 10 lakhs'
            }
          },
          internationalNote: 'Not Applicable on International Orders'
        }
      }
    },
    {
      id: 'solitaires',
      title: 'Solitaires (loose diamonds)',
      content: {
        moneyBack: {
          title: '15 DAY MONEY-BACK/CANCELLATION',
          description: '100%  refund for returns  within 15 days.No questions asked.(Not applicable on engraved and personalized products)',
          value: '100%',
          valueText: 'of Invoice value*',
          conditions: [
            '*UPTO ₹2,00,000',
            '*Loose Diamonds above 2 lakh qualify for Lifetime Exchange Or Lifetime Buyback Only',
            'Get a 100% refund on returns & exchanges within 15 days, no questions asked, for UAE orders only*.',
            'Not applicable on Orders delivered to Australia, United Kingdom, Singapore and other countries.'
          ]
        },
        lifetimeExchange: {
          title: 'LIFETIME EXCHANGE',
          description: 'Exchange or upgrade your solitaires anytime.',
          details: {
            'Certified Solitaires': {
              value: '90%',
              text: 'of the prevailing solitaire rates*'
            },
           'Not applicable on international orders': {
              text: '* In case of any discount given during the original purchase on the metal and stone value, an equivalent amount will be deducted from the Exchange amount (Maximum value of Rs. 10 lakhs). The xCLusive Points used while placing an order will be deducted from the Lifetime Exchange value.'
            }
          }
          
        },
          lifetimeBuyback: {
          title: 'LIFETIME BUYBACK',
          description: 'Sell your diamond jewellery back to us.',
          details: {
            'Diamond Jewellery': {
              text: 'Additional 10% will be deducted from the LTE value*',
              note:'*₹Upto 10,00,000'
            },
            '': {
              text: 'List your solitaire on our website for a nominal fee and set your own price for it*',
              note: '*OVER ₹10,00,000'
            }
          },
          internationalNote: 'Not Applicable on International Orders'
        }
      }
    },
    {
      id: 'mounts',
      title: 'Mounts',
      content: {
        moneyBack: {
          title: '15 DAY MONEY-BACK',
          description: 'Applicable only on Online orders! For stores & TAH orders: We\'ve upgraded to a 15-Day Full Value Exchange! You can exchange your purchase for full value. No balance retained!',
          value: '100%',
          valueText: 'of Invoice value*',
          conditions: [
            '*UPTO Rs. 2,00,000',
            'Get a 100% refund on returns & exchanges within 15 days, no questions asked, for UAE orders only*',
            'Not applicable on Orders delivered to Australia, United Kingdom, Singapore and other countries.'
          ]
        },
        lifetimeExchange: {
          title: 'LIFETIME EXCHANGE',
          description: '',
          details: {
            '': {
              value: '100%',
              text: 'value of metal weight at the prevailing metal rate*'
            },
             '': {
              value: '100%',
              text: 'of the prevailing diamond value*'
            },
             '': {
              value: '90%',
              text: 'of the prevailing gemstone value*'
            },
            'Not applicable on international orders': {
              text: '* In case of any discount given during the original purchase on the metal and stone value, an equivalent amount will be deducted from the Exchange amount. The xCLusive Points used while placing an order will be deducted from the Lifetime Exchange value.'
            }
          }
        },
        lifetimeBuyback: {
          title: 'LIFETIME BUYBACK',
          description: 'Sell your diamond jewellery back to us.',
          details: {
            'Studded Solitaire Mount': {
              text: 'Additional 10% will be deducted from the LTE value*'
            },
            'Unstudded Solitaire Mount': {
              text: 'Additional 3% will be deducted from the LTE value*'
            }
          },
          internationalNote: 'Not Applicable on International Orders'
        }
      }
    },
    {
      id: 'preset-solitaire',
      title: 'Preset Solitaire',
      content: {
        moneyBack: {
          title: '15 DAY MONEY-BACK',
          description: 'Applicable only on Online orders! For stores & TAH orders: We\'ve upgraded to a 15-Day Full Value Exchange! You can exchange your purchase for full value. No balance retained!',
          value: '100%',
          valueText: 'of Invoice value*',
          conditions: [
            '*UPTO Rs. 1,00,000',
            '*UPTO $1,500 for orders delivered in USA and Canada',
            'Get a 100% refund on returns & exchanges within 15 days, no questions asked, for UAE orders only*.',
            'Not applicable on Orders delivered to Australia, United Kingdom, Singapore and other countries.'
          ]
        },
        lifetimeExchange: {
          title: 'LIFETIME EXCHANGE',
          description: '',
          details: {
            '': {
              value: '100%',
              text: 'value of metal weight at the prevailing metal rate*'
            },
            '': {
              value: '100%',
              text: 'of the prevailing diamond value*'
            },
             '': {
              value: '90%',
              text: 'of the prevailing gemstone value*'
            },
            'Not applicable on international orders': {
              text: '* In case of any discount given during the original purchase on the metal and stone value, an equivalent amount will be deducted from the Exchange amount. The xCLusive Points used while placing an order will be deducted from the Lifetime Exchange value.'
            }
          }
        },
        lifetimeBuyback: {
          title: 'LIFETIME BUYBACK',
          description: '',
          details: {
            '': {
              text: 'Additional 10% will be deducted from the LTE value*',
              note: '*Maximum value of Rs. 10 lakhs'
            }
          },
          internationalNote: 'Not Applicable on International Orders'
        }
      }
    },
    {
      id: 'gold-coins',
      title: 'Gold Coins',
      content: {
        moneyBack: {
          title: '15 DAY MONEY-BACK/15DAY EXCHANGE/CANCELLATION',
          description: '-N/A-',
          value: '',
          valueText: '',
          conditions: [
            ''
          ]
        },
        lifetimeExchange: {
          title: 'LIFETIME EXCHANGE',
          description: '',
          details: {
            '': {
              value: '100%',
              text: 'value of gold weight at the prevailing gold rate'
            }
          }
        },
        lifetimeBuyback: {
          title: 'LIFETIME BUYBACK',
          description: '',
          details: {
            '': {
              text: '-N/A-'
            }
          }
        }
      }
    },
    {
      id: 'shipping',
      title: 'Shipping',
      content: {
        moneyBack: {
          title: '15 DAY MONEY-BACK/15DAY EXCHANGE/CANCELLATION',
          description: '',
          value: '',
          valueText: 'Complimentary',
          conditions: [
            '',
            
          ]
        },
        lifetimeExchange: {
          title: 'LIFETIME EXCHANGE',
          description: '',
          details: {
            '': {
              text: 'Complimentary'
            }
          }
        },
        lifetimeBuyback: {
          title: 'LIFETIME BUYBACK',
          description: '',
          details: {
            '': {
              text: 'Complimentary'
            }
          }
        }
      }
    }
  ];

  const ExpandedContent = ({ item }) => {
    const { moneyBack, lifetimeExchange, lifetimeBuyback, discountNote } = item.content;

    return (
      <div className="border-t border-gray-200 p-2 md:p-4 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
          {moneyBack && (
            <div className="p-2 md:p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{moneyBack.title}</h3>
              </div>
              <hr className="border-yellow-200 my-1" />
              <p className="text-gray-600 text-xs md:text-sm">{moneyBack.description}</p>
              <hr className="border-yellow-200 my-1" />
              <div className="mt-1">
                <span className="text-xl font-bold text-yellow-600">{moneyBack.value}</span>
                <span className="text-gray-700 ml-1 text-xs">{moneyBack.valueText}</span>
              </div>
              <div className="space-y-1 text-xs text-gray-700 mt-1">
                {moneyBack.conditions.map((condition, index) => (
                  <p key={index}>{condition}</p>
                ))}
              </div>
            </div>
          )}
          {lifetimeExchange && (
            <div className="p-2 md:p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <ArrowLeftRight className="w-4 h-4 text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{lifetimeExchange.title}</h3>
              </div>
              <hr className="border-yellow-200 my-1" />
              <p className="text-gray-600 text-xs md:text-sm">{lifetimeExchange.description}</p>
              <hr className="border-yellow-200 my-1" />
              {Object.entries(lifetimeExchange.details).map(([key, detail]) => (
                <div key={key} className="mt-1">
                  <h4 className="font-semibold text-gray-900 text-xs">{key}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-yellow-600">{detail.value}</span>
                    <span className="text-gray-700 text-xs">{detail.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {lifetimeBuyback && (
            <div className="p-2 md:p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{lifetimeBuyback.title}</h3>
              </div>
              <hr className="border-yellow-200 my-1" />
              <p className="text-gray-600 text-xs md:text-sm">{lifetimeBuyback.description}</p>
              <hr className="border-yellow-200 my-1" />
              {Object.entries(lifetimeBuyback.details).map(([key, detail]) => (
                <div key={key} className="mt-1">
                  <h4 className="font-semibold text-gray-900 text-xs">{key}</h4>
                  <p className="text-gray-700 text-xs">{detail.text}</p>
                  {detail.note && <p className="text-yellow-600 text-xs">{detail.note}</p>}
                </div>
              ))}
              {lifetimeBuyback.internationalNote && (
                <div className="mt-1">
                  <p className="text-gray-700 text-xs">{lifetimeBuyback.internationalNote}</p>
                </div>
              )}
            </div>
          )}
        </div>
        {discountNote && (
          <div className="mt-2 p-2 rounded-lg border border-gray-200">
            <p className="text-yellow-600 text-xs">{discountNote.text}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
    <Header/>
    <NavigationBar/>
    <div className="max-w-7xl mx-auto p-2 md:p-4 bg-white-50 min-h-screen mb-5 ">
      <div className="text-center mb-2">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">Return Policy</h1>
        <div className="w-12 h-0.5 bg-yellow-600 mx-auto my-1"></div>
        <p className="text-gray-600 text-xs md:text-base">Go ahead and shop with complete peace of mind!</p>
        <div className="mt-1">
          <Link to="/terms-and-conditions" className="text-yellow-600 hover:text-yellow-800 text-xs underline">
            See detailed Terms & Conditions
          </Link>
        </div>
      </div>

      <div className="space-y-0">
        {policyItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection(item.id)}
              className="w-full px-2 md:px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 text-base">+</span>
                <span className="font-medium text-gray-900 text-xs md:text-base">{item.title}</span>
              </div>
              {expandedSection === item.id ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {expandedSection === item.id && (
              <ExpandedContent item={item} />
            )}
          </div>
        ))}
      </div>
       <WarrantyPolicyUI/>
    </div>
   
    <Footer/>
    </>
    
  );
};

export default ReturnPolicy;