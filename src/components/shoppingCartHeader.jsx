import React from 'react';
import { BrandLogo } from './brand-logo';
import { Link } from 'react-router-dom';

<BrandLogo/>
const CartHeader = ({ onBackClick }) => {
  return (
    <>
      {/* Font Awesome CDN - Make sure this is included in your HTML head */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
      />
      
      <div className="bg-white px-4 sm:px-5 py-3 flex justify-between items-center shadow-lg">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Back Arrow - Added onClick handler */}
          <i 
            className="fas fa-arrow-left text-lg sm:text-xl cursor-pointer transition-transform hover:-translate-x-1"
            style={{ color: '#4f3267' }}
            onClick={onBackClick}
          />
          
          {/* Logo */}
          <Link to={"/"}><BrandLogo/></Link>
          
        </div>
        
        {/* Center Section */}
        <div className="flex items-center">
          <div className="border border-gray-200 rounded-full px-3 sm:px-4 py-2 flex items-center gap-2 cursor-pointer transition-all hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-xl shadow-md" style={{background:"#E8E1FF"}}>
            <i 
              className="fas fa-shopping-cart text-sm sm:text-base"
              style={{ color: '#4f3267' }}
            />
            <span 
              className="text-sm sm:text-base font-medium"
              style={{ color: '#4f3267' }}
            >
              Shopping Cart
            </span>
            <div 
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold"
              style={{ backgroundColor: '#4f3267' }}
            >
              4
            </div>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-2">
          <span 
            className="text-sm sm:text-base font-medium hidden sm:block"
            style={{ color: '#4f3267' }}
          >
            Need Assistance?
          </span>
          
          {/* WhatsApp Icon - Multiple fallback options */}
          <div className="relative">
            {/* Primary WhatsApp Icon */}
            <i 
              className="fab fa-whatsapp text-lg sm:text-xl cursor-pointer transition-all hover:text-green-500 hover:scale-110"
              style={{ color: '#4f3267' }}
            />
            
            {/* Fallback if Font Awesome doesn't load */}
            <span 
              className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl cursor-pointer transition-all hover:text-green-500 hover:scale-110"
              style={{ 
                color: '#4f3267',
                display: 'none' // Will be shown by CSS if Font Awesome fails
              }}
            >
              📱
            </span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* Fallback if Font Awesome doesn't load */
        .fa-whatsapp:before {
          content: "\\f232";
        }
        
        /* Show emoji fallback if Font Awesome fails */
        .fab:not([class*="fa-"]):after {
          content: "📱";
        }
        
        /* Alternative WhatsApp icon using CSS */
        .whatsapp-icon-fallback {
          width: 20px;
          height: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234f3267'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      `}</style>
    </>
  );
};

export default CartHeader;