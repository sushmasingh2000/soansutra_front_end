import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const TryAtHomeContent = () => {
  const appointments = [
    {
      id: 'APT001',
      date: '2024-02-15',
      time: '3:00 PM - 4:00 PM',
      status: 'Confirmed',
      items: 3,
      address: 'Home Address'
    },
    {
      id: 'APT002',
      date: '2024-02-20',
      time: '11:00 AM - 12:00 PM',
      status: 'Pending',
      items: 2,
      address: 'Office Address'
    }
  ];

  return (
    <div className="p-3 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Try at Home</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Book Appointment
        </button>
      </div>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">Appointment #{appointment.id}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {appointment.date} • {appointment.time}
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {appointment.address}
                </div>
              </div>
              <span className={`text-sm font-medium ${appointment.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                {appointment.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{appointment.items} items selected</span>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TryAtHomeContent;