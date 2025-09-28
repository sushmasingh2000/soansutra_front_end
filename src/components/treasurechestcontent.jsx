import React from 'react';
import { Star } from 'lucide-react';

const TreasureChestContent = () => {
  const treasureData = {
    totalValue: 45000,
    items: [
      { name: 'Diamond Ring', value: 25000, addedDate: '2024-01-10' },
      { name: 'Gold Necklace', value: 15000, addedDate: '2024-01-15' },
      { name: 'Silver Bracelet', value: 5000, addedDate: '2024-01-20' }
    ],
    recommendations: [
      { name: 'Matching Earrings', price: 8500 },
      { name: 'Pendant Set', price: 12000 }
    ]
  };

  return (
    <div className="p-3 md:p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Dazzle-12</h2>
      
      {/* Total Value */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-4 text-white mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Total Collection Value</h3>
          <Star className="w-6 h-6" />
        </div>
        <div className="text-2xl font-bold">₹{treasureData.totalValue.toLocaleString()}</div>
        <div className="text-sm opacity-90">{treasureData.items.length} items in collection</div>
      </div>

      {/* Your Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-3">Your Dazzle-12</h4>
        <div className="space-y-3">
          {treasureData.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
                <div className="text-xs text-gray-500">Added on {item.addedDate}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">₹{item.value.toLocaleString()}</div>
                <button className="text-xs text-purple-600 hover:text-purple-700">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-900 mb-3">Recommended for You</h4>
        <div className="space-y-3">
          {treasureData.recommendations.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-900">{item.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString()}</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreasureChestContent;