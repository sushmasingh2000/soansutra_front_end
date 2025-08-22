import React from 'react';
import { CreditCard, Trash2 } from 'lucide-react';

const PaymentContent = () => {
  const paymentMethods = [
    {
      type: 'Credit Card',
      number: '**** **** **** 1234',
      expiry: '12/25',
      isDefault: true
    },
    {
      type: 'Debit Card',
      number: '**** **** **** 5678',
      expiry: '08/26',
      isDefault: false
    }
  ];

  return (
    <div className="p-3 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Add New Card
        </button>
      </div>
      <div className="space-y-3">
        {paymentMethods.map((method, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">{method.type}</h3>
                  <p className="text-sm text-gray-500">{method.number}</p>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {method.isDefault && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentContent;