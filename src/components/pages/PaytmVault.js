import { Coins, FileText, PiggyBank } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiConnectorGet, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import EgoldHeader from "../egoldheader";
import Footer from "../Footer1";
import Header from "../Header1";
import NavigationBar from "../navigationbar";

const PaytmVault = () => {
  const navigate = useNavigate();
  const { data: profile } = useQuery(
    ["profile"],
    () => apiConnectorGet(endpoint?.get_customer_profile),
    {
      ...usequeryBoolean,
    }
  );

  const profileData = profile?.data?.result || [];

  return (
    <div className="min-h-screen bg-white overflow-y-hidden">
      <Header />
      <NavigationBar />
      <EgoldHeader />

      {/* Hero Section */}
      <div className="relative">
        {/* Desktop Banner */}
        <div
          className="hidden md:block h-[400px] lg:h-[466px] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(/image/e-suvarna-home-big-screen-background.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex items-center h-full max-w-9xl mx-auto px-4">
            <div className="text-white max-w-2xl">
              <h1 className="text-2xl lg:text-3xl  mb-4">
                SonaSutra Digital Gold
              </h1>
              <p className="text-[15px] mb-6">
                Invest in Pure 24k Gold online -100% Safe & trustworthy
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  onClick={() => navigate("/buy-gold")}
                >
                  Buy Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Banner */}
        <div
          className="block md:hidden h-[400px] bg-cover bg-center relative"
          style={{
            backgroundImage: "url(/image/e-swarna_home_mobile_background.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex items-center h-full px-4 ">
            <div className="text-white w-full text-center mb-40">
              <h1 className="text-2xl  mb-4 mt-1">SonaSutra Digital Gold</h1>
              <p className="text-[14px] mb-6">
                Invest in Pure 24k Gold online -100% Safe & trustworthy
              </p>
              <button
                className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold w-[1/2] max-w-xs"
                onClick={() => navigate("/buy-gold")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Gold Features Cards Section */}
      <div className="px-4 py-10 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Digital Gold
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Save in pure 24K Gold  <span className="text-green-500">₹{profileData?.gold_wallet}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <PiggyBank className="h-6 w-6 text-yellow-700" />

            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Daily Savings
            </h3>
            Save in pure 24K Gold  <span className="text-green-500"> {profileData?.gold_wallet}</span>
            {/* <p className="text-sm text-gray-600">
              Start saving as low as ₹10 per day
            </p> */}
          </div>

          {/* Card 2 */}
          <div
            className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            onClick={() => navigate("/buy-gold")}
          >
            <Coins className="h-6 w-6 text-yellow-700" />

            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Buy Gold
            </h3>
            <p className="text-sm text-gray-600">One time gold investment</p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            onClick={() => navigate("/sell-gold")}
          >
            <FileText className="h-6 w-6 text-yellow-700" />

            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Sell Gold
            </h3>
            <p className="text-sm text-gray-600">Upto ₹50 Lakhs</p>
          </div>

          {/* Card 4 */}
          {/* <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <CalendarDays className="h-6 w-6 text-yellow-700" />

            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Monthly Gold SIP
            </h3>
            <p className="text-sm text-gray-600">
              Save monthly, grow steadily with gold
            </p>
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaytmVault;
