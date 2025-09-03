import React from 'react';
import { Gem } from 'lucide-react';

const EGoldContent = () => {
  const eGoldData = {
    balance: 2.5,
    value: 15750,
    transactions: [
      { type: 'Purchase', amount: 1.0, value: 6300, date: '2024-01-15' },
      { type: 'Purchase', amount: 1.5, value: 9450, date: '2024-01-20' },
      { type: 'Redemption', amount: -0.5, value: -3150, date: '2024-01-25' }
    ]
  };

  return (
    <div className="p-3 md:p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">SonaSutra eGold</h2>
      
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">eGold Balance</h3>
          <Gem className="w-6 h-6" />
        </div>
        <div className="text-2xl font-bold mb-1">{eGoldData.balance}g</div>
        <div className="text-sm opacity-90">Worth ₹{eGoldData.value.toLocaleString()}</div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
          Buy eGold
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
          Redeem eGold
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-900 mb-3">Recent Transactions</h4>
        <div className="space-y-3">
          {eGoldData.transactions.map((transaction, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <span className="text-sm font-medium text-gray-900">{transaction.type}</span>
                <div className="text-xs text-gray-500">{transaction.date}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}g
                </div>
                <div className="text-xs text-gray-500">₹{Math.abs(transaction.value).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EGoldContent;