import React, { useState } from 'react';

// Example imports for the modals - Adjust paths as per your project structure
import EgoldBuyHistoryModal from './E-goldBuyorder'; // Replace with actual path, e.g., '../modals/EgoldBuyHistoryModal'
import EgoldSellHistoryModal from './E-goldSellHistory'; // Replace with actual path, e.g., '../modals/EgoldSellHistoryModal'
import { Link } from 'react-router-dom';
import Footer from '../../Footer1';
import Header from '../../Header1';
import NavigationBar from '../../navigationbar';
import EgoldHeader from '../../egoldheader';

const EGoldHistoryButtons = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

 

  return (
    <>
    <Header/>
    <NavigationBar/>    
    <EgoldHeader/>
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-20">
      {/* Buy E-Gold History Button */}
      <Link to={"/egold_buy"}
        
        className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        Buy E-Gold History
      </Link>

      {/* Sell E-Gold History Button */}
      <Link to={"/egold_sell"}
        
        className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        Sell E-Gold History
      </Link>

     
    </div>

     
    <Footer/>
    </>
    
  );
};

export default EGoldHistoryButtons;