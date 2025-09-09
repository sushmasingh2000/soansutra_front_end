
import React from 'react';

const Distributor = () => {
  // Random values for demonstration
  const level = 'Level 1(3%)';
  const distributorId = 'DIST-12345';
  const myDirect = 15;
  const totalTeam = 150;
  const selfBusiness = 5000;
  const teamBusiness = 25000;
  const totalDirectTeamBusiness = 30000;
  const totalTeamBusiness = 100000;
  const todaySelfBusiness = 200;
  const todayTeamBusiness = 1500;

  return (

    <>
    
     <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full  mx-auto text-sm">
      {/* Level and Distributor ID */}

        <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Distributer</h2>
        <button className="bg-white border-yellow-300 text-black px-4 py-2 rounded-lg text-sm font-medium">
          Shiv Ji Maurya
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-1"> Level: {level}</h2>
        <p className="text-base"> ID: {distributorId}</p>
      </div>

      {/* First Card */}
      <div className="bg-white border border-yellow-400 rounded-lg p-3 mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-semibold">My Direct</span>
          <span>{myDirect}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="font-semibold">Total Team</span>
          <span>{totalTeam}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="font-semibold">Self Business</span>
          <span>${selfBusiness}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Team Business</span>
          <span>${teamBusiness}</span>
        </div>
      </div>

      {/* Second Card */}
      <div className="bg-white border border-yellow-400 rounded-lg p-3">
        <div className="flex justify-between mb-1">
          <span className="font-semibold">Total Direct Team Business</span>
          <span>${totalDirectTeamBusiness}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="font-semibold">Total Team Business</span>
          <span>${totalTeamBusiness}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 rounded-lg text-center">
            <span className="font-semibold block">Today Self Business</span>
            <span>${todaySelfBusiness}</span>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 rounded-lg text-center">
            <span className="font-semibold block">Today Team Business</span>
            <span>${todayTeamBusiness}</span>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Distributor;
