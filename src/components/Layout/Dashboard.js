import React from 'react';

const Dashboard = () => {
  const dashboardStats = {
    totalStores: 12,
    totalUsers: 48,
    totalCategories: 25,
    activeRoles: 5
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cards */}
        {/* Total Stores */}
        <StatCard color="blue" label="Total Stores" value={dashboardStats.totalStores} icon={(
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
        )} />
        
        {/* Total Users */}
        <StatCard color="green" label="Total Users" value={dashboardStats.totalUsers} icon={(
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
        )} />

        {/* Categories */}
        <StatCard color="purple" label="Categories" value={dashboardStats.totalCategories} icon={(
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
          </svg>
        )} />

        {/* Active Roles */}
        <StatCard color="orange" label="Active Roles" value={dashboardStats.activeRoles} icon={(
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
          </svg>
        )} />
      </div>
    </div>
  );
};

const StatCard = ({ color, label, value, icon }) => (
  <div className={`bg-${color}-50 p-6 rounded-lg border border-${color}-200`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-${color}-600 text-sm font-medium`}>{label}</p>
        <p className={`text-3xl font-bold text-${color}-700`}>{value}</p>
      </div>
      <div className={`text-${color}-500`}>
        {icon}
      </div>
    </div>
  </div>
);

export default Dashboard;
