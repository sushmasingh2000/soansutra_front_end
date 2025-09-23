
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, MessageCircle } from 'lucide-react';

const WarrantyPolicyUI = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'buyback',
      title: 'Buyback & Exchanges:',
      content: (
        <div className="space-y-4 text-xs md:text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Customised Jewellery (including personalised/ engraved products) is not eligible for a 15 Day Money-Back or a 15 Day Exchange. Lifetime Exchange and Buyback are applicable.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Once your returned item is received, our Quality Assurance Department will review it.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>In case the customer cannot produce the original certificate, the company will send the solitaire/ jewellery to the lab for recertification, the shipping and certification cost of which shall be borne by the customer.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>In case, any coupon, discount or promo codes were used during the original purchase, the BuyBack / Exchange amount will be reduced by an amount equivalent to the coupon, discount or promo codes, as applicable.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>If the discount was on making charges, the discount will not be deducted while arriving at the Lifetime Exchange (LTE) value.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>If the discount was on the gold value or diamond value then the entire discount will be deducted while arriving at the LTE value.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>If the discount was on MRP, then the discount will be deducted on the actual making charges of the design while arriving at the final LTE value.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>In case the exchange value is higher than the value of the old product, the customer will have to pay the difference.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Kindly note that you may utilize your gold exchange and/or lifetime exchange value within 180 days of the transaction date. If not, the amount will be refunded post deduction of 10% transaction charges as per sonasutra policy.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>The prevailing market value will be determined by the company.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>This feature is not available for international orders (orders that will be shipped abroad from India).</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>sonasutra reserves the right to change the terms and conditions for specific customers. In such a situation, the customer will always be informed of the decision prior to the purchase.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Lifetime Exchange and Buyback values are calculated excluding the making charges and taxes.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Any new product purchased against LTE value or Old Gold Exchange Credit will be eligible for 100% exchange (15 days), LTE and Buyback but not eligible for 15 day money-back.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Additional 15% will be deducted from the LTE value if the customer does not have the invoice.</p>
          </div>

            <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>You can exchange your design within 15 days for the full value only once. If you wish to exchange the design the second time, it will be considered as a Lifetime Exchange.
</p>
          </div>

            <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Orders that are placed in India using an international card will be eligible for a 15 Day Exchange only.</p>
          </div>
        </div>
      )
    },
    {
      id: 'resizing',
      title: 'Resizing & Repairs:',
      content: (
        <div className="space-y-4 text-xs md:text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>If the resized ring costs more than the existing ring, the incremental cost shall be borne by the customer.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>If the resized ring costs less than the existing ring, the differential amount shall be refunded to the customer.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>In the case of a refund, the payment will be processed via online bank transfer within 10 days after dispatching the resized product.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>If for some reasons, your product needs to be repaired, the company shall repair / replace the product for charges which would be determined by the company on a case-by-case basis.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Standard repair cost for out-of-warranty products is ₹840. Any extra metal or raw materials used during the repair will incur additional charges.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>This feature is not available for international orders (orders that will be shipped abroad from India).</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Platinum products are not eligible for repairs.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Some products may not be repairable, and our repair facility will assess them to offer solutions on a case-by-case basis.</p>
          </div>
        </div>
      )
    },
    {
      id: 'warranty1year',
      title: '1 Year Replacement Warranty*',
      content: (
        <div className="space-y-4 text-xs md:text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>In case of quality issues that can't be repaired, we'll replace it!*</p>
          </div>
          <p className="text-xs md:text-sm text-gray-600">*Damages resulting from misuse, loss of parts (diamond, screw, etc.), neglect, or unauthorised repair attempts are not covered under the warranty policy. Valid only on orders below ₹2 lakh.</p>
        </div>
      )
    },
   {
      id: 'warranty6month',
      title: '6-Month Warranty (Rupika)',
      content: (
        <div className="space-y-6 text-xs md:text-sm text-gray-700">
          <p>We offer free repairs or exchanges for eligible issues within 6 months from the date of purchase.</p>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">What's covered in the 6-month free repair or exchange?</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Products having manufacturing defects</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Broken chains, hooks, tarnishing, and more (as assessed by our team)</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Free home pick-up and drop-off</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>For cases when Repairs are not possible, we may offer a one-time exchange, matching the original invoice value, based on the condition</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">What's Not Included:</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Damage due to regular wear and tear or rough use</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Coins, Articles, Rupika Home items</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Repairs After 6 Months</h4>
            <p className="mb-3">We understand that issues can arise even after 6 months - We've still got you covered!</p>
            
            <h4 className="font-semibold text-gray-900 mb-3">Paid Repair Services:</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Repairs are available at a nominal repair fee</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>You can drop by at any of the Rupika stores near you, and we can get the product inspected for Repair possibility, cost, and the time it would take</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>If you want the product to be picked up and dropped off at your home address, we charge a small fee of Rs. 199</p>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-xs md:text-sm text-gray-700">
              Repair costs will be confirmed after our expert team inspects your item. Turnaround time is typically 3-4 weeks
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">For any concerns related to return, exchange or repair, you can</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Visit any Rupika store or</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p>Contact our customer support team through the CaratLane app</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-xs md:text-sm font-medium text-gray-900">
              Thank you for choosing Rupika. We're here to keep your sparkle alive. heyRupika.com
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'RupikaDiamonds',
      title: 'Rupika Diamonds',
      content: (
        <div className="space-y-4 text-sm md:text-base text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>15-Day Exchange – Easy exchanges within 15 days of purchase.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>15-Day Moneyback- Applicable only on online orders, as per sonasutra policies.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>6-Month Warranty – Free repairs or exchanges for eligible issues.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Lifetime Replating/Repair (Paid) – Keep your jewellery shining with our paid lifetime care services.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Lifetime Exchange (with Invoice Reference): Customer can get 75% of the invoice value. (Exchange only, Buyback not available.)</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
            <p>Lifetime Exchange (without Invoice Reference): Customer can get 50% of the current SKU selling price. For SKUs no longer live, the value will be determined on a case-by-case basis.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white">
      {/* Contact Section */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm md:text-base mb-4">
          For any queries, feel free to contact us:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto">
            <Phone size={18} />
            <span className="font-medium">Call Us</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto">
            <MessageCircle size={18} />
            <span className="font-medium">Chat Now</span>
          </button>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <h3 className="text-base md:text-lg font-medium text-gray-900 pr-4">
                {section.title}
              </h3>
              <div className="flex-shrink-0">
                {expandedSections[section.id] ? (
                  <ChevronUp size={20} className="text-gray-600" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600" />
                )}
              </div>
            </button>
            
            {expandedSections[section.id] && (
              <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarrantyPolicyUI;

// Alternative named export (if needed)
export { WarrantyPolicyUI };
