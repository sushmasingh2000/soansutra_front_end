
import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  Store, 
  Home, 
  Video, 
  Check, 
  Clock,
  Calendar
} from 'lucide-react';
import VideoCallModal from './pages/ClientDemo/VideoCall';

const DeliveryStoresUI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinCode, setPinCode] = useState('201308'); // State to store pin code
  const [isEditingPin, setIsEditingPin] = useState(false); // State to toggle input mode
  const [tempPinCode, setTempPinCode] = useState(pinCode); // Temporary state for input

  const handlePinCodeSubmit = () => {
    setPinCode(tempPinCode); // Save the entered pin code
    setIsEditingPin(false); // Exit editing mode
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-4 space-y-4 sm:p-6">
      {/* Header */}
      <h1 className="text-lg font-bold text-gray-800 mb-4">
        Delivery, Stores & Trial
      </h1>
      
      {/* Location Input */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-purple-600">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-600" />
          {isEditingPin ? (
            <input
              type="text"
              value={tempPinCode}
              onChange={(e) => setTempPinCode(e.target.value)}
              className="text-gray-800 text-sm font-medium w-24 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-100"
              placeholder="Enter PIN"
              maxLength={6}
            />
          ) : (
            <span className="text-gray-800 text-sm font-medium">{pinCode}</span>
          )}
        </div>
        <button
          onClick={() => {
            if (isEditingPin) {
              handlePinCodeSubmit();
            } else {
              setIsEditingPin(true);
            }
          }}
          className="text-purple-600 text-sm font-semibold hover:text-purple-700 transition-colors"
        >
          {isEditingPin ? 'SUBMIT' : 'CHANGE'}
        </button>
      </div>

      {/* Free Delivery */}
      <div className="bg-white rounded-lg p-3 border border-grey-200">
        <div className="flex items-start space-x-2">
          <div className="bg-pink-100 p-1.5 rounded-lg">
            <Truck className="w-4 h-4 text-pink-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              Free Delivery Tomorrow 9AM-2PM
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-600 flex-wrap">
              <span>Order in next</span>
              <div className="flex items-center space-x-1 bg-white px-1.5 py-0.5 rounded border">
                <Clock className="w-3 h-3" />
                <span className="font-medium">3 Hrs 24 Mins</span>
              </div>
              <span className="text-red-500 font-medium">T&C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nearest Store */}
      <div className="bg-white rounded-lg p-3 border border-grey-200">
        <div className="flex items-start space-x-2 mb-3">
          <div className="bg-orange-100 p-1.5 rounded-lg">
            <Store className="w-4 h-4 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Nearest Store - <span className="text-gray-700">Gaur City Mall</span> (21km)
            </h3>
            <div className="flex items-center space-x-2 mb-1">
              <div className="bg-green-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-600" />
                <span className="text-green-700 text-xs font-medium">DESIGN AVAILABLE</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Also Available in <span className="text-purple-600 font-medium">6 other stores</span>
            </p>
          </div>
        </div>
        <button className="w-full hover:bg-orange-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors" style={{ background: "linear-gradient(270deg, rgb(255, 91, 108) 0%, rgb(253, 139, 100) 100%)" }}>
          FIND IN STORE
        </button>
      </div>

      {/* Try At Home */}
      {/* <div className="bg-white rounded-xl p-4 border border-grey-200">
        <div className="flex items-start space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Home className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">
              Try At Home <span className="text-green-600">(It's Free)</span>
            </h3>
            <p className="text-sm text-gray-600">
              Home Appointment <span className="font-medium text-blue-600">Available to try from Today!</span>
            </p>
          </div>
        </div>
        <button className="w-full text-sm hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition-colors flex items-center justify-center space-x-2" style={{ background: "linear-gradient(to right, rgb(156, 162, 244), rgb(119, 109, 231))" }}>
          <Calendar className="w-4 h-4" />
          <span>BOOK HOME APPOINTMENT</span>
        </button>
      </div> */}

      {/* Live Video Call */}
      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img 
              src="data:image/jpeg;base64,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"
              alt="Video call consultation"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800">
              Live Video Call
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              Join a live video call with our consultants to see your favourite designs up close!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-100 text-green-600 py-2 px-4 rounded-xl transition-colors flex items-center space-x-2 hover:bg-green-200"
            >
              <span className="text-[15px]">Schedule a Video Call</span>
            </button>
          </div>
        </div>
      </div>

      <VideoCallModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default DeliveryStoresUI;