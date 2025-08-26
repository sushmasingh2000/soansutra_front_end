import React, { useState, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer1";
import Header from "../Header1";
import { useQuery } from "react-query";
import { endpoint } from "../../utils/APIRoutes";
import axios from "axios";
import { apiConnectorGet } from "../../utils/ApiConnector";
import toast from "react-hot-toast";

// Enhanced Category Configuration with 5 Jewelry Types
const CATEGORY_CONFIG = {
  rings: {
    title: "Rings Collection - 234 Designs",
    breadcrumb: "RINGS",
    filters: {
      ringSize: {
        label: "Ring Size",
        options: [
          { value: "16", count: 45 },
          { value: "17", count: 138 },
          { value: "18", count: 156 },
          { value: "19", count: 102 },
          { value: "20", count: 89 },
          { value: "21", count: 67 },
        ],
      },
      metal: {
        label: "Metal",
        options: [
          { value: "gold", label: "Gold", count: 189 },
          { value: "silver", label: "Silver", count: 145 },
          { value: "platinum", label: "Platinum", count: 78 },
          { value: "rose-gold", label: "Rose Gold", count: 92 },
        ],
      },
      price: {
        label: "Price Range",
        options: [
          { value: "5000-10000", label: "₹5,000 - ₹10,000", count: 89 },
          { value: "10001-20000", label: "₹10,001 - ₹20,000", count: 143 },
          { value: "20001-50000", label: "₹20,001 - ₹50,000", count: 102 },
          { value: "50001-100000", label: "₹50,001 - ₹1,00,000", count: 67 },
        ],
      },
      occasion: {
        label: "Occasion",
        options: [
          { value: "engagement", label: "Engagement", count: 78 },
          { value: "wedding", label: "Wedding", count: 145 },
          { value: "daily-wear", label: "Daily Wear", count: 234 },
          { value: "party", label: "Party", count: 89 },
        ],
      },
    },
    tabs: ["All", "New In"],
  },

  earrings: {
    title: "Earrings Collection - 189 Designs",
    breadcrumb: "EARRINGS",
    filters: {
      type: {
        label: "Type",
        options: [
          { value: "studs", label: "Studs", count: 145 },
          { value: "hoops", label: "Hoops", count: 89 },
          { value: "drops", label: "Drop Earrings", count: 123 },
          { value: "chandbali", label: "Chandbali", count: 67 },
          { value: "jhumkas", label: "Jhumkas", count: 98 },
        ],
      },
      metal: {
        label: "Metal",
        options: [
          { value: "gold", label: "Gold", count: 156 },
          { value: "silver", label: "Silver", count: 134 },
          { value: "rose-gold", label: "Rose Gold", count: 78 },
        ],
      },
      gemstone: {
        label: "Gemstone",
        options: [
          { value: "diamond", label: "Diamond", count: 89 },
          { value: "pearl", label: "Pearl", count: 67 },
          { value: "ruby", label: "Ruby", count: 45 },
          { value: "emerald", label: "Emerald", count: 34 },
        ],
      },
      price: {
        label: "Price Range",
        options: [
          { value: "3000-8000", label: "₹3,000 - ₹8,000", count: 78 },
          { value: "8001-15000", label: "₹8,001 - ₹15,000", count: 123 },
          { value: "15001-30000", label: "₹15,001 - ₹30,000", count: 89 },
          { value: "30001-60000", label: "₹30,001 - ₹60,000", count: 45 },
        ],
      },
    },
    tabs: ["All", "New In", "Studs", "Hoops", "Traditional"],
  },

  mangalsutra: {
    title: "Mangalsutra Collection - 156 Designs",
    breadcrumb: "MANGALSUTRA",
    filters: {
      style: {
        label: "Style",
        options: [
          { value: "traditional", label: "Traditional", count: 89 },
          { value: "modern", label: "Modern", count: 134 },
          { value: "designer", label: "Designer", count: 67 },
          { value: "layered", label: "Layered", count: 45 },
        ],
      },
      length: {
        label: "Chain Length",
        options: [
          { value: "16-18", label: "16-18 inches", count: 78 },
          { value: "18-20", label: "18-20 inches", count: 123 },
          { value: "20-22", label: "20-22 inches", count: 89 },
          { value: "22-24", label: "22-24 inches", count: 56 },
        ],
      },
      metal: {
        label: "Metal",
        options: [
          { value: "gold", label: "Gold", count: 145 },
          { value: "silver", label: "Silver", count: 89 },
          { value: "two-tone", label: "Two Tone", count: 67 },
        ],
      },
      price: {
        label: "Price Range",
        options: [
          { value: "15000-25000", label: "₹15,000 - ₹25,000", count: 67 },
          { value: "25001-50000", label: "₹25,001 - ₹50,000", count: 89 },
          { value: "50001-100000", label: "₹50,001 - ₹1,00,000", count: 78 },
          { value: "100001-200000", label: "₹1,00,001 - ₹2,00,000", count: 45 },
        ],
      },
    },
    tabs: ["All", "New In", "Traditional", "Modern", "Designer"],
  },

  necklaces: {
    title: "Necklaces Collection - 267 Designs",
    breadcrumb: "NECKLACES",
    filters: {
      type: {
        label: "Type",
        options: [
          { value: "choker", label: "Choker", count: 78 },
          { value: "pendant", label: "Pendant", count: 156 },
          { value: "chain", label: "Chain", count: 134 },
          { value: "statement", label: "Statement", count: 89 },
          { value: "layered", label: "Layered", count: 67 },
        ],
      },
      length: {
        label: "Length",
        options: [
          { value: "14-16", label: "14-16 inches (Choker)", count: 89 },
          { value: "16-18", label: "16-18 inches (Princess)", count: 145 },
          { value: "18-20", label: "18-20 inches (Matinee)", count: 123 },
          { value: "20-24", label: "20-24 inches (Opera)", count: 78 },
        ],
      },
      metal: {
        label: "Metal",
        options: [
          { value: "gold", label: "Gold", count: 189 },
          { value: "silver", label: "Silver", count: 156 },
          { value: "platinum", label: "Platinum", count: 67 },
          { value: "rose-gold", label: "Rose Gold", count: 89 },
        ],
      },
      gemstone: {
        label: "Gemstone",
        options: [
          { value: "diamond", label: "Diamond", count: 123 },
          { value: "pearl", label: "Pearl", count: 89 },
          { value: "ruby", label: "Ruby", count: 67 },
          { value: "emerald", label: "Emerald", count: 45 },
          { value: "sapphire", label: "Sapphire", count: 34 },
        ],
      },
      price: {
        label: "Price Range",
        options: [
          { value: "8000-15000", label: "₹8,000 - ₹15,000", count: 89 },
          { value: "15001-30000", label: "₹15,001 - ₹30,000", count: 134 },
          { value: "30001-60000", label: "₹30,001 - ₹60,000", count: 78 },
          { value: "60001-120000", label: "₹60,001 - ₹1,20,000", count: 45 },
        ],
      },
    },
    tabs: ["All", "New In", "Pendants", "Chains", "Statement"],
  },

  bracelets: {
    title: "Bracelets & Bangles - 198 Designs",
    breadcrumb: "BRACELETS & BANGLES",
    filters: {
      type: {
        label: "Type",
        options: [
          { value: "bracelets", label: "Bracelets", count: 123 },
          { value: "bangles", label: "Bangles", count: 156 },
          { value: "kada", label: "Kada", count: 78 },
          { value: "charm", label: "Charm Bracelets", count: 67 },
        ],
      },
      size: {
        label: "Size",
        options: [
          { value: "2.4", label: "2.4 inches", count: 45 },
          { value: "2.6", label: "2.6 inches", count: 89 },
          { value: "2.8", label: "2.8 inches", count: 123 },
          { value: "3.0", label: "3.0 inches", count: 78 },
        ],
      },
      metal: {
        label: "Metal",
        options: [
          { value: "gold", label: "Gold", count: 167 },
          { value: "silver", label: "Silver", count: 134 },
          { value: "rose-gold", label: "Rose Gold", count: 89 },
          { value: "white-gold", label: "White Gold", count: 67 },
        ],
      },
      style: {
        label: "Style",
        options: [
          { value: "traditional", label: "Traditional", count: 123 },
          { value: "modern", label: "Modern", count: 145 },
          { value: "ethnic", label: "Ethnic", count: 89 },
          { value: "contemporary", label: "Contemporary", count: 78 },
        ],
      },
      price: {
        label: "Price Range",
        options: [
          { value: "5000-12000", label: "₹5,000 - ₹12,000", count: 78 },
          { value: "12001-25000", label: "₹12,001 - ₹25,000", count: 123 },
          { value: "25001-50000", label: "₹25,001 - ₹50,000", count: 89 },
          { value: "50001-100000", label: "₹50,001 - ₹1,00,000", count: 56 },
        ],
      },
    },
    tabs: ["All", "New In", "Bracelets", "Bangles", "Traditional"],
  },
};


// Dynamic Filter Tabs Component
const DynamicFilterTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 px-4 py-4 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${activeTab === tab
            ? "bg-purple-600 text-white"
            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Mobile Filter Modal
const MobileFilterModal = ({
  isOpen,
  onClose,
  categoryConfig,
  filters,
  onFilterChange,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-y-0 left-0 w-80 bg-white overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            FILTERS
            <span className="bg-gray-200 text-xs px-2 py-1 rounded">
              {Object.values(filters).flat().length}
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-pink-500 text-xs font-medium"
            >
              CLEAR ALL
            </button>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {Object.entries(categoryConfig.filters).map(
            ([filterKey, filterConfig]) => (
              <div key={filterKey} className="mb-6">
                <h4 className="font-medium text-sm text-gray-800 mb-3">
                  {filterConfig.label}
                </h4>
                <div className="space-y-2">
                  {filterConfig.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 rounded border-gray-300"
                        checked={
                          filters[filterKey]?.includes(option.value) || false
                        }
                        onChange={(e) =>
                          onFilterChange(
                            filterKey,
                            option.value,
                            e.target.checked
                          )
                        }
                      />
                      <span className="text-xs text-gray-700">
                        {option.label || option.value}
                        <span className="text-gray-400"> ({option.count})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// Dynamic Sidebar Filters Component
const DynamicSidebarFilters = ({
  categoryConfig,
  filters,
  onFilterChange,
  onClearAll,
}) => {
  return (
    <div className="hidden lg:block w-64 bg-white p-4 border-r border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          FILTERS
          <span className="bg-gray-200 text-xs px-2 py-1 rounded">
            {Object.values(filters).flat().length}
          </span>
        </h3>
        <button
          onClick={onClearAll}
          className="text-pink-500 text-xs font-medium"
        >
          CLEAR ALL
        </button>
      </div>

      {Object.entries(categoryConfig.filters).map(
        ([filterKey, filterConfig]) => (
          <div key={filterKey} className="mb-6">
            <h4 className="font-medium text-sm text-gray-800 mb-3">
              {filterConfig.label}
            </h4>
            <div className="space-y-2">
              {filterConfig.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 rounded border-gray-300"
                    checked={
                      filters[filterKey]?.includes(option.value) || false
                    }
                    onChange={(e) =>
                      onFilterChange(filterKey, option.value, e.target.checked)
                    }
                  />
                  <span className="text-xs text-gray-700">
                    {option.label || option.value}
                    <span className="text-gray-400"> ({option.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Updated Product Card Component with navigation
const ProductCard = ({ product, onWishlist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = product.product_images
    ?.filter((img) => img?.p_image_url)
    ?.map((img) => img.p_image_url)?.length
    ? product.product_images.map((img) => img.p_image_url)
    : [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&h=400&fit=crop",
    ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const user = localStorage.getItem("token")
  const handleImageClick = (product) => {
    if (user) {
      navigate("/productdetails", {
        state: { product },
      });
    } else {
      toast("Please login first." , {id:1});
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative group">
        <div
          className="aspect-square bg-gray-100 overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(product)}
        >
          <img
            src={images[currentImageIndex]}
            alt={product?.name || "Product"}
            className="w-full h-full object-cover"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist(product.product_id);
          }}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4 text-pink-500" />
        </button>

        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-xs text-gray-600 truncate mb-1">{product.name}</h3>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-800">
            ₹{parseFloat(product.price).toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{parseFloat(product.originalPrice).toLocaleString()}
            </span>
          )}
        </div>

        <button className="text-pink-500 text-xs font-medium hover:text-pink-600">
          Check delivery date
        </button>
      </div>
    </div>
  );
};

// Product List Component
const ProductList = ({ products, onWishlist }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3">
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          onWishlist={onWishlist}
        />
      ))}
    </div>
  );
};

// Sort Component
const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 hidden sm:inline">Sort By:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="customer">Customer Recommended</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
};



const DynamicProductListingPage = () => {
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState("rings");
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("customer");
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryConfig = CATEGORY_CONFIG[currentCategory];

  const navigate = useNavigate();

  const handleWishlist = async (productId) => {
    try {
      const response = await apiConnectorGet(
        `${endpoint?.create_wishlist}?product_id=${productId}`
      );
      toast(response.data.message);
    } catch (error) {
      console.error("Wishlist API error:", error);
    }
  };

  // Initialize filters and products when category changes
  useEffect(() => {
    const initialFilters = {};
    Object.keys(categoryConfig.filters).forEach((filterKey) => {
      initialFilters[filterKey] = [];
    });
    setFilters(initialFilters);
    setActiveTab(categoryConfig.tabs[0]);
    setLoading(false);
  }, [currentCategory]);

  const { data, isLoading } = useQuery(
    ["get_product", id],
    () => axios.get(`${endpoint?.get_product_user}?product_sub_cat_id=${id}`),
    {
      keepPreviousData: true,
      enabled: !!id, // only fetch if id exists
    }
  );
  const product = data?.data?.result || [];
  const cat_id = product?.[0]?.product_category_id;

  const fetchSubcategories = async (cat_id) => {
    if (activeCategoryId === cat_id) {
      setActiveCategoryId(null);
      setSubcategories([]);
      return;
    }
    try {
      setActiveCategoryId(cat_id);
      const response = await axios.get(
        `${endpoint.get_sub_categroy_user}?category_id=${cat_id}`
      );
      setSubcategories(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch subcategories.");
    }
  };
  useEffect(() => {
    if (cat_id) {
      fetchSubcategories(cat_id);
    }
  }, [cat_id]);

  useEffect(() => {
    const enhancedProducts = (product || []).map((p, i) => ({
      ...p,
      images: [
        `https://source.unsplash.com/random/400x400?sig=${i}&product`,
        `https://source.unsplash.com/random/400x400?sig=${i + 100}&product`,
      ],
      isNew: Math.random() > 0.7,
    }));
    setAllProducts(enhancedProducts);
    setProducts(enhancedProducts);
  }, [product, id]); // <-- Add `id` here


  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Apply tab filters
    if (activeTab !== "All") {
      filteredProducts = filteredProducts.filter((product) => {
        switch (activeTab) {
          case "New In":
            return product.isNew;
          default:
            return true;
        }
      });
    }

    // Apply sidebar filters
    Object.entries(filters)?.forEach(([filterKey, selectedValues]) => {
      if (selectedValues?.length > 0) {
        filteredProducts = filteredProducts?.filter((product) => {
          return selectedValues?.some(
            (value) =>
              product?.name
                ?.toLowerCase()
                .includes(
                  typeof value === "string"
                    ? value.toLowerCase()
                    : String(value).toLowerCase()
                ) || Math?.random() > 0.5 // Random filter for demo
          );
        });
      }
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredProducts.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        // Customer recommended - keep original
        break;
    }

    setProducts(filteredProducts);
  }, [activeTab, filters, sortBy, allProducts]);

  const handleFilterChange = (filterKey, value, isChecked) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (isChecked) {
        newFilters[filterKey] = [...(newFilters[filterKey] || []), value];
      } else {
        newFilters[filterKey] = (newFilters[filterKey] || []).filter(
          (v) => v !== value
        );
      }
      return newFilters;
    });
  };

  const handleClearAll = () => {
    const clearedFilters = {};
    Object.keys(filters).forEach((key) => {
      clearedFilters[key] = [];
    });
    setFilters(clearedFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {subcategories.length > 0 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2 bg-white border-b">
                {subcategories.map((subcat) => (
                  <button
                    key={subcat.product_subcategory_id}
                    onClick={() => navigate(`/products_web/${subcat.product_subcategory_id}`)}
                    className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium hover:bg-purple-200 whitespace-nowrap"
                  >
                    {subcat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* <DynamicHeader categoryConfig={categoryConfig} /> */}

        <DynamicFilterTabs
          tabs={categoryConfig.tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg z-40"
          >
            <Filter className="w-5 h-5" />
          </button>

          <DynamicSidebarFilters
            categoryConfig={categoryConfig}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />

          <MobileFilterModal
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
            categoryConfig={categoryConfig}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-200">
              <div className="text-xs text-gray-600">
                Showing {products.length} of {allProducts.length} products
              </div>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {products.length > 0 ? (
              <ProductList products={products} onWishlist={handleWishlist} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Try adjusting your filters
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DynamicProductListingPage;
