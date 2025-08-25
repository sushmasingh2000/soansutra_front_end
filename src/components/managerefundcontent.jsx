import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ManageRefundsContent = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Manage Refunds
          </h1>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
            Sharing bank account/UPI details is mandatory to complete CTC
            instalment/Refund flow as per guidelines.
          </p>
        </div>

        <div className="space-y-3">
          {/* Add Bank Account Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection("bank")}
              className={`w-full p-3 md:p-5 flex items-center justify-between text-left transition-all duration-200 ${
                expandedSection === "bank"
                  ? "bg-purple-50 border-b border-purple-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    expandedSection === "bank"
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-400"
                  }`}
                >
                  {expandedSection === "bank" && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm md:text-base font-medium text-gray-700">
                  Add Bank Account
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  expandedSection === "bank" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSection === "bank" && (
              <div className="p-3 md:p-5 bg-white border-t border-gray-100">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2.5 md:p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                  />
                  <div className="relative">
                    <select className="w-full p-2.5 md:p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all">
                      <option value="">Bank Name</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                  <input
                    type="text"
                    placeholder="Account Number"
                    className="w-full p-2.5 md:p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Re-enter Account Number"
                    className="w-full p-2.5 md:p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    className="w-full p-2.5 md:p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Add UPI ID Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection("upi")}
              className={`w-full p-3 md:p-5 flex items-center justify-between text-left transition-all duration-200 ${
                expandedSection === "upi"
                  ? "bg-purple-50 border-b border-purple-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    expandedSection === "upi"
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-400"
                  }`}
                >
                  {expandedSection === "upi" && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm md:text-base font-medium text-gray-700">
                  Add UPI ID
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  expandedSection === "upi" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSection === "upi" && (
              <div className="p-3 md:p-5 bg-white border-t border-gray-100">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Beneficiary UPI ID"
                    className="w-full p-2.5 md:p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 md:py-3 px-5 rounded-lg font-medium text-sm md:text-base hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95">
                    Save UPI Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRefundsContent;
