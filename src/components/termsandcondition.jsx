import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-9xl mx-auto px-4 py-8 bg-white-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Terms & Conditions:
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Terms of Use Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-purple-200">
              Terms of Use
            </h2>
            
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Please read these terms of use carefully before using this website. If you do not agree 
                to these Terms of Use you may not use this Website. By using this Website, you signify 
                your explicit assent to these Terms of Use as well as the Website's Privacy Policy (which 
                is hereby incorporated by reference herein).
              </p>
              
              <p>
                These Terms of Use sets out the legally binding terms of services available on the 
                Website as well as the terms of use of this Website. These Terms of Use along with 
                the Privacy Policy extends to both users, who visit the Website but do not transact 
                business on the Website ("Users / Guests") as well as users who are registered with 
                the Website to transact business on the Website ("Members").
              </p>
              
              <p>
                The Company reserves the right to modify or terminate any portion of the Website or 
                the Services offered by the Company for any reason, without notice and without 
                liability to you or any third party. You are responsible for regularly reviewing these 
                Terms of Use so that you will be apprised of changes, if any. Nothing in these Terms of 
                Use should be construed to confer any rights to third party beneficiaries. All jewelry 
                items are hallmarked and certified according to applicable government regulations.
              </p>
            </div>
          </div>
          
          {/* Our Promise Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-purple-200">
              Our Promise
            </h2>
            
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                This Website provides access to jewelry shopping, pricing, news and other information services 
                related to diamonds, precious gems, gold, silver and fine jewelry. Certain Services available on this 
                Website are for the use of Members only. Please note that some of the terms under 
                these Terms of Use, differ for purchases for personal consumption and for investment 
                purposes.
              </p>
              
              <p>
                This Website offers services for Members who wish to purchase jewelry, diamonds, and precious stones 
                for personal consumption, inclusive of customized and readymade jewelry collections. The 
                Website also offers services for precious metal investments. The Website displays 
                jewelry and gemstones that are specifically recommended for various occasions and purposes. 
                The Website will also feature recommendations from certified gemologists and jewelry experts. 
                Expert recommendations are provided for guidance only and the Company shall not be held liable for any loss 
                or damage suffered by Members who rely on such recommendations.
              </p>
              
              <p>
                Some items may appear slightly larger or smaller than actual size due to screen 
                resolution and photography techniques. Sometimes the items may be represented larger 
                than the actual size in order to clearly show details or smaller than the actual size in 
                order to show the entire item clearly. The Company shall not be liable for any legal action on 
                this account. All product images are for illustration purposes only and actual products may vary slightly.
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional Terms Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Terms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">exchange Policy</h4>
              <p>All jewelry purchases are eligible for exchanges within 30 days of delivery, subject to condition and authenticity verification.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Warranty</h4>
              <p>We provide lifetime warranty on craftsmanship and a certificate of authenticity with every purchase of precious metals and stones.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Privacy</h4>
              <p>Your personal information is protected under our Privacy Policy and will never be shared with third parties without consent.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Contact</h4>
              <p>For any queries regarding these terms or our services, please contact our customer support team through the website.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;