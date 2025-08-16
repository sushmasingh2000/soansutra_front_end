import React, { useState } from 'react';
import StoreManagementTab from './admin_layout/store_mangement';
import UserManagementTab from './admin_layout/usermanagement_tab'; // Corrected import path
import RolePermissionsTab from './admin_layout/role_tab';
import Permissions_tab from './admin_layout/permissions_tab';

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('superadmin'); // superadmin, admin, user

  // Demo data
  const dashboardStats = {
    totalStores: 12,
    totalUsers: 48,
    totalCategories: 25,
    activeRoles: 5
  };

  // const demoStores = [
  //   { id: 1, name: 'Main Store', address: 'Delhi', contact: '9876543210', email: 'main@store.com', status: 'Active' },
  //   { id: 2, name: 'Branch Store', address: 'Mumbai', contact: '9876543211', email: 'branch@store.com', status: 'Active' },
  //   { id: 3, name: 'Online Store', address: 'Bangalore', contact: '9876543212', email: 'online@store.com', status: 'Inactive' }
  // ];

  // const demoUsers = [
  //   { id: 1, name: 'John Doe', email: 'john@store.com', phone: '9876543210', role: 'Manager', store: 'Main Store', status: 'Active' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@store.com', phone: '9876543211', role: 'Staff', store: 'Branch Store', status: 'Active' },
  //   { id: 3, name: 'Mike Johnson', email: 'mike@store.com', phone: '9876543212', role: 'Supervisor', store: 'Online Store', status: 'Inactive' }
  // ];

  // const demoRoles = [
  //   { id: 1, name: 'Store Manager', description: 'Manages store operations', permissions: 8, status: 'Active' },
  //   { id: 2, name: 'Sales Staff', description: 'Handles sales operations', permissions: 4, status: 'Active' },
  //   { id: 3, name: 'Supervisor', description: 'Supervises daily activities', permissions: 6, status: 'Active' }
  // ];

  const demoCategories = [
    { id: 1, name: 'Electronics', description: 'Electronic products and gadgets', parent: 'Root', products: 15, status: 'Active' },
    { id: 2, name: 'Clothing', description: 'Clothing and fashion items', parent: 'Root', products: 25, status: 'Active' },
    { id: 3, name: 'Home & Garden', description: 'Home and garden products', parent: 'Root', products: 12, status: 'Active' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', roles: ['superadmin', 'admin', 'user'] },
    { id: 'stores', label: 'Store Management', icon: '🏪', roles: ['superadmin'] },
    { id: 'users', label: 'User Management', icon: '👥', roles: ['superadmin'] },
    { id: 'roles', label: 'Role', icon: '🔐', roles: ['superadmin'] },
    { id: 'permissions', label: 'Permissions', icon: '🔐', roles: ['superadmin'] },
    { id: 'categories', label: 'Product Categories', icon: '📂', roles: ['superadmin', 'admin', 'user'] },
    { id: 'products', label: 'Products', icon: '📦', roles: ['superadmin', 'admin', 'user'] },
    { id: 'reports', label: 'Reports', icon: '📈', roles: ['superadmin', 'admin'] },
    { id: 'settings', label: 'Settings', icon: '⚙️', roles: ['superadmin', 'admin', 'user'] },
    { id: 'profile', label: 'Profile', icon: '👤', roles: ['superadmin', 'admin', 'user'] }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  // Header Component
  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md hover:bg-blue-700 transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5h5m-5-15v9a4 4 0 01-4 4H5a4 4 0 01-4-4V5a4 4 0 014-4h6m0 5V9" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                A
              </div>
            </button>
            
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => { setActiveTab('profile'); setProfileMenuOpen(false); }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <span className="mr-3">👤</span> Profile
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <span className="mr-3">🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  // Sidebar Component
  const Sidebar = () => (
    <aside className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
      sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
    }`}>
      <nav className="mt-4">
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Navigation</h2>
        </div>
        <ul className="mt-2">
          {filteredMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );

  // Dashboard Tab
  const DashboardTab = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Stores</p>
              <p className="text-3xl font-bold text-blue-700">{dashboardStats.totalStores}</p>
            </div>
            <div className="text-blue-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-green-700">{dashboardStats.totalUsers}</p>
            </div>
            <div className="text-green-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-purple-700">{dashboardStats.totalCategories}</p>
            </div>
            <div className="text-purple-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Active Roles</p>
              <p className="text-3xl font-bold text-orange-700">{dashboardStats.activeRoles}</p>
            </div>
            <div className="text-orange-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
            <span className="text-green-500">✅</span>
            <span className="text-sm text-gray-600">New store "Branch Store" was created</span>
            <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
            <span className="text-blue-500">👤</span>
            <span className="text-sm text-gray-600">User "John Doe" was assigned Manager role</span>
            <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
            <span className="text-purple-500">📂</span>
            <span className="text-sm text-gray-600">New category "Electronics" was added</span>
            <span className="text-xs text-gray-400 ml-auto">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );


      
  <>
  <StoreManagementTab/>
  <UserManagementTab/>
  <RolePermissionsTab/>
  <Permissions_tab/>
  </>
  

  
  // Product Categories Tab
  const ProductCategoriesTab = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Categories</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <span>➕</span>
          <span>Add New Category</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {demoCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{category.parent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{category.products}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">👁️</button>
                    <button className="text-green-600 hover:text-green-800">✏️</button>
                    <button className="text-red-600 hover:text-red-800">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Other Demo Tabs
  const ProductsTab = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
        <div className="text-6xl mb-4">📦</div>
        <p className="text-xl text-gray-600 mb-2">Products Management</p>
        <p className="text-gray-500">This section will handle product inventory, pricing, and details.</p>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-xl text-gray-600 mb-2">Analytics & Reports</p>
        <p className="text-gray-500">Analytics and reporting dashboard will be implemented here.</p>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">SMS Notifications</h3>
              <p className="text-sm text-gray-600">Receive SMS notifications for urgent alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">Auto Backup</h3>
              <p className="text-sm text-gray-600">Automatically backup data daily</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="admin@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+91 9876543210"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'stores': return userRole === 'superadmin' ? <StoreManagementTab /> : <div className="p-6 text-center text-red-600">Access Denied - Super Admin Only</div>;
      case 'users': return userRole === 'superadmin' ? <UserManagementTab /> : <div className="p-6 text-center text-red-600">Access Denied - Super Admin Only</div>;
      case 'roles': return userRole === 'superadmin' ? <RolePermissionsTab /> : <div className="p-6 text-center text-red-600">Access Denied - Super Admin Only</div>;
      case 'permissions': return <Permissions_tab/>
      case 'categories': return <ProductCategoriesTab />;
      case 'products': return <ProductsTab />;
      case 'reports': return <ReportsTab />;
      case 'settings': return <SettingsTab />;
      case 'profile': return <ProfileTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-0'
      } pt-16 min-h-screen`}>
        {renderTabContent()}
      </main>
      
      {/* Role Selector for Demo */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <label className="block text-xs font-medium text-gray-700 mb-2">Switch Role (Demo)</label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Create User Modal Component
const CreateUserModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    storeId: '',
    password: '',
    confirmPassword: '',
    status: 'active',
    sendCredentials: true,
    forcePasswordChange: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordGenerated, setPasswordGenerated] = useState(false);

  // Demo data
  const availableRoles = [
    { id: 1, name: 'Store Manager' },
    { id: 2, name: 'Sales Staff' },
    { id: 3, name: 'Supervisor' },
    { id: 4, name: 'Cashier' }
  ];

  const availableStores = [
    { id: 1, name: 'Main Store - Delhi' },
    { id: 2, name: 'Branch Store - Mumbai' },
    { id: 3, name: 'Online Store - Bangalore' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({
      ...formData,
      password: password,
      confirmPassword: password
    });
    setPasswordGenerated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Form validation
      if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.role || !formData.storeId) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Simulate API call
      console.log('Creating user:', formData);
      
      // Success
      onSuccess && onSuccess(formData);
      onClose();
      
      alert(`User created successfully! ${formData.sendCredentials ? 'Credentials sent to user email.' : 'Please share the credentials manually.'}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Create New User</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">👤 Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 9876543210"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="user@example.com"
                />
              </div>
            </div>
          </div>

          {/* Role & Access */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">🔐 Role & Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Role</option>
                  {availableRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Store <span className="text-red-500">*</span>
                </label>
                <select
                  name="storeId"
                  value={formData.storeId}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Store</option>
                  {availableStores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Password Section - THIS IS THE KEY PART! */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">🔒 Password Setup</h3>
            <div className="space-y-4">
              
              {/* Generate Password Button */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={generatePassword}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center space-x-2"
                >
                  <span>🎲</span>
                  <span>Generate Secure Password</span>
                </button>
                {passwordGenerated && (
                  <span className="text-green-600 text-sm font-medium">✅ Password Generated!</span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Enter password (min 8 characters)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              
              {/* Show generated password info */}
              {formData.password && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important:</strong> Please save this password securely. 
                    {formData.sendCredentials ? ' It will be sent to the user\'s email.' : ' Share it with the user manually.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">📧 Notification Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.sendCredentials}
                  onChange={(e) => setFormData({...formData, sendCredentials: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Send login credentials to user's email</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.forcePasswordChange}
                  onChange={(e) => setFormData({...formData, forcePasswordChange: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Force password change on first login</span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating User...' : '👤 Create User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;