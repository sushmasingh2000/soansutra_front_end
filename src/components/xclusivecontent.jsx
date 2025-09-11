import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

const XclusiveContent = () => {
  const xclusiveData = {
    points: 2450,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNext: 550,
    benefits: [
      'Early access to sales',
      'Free shipping on all orders',
      'Priority customer support',
      'Exclusive member discounts'
    ]
  };

  return (
    <div className="p-3 md:p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Xclusive Rewards</h2>
      
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-4 text-black mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Your Points</h3>
          <Award className="w-6 h-6" />
        </div>
        <div className="text-2xl font-bold mb-1">{xclusiveData.points.toLocaleString()}</div>
        <div className="text-sm opacity-90">Current Tier: {xclusiveData.tier}</div>
      </div>

      {/* Progress to Next Tier */}
      <div className="bg-white rounded-lg border border-yellow-200 p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress to {xclusiveData.nextTier}</span>
          <span className="text-sm text-gray-500">{xclusiveData.pointsToNext} points needed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-yellow-600 h-2 rounded-full" style={{width: '82%'}}></div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-lg border border-yellow-200 p-4">
        <h4 className="font-medium text-gray-900 mb-3">Your Benefits</h4>
        <div className="space-y-2">
          {xclusiveData.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default XclusiveContent;