import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { endpoint } from "../utils/APIRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { apiConnectorGet, usequeryBoolean } from "../utils/ApiConnector";

const SubcategoryView = ({ category, onBack, onCloseDrawer }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [isSubcatLoading, setIsSubcatLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSubcategories = async () => {
    try {
      setIsSubcatLoading(true);
      const response = await axios.get(
        `${endpoint.get_sub_categroy_user}?category_id=${category?.product_category_id}`
      );
      setSubcategories(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch subcategories.");
    }
    finally {
      setIsSubcatLoading(false);
    }
  };
  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleSubcategoryClick = (subcategoryId) => {
    if (onCloseDrawer) {
      onCloseDrawer(); // Close the drawer
    }

    setTimeout(() => {
      navigate(`/products_web?subcategory=${subcategoryId}`);
    }, 300); // Add slight delay for smooth UX (adjust if needed)
  };

  const { data, isLoading: isMaterialsLoading } = useQuery(
    ["sub_cate_product"],
    () =>
      apiConnectorGet(
        `${endpoint.get_categroy_filtered_item}?product_category_id=${category?.product_category_id}`
      ),
    {
      keepPreviousData: true,
      // enabled: !!activeSubcategoryId, // only fetch when activeSubcategoryId exists
    }
  );
  const sub_filtered = data?.data?.result || [];

  const { data: banner , isLoading:isBannerLoading} = useQuery(
    ["banner_data"],
    () =>
      apiConnectorGet(endpoint?.get_banner),
    usequeryBoolean
  );

  const banner_data = banner?.data?.result || [];

  const jewelryData = {
    subcategories: {
      featured: [
        { name: "Engagement Rings" },
        { name: "Wedding Bands" },
        { name: "Diamond Rings" },
        { name: "Gold Rings" },
      ],
      byStyle: [
        {
          name: "Solitaire",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
        },
        {
          name: "Halo",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
        },
        {
          name: "Vintage",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
        },
        {
          name: "Modern",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
        },
      ],
      byMetal: [
        {
          name: "Gold",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
        },
        {
          name: "Platinum",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
        },
        {
          name: "Silver",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
        },
        {
          name: "Rose Gold",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
        },
      ],
      banners: [
        {
          name: "New Arrivals",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png",
        },
        {
          name: "Best Sellers",
          image:
            "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png",
        },
      ],
    },
    Earrings: {
      subcategories: {
        featured: [
          { name: "Stud Earrings" },
          { name: "Drop Earrings" },
          { name: "Hoop Earrings" },
          { name: "Chandeliers" },
        ],
        byStyle: [
          {
            name: "Classic",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
          {
            name: "Contemporary",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
          {
            name: "Ethnic",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
          {
            name: "Western",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
        ],
        byMetal: [
          {
            name: "Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
          {
            name: "Diamond",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
          {
            name: "Pearl",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
          {
            name: "Gemstone",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
          },
        ],
        banners: [
          {
            name: "Trending Now",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png",
          },
        ],
      },
    },
    "Bracelets & Bangles": {
      name: "Bracelets & Bangles",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
      subcategories: {
        featured: [
          { name: "Tennis Bracelets" },
          { name: "Charm Bracelets" },
          { name: "Gold Bangles" },
          { name: "Diamond Bracelets" },
        ],
        byStyle: [
          {
            name: "Traditional",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
          {
            name: "Modern",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
          {
            name: "Link",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
          {
            name: "Cuff",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
        ],
        byMetal: [
          {
            name: "Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
          {
            name: "Silver",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
          {
            name: "Platinum",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
          {
            name: "Mixed Metal",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelet.png",
          },
        ],
        banners: [
          {
            name: "Festive Collection",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png",
          },
        ],
      },
    },
    Solitaires: {
      name: "Solitaires",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
      subcategories: {
        featured: [
          { name: "Classic Solitaires" },
          { name: "Fancy Solitaires" },
          { name: "Solitaire Sets" },
          { name: "Designer Solitaires" },
        ],
        byStyle: [
          {
            name: "Round",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
          {
            name: "Princess",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
          {
            name: "Oval",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
          {
            name: "Emerald",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
        ],
        byMetal: [
          {
            name: "Platinum",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
          {
            name: "18K Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
          {
            name: "White Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
          {
            name: "Rose Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/solitaire.png",
          },
        ],
        banners: [
          {
            name: "Certified Solitaires",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png",
          },
        ],
      },
    },
    Mangalsutras: {
      name: "Mangalsutras",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
      subcategories: {
        featured: [
          { name: "Traditional Mangalsutras" },
          { name: "Modern Mangalsutras" },
          { name: "Diamond Mangalsutras" },
          { name: "Gold Mangalsutras" },
        ],
        byStyle: [
          {
            name: "Short",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
          {
            name: "Long",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
          {
            name: "Layered",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
          {
            name: "Pendant Style",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
        ],
        byMetal: [
          {
            name: "22K Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
          {
            name: "18K Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
          {
            name: "Diamond",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
          {
            name: "Gemstone",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/mangalsutra.png",
          },
        ],
        banners: [
          {
            name: "Bridal Collection",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png",
          },
        ],
      },
    },
    "Necklaces & Pendants": {
      name: "Necklaces & Pendants",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
      subcategories: {
        featured: [
          { name: "Chain Necklaces" },
          { name: "Pendant Necklaces" },
          { name: "Chokers" },
          { name: "Statement Necklaces" },
        ],
        byStyle: [
          {
            name: "Delicate",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
          {
            name: "Bold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
          {
            name: "Vintage",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
          {
            name: "Contemporary",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
        ],
        byMetal: [
          {
            name: "Gold",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
          {
            name: "Silver",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
          {
            name: "Diamond",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
          {
            name: "Pearl",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
          },
        ],
        banners: [
          {
            name: "Everyday Elegance",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/banners/01/trendy_mangalsutra.png",
          },
          {
            name: "Festive Collection",
            image:
              "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/banners/01/mangalearrings.png ",
          },
        ],
      },
    },
  };
  const selectedCategoryMock = jewelryData;

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {category.name}
          </h2>
        </div>
      </div>

      {/* Featured Section */}
      {selectedCategoryMock?.subcategories?.featured?.length > 0 && (
        <FeaturedSection items={selectedCategoryMock.subcategories.featured} />
      )}
      {/* By Style Section */}
      <StyleSection
        items={subcategories}
        onClick={handleSubcategoryClick}
        isLoading={isSubcatLoading}
      />

      {/* By Metal & Stone Section */}
      <MetalSection
        items={sub_filtered}
        onClick={handleSubcategoryClick}
        isLoading={isMaterialsLoading}
      />

      <PriceRangeSection
        items={sub_filtered}
        onClick={handleSubcategoryClick}
        isLoading={isMaterialsLoading}
      />
      <BannerSection
        items={banner_data}
        isLoading={isBannerLoading}
      />


      <GenderCategoriesSection
      // onGenderClick={(item) => console.log("Gender clicked:", item)}
      />
    </div>
  );
};

// Featured Items Component
const FeaturedSection = ({ items }) => (
  <div className="px-4 py-3">
    <h3 className="text-sm font-medium text-gray-700 mb-3">Featured</h3>
    <div className="grid grid-cols-2 gap-2">
      {items.map((item, index) => (
        <button
          key={index}
          // onClick={() => onItemClick(item)}
          className="bg-white-50 border border-yellow-200 rounded-lg px-3 py-2 text-center hover:bg-white-100 transition-colors"
        >
          <span className="text-sm font-medium text-yellow-700">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// Style Items Component
// const StyleSection = ({ items, onClick }) => {
//   const isLoading = items.length === 0;

//   return (
//     <div className="px-4 py-3">
//       <h3 className="text-sm font-medium text-gray-700 mb-3">By Style</h3>
//       <div className="grid grid-cols-2 gap-4">
//         {isLoading
//           ? Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="bg-white-50 rounded-lg p-3 animate-pulse">
//               <div className="flex flex-col items-center text-center space-y-2">
//                 <div className="w-10 h-10 border-yellow-300 bg-yellow-300 rounded" />
//                 <div className="h-3 w-16 border-yellow-300 bg-yellow-300 rounded" />
//               </div>
//             </div>
//           ))
//           : items.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => onClick(item?.product_subcategory_id)}
//               className="bg-white-50 rounded-lg p-3 hover:bg-white-100 transition-colors"
//             >
//               <div className="flex flex-col items-center text-center space-y-2">
//                 {item.subcat_image && (
//                   <img
//                     src={item.subcat_image}
//                     alt={item.name}
//                     className="w-10 h-10 object-contain"
//                   />
//                 )}
//                 <span className="text-xs font-medium text-gray-800 leading-tight">
//                   {item.name}
//                 </span>
//               </div>
//             </button>
//           ))}
//       </div>
//     </div>
//   );
// };

const StyleSection = ({ items, onClick, categoryId }) => { // Add category prop
  const isLoading = items.length === 0;
  const navigate = useNavigate(); // Initialize navigate hook

  const handleViewAll = () => {
    // Navigate to the products page with the category ID
    navigate(`/products_web?category=${categoryId}`);
  };

  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-3"> {/* Flex container for heading and button */}
        <h3 className="text-sm font-medium text-gray-700">By Style</h3>
        <button
          onClick={handleViewAll}
          className="text-xs font-medium text-yellow-700 hover:text-yellow-800 transition-colors"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white-50 rounded-lg p-3 animate-pulse">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 border-yellow-300 bg-yellow-300 rounded" />
                  <div className="h-3 w-16 border-yellow-300 bg-yellow-300 rounded" />
                </div>
              </div>
            ))
          : items.map((item, index) => (
              <button
                key={index}
                onClick={() => onClick(item?.product_subcategory_id)}
                className="bg-white-50 rounded-lg p-3 hover:bg-white-100 transition-colors"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  {item.subcat_image && (
                    <img
                      src={item.subcat_image}
                      alt={item.name}
                      className="w-10 h-10 object-contain"
                    />
                  )}
                  <span className="text-xs font-medium text-gray-800 leading-tight">
                    {item.name}
                  </span>
                </div>
              </button>
            ))}
      </div>
    </div>
  );
};


// Metal & Stone Component
const MetalSection = ({ items, onClick, isLoading }) => (
  <div className="px-4 py-3">
    <h3 className="text-sm font-medium text-gray-700 mb-3">By Metal & Stone</h3>
    <div className="grid grid-cols-2 gap-4">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-yellow-100 rounded-lg p-3 animate-pulse h-[60px]"
            >
              <div className="flex flex-col items-center text-center space-y-2" />
            </div>
          ))
        : (() => {
            const seenMasterNames = new Set();
            return items?.flatMap((item, index) => {
              const isMasterNameNew = !seenMasterNames.has(item.master_mat_name);
              if (isMasterNameNew) seenMasterNames.add(item.master_mat_name);

              const buttons = [];

              // Render master name button only once
              if (isMasterNameNew) {
                buttons.push(
                  <button
                    key={`master-${index}`}
                    onClick={() => onClick(item.product_subcategory_id)}
                    className="bg-yellow-50 rounded-lg p-3 hover:bg-white-100 transition-colors"
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <span className="text-xs font-medium text-gray-800 leading-tight">
                        {item.master_mat_name}
                      </span>
                    </div>
                  </button>
                );
              }

              // Only render material_name if different from master_mat_name
              if (item.material_name !== item.master_mat_name) {
                buttons.push(
                  <button
                    key={`material-${index}`}
                    onClick={() => onClick(item.product_subcategory_id)}
                    className="bg-yellow-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <span className="text-xs font-medium text-gray-800 leading-tight">
                        {item.material_name}
                      </span>
                    </div>
                  </button>
                );
              }

              return buttons;
            });
          })()}
    </div>
  </div>
);



// Price Range Component
const PriceRangeSection = ({ items, onClick, isLoading }) => {
  return (
    <div className="px-4 py-3">
      <h3 className="text-sm font-medium text-gray-700 mb-3">By Price</h3>
      <div className="grid grid-cols-2 gap-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg h-10 animate-pulse"
            >  <span className="text-xs font-medium text-yellow-700" /></div>
          ))
          : [...new Map(items.map(price => [price.price_group, price])).values()]
            .sort((a, b) => {
              const getSortValue = (item) => {
                const match = item.price_group.match(/(\d+)(?!.*\d)/);
                return match ? parseInt(match[1]) : Number.MAX_SAFE_INTEGER;
              };
              return getSortValue(a) - getSortValue(b);
            })
            .map((price, index) => (
              <button
                key={index}
                onClick={() => onClick(price.product_subcategory_id)}
                className="bg-white-50 border border-yellow-200 rounded-lg px-3 py-2 text-center hover:bg-white-100 transition-colors"
              >
                <span className="text-xs font-medium text-yellow-700">
                  {price?.price_group}
                </span>
              </button>
            ))}
      </div>
    </div>
  );
};


// Banner Component
const BannerSection = ({ items, isLoading }) => (
  <div className="px-4 py-3">
    <div className="grid grid-cols-2 gap-3">
      {isLoading
        ? Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-28 bg-gray-100 rounded-lg animate-pulse"
            ></div>
          ))
        : items.map((banner, index) => (
            <button
              key={index}
              className="flex flex-col bg-white rounded-lg overflow-hidden hover:opacity-90 transition-opacity shadow-sm"
            >
              {banner.ban_image && (
                <div className="relative">
                  <img
                    src={banner.ban_image}
                    alt={banner.name}
                    className="w-full h-24 object-cover"
                  />
                </div>
              )}
              <div className="p-2 text-center">
                <span className="text-xs font-medium text-gray-700 leading-tight">
                  {banner.name}
                </span>
              </div>
            </button>
          ))}
    </div>
  </div>
);


// Gender Categories Component
const GenderCategoriesSection = () => {
  const genderCategories = [
    { name: "For Women" },
    { name: "For Men" },
    { name: "For Kids" },
  ];

  return (
    <div className="px-4 py-3 bg-white-50">
      <div className="space-y-2">
        {genderCategories.map((gender, index) => (
          <button
            key={index}
            // onClick={() => onGenderClick(gender)}
            className="flex items-center justify-between py-2 bg-white rounded-lg px-3 hover:bg-gray-50 transition-colors w-full"
          >
            <span className="text-sm font-medium text-gray-700">
              {gender.name}
            </span>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryView;
