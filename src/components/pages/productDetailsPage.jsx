import React, { useState } from 'react';
import { Heart, Share2, ShoppingCart, Star, Shield, RotateCcw, Truck, CreditCard } from 'lucide-react';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';
import CustomerReviewSection from '../customerReview';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  // Mock data - in real app, this would come from props/API
  const [productData] = useState({
    id: "UE06254",
    name: "Birdy Gold Stud Earrings",
    price: 6675,
    originalPrice: 7500,
    discount: 11,
    rating: 4.5,
    reviewCount: 234,
    images: [
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_9_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_4_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_3_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_6_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_8_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_9_lar.jpg",
      "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_7_lar.jpg"      
    ],
    description: "Embrace a whimsical touch with the Birdy Gold Stud Earrings from CaratLane. These earrings feature bird-shaped designs that add a playful yet elegant charm to your look.",
    specifications: {
      material: "GOLD",
      dimensions: "Width - 7.95 mm, Height - 8.69 mm",
      weight: "0.630 g",
      purity: "14 KT"
    },
    manufacturer: "CaratLane Trading Pvt Ltd",
    features: [
      "100% Certified",
      "Lifetime Exchange",
      "One Year Warranty",
      "15 Day Money-Back"
    ],
    inStock: true,
    fastDelivery: true,
    deliveryTime: "Tomorrow 6PM-8PM"
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  const calculateSavings = () => {
    return productData.originalPrice - productData.price;
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Header/>
        <NavigationBar/>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="w-full h-80 sm:h-96 lg:h-[450px] overflow-hidden">
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md ${
                  isWishlisted ? 'text-red-500' : 'text-gray-400'
                } hover:text-red-500 transition-colors`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-purple-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-14 sm:h-16 overflow-hidden">
                    <img
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h1 className="text-xl sm:text-2xl font-medium text-gray-900 mb-1">
                {productData.name}
              </h1>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(productData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({productData.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-semibold text-gray-900">
                  {formatPrice(productData.price)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(productData.originalPrice)}
                </span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  {productData.discount}% OFF
                </span>
              </div>
              <p className="text-xs text-gray-600">
                You Save: {formatPrice(calculateSavings())}
              </p>
              <p className="text-xs text-gray-500">
                Price inclusive of all taxes
              </p>
            </div>

            {/* Fast Delivery */}
            {productData.fastDelivery && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <Truck className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-medium text-green-800">
                    Free Delivery: {productData.deliveryTime}
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Order in next 4 hrs 16 mins
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-2">
              <button 
                className="w-full text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 text-sm"
                style={{
                  background: 'linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)'
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                <Link to={"/shopping-cart"}>ADD TO CART</Link>
              </button>
              
              <div className="flex justify-center space-x-2">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 border border-gray-300 rounded-lg transition-colors ${
                    isWishlisted ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Features */}
          {/* <div className="grid grid-cols-2 gap-3">
  {productData.features.map((feature, index) => {
    // Sprite positions for each feature (scaled up 2x)
    const spritePositions = [
      { backgroundPosition: '0 0' }, // 100% Certified
      { backgroundPosition: '-40px 0' }, // Lifetime Exchange
      { backgroundPosition: '-80px 0' }, // One Year Warranty
      { backgroundPosition: '-120px 0' } // 15 Day Money-Back
    ];
    
    return (
      <div key={index} className="flex items-center space-x-2 text-xs">
        <div 
          className="w-8 h-8 flex-shrink-0" // Increased from w-4 h-4 to w-8 h-8 (2x)
          style={{
            backgroundImage: 'url(https://assets.cltstatic.com/images/responsive/pdp-sprites/cl-advantage-sprite.png?v2.0)',
            backgroundSize: '160px 40px', // Increased from 80px 20px (2x)
            backgroundRepeat: 'no-repeat',
            ...spritePositions[index]
          }}
        />
        <span className="text-gray-700">{feature}</span>
      </div>
    );
  })}
</div> */}

            {/* Product Details */}
            <div className="border-t pt-4">
              <h3 className="text-base font-medium text-gray-900 mb-3">Product Details</h3>
              
              <div className="space-y-3">
                <p className="text-gray-700 text-xs leading-relaxed">
                  {productData.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-medium text-gray-900">Material:</span>
                    <span className="ml-1 text-gray-700">{productData.specifications.material}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Weight:</span>
                    <span className="ml-1 text-gray-700">{productData.specifications.weight}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Dimensions:</span>
                    <span className="ml-1 text-gray-700">{productData.specifications.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Purity:</span>
                    <span className="ml-1 text-gray-700">{productData.specifications.purity}</span>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="font-medium text-gray-900">Manufactured by:</span>
                  <span className="ml-1 text-gray-700">{productData.manufacturer}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center space-x-6 py-4 border-t">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Hallmark<br/>Jewellery</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">Trust of<br/>TATA</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">100%<br/>Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerReviewSection/>
      <Footer/>
    </div>
  );
};

export default ProductPage;