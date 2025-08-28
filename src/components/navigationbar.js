// import React, { useState } from 'react';
// import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { endpoint } from '../utils/APIRoutes';
// import toast from 'react-hot-toast';

// const NavigationBar = () => {
//   const navigate = useNavigate();
//   const [subcategories, setSubcategories] = useState([]);
//   const [activeCategoryId, setActiveCategoryId] = useState(null);
//   const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const { data: categoryData, isLoading: loadingCategories } = useQuery(
//     ['get_product_category'],
//     () => axios.get(endpoint?.get_categroy_user),
//     { keepPreviousData: true }
//   );

//   const categories = categoryData?.data?.result || [];

//   const fetchSubcategories = async (categoryId) => {
//     if (activeCategoryId === categoryId) {
//       setActiveCategoryId(null);
//       setSubcategories([]);
//       return;
//     }

//     try {
//       setActiveCategoryId(categoryId);
//       const response = await axios.get(
//         `${endpoint.get_sub_categroy_user}?category_id=${categoryId}`
//       );
//       setSubcategories(response?.data?.result || []);
//     } catch (err) {
//       toast.error('Failed to fetch subcategories.');
//     }
//   };

//   const handleSubcategoryClick = (productSubcategoryId) => {
//     navigate(`/products_web/${productSubcategoryId}`);
//     setIsMenuOpen(false);
//     setIsServicesOpen(false);
//   };


//   const handleServiceClick = (slug) => {
//     navigate(slug);
//     setIsServicesOpen(false);
//     setIsMenuOpen(false);
//   };

//   const handleHomeClick = () => {
//     navigate('/');
//     setIsMenuOpen(false);
//   };

//   const serviceLinks = [
//     { name: 'Store Locator', slug: '/store-locator' },
//     { name: 'Customer Service', slug: '/customer-service' },
//     { name: 'Size Guide', slug: '/size-guide' },
//     { name: 'Care Instructions', slug: '/care-instructions' }
//   ];

//   if (loadingCategories) {
//     return (
//       <nav className="text-white sticky top-0 z-50 bg-purple-700">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-14">
//             <h1 className="text-lg font-semibold">CaratLane</h1>
//             <div className="flex space-x-4 animate-pulse">
//               <div className="h-4 bg-white/20 rounded w-16"></div>
//               <div className="h-4 bg-white/20 rounded w-20"></div>
//               <div className="h-4 bg-white/20 rounded w-18"></div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="text-white sticky top-0 z-50 bg-purple-700">
//       {/* Desktop Navigation */}
//       <div className="hidden lg:block">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-14">
//             <div className="flex items-center space-x-8">
//               {categories.map((cat) => (
//                 <div
//                   key={cat.id}
//                   className="relative"
//                   onMouseEnter={() => {
//                     setActiveCategoryId(cat.product_category_id);
//                     fetchSubcategories(cat.product_category_id);
//                   }}
//                   onMouseLeave={() => {
//                     setActiveCategoryId(null);
//                   }}
//                 >
//                   <button
//                     type="button"
//                     className="text-sm font-medium hover:text-pink-200 transition-colors duration-200 whitespace-nowrap"
//                   >
//                     {cat.name}
//                   </button>

//                   {/* Subcategory Dropdown */}
//                   {activeCategoryId === cat.product_category_id && subcategories.length > 0 && (
//                     <div className="absolute top-full left-0  w-64 bg-white text-black shadow-lg z-50">
//                       <div className="py-2 grid grid-cols-1 gap-2">
//                         {subcategories.map((sub) => (
//                           <button
//                             key={sub.product_subcategory_id}
//                             onClick={() => handleSubcategoryClick(sub.product_subcategory_id)}
//                             className="flex items-center space-x-3 w-full text-left px-4 border-t hover:bg-gray-100 transition"
//                           >
//                             <img
//                               src={sub.subcat_image}
//                               alt={sub.name}
//                               className="w-3 h-3 object-cover rounded"
//                             />
//                             <span className="text-sm">{sub.name}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div className="lg:hidden">
//         <div className="flex items-center justify-between px-4 h-14">
//           <button
//             onClick={handleHomeClick}
//             className="text-lg font-semibold hover:text-pink-200 transition-colors duration-200"
//           >
//             CaratLane
//           </button>
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
//           >
//             <svg
//               className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''
//                 }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         <div
//           className={`overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
//             }`}
//         >
//           <div className="px-4 py-4 border-t border-white/20">
//             {/* Mobile Categories */}
//             <div className="space-y-1">
//               {categories.map((item) => (
//                 <div key={item.id} className="mb-2">
//                   <button
//                     onClick={() => fetchSubcategories(item.product_category_id)}
//                     className="block w-full text-left px-3 py-3 text-sm font-medium hover:bg-white/10 rounded-md transition-colors duration-200"
//                   >
//                     {item.name}
//                   </button>

//                   {activeCategoryId === item.product_category_id && subcategories.length > 0 && (
//                     <div className="pl-6 mt-1 space-y-1">
//                       {subcategories.map((sub) => (
//                         <button
//                           key={sub.product_subcategory_id}
//                           onClick={() => handleSubcategoryClick(sub.product_subcategory_id)}
//                           className="block w-full text-left py-2 text-sm text-pink-200 hover:text-white transition-colors duration-200"
//                         >
//                           {sub.name}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}


//             </div>

//             {/* Mobile Services */}
//             <div className="mt-4 pt-4 border-t border-white/20">
//               <button
//                 onClick={() => setIsServicesOpen(!isServicesOpen)}
//                 className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium hover:bg-white/10 rounded-md transition-colors duration-200"
//               >
//                 <span>Services</span>
//                 <svg
//                   className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''
//                     }`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>

//               <div
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${isServicesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
//                   }`}
//               >
//                 <div className="pl-6 pr-3 py-2 space-y-1">
//                   {serviceLinks.map((service, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleServiceClick(service.slug)}
//                       className="block w-full text-left py-2 text-sm text-pink-200 hover:text-white transition-colors duration-200"
//                     >
//                       {service.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavigationBar;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { BrandLogo } from "./brand-logo";
import SubcategoryView from "./subcategoryview";

// Indian Flag Component
const IndianFlag = () => (
  <div className="w-8 h-6 rounded border border-gray-300 overflow-hidden flex flex-col">
    <div className="h-1/3 bg-orange-500"></div>
    <div className="h-1/3 bg-white flex items-center justify-center">
      <div className="w-3 h-3 border border-blue-900 rounded-full flex items-center justify-center">
        <div className="text-blue-900 text-xs">☸</div>
      </div>
    </div>
    <div className="h-1/3 bg-green-600"></div>
  </div>
);

// Jewelry data with subcategories (same as in Header)
const jewelryData = {
  "Rings": {
    name: "Rings",
    image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
    subcategories: {
      featured: [
        { name: "Engagement Rings" },
        { name: "Wedding Bands" },
        { name: "Diamond Rings" },
        { name: "Gold Rings" }
      ],
      byStyle: [
        { name: "Solitaire", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
        { name: "Halo", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" },
        { name: "Vintage", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" },
        { name: "Modern", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" }
      ],
      byMetal: [
        { name: "Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" },
        { name: "Platinum", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" },
        { name: "Silver", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" },
        { name: "Rose Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" }
      ],
      banners: [
        { name: "New Arrivals", image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png" },
        { name: "Best Sellers", image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png" }
      ]
    }
  },
  "Earrings": {
    name: "Earrings",
    image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
    subcategories: {
      featured: [
        { name: "Stud Earrings" },
        { name: "Drop Earrings" },
        { name: "Hoop Earrings" },
        { name: "Chandeliers" }
      ],
      byStyle: [
        { name: "Classic", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" },
        { name: "Contemporary", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" },
        { name: "Ethnic", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" },
        { name: "Western", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" }
      ],
      byMetal: [
        { name: "Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" },
        { name: "Diamond", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" },
        { name: "Pearl", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" },
        { name: "Gemstone", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" }
      ],
      banners: [
        { name: "Trending Now", image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png" }
      ]
    }
  },
  "Bracelets & Bangles": {
    name: "Bracelets & Bangles",
    image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
    subcategories: {
      featured: [
        { name: "Tennis Bracelets" },
        { name: "Charm Bracelets" },
        { name: "Gold Bangles" },
        { name: "Diamond Bracelets" }
      ],
      byStyle: [
        { name: "Traditional", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" },
        { name: "Modern", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" },
        { name: "Link", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" },
        { name: "Cuff", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" }
      ],
      byMetal: [
        { name: "Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" },
        { name: "Silver", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" },
        { name: "Platinum", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" },
        { name: "Mixed Metal", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" }
      ],
      banners: [
        { name: "Festive Collection", image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png" }
      ]
    }
  },
  "Solitaires": {
    name: "Solitaires",
    image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
    subcategories: {
      featured: [
        { name: "Classic Solitaires" },
        { name: "Fancy Solitaires" },
        { name: "Solitaire Sets" },
        { name: "Designer Solitaires" }
      ],
      byStyle: [
        { name: "Round", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
        { name: "Princess", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
        { name: "Oval", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
        { name: "Emerald", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" }
      ],
      byMetal: [
        { name: "Platinum", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
        { name: "18K Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
        { name: "White Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
        { name: "Rose Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" }
      ],
      banners: [
        { name: "Certified Solitaires", image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png" }
      ]
    }
  },
  "Mangalsutras": {
    name: "Mangalsutras",
    image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
    subcategories: {
      featured: [
        { name: "Traditional Mangalsutras" },
        { name: "Modern Mangalsutras" },
        { name: "Diamond Mangalsutras" },
        { name: "Gold Mangalsutras" }
      ],
      byStyle: [
        { name: "Short", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" },
        { name: "Long", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" },
        { name: "Layered", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" },
        { name: "Pendant Style", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" }
      ],
      byMetal: [
        { name: "22K Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" },
        { name: "18K Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" },
        { name: "Diamond", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" },
        { name: "Gemstone", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" }
      ],
      banners: [
        { name: "Bridal Collection", image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png" }
      ]
    }
  },
  "Necklaces & Pendants": {
    name: "Necklaces & Pendants",
    image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
    subcategories: {
      featured: [
        { name: "Chain Necklaces" },
        { name: "Pendant Necklaces" },
        { name: "Chokers" },
        { name: "Statement Necklaces" }
      ],
      byStyle: [
        { name: "Delicate", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" },
        { name: "Bold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" },
        { name: "Vintage", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" },
        { name: "Contemporary", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" }
      ],
      byMetal: [
        { name: "Gold", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" },
        { name: "Silver", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" },
        { name: "Diamond", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" },
        { name: "Pearl", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" }
      ],
      banners: [
        { name: "Everyday Elegance", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/banners/01/trendy_mangalsutra.png" },
        { name: "Festive Collection", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/banners/01/mangalearrings.png " }
      ]
    }
  }
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for sidebar functionality
  const [showMoreJewellery, setShowMoreJewellery] = useState(false);
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  // Rotating placeholders
  const placeholders = ["Search Relationship", "Search Price"];

  // Slides for sidebar
  const slides = [
    { image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png", alt: "22KT Everyday Collection" },
    { image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png", alt: "Wear Your Wins" },
  ];

  // Jewelry types for sidebar
  const jewelryTypes = [
    { name: "Rings", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png" },
    { name: "Earrings", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png" },
    { name: "Bracelets & Bangles", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png" },
    { name: "Solitaires", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png" },
  ];

  const moreJewelleryTypes = [
    { name: "Mangalsutras", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png" },
    { name: "Necklaces & Pendants", image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png" },
  ];

  // Category sections
  const categorySections = [
    {
      name: "Best Sellers",
      image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/bestsellers/bestsellers_m.png",
      bgColor: "bg-gradient-to-r from-blue-100 to-blue-50"
    },
    {
      name: "Latest",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/Hamburger/02/latest_m.png",
      bgColor: "bg-gradient-to-r from-gray-100 to-gray-50"
    },
    {
      name: "Trending",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/Hamburger/02/trending_m.png",
      bgColor: "bg-gradient-to-r from-yellow-100 to-yellow-50"
    },
    {
      name: "Collections",
      image: "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/bestsellers/collections_t.png",
      bgColor: "bg-gradient-to-r from-purple-100 to-purple-50"
    }
  ];

  // Products & Services
  const productsServices = [
    {
      name: "Treasure Chest",
      description: "Pay 9 instalments, and get the 10th FREE as a CaratLane Benefit!",
      image: "https://cdn.caratlane.com/media/static/images/web/Treasure-Chest-1-26-may-25.png",
      icon: "🎁"
    },
    {
      name: "Stores",
      description: "Visit the nearest store today to try your favourite jewellery.",
      image: "https://cdn.caratlane.com/media/static/images/web/Store-Vector-25.png",
      icon: "🏪"
    },
    {
      name: "Digital Gold",
      description: "Invest in 24K gold hassle-free with CaratLane's Digital Gold.",
      image: "https://cdn.caratlane.com/media/static/images/discovery/responsive-hamburger-menu/egold-1x.png",
      icon: "🥇"
    }
  ];

  // Mock API call - replace with your actual API endpoint
  const fetchNavigationData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - Updated with category slugs
      const mockData = [
        { id: 1, name: 'Rings', slug: 'rings', category: 'rings', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/ring.png' },
        { id: 2, name: 'Earrings', slug: 'earrings', category: 'earrings', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/earring.png' },
        { id: 3, name: 'Bracelets & Bangles', slug: 'bracelets-bangles', category: 'bracelets-bangles', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/Shaya/08-August/Merch%20Work/11/App%20Menu.png' },
        { id: 4, name: 'Solitaires', slug: 'solitaires', category: 'solitaires', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/gifting.png' },
        { id: 5, name: 'Mangalsutras', slug: 'mangalsutras', category: 'mangalsutras', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/mangalsutra.png' },
        { id: 6, name: 'Necklaces & Pendants', slug: 'necklaces-pendants', category: 'necklaces-pendants', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/necklace.png' },
        { id: 7, name: 'More Jewellery', slug: 'more-jewellery', category: 'more-jewellery', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/men.png' },
        { id: 8, name: 'Silver by Shaya', slug: 'silver-collection', category: 'silver-collection', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/kids.png' },
        { id: 9, name: 'Gifting', slug: 'gifting', category: 'gifting', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/solitaires.png' },
        { id: 10, name: 'Trending', slug: 'trending', category: 'trending', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/bracelet.png' },
        { id: 11, name: 'Collections', slug: 'collections', category: 'collections', image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/others/topmenu/01/more.png' }
      ];

      setNavItems(mockData);
    } catch (error) {
      console.error('Failed to fetch navigation data:', error);
      // Fallback data
      setNavItems([
        { id: 1, name: 'Rings', slug: 'rings', category: 'rings' },
        { id: 2, name: 'Earrings', slug: 'earrings', category: 'earrings' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigationData();

    // Rotate placeholders every 3 seconds
    const placeholderInterval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    // Auto-slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      clearInterval(placeholderInterval);
      clearInterval(slideInterval);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Updated navigation handler for product categories
  const handleNavClick = (item) => {
    if (item.category) {
      // Navigate to products page with category parameter
      navigate(`/products/${item.category}`);
    } else {
      // For other pages like home
      navigate('/');
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  // NEW: Handler for mobile jewelry category click - opens sidebar instead of navigating
  const handleMobileJewelryClick = (item) => {
    // First open the sidebar menu
    setIsMenuOpen(true);
    // Then handle the jewelry click to show subcategory
    handleJewelryClick(item.name);
  };

  // Handler for services navigation
  const handleServiceClick = (slug) => {
    navigate(slug);
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  // Handler for home/logo click
  const handleHomeClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const serviceLinks = [
    { name: 'Store Locator', slug: '/store-locator' },
    { name: 'Customer Service', slug: '/customer-service' },
    { name: 'Size Guide', slug: '/size-guide' },
    { name: 'Care Instructions', slug: '/care-instructions' }
  ];

  // Handle jewelry click for sidebar
  const handleJewelryClick = (jewelryName) => {
    const jewelryInfo = jewelryData[jewelryName];
    if (jewelryInfo) {
      setSelectedJewelry(jewelryInfo);
      setShowSubcategory(true);
    }
  };

  // Handle back from subcategory
  const handleBackFromSubcategory = () => {
    setShowSubcategory(false);
    setSelectedJewelry(null);
  };

  // Handle subcategory item click
  const handleSubcategoryItemClick = (item) => {
    console.log(`Selected: ${item.name}`);
    // You can add navigation or other logic here
    // For example: navigate to product listing page
    navigate(`/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
    setIsMenuOpen(false);
  };

  // Manual slide functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) {
    return (
      <nav style={{ backgroundColor: '#4f3267' }} className="text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-semibold">CaratLane</h1>
            <div className="flex items-center space-x-4">
              <div className="animate-pulse flex space-x-4">
                <div className="h-4 bg-white/20 rounded w-16"></div>
                <div className="h-4 bg-white/20 rounded w-20"></div>
                <div className="h-4 bg-white/20 rounded w-18"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav style={{ backgroundColor: '#4f3267' }} className="text-white sticky top-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={handleHomeClick}
              className="text-lg font-semibold hover:text-pink-200 transition-colors duration-200"
            >
              CaratLane
            </button>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-medium hover:text-pink-200 transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </button>
              ))}

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleServices}
                  className="flex items-center space-x-1 text-sm font-medium hover:text-pink-200 transition-colors duration-200"
                >
                  <span>Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Desktop Services Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {serviceLinks.map((service, index) => (
                        <button
                          key={index}
                          onClick={() => handleServiceClick(service.slug)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Always Visible Slider) */}
      <div className="lg:hidden bg-white shadow-md">
        <div className="px-4 py-2 relative">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileJewelryClick(item)}
                className="flex flex-col items-center w-24 flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover mb-2"
                />
                <span className="text-xs text-gray-800">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-full bg-white h-full shadow-xl overflow-y-auto flex flex-col">
            {/* Conditional rendering based on subcategory view */}
            {showSubcategory && selectedJewelry ? (
              <SubcategoryView
                category={selectedJewelry}
                onBack={handleBackFromSubcategory}
                onItemClick={handleSubcategoryItemClick}
              />
            ) : (
              <>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-2 border-b">
                  {/* Left side - Close button and Flag */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                    <div className="flex items-center space-x-1">
                      <img
                        src="https://th.bing.com/th/id/OIP.EDvMPBoxcb7F3r0YRni4YAHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
                        alt="Indian Flag"
                        className="w-5 h-auto"
                      />
                      <span className="font-medium text-sm text-gray-800">INDIA</span>
                    </div>
                  </div>

                  {/* Right side - Account, Heart, and Cart icons */}
                  <div className="flex items-center ">
                    {/* Account */}
                    <Link
                      to={"/login"}
                      className="flex items-center gap-1 p-1.5 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="h-5 w-5" />
                      <span className="font-medium text-sm">Account</span>
                    </Link>

                    {/* Wishlist (icon only) */}
                    <Link
                      to={"/myaccount/profile"}
                      className="flex items-center p-1.5 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <HeartIcon className="h-5 w-5" />
                    </Link>

                    {/* Cart (icon only with badge) */}
                    <Link
                      to={"/shopping-cart"}
                      className="flex items-center p-1.5 text-gray-700 hover:text-purple-600 transition-colors relative mr-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        2
                      </span>
                    </Link>
                  </div>


                </div>
                {/* Jewelry Categories */}
                <div className="px-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    {jewelryTypes.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleJewelryClick(item.name)}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-contain"
                          />
                          <span className="text-sm font-medium text-gray-800 leading-tight">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}

                    {showMoreJewellery && moreJewelleryTypes.map((item, index) => (
                      <div
                        key={index + 4}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleJewelryClick(item.name)}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-contain"
                          />
                          <span className="text-sm font-medium text-gray-800 leading-tight">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* More Jewellery Button */}
                  <button
                    onClick={() => setShowMoreJewellery(!showMoreJewellery)}
                    className="flex items-center justify-center space-x-2 w-full mt-4 py-3 text-purple-600 font-medium text-sm hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <span>{showMoreJewellery ? 'Less Jewellery' : 'More Jewellery'}</span>
                    <ChevronRightIcon className={`h-4 w-4 transition-transform ${showMoreJewellery ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Promotional Slides */}
                <div className="px-4 py-2">
                  <div className="relative rounded-lg overflow-hidden group">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].alt}
                      className="w-full h-auto object-cover transition-all duration-500 ease-in-out"
                    />

                    {/* Previous Arrow */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                    >
                      <ChevronLeftIcon className="w-3 h-3" />
                    </button>

                    {/* Next Arrow */}
                    <button
                      onClick={nextSlide}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                    >
                      <ChevronRightIcon className="w-3 h-3" />
                    </button>

                    {/* Slide Navigation Dots */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Slide Counter */}
                  <div className="flex justify-center mt-2">
                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                      {currentSlide + 1}/{slides.length}
                    </span>
                  </div>
                </div>

                {/* Category Sections Grid */}
                <div className="px-4 py-2">
                  <div className="grid grid-cols-2 gap-3">
                    {categorySections.map((category, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-300"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-16 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-sm font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products & Services Section */}
                <div className="px-4 py-2">
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
                      <span className="text-sm font-semibold text-purple-700 px-2">Products & Services</span>
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {productsServices.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-12 h-10 object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                              {service.name}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile User Profile Section at Bottom */}
                <div className="px-4 py-3 border-t border-gray-200 mt-auto">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-purple-700 mb-1">abhishek chaurasia</h3>
                        <p className="text-gray-600 text-xs">freefireprouser456@yahoo.com</p>
                      </div>
                      <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                        LOGOUT
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CSS Animation for placeholder slide effect */}
      <style>{`
        @keyframes placeholderSlide {
          0% {
            transform: translateY(-10px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavigationBar;