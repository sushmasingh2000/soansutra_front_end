import React, { useState, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Footer from "../Footer1";
import Header from "../Header1";
import { useQuery } from "react-query";
import { endpoint } from "../../utils/APIRoutes";
import axios from "axios";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import toast from "react-hot-toast";
import { useLoginModal } from "../../context/Login";

// Dynamic Filter Tabs Component
const DynamicFilterTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 px-4 py-4 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${activeTab === tab
            ? "bg-yellow-600 text-white"
            : "bg-yellow-100 text-yellow-700 hover:bg-purple-200"
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
              className="text-yellow-500 text-xs font-medium"
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
                        className="w-4 h-4 text-purple-600 rounded border-yellow-300"
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
                        {/* <span className="text-gray-400"> ({option.count})</span> */}
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
    <div className="hidden lg:block w-64 bg-white p-4 border-r border-yellow-200">
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
          className="text-yellow-500 text-xs font-medium"
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
                    className="w-4 h-4 text-yellow-600 rounded border-yellow-300"
                    checked={
                      filters[filterKey]?.includes(option.value) || false
                    }
                    onChange={(e) =>
                      onFilterChange(filterKey, option.value, e.target.checked)
                    }
                  />
                  <span className="text-xs text-gray-700">
                    {option.label || option.value}
                    {/* <span className="text-gray-400"> ({option.count})</span> */}
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
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-yellow-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

// Updated Product Card Component with navigation
const ProductCard = ({ product, onWishlist,collectionId }) => {
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
  const handleImageClick = (product) => {
    navigate("/productdetails", {
      state: { product : {
        product_id:product?.product_id,
        selected_variant_id:product?.selected_variant_id,
        collectionId:collectionId

      }},
    });
  };


  return (
    <div className="bg-white rounded-lg shadow-sm border border-yellow-200 overflow-hidden hover:shadow-md transition-shadow">
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
            onWishlist(product.product_id, product?.selected_variant_id);
          }}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4 text-yellow-500" />
        </button>

        {/* {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )} */}
      </div>

      <div className="p-3">
        <h3 className="text-xs text-gray-600 truncate mb-1">{product.name}</h3>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-800">
            ₹{Number(product.final_varient_price).toFixed(2)}
          </span>
        </div>

        <button className="text-yellow-500 text-xs font-medium hover:text-yellow-600">
          Check delivery date
        </button>
      </div>
    </div>
  );
};

// Product List Component
const ProductList = ({ products, onWishlist ,collectionId}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3">

      {products ?.map((product) => (
        <ProductCard
        collectionId={collectionId}
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
        className="border border-yellow-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
  // const { id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subcategory");
  const collectionId = searchParams.get("collection");

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
  const { setShowLoginModal } = useLoginModal();
  const navigate = useNavigate();

  const handleWishlist = async (productId, variantId) => {
    try {
      const response = await apiConnectorGet(
        `${endpoint?.create_wishlist}?product_id=${productId}&varient_id=${variantId}`
      );
      if (response?.data?.message !== "Unauthorised User!") {
        toast(response?.data?.message, { id: 1 })
      }
      if (response?.data?.message === "Unauthorised User!") {
        setShowLoginModal(true);
      }
    } catch (error) {
      console.error("Wishlist API error:", error);
    }
  };

  useEffect(() => {
    const initialFilters = {};
    Object.keys(categoryConfig.filters).forEach((filterKey) => {
      initialFilters[filterKey] = [];
    });
    setFilters(initialFilters);
    setActiveTab(categoryConfig.tabs[0]);
    setLoading(false);
  }, [currentCategory]);

  const fetchProducts = async () => {
    if (subcategoryId) {
      return axios.get(`${endpoint.get_product_user}?product_sub_cat_id=${subcategoryId}`);
    }
    else if (categoryId) {
      return axios.get(`${endpoint.get_product_user}?product_cat_id=${categoryId}`);
    }
    else if (collectionId) {
      return axios.get(`${endpoint.get_product_user}?product_coll_id=${collectionId}`);
    }
    return { data: { result: [] } }; // fallback
  };

  const { data, isLoading } = useQuery(
    ["get_product", subcategoryId, categoryId],
    fetchProducts,
    {
    enabled: !!subcategoryId || !!categoryId || !!collectionId,
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
  }, [product]); // <-- Add `id` here


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
  const isCollection = !!collectionId;
  const applyBackendFilters = async (newFilters) => {
    const payload = {isCollection};

    if (newFilters.price) payload.price_group = newFilters.price;
    if (newFilters.tags) payload.product_tags = newFilters.tags;
    if (newFilters.size) payload.attribute_value = newFilters.size;
    if (newFilters.metal) payload.ma_mat_name = newFilters.metal;

    try {
      const response = await apiConnectorPost(endpoint.filter_u_filte_by, payload);
      const filtered = response?.data?.result || [];

      // 🔁 Map to match ProductCard expected format
      const transformed = filtered.map((item, i) => {
        const product = item.product_details;
        const originalPrice = parseFloat(item.varient_price);
        const discount = item?.discount_details?.[0];

        const discountAmount =
          discount?.discount_type === "Percentage"
            ? (originalPrice * parseFloat(discount?.discount_value)) / 100
            : parseFloat(discount?.discount_value || 0);

        const finalPrice = discount ? originalPrice - discountAmount : originalPrice;

        return {
          product_id: item.product_id,
          name: product?.product_name || "Product",
          price: finalPrice,
          originalPrice: discount ? originalPrice : null,
          product_images: [
            {
              p_image_url:
                product?.product_image?.p_image_url ||
                "https://via.placeholder.com/400x400",
            },
          ],
          isNew: Math.random() > 0.7,
        };
      });

      setAllProducts(transformed);
      setProducts(transformed);
    } catch (error) {
      toast.error("Failed to apply filters.");
      console.error(error);
    }
  };

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

      applyBackendFilters(newFilters); // 🔁 call backend on change

      return newFilters;
    });
  };

  const handleClearAll = () => {
    const clearedFilters = {
      metal: [],
      price: [],
      size: [],
      tags: [],
    };
    setFilters(clearedFilters);
    applyBackendFilters(clearedFilters);
    window.location.reload(); // 🧹 clear backend filters too
  };

  const { data: high } = useQuery(
    ["filter_product"],
    () => apiConnectorGet(endpoint.u_filte_by),
    usequeryBoolean
  );

  const filter_product = high?.data?.result || [];
  const filterData = filter_product?.[0] || {};

  const dynamicFilters = {
    size: {
      label: "Size",
      options: filterData.sizes?.map((s) => ({
        value: s.size,
        label: s.size,
        // count: 0,
      })) || [],
    },
    price: {
      label: "Price Range",
      options:
        (filterData.price_groups || [])
          .sort((a, b) => {
            const getStart = (range) => {
              const match = range.match(/(\d+)/);
              return match ? parseInt(match[1]) : Number.MAX_SAFE_INTEGER;
            };
            return getStart(a) - getStart(b);
          })
          .map((price) => ({
            value: price,
            label: price,
          })),
    },
    metal: {
      label: "Metal",
      options: filterData.master_materials?.map((material) => ({
        value: material,
        label: material,
        // count: 0, // Update this with count from backend if available
      })) || [],
    },
    tags: {
      label: "Occassion",
      options: filterData.product_tags_details?.map((tag) => ({
        value: tag.product_tags,
        label: tag.product_tags,
        // count: 0,
      })) || [],
    }
  };

  const CATEGORY_CONFIG = {
    rings: {
      title: "Rings Collection",
      breadcrumb: "RINGS",
      filters: {
        ...dynamicFilters
      },
      tabs: ["All", "New In"],
    }
  };

  const categoryConfig = CATEGORY_CONFIG[currentCategory];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="bg-white border-b border-yelloe-200 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {subcategories.length > 0 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2 bg-white border-b">
                {subcategories.map((subcat) => (
                  <button
                    key={subcat.product_subcategory_id}
                    onClick={() => navigate(`/products_web?subcategory=${subcat.product_subcategory_id}`)}
                    className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium hover:bg-yellow-200 whitespace-nowrap"
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
            className="lg:hidden fixed bottom-6 right-6 bg-yellow-600 text-white p-3 rounded-full shadow-lg z-40"
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
            <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-yellow-200">
              <div className="text-xs text-gray-600">
                Showing {products.length} of {allProducts.length} products
              </div>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <ProductList products={products} onWishlist={handleWishlist} collectionId={collectionId}/>
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
                  className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
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
