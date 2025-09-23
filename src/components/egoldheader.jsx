import React from 'react';
import { useNavigate } from 'react-router-dom';

const EgoldHeader = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'BUY GOLD', route: '/buy-gold' },
    { label: 'SELL GOLD', route: '/sell-gold' },
    { label: 'EXCHANGE / REDEEM', route: '/exchange-redeem' }
  ];

  // Handler for navigation
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={()=>navigate('/e-gold')}>
          <img 
            src="https://cdn.caratlane.com/static/images/discovery/responsive-hamburger-menu/egold-1x.png" 
            alt="eGold by CaratLane" 
            className="h-8"
          />
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => handleNavigate(item.route)}
                className="text-gray-700 hover:text-yellow-600 font-medium text-xs transition-colors duration-200 pb-1"
              >
                {item.label}
              </button>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
              {item.badge && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex justify-center py-4 px-4 border-b border-gray-200 cursor-pointer" onClick={()=>navigate('/e-gold')}>
          <img 
            src="https://cdn.caratlane.com/static/images/discovery/responsive-hamburger-menu/egold-1x.png" 
            alt="eGold by CaratLane" 
            className="h-8"
          />
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 px-4 py-3 min-w-max">
            {navItems.map((item, index) => (
              <div key={index} className="relative flex-shrink-0">
                <button
                  onClick={() => handleNavigate(item.route)}
                  className="text-gray-700 bg-gray-100 hover:bg-yellow-100 hover:text-yellow-600 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200"
                >
                  {item.label}
                </button>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
};

export default EgoldHeader;