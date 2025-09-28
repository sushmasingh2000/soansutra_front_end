
import React from 'react';

const Section = ({ title, children }) => (
  <div className="border-b border-gray-200 py-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <div className="text-gray-600 space-y-2">{children}</div>
  </div>
);

const TermItem = ({ number, text }) => (
  <p className="flex gap-2">
    <span className="font-medium text-gray-700">{number}.</span>
    <span>{text}</span>
  </p>
);

const TermsAndConditions = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 py-8 bg-white-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Terms & Conditions:
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Terms of Use Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-yellow-200">
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
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-yellow-200">
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
      <div className="container mx-auto p-4 max-w-8xl">
      <Section title="Definitions">
        <TermItem number="1" text="'Jewellery' means the jewellery that is predesigned or jewellery set with diamonds and / or gemstones that are available for sale on our website. Please note that all Jewellery is sold on 'as is' basis." />
        <TermItem number="2" text="'Mounts' are defined as designs that hold a diamond(s) / gemstone(s) in place, which may or may not have diamonds/gemstones. Members can select Mounts and diamonds separately to create customized Jewellery. 'Loose Diamonds' are individual diamonds that can be bought without being set on Mounts." />
      </Section>

      <Section title="SonaSutra Dazzle 12">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Enrollment</h3>
        <TermItem number="1" text="The customer can participate in the SonaSutra Dazzle 12 Scheme with a minimum monthly installment of ₹1000/- (Rupees One Thousand only) or above, i.e., in multiples of ₹1000/- (Rupees One Thousand only). It is made clear that no fractional amounts can be paid by a customer in a scheme." />
        <TermItem number="2" text="The date on which the first monthly installment is paid by the customer shall be considered as the enrollment date." />
        <TermItem number="3" text="Only individuals above the age of 18 can enroll in the SonaSutra Dazzle 12 Scheme. The Company reserves the right to obtain proof for the same from a customer." />
        <TermItem number="4" text="Under the SonaSutra Dazzle 12 Scheme, the individual is required to make payment for nine fixed monthly installments. After the payment of the ninth monthly installment, SonaSutra will offer a discount/benefit as mentioned below ('Discount/ benefit')." />
        <TermItem number="5" text="For monthly installments amounting to ₹19,000/- or above (collectively for all active SonaSutra Dazzle 12 Scheme), the PAN card of the customer shall be collected as mandatory KYC proof." />
        <TermItem number="6" text="The SonaSutra Dazzle 12 Scheme can be redeemed online on the website of the Company www.SonaSutra.in or at any SonaSutra store or during a try-at-home appointment." />
        <TermItem number="7" text="In case auto debit facility has been availed by the customer, the limit for such auto debit facility shall be as below: Auto Debit on Credit/Debit Card would be available up to a limit of ₹5,000/- per installment. Auto Debit on UPI ID would be available up to a limit of ₹15,000/- per installment. Auto debit will be automatically disabled by the company if it fails after three attempts for any reason." />
        <TermItem number="8" text="Once the first installment is paid, the installment amount cannot be altered." />
        <TermItem number="9" text="Merging of two SonaSutra Dazzle 12 Scheme accounts is permitted. Customers may also open and run multiple Dazzle 12 Schemes simultaneously." />
        <TermItem number="10" text="Entities such as companies, partnership firms, proprietorship concerns or trusts, Hindu Undivided Family (HUF) or NRIs, international users and minors (under the age of 18 years) are not eligible to enroll under the SonaSutra Dazzle 12 Scheme." />
      </Section>

      <Section title="Redemption">
        <TermItem number="11" text="The customer’s redemption window opens after the Cool Off Period (From the 271st day after Cool Off Period, the preset solitaires would be able to redeem the SonaSutra Dazzle 12 scheme)" />
        <TermItem number="12" text="The SonaSutra Dazzle 12 Scheme Value can be utilised to purchase any Diamond / Gemstone / Platinum / Preset Solitaires / Shaya / Silver Jewellery / Loose solitaire. The SonaSutra Dazzle 12 Scheme cannot be utilised on purchase of 22KT Jewellery, Gold coins, Gift Cards and, or cannot be utilised to pay for repair services. The SonaSutra Dazzle 12 Scheme value can be utilised on purchase of Plain gold jewellery (unstudded) subject to Discount/Benefit shall be restricted to 50% of the one month’s installment." />
        <TermItem number="13" text="A grace period of 10 days will be provided after the due date to make the monthly payment. In case there is a delay in paying the monthly amount within the grace period, the discount provided by SonaSutra shall be reduced proportionally to the number of days by which the payment was delayed." />
        <TermItem number="14" text="The SonaSutra Dazzle 12 Scheme value needs to be redeemed completely in one purchase. Partial redemption is not permitted. The customer is allowed to purchase multiple products, but such products have to be billed together." />
        <TermItem number="15" text="Merging of two SonaSutra Dazzle 12 Scheme accounts is permitted. Customers may also open and run multiple Dazzle 12 Schemes simultaneously." />
        <TermItem number="16" text="SonaSutra Dazzle 12 cannot be combined with The Golden Harvest Scheme from Tanisth." />
        <TermItem number="17" text="Doctor, Armed Forces, and Payday Promotion Discounts cannot be utilised along with the SonaSutra Dazzle 12 Redemption Scheme." />
        <TermItem number="18" text="Customers can club coupons or xCLusive points earned from the previous purchase along with the SonaSutra Dazzle 12 balance at the time of redemption. However, free xCLusive points e.g. points earned via referrals, profile completion, website reviews, promotional points etc., cannot be redeemed with the SonaSutra Dazzle 12 balance. However, if the customer chooses to redeem the SonaSutra Dazzle 12 Scheme without discount, the given discount shall not apply." />
      </Section>

      <Section title="Cancellation">
        <TermItem number="19" text="The customer may redeem the scheme during the tenure; the amount of the monthly installment deposited by the customer can be redeemed only against the purchase of jewellery. In the event of partial completion of the scheme, no benefit/discount will be provided by SonaSutra. Customers shall not be refunded money by way of cheque/Cash/online transfer." />
      </Section>

      <Section title="Dazzle 12 Edge">
        <TermItem number="20" text="Under the SonaSutra Dazzle 12 Edge Scheme, upon the first installment payment, the quantity of gold units equivalent to the installment amount divided by the gold rate is allocated to the customer’s account. For the second and subsequent installments, the quantity of gold units is calculated based on the gold rate at the time of each installment payment and added to the customer’s account. The gold rate refers to the 24 Karat 995 Gold Selling rate as listed on the SonaSutra website at the specific date and time." />
        <TermItem number="21" text="The SonaSutra Dazzle 12 Edge Scheme cannot be converted back to the SonaSutra Dazzle 12 Icon Scheme either at the time of redemption or at any point during the scheme term. The amount accumulated under the SonaSutra Dazzle 12 Edge Scheme can only be redeemed for the purchase of diamonds, presets, or loose solitaires." />
        <TermItem number="22" text="The SonaSutra Dazzle 12 Edge Scheme is redeemable only against diamond studded jewellery, Platinum studded, Gemstone studded, presets, loose solitaires & Shaya products. SonaSutra Dazzle 12 Edge Scheme is not redeemable against any other products except listed above." />
        <TermItem number="23" text="The customer will benefit if the gold rate rises above the weighted average rate of their accumulated gold units. Conversely, if the gold rate decreases, the customer will incur a loss. The company will not be liable for any loss resulting from a decrease in the gold rate. However, regardless of whether the gold rate increases or decreases, the customer will continue to receive a benefit or discount equivalent to one installment, as per the SonaSutra Dazzle 12 Icon Scheme." />
        <TermItem number="24" text="The customer cannot cancel the scheme during its tenure. In such cases, the accumulated installments will be available for redemption once the maturity period begins. The redeemable value will be equal to the gold rate at the date and time of redemption. If the scheme is partially completed, the discount of one month’s installment or any proportionate value will not be provided by the company. The customer will not receive a refund via cheque, cash, or online transfer." />
      </Section>

      <Section title="Disclaimer">
        <TermItem number="25" text="SonaSutra reserves the right to alter, amend, add, or delete part or whole of the terms of the program without prior notice to the customer, if the same is not detrimental to the interests of the customer." />
        <TermItem number="26" text="The liability of the company or its franchisee(s) under the SonaSutra Dazzle 12 scheme is limited to the extent of installment paid by the customer(s) and the accrued discount amount, as per the SonaSutra Dazzle 12 scheme and the Terms & Conditions contained herein." />
        <TermItem number="27" text="The Terms & Conditions listed herein do not in any way indicate any assurance or warranty whatsoever by the Company." />
        <TermItem number="28" text="The company is the operator of this program and reserves the right to suspend, modify or end the program at any time. In any such event, the customer may purchase any item from SonaSutra through its website/store or try-at-home option equal to the value of the installments accumulated by the customer during the program along with the purchase-linked discount amount accumulated, as on that day. This clause shall also have effect if the program is left infructuous due to a change in any applicable law, rule, regulation, or norm." />
        <TermItem number="29" text="All jewellery purchased under this program will be subject to labour/making charges/wastage, goods and service tax, surcharges, gold/stone/ charges and any other charges as may be applicable, subject to applicable discounts as stated herein." />
        <TermItem number="30" text="The customer shall not have recourse to any damages, costs, or interest." />
        <TermItem number="31" text="Any conditions that are not explicitly covered above would be at the discretion of the Company at the time of transaction/redemption. The decision of the Company in this regard would be deemed irrevocable and final. Disputes, if any, shall be resolved in the courts of Varanasi jurisdiction only." />
        <TermItem number="32" text="The customer must maintain correct and updated contact details and payment details with Sonasutra once enroled. The Company will not be liable for any loss to the customer as a result of incorrect or out-of-date information provided to the Company." />
      </Section>

      <Section title="e-swarna Gift Card">
        <TermItem number="1" text="This Gift Card, powered by SonaSutra Digital Gold, can be purchased at the SonaSutra Stores." />
        <TermItem number="2" text="The Gift Card shall be purchased at a minimum value of ₹5000 and up to a maximum value of ₹50,000 only." />
        <TermItem number="3" text="Once the Gift Card is gifted, the Receiver shall claim the Gift Card at the SonaSutra stores/Website and the value of gift card shall be transferred to the vault in the digital gold format." />
        <TermItem number="4" text="The receiver has the option either to redeem or sell it at the SonaSutra store or website." />
        <TermItem number="5" text="The SonaSutra digital Gold Gift Card will be purchased at the prevailing rate mentioned at our e-swarna website at the time of purchase. The corresponding grams of gold shall be accumulated and stored in a secured vault." />
        <TermItem number="6" text="SonaSutra e-swarna gift card does not have an expiry date, ensuring uninterrupted access to its benefits." />
        <TermItem number="7" text="This SonaSutra digital gold gift card shall be redeemed at the SonaSutra stores and/or through its website for any product except Shaya products at the prevailing digital gold price at the time of redemption." />
        <TermItem number="8" text="This gift card shall be for a one-time use to the value it has been gifted." />
        <TermItem number="9" text="This gift card transaction is non-refundable." />
        <TermItem number="10" text="Resale of this card is strictly prohibited." />
        <TermItem number="11" text="SonaSutra shall not be held responsible for lost, stolen or damaged of the gift cards." />
        <TermItem number="12" text="During the redemption process, you shall bear the additional cost, if the purchase value of the products exceeds the amount of the gift card and the same shall be paid by you any form of payment." />
        <TermItem number="13" text="During the redemption process, there should be no refund/cashback against the value of the gift card exceeds the purchase value. The balance amount shall be retained as digital gold at the vault and shall be redeemed/sold later." />
        <TermItem number="14" text="Terms and conditions of this gift card are subject to change and the updated Terms and Conditions are available on our website." />
        <TermItem number="15" text="The gift card value may be subject to change based on the prevailing rate of the e-swarna grams added to the gift card. Please visit the e-swarna Buy page to check the latest price" />
        <TermItem number="16" text="For any queries related to this Gift Card, contact us at cs@SonaSutra.in or call +91-44-4293-5000" />
      </Section>
    </div>
     <div className="content ml-6">
          <div className="section">
            <h1 className="text-2xl font-bold text-yellow-800 border-b-2 border-yellow-800 pb-2">TAT Payments T&C</h1>
            <h2 className="text-xl font-semibold mt-4">SonaSutra Trading Pvt Ltd - Card on File Tokenisation Services</h2>
            <p className="mt-4 text-gray-700">
              SonaSutra Trading Pvt Ltd is offering, inter alia, Card on File Tokenisation Services ("COFT Services"), through the Tata Payments Limited ("TPLatform") in association with third-party partners through which users of the Platform ("User" or "you") may tokenise their valid credit cards, debit cards etc. issued by authorised card issuers ("Card(s)") for the purpose of future payment transactions. By proceeding to use COFT Services, you signify your consent to avail COFT Services and to be bound by these terms of use (hereinafter "COFT Terms") in addition to the Tata Pay User Agreement ("General Terms"). Capitalized terms used but not defined shall bear the same meaning as ascribed to it in the General Terms. We reserve the right, in our discretion, to make changes or modifications to COFT Terms at any time for any reason. We will alert you about any changes by updating the 'Last updated' date of these COFT Terms and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these COFT Terms to stay informed of updates. You will be subject to and will be deemed to have been made aware of and to have accepted, the changes in any revised COFT Terms by your continued use of COFT Services after the date such revised terms are posted. Wherever the context requires, User shall mean any natural or legal person who is a resident of India, at least 18 (eighteen) years of age, who is eligible to contract within the meaning of the Indian Contract Act, 1872, and is not an undischarged insolvent. When you avail COFT Services from TPL, respective Merchant’s Terms and Conditions and applicable laws, regulations in relation thereto including but not limited to any guidelines issued by the RBI will be applicable to you in addition to these COFT Terms. By impliedly or expressly accepting COFT Terms, you also agree and consent to be bound by all relevant policies of TPL including the Privacy Policy as available on the Platform and at https://www.SonaSutra.in/terms-and-conditions.
            </p>
          </div>

          <div className="section">
            <h2 className="text-xl font-semibold mt-4">Tokenisation Terms and Conditions</h2>
            <ol className="list-decimal ml-6 mt-4 text-gray-700">
              <li><strong>Definitions:</strong>
                <ol className="list-decimal ml-6 mt-4 mb-4">
                  <li>"Cardmember" shall mean the User to whom the valid Card has been issued by an authorised card issuer.</li>
                  <li>"PAN" means the primary card account number that identifies card issuer and particular Cardmember account.</li>
                  <li>"Token" means a surrogate value which corresponds to a PAN.</li>
                  <li>"Tokenised Card" shall mean the Cardmember's Card for which unique Token has been assigned on the Platform.</li>
                  <li>"Tokenised Card Transaction" shall mean the transaction effected by using the Tokenised Card for making payment to any other person.</li>
                  <li>"Token Requestor" shall mean TPL or TPL's service provider which is acting in the capacity of token requestor with token service provider for providing Tokenisation Service.</li>
                  <li>"Tokenisation Service" shall mean the service of replacement of actual Card details of Cardmembers with Token; and other processes involving Tokens which shall include but not be limited to transaction processing or deregistration of Tokens.</li>
                </ol>
              </li>
              <li><strong className='mt-4'>Tokenisation of Cards</strong>
                <ol className="list-decimal ml-6 mt-4">
                  <li>The Cardmember hereby acknowledges and agrees that:
                    <ol className="list-decimal ml-6 mt-4 mb-4">
                      <li>The Cardmember may initiate a request to Token Requestor for Tokenisation of Card after providing explicit consent.</li>
                      <li>Token Requestor will collect relevant data including Card details and share the same with its third-party partners, card issuers and card networks for the purpose of providing the Tokenisation Services.</li>
                      <li>The Cardmember shall provide all the requisite consents required by the Token Requestor for sharing of any information with any person (including, without limitation, the Bank) of the Cardmember and/or the Tokenised Card for all purposes relevant to the Tokenisation and/or in respect of the Tokenised Card Transactions.</li>
                      <li>TPL, card networks, card issuers and TPL's third-party partners will have the right to use, transfer and process the data collected from you by TPL to provide the Tokenisation Services. Such use, transfer and processing will be in accordance with the applicable laws and may be used by card networks for various purposes including internal research, fraud, security, and risk management. TPL, card networks, card issuers or merchants in their sole discretion, shall allow or deny tokenisation of the Card on the Platform and such decision of TPL, card networks, card issuers or merchants shall be final and binding on the Cardmember.</li>
                      <li>The use of the Tokenised Card may be subject to certain transaction limits (whether in value or number of transaction) imposed from time to time, by your card issuer or in terms of the applicable law or internal policies and procedure of your card issuer, card network or TPL.</li>
                      <li>The laws of India without regard to the principles of conflict of laws will govern the Tokenisation Services and any dispute of any kind that may arise between you and TPL. The Cardmember will at all times adhere to all applicable laws, rules, and regulations applicable to use of the Tokenisation Services.</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li><strong>Loss/misuse of Tokenised Cards</strong>
                <ol className="list-decimal ml-6 mt-4 mb-4">
                  <li>The Cardmember must immediately notify respective bank/card issuer if Token/Card is misplaced, damaged, lost or stolen or if the Cardmember suspects that the Token/Card is being used without Cardmember's permission.</li>
                  <li>If the Tokenised Card is hot-listed due to card damage, loss or theft and such Tokenised Card is blocked by card issuer or card network, TPL shall not be liable or responsible for any transaction incurred using the Tokenised Card prior to the time the Tokenised Card was blocked, and the Cardmember will be wholly liable for the same.</li>
                  <li>The Cardmember shall be solely liable for all losses in case of misuse of the Tokenised Card by someone who obtained access to the Tokenised Card with the consent of the Cardmember. In case of any query, the Cardmember can write to us at support@sonasutra.in mentioning the registered mobile number on SonaSutra.</li>
                </ol>
              </li>
              <li><strong>Cardmember's Undertakings</strong>
                <ol className="list-decimal ml-6 mt-4 mb-4">
                  <li>The Cardmember undertakes to take appropriate security measures in relation to Tokenised Card including, without limitation, ensuring that no person has unauthorised access to the Tokenised Card.</li>
                  <li>The Cardmember shall strictly comply with the terms of the card issuer.</li>
                  <li>The Cardmember shall be fully and solely responsible for any disclosure of the details of Cards/Tokenised Card details, password/security credentials or other security details even if such disclosure is accidental or unauthorised. The Cardmember shall be solely responsible for all risks and consequences of the Tokenised Card being used by unauthorised persons or for unauthorised purposes, if any.</li>
                  <li>The Cardmember hereby agrees that the Cardmember is aware of the various risks (including, without limitation, fraudulent usage of Tokenised Card) associated with usage of the Tokenised Card. The Cardmember hereby agrees and undertakes to assume and bear all the risks involved in respect of Tokenised Card and usage of the same and TPL shall not be responsible in any manner for the same and shall also not be liable for any claims, loss, damage, cost, expense and liability arising therefrom or in connection therewith.</li>
                </ol>
              </li>
              <li><strong>De-registration of Token</strong>
                <p className="mt-4 mb-4 text-gray-700">
                  To delete your saved card details, please reach out to our support team at support@sonasutra.in. Provide them with the necessary information, and they will assist you in removing your card from the system.
                </p>
              </li>
              <li><strong>Disclaimer</strong>
                <ol className="list-decimal ml-6 mt-2">
                  <li>You agree that:
                    <ol className="list-decimal ml-6 mt-2 mb-4">
                      <li>All risks arising from online transactions using Tokenised Cards will be borne by you; and</li>
                      <li>Tokenisation Service is provided on an 'as is' basis.</li>
                    </ol>
                  </li>
                  <li>TPL and any third-party partners make no warranty, express or implied, regarding the quality of the Tokenisation Services including but not limited to the following:
                    <ol className="list-decimal ml-6 mt-2 mb-4">
                      <li>The Tokenisation Services will meet your requirements;</li>
                      <li>The Tokenisation Services will be uninterrupted, timely, or error-free; or</li>
                      <li>Any products, information, or material obtained by you in connection with the Tokenisation Services will meet your requirements.</li>
                    </ol>
                  </li>
                  <li >Except as otherwise expressly set forth in these terms, all provisions of the General Terms, including without limitation, with respect to term and termination, intellectual property, indemnity and limitation of liability, privacy, and compliance with applicable laws, shall apply to the Tokenisation Services. Any breach by you of these terms shall be deemed to be a breach of General Terms.</li>
                  <ol className="list-decimal ml-6 mt-2  mb-4">
                      <li>with respect to the COFT Services, these COFT Terms shall prevail;</li>
                      <li>for all other matters, General Terms shall prevail.</li>
                      
                    </ol>
                </ol>
              </li>
            </ol>
          </div>

          <div className="section">
            <h2 className="text-xl font-semibold">Card Tokenisation Process</h2>
            <p className="mt-6 mb-6 text-gray-700">
              As per the new RBI guidelines effective from October 1, 2022, merchants can no longer save user credit or debit card details. Instead, users must enter their complete card details for every payment done via card. Users can provide their consent, allowing SonaSutra to tokenize (encrypt) and save their card as per new RBI guidelines. This means that SonaSutra asks your card network to encrypt your card details with additional authentication. SonaSutra receives the encrypted details which will be saved and used for future transactions instead of your actual card details. Tokenisation refers to the replacement of actual card details with an alternate code called the "token," which shall be unique for a combination of card, token requestor (i.e., the entity which accepts a request from the user for tokenisation of a card and passes it on to the card network to issue a corresponding token), and merchant. It is safer and more secure than just saving your card as your card number is replaced with tokens for all transactions, and the card number is not shared for subsequent transactions. As per RBI guidelines, cards can be tokenized only by authorized entities referred to as Token Service Providers. These entities can be a bank or a card network, e.g., Visa, Mastercard, Rupay, etc. Until September 30, 2022, you can give your consent to tokenize all your saved cards. Navigate to the payments page, select a card, provide consent, and OTP to tokenize your card. As per the RBI guidelines, you need to provide consent to save each card separately. We currently support only India-issued personal credit and debit cards of VISA, Mastercard, Rupay, Amex, and Diners card networks. Support for other card networks will be updated as and when we are ready. Cards for which we do not have your consent by September 30, 2022, will be removed, and you will need to enter the full card details to complete every payment. The card needs to be saved across every account by each user individually. The new RBI guidelines are only applicable for online/e-commerce transactions. Tokenizing a card is not mandatory; however, RBI has disallowed saving card details without tokenization. Hence, if you do not tokenize your card, we will delete all your saved cards after September 30, 2022, and you will need to enter the complete card details, which includes card number, expiry date, and CVV, every time while making a payment. We recommend that you do so, as it will ensure your payment experience remains as seamless as before. Cards for which we haven't received consent by September 30, 2022, will be deleted as per RBI guidelines.
            </p>
          </div>

          <div className="section">
            <h2 className="text-xl font-semibold">Card Deletion Process</h2>
            <p className="mt-2 text-gray-700">
              Users can reach out to our customer support desk at support@sonasutra.in to put in a request for deletion of saved cards. If you raise a request with our team to delete the card, all the saved cards will be deleted. We cannot delete one of the details. Hence, you have to re-save the card that you may want to use. Users have to provide their registered Email ID and registered mobile number to the customer care executive. It will take 24-48 working hours to delete the saved cards.
            </p>
          </div>
        </div>
        <div className="mx-6 mt-8 mb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration:</h1>
      <p className="text-gray-700 mb-4">
        Users may register on the Website to become Members prior to the completion of any transaction on the Website. Guest checkouts will be provided with a user account on completion of purchase.
      </p>
      <p className="text-gray-700 mb-4">
        To register onto the Website the User will have to provide Personal Information (as defined in the Privacy Policy), including but not limited name, e-mail, contact number, contact address and customer verification question (example: your mother's maiden name), which will be used for verification purposes.
      </p>
      <p className="text-gray-700 mb-4">
        Registration is only a one time process and if the Member has previously registered, he/she shall login / sign into his / her account.
      </p>

      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Order</h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Retail Purchase</h2>
          <p className="text-gray-700 mb-2">
            Any Member who wishes to purchase an item from the Website can either:
          </p>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li className="mb-2">Add the selected diamond(s) directly to the shopping cart or</li>
            <li className="mb-2">Customize jewellery by adding diamond(s) to a ring, pendant, earring or any other type of jewellery that is expressly stated as customizable on the Website and then add the item to the shopping cart; or</li>
            <li className="mb-2">Choose from the selection of Jewellery available on the Website and add the item to the shopping cart; or</li>
            <li className="mb-2">Call our trained consultants on +(91) 44 4293 5000 to place an order. The Member will receive the form for ordering via email/fax/courier based on their convenience.</li>
          </ol>
          <p className="text-gray-700 mb-2">
            In the event of a User wishing to make a purchase, the User may be required to register on the website after adding the item(s) to the shopping cart. If the product value is over ₹50,000, at the time of purchase the Members shall also provide mandatory information required under law like Permanent Account Number (PAN) and/or GST number.
          </p>
          <p className="text-gray-700 mb-2">
            Orders, are normally considered complete only after the payment has been received by sonasutra.in.
          </p>
          <p className="text-gray-700 mb-2">
            To confirm the orders, SonaSutra.in may at random, call up the Members who have placed orders through the Website and ask the Member a verification question.<br/>
            SonaSutra.in will confirm the order only after the verification question is answered by the Member.
          </p>

          <p className="text-gray-700 mb-2">
            Once the purchase of item(s) is confirmed, SonaSutra.in:
          </p>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li className="mb-2">n the case of Loose Diamond or customised jewellery - order for the diamond(s), set it on the Mount and deliver it to the Member; or</li>
            <li className="mb-2">In the case of Jewellery - order for the manufacture of the Jewellery and deliver it to the Member.</li>
            <li className="mb-2">In the event the bank rejects to honour any payment transaction made by a Member towards an order, SonaSutra.in shall have the right to refuse to ship the order to the Member without any liability whatsoever.</li>
          </ol>

        </div>
        <div className="md:w-1/2 ml-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 ">RBI Mandate for PAN Card and COD</h2>
          <p className="text-gray-700 mb-2">
            1. PAN CARD proof is mandatory for orders above Rs. 200,000. Order will be cancelled if the customer fails to produce the same.
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Extension Of Privileges</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">5% Instant Discount on SBI Credit Cards: 23rd–29th October, 2024</h2>
      <p className="text-gray-700 mb-2">
        1. The minimum transaction value is ₹25,000
      </p>
      <p className="text-gray-700 mb-2">
        2. Maximum instant discount that can be availed during the validity of the Program is ₹2,000 per SBI Credit Cards, per channel.
      </p>
      <p className="text-gray-700 mb-2">
        3. The offer is valid on the purchase of jewellery online on the website/app, and once at a SonaSutra store.
      </p>
      <p className="text-gray-700 mb-2">
        4. Offer is valid from 23rd to 29th October, 2024.
      </p>
      <p className="text-gray-700 mb-2">
        Detailed Terms and Conditions:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li className="mb-2">- The offer is applicable only on studded designs and is not valid for gold coins, 22KT, un-studded, presets, loose diamonds, or platinum</li>
        <li className="mb-2">- The offer is not valid on corporate cards and cards issued outside of India.</li>
        <li className="mb-2">- Available / Ongoing offers can be clubbed with this offer. The final swipe/bill amount post the redemption of promo code/xCLusive points should be ₹25,000 to be eligible for the offer.</li>
        <li className="mb-2">- All government levies, like GST, Sales Tax, TDS, any Local Tax, Octroi etc., shall be payable by the Cardholder as applicable during the offer period.</li>
        <li className="mb-2">- This offer is applicable on SBI Credit Cards and is not applicable on Corporate Cards, Paytm SBI Cards, Rupay Credit Card transactions done via UPI or cards issued outside of India.</li>
        <li className="mb-2">- Any queries regarding the program will be entertained only until 29th November 2024. Post such date, SBI won't entertain any correspondence or communication regarding this program.</li>
        <li className="mb-2">- The relationship between SBI Bank and the cardholder is confidential in nature, and their relationship dynamics are not visible to SonaSutra.</li>
        <li className="mb-2">- SonaSutra reserves the right to cancel this program or alter it, without any prior notice.</li>
      </ul>

      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Made-To-Order Jewellery</h1>
      <p className="text-gray-700 mb-2">
        1. If a customer cancels a made-to-order jewellery order, the advance amount will be refunded to the customer.
      </p>
      <p className="text-gray-700 mb-2">
        2. In case a customer cancels a customised made-to-order jewellery order, there will be a 25% deduction of the order value before the refund is processed to the customer.
      </p>
      <p className="text-gray-700 mb-2">
        3. If a customer does not pick up a made-to-order jewellery order within 60 days from the store, the order will stand cancelled, and the advance amount will be refunded to the customer in the form of a gift card.
      </p>
      <p className="text-gray-700 mb-2">
        4. In case a customer does not pick up a customised made-to-order jewellery order within 60 days from the store, the order will be cancelled and 25% of the order value will be deducted and the balance amount will be refunded to the customer in the form of a gift card.
      </p>

      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">#MySonaSutraStory</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Usage Rights Of #MySonaSutraStory</h2>
      <p className="text-gray-700 mb-2">
        SonaSutra reserves the right to use all customer stories / videos / images / testimonials / User Generated Content / Reviews / #MySonaSutraStory for business promotion purposes across platforms in perpetuity.
      </p>
      <p className="text-gray-700 mb-2">
        1. Only video entries will be considered for this giveaway.
      </p>
      <p className="text-gray-700 mb-2">
        2. Every Wednesday, 5 winners will be announced on SonaSutra's Instagram page. They will receive diamond jewellery worth ₹20k, and 10 winners will receive SonaSutra vouchers worth ₹5k.
      </p>
      <p className="text-gray-700 mb-2">
        3. Only one unique entry per purchase will be considered for the giveaway.
      </p>

      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">SonaSutra esuvarna</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">esuvarna Gift Card</h2>
      <p className="text-gray-700 mb-2">
        1. This Gift Card, powered by SonaSutra Digital Gold, can be purchased at the SonaSutra Stores.
      </p>
      <p className="text-gray-700 mb-2">
        2. The Gift Card shall be purchased at a minimum value of ₹5000 and up to a maximum value of ₹50,000 only.
      </p>
      <p className="text-gray-700 mb-2">
        3. Once the Gift Card is gifted, the Receiver shall claim the Gift Card at the SonaSutra stores/Website and the value of gift card shall be transferred to the vault in the digital gold format.
      </p>
      <p className="text-gray-700 mb-2">
        4. The receiver has the option either to redeem or sell it at the SonaSutra store or website.
      </p>
      <p className="text-gray-700 mb-2">
        5. The SonaSutra digital Gold Gift Card shall be purchased at the prevailing rate mentioned at our esuvarna website at the time of purchase. The corresponding grams of gold shall be accumulated and stored in a secured vault.
      </p>
      <p className="text-gray-700 mb-2">
        6. SonaSutra esuvarna gift card does not have an expiry date, ensuring uninterrupted access to its benefits.
      </p>
      <p className="text-gray-700 mb-2">
        7. This SonaSutra digital gold gift card shall be redeemed at the SonaSutra stores and/or through its website for any product except Shunya products at the prevailing digital gold price at the time of redemption.
      </p>
      <p className="text-gray-700 mb-2">
        8. This gift card shall be for a one-time use to the value it has been gifted.
      </p>
      <p className="text-gray-700 mb-2">
        9. This gift card transaction is non-refundable.
      </p>
      <p className="text-gray-700 mb-2">
        10. Resale of this card is strictly prohibited.
      </p>
      <p className="text-gray-700 mb-2">
        11. SonaSutra shall not be held responsible for lost, stolen or damage of the gift cards.
      </p>
      <p className="text-gray-700 mb-2">
        12. During the redemption process, you shall bear the additional cost, if the purchase value of the products exceeds the amount of the gift card and the same shall be paid by you by any form of payment.
      </p>
      <p className="text-gray-700 mb-2">
        13. During the redemption process, there shall be no refund/cashback availed if the value of the gift card exceeds the purchase value. The balance amount shall be retained as digital gold at the vault and shall be redeemed/sold later.
      </p>
      <p className="text-gray-700 mb-2">
        14. Terms and conditions of this gift card are subject to change and the updated Terms and Conditions are available on our website.
      </p>
      <p className="text-gray-700 mb-2">
        15. The gift card value may be subject to change based on the prevailing rate of the esuvarna grams added to the gift card. Please visit the esuvarna Buy page to check the latest price
      </p>
      <p className="text-gray-700 mb-2">
        16. For any queries related to this Gift Card, contact us at cs@sonasutra.in or call +91-44-4293-5000
      </p>

      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Online Order Verification Process</h1>
      <p className="text-gray-700 mb-2">
        1. Identification Proof Requirement: SonaSutra may request government identification proof for verification in specific cases, including but not limited to:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li className="mb-2">Gold coin orders (Orders will be approved within 72 hours upon receiving the required documents)</li>
        <li className="mb-2">Safe gold orders</li>
        <li className="mb-2">Digi gold orders</li>
        <li className="mb-2">Gateway alert orders</li>
      </ul>
      <p className="text-gray-700 mb-2">
        2. Purpose of Verification: This verification step has been implemented to:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li className="mb-2">Safeguard customer interests</li>
        <li className="mb-2">Eliminate any potential fraudulent activities</li>
      </ul>
      <p className="text-gray-700 mb-2">
        3. Accepted Identification Proofs: Customers may be asked to provide any of the following government-issued identification proofs:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li className="mb-2">Aadhaar Card</li>
        <li className="mb-2">PAN Card</li>
        <li className="mb-2">Driving License</li>
        <li className="mb-2">Voter ID</li>
      </ul>
      <p className="text-gray-700 mb-2">
        4. Verification Process:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li className="mb-2">Once the required documents are received, SonaSutra will proceed with further verification.</li>
        <li className="mb-2">Upon successful verification, the order will be processed and shipped.</li>
        <li className="mb-2">Customers will receive a notification once the order has been shipped.</li>
      </ul>
    </div>
    </div>
  );
};

export default TermsAndConditions;
