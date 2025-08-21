import { useState } from "react"
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { TreasureChestIcon } from "./treasure-chest-icon"
import { BrandLogo } from "./brand-logo"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Login } from "@mui/icons-material";
import { Profiler } from "react";
import { Lock, LogIn, User } from "lucide-react";


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
)

export default function Header() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const user = localStorage.getItem("token")
  //  const navigate = useNavigate();

  // const handleUserClick = () => {
  //   navigate('/login');
  // };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Remove all horizontal padding and use full width */}
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-2">
          {/* Logo - close to left edge */}
          <Link to={"/admin-login"} className="flex-shrink-0 pl-2">
            <BrandLogo />
          </Link>

          {/* Desktop Search Bar - much wider */}
          {/* <div className="hidden md:flex flex-1 max-w-4xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Relationship"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 border border-purple-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <button
                className="absolute right-0 top-0 h-full px-4 hover:opacity-90 text-white rounded-r-lg transition-all"
                style={{ background: 'linear-gradient(to right, #de57e5 0%, #8863fb 100%)' }}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div> */}

          <div className="hidden md:flex flex-1 max-w-4xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Relationship"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 border border-purple-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <button
                className="absolute right-0 top-0 h-full px-4 hover:opacity-90 text-white rounded-r-lg transition-all overflow-hidden"
                style={{
                  background: 'linear-gradient(to right, #de57e5 0%, #8863fb 100%)',
                  borderTopRightRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem'
                }}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation - close to right edge */}
          <div className="hidden lg:flex items-center space-x-2 pr-2">
            {/* Treasure Chest */}
            <button className="flex items-center space-x-2 px-3 py-2 bg-[#F8EBFB] text-gray-700 hover:text-purple-600 transition-colors rounded-lg border border-purple-500]">
              <TreasureChestIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Treasure Chest</span>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1">NEW</span>
            </button>

            {/* Store Locator */}
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors rounded-lg border border-[rgb(176,0,21)]">
              <MapPinIcon className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium ">Store locator</span>
            </button>

            {/* Gold/Location Info */}
            {/* <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 rounded-lg border-purple-500"> */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 rounded-lg border border-[rgb(176,135,0)]">
              <img
                src="https://cdn.caratlane.com/static/images/discovery/responsive-hamburger-menu/egold-1x.png"
                alt="e-Gold"
                className="h-6 w-auto"
              />
            </div>

            {/* Indian Flag */}
            {/* <div className="px-2">
              <IndianFlag />
            </div> */}

            <div className="px-2">
              <img
                src="https://th.bing.com/th/id/OIP.EDvMPBoxcb7F3r0YRni4YAHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
                alt="Indian Flag"
                className="w-6 h-auto"
              />
            </div>


            {/* User Actions */}
            <div className="flex items-center space-x-1">
              {user ? (
                <Link to="/myaccount/profile" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
              ) : (
                <Link to="/login" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <Lock className="h-6 w-6" />
                </Link>
              )}


              <Link to={"/wish"} className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                <HeartIcon className="h-6 w-6" />
              </Link>
              <Link to={"/shopping-cart"} className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-1 pr-2">
            <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
              <HeartIcon className="h-6 w-6" />
            </button>
            <Link to={"/shopping-cart"} className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Relationship"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-r-lg transition-colors">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 px-4">
            <div className="space-y-4">
              {/* Treasure Chest */}
              <button className="flex items-center space-x-3 w-full px-3 py-2 text-left text-gray-700 hover:text-purple-600 transition-colors">
                <TreasureChestIcon className="h-5 w-5" />
                <span className="font-medium">Treasure Chest</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">NEW</span>
              </button>

              {/* Store Locator */}
              <button className="flex items-center space-x-3 w-full px-3 py-2 text-left text-gray-700 hover:text-purple-600 transition-colors">
                <MapPinIcon className="h-5 w-5" />
                <span className="font-medium">Store locator</span>
              </button>

              {/* Gold/Location Info */}
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 p-3 bg-yellow-100 rounded-lg">
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">Gold</div>

                </div>

              </div>

              {/* User Profile */}
              <Link to={"/login"} className="flex items-center space-x-3 w-full px-3 py-2 text-left text-gray-700 hover:text-purple-600 transition-colors">
                <UserIcon className="h-5 w-5" />
                <span className="font-medium">My Account</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
