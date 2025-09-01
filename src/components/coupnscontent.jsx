import React from 'react';
import { Ticket } from 'lucide-react';

const CouponsContent = () => {
  const coupons = [
    {
      code: 'SAVE20',
      title: '20% OFF on Diamond Jewelry',
      description: 'Valid on purchases above ₹50,000',
      expiry: '2024-03-31',
      isActive: true
    },
    {
      code: 'FIRST15',
      title: '15% OFF First Purchase',
      description: 'For new customers only',
      expiry: '2024-02-28',
      isActive: true
    },
    {
      code: 'BIRTHDAY10',
      title: '10% Birthday Special',
      description: 'Valid during birthday month',
      expiry: '2024-12-31',
      isActive: false
    }
  ];

  return (
    <div className="p-3 md:p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Coupons</h2>
      <div className="space-y-4">
        {coupons.map((coupon, index) => (
          <div key={index} className={`bg-white rounded-lg border-2 p-4 ${coupon.isActive ? 'border-purple-200' : 'border-gray-200 opacity-60'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Ticket className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-mono font-bold text-lg text-purple-600">{coupon.code}</span>
              </div>
              {coupon.isActive && (
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium">
                  Apply
                </button>
              )}
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{coupon.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
            <p className="text-xs text-gray-500">Expires on {coupon.expiry}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponsContent;