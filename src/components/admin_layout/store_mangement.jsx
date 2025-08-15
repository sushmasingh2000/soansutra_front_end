
import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const StoreManagementTab = () => {
  const [stores, setStores] = useState([]);
  const [createStoreModal, setCreateStoreModal] = useState(false);
  const [editStoreModal, setEditStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    status: true
  });

  // Environment variables
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'https://sonashutra-backend-code.onrender.com/';
  const API_PREFIX = import.meta.env.VITE_APP_API_PREFIX || 'api/v1';
  const BODY_SECRET = import.meta.env.VITE_APP_BODY_SECRET ;

  // Get token from localStorage for super user authorization
  const getAuthToken = () => {
    // Check multiple possible storage locations for the super user token
    return localStorage.getItem('superUserToken') || 
           localStorage.getItem('token') || 
           localStorage.getItem('authToken') || 
           localStorage.getItem('adminToken') ||
           sessionStorage.getItem('superUserToken') ||
           sessionStorage.getItem('token') ||
           sessionStorage.getItem('authToken');
  };

  // Encryption function
  const enCryptData = (data) => {
    try {
      if (!data) return null;
      if (!BODY_SECRET) throw new Error("Missing encryption key");

      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        BODY_SECRET
      ).toString();

      return encrypted;
    } catch (error) {
      console.log(error);
      return error.message || null;
    }
  };

  // API call helper
  const apiCall = async (endpoint, method = 'GET', data = null) => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No super user authorization token found. Please login again.');
    }

    // Fix the URL construction - remove extra slash
    let url = `${BASE_URL}${API_PREFIX}/${endpoint}`;
    if (endpoint === 'get-store') {
      url = `${BASE_URL}${API_PREFIX}/${endpoint}?=`; // As per your requirement
    }
    
    console.log('API URL:', url); // Debug log
    console.log('Token:', token.substring(0, 20) + '...'); // Debug log (partial token)
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    if (data && method !== 'GET') {
      const encryptedPayload = enCryptData(data);
      if (!encryptedPayload || typeof encryptedPayload === 'string' && encryptedPayload.startsWith('Missing')) {
        throw new Error('Failed to encrypt data: ' + encryptedPayload);
      }
      options.body = JSON.stringify({ payload: encryptedPayload });
      console.log('Request body:', { payload: 'encrypted_data_hidden' }); // Debug log
    }

    console.log('Request options:', { ...options, headers: { ...options.headers, Authorization: 'Bearer ***' } }); // Debug log

    const response = await fetch(url, options);
    
    console.log('Response status:', response.status); // Debug log
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', errorData); // Debug log
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API Success Response:', result); // Debug log
    return result;
  };

  // Fetch stores
  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('get-store');
      
      console.log('API Response:', response); // Debug log
      
      // Handle different possible response structures
      let storesData = [];
      if (response) {
        if (Array.isArray(response)) {
          storesData = response;
        } else if (response.data && Array.isArray(response.data)) {
          storesData = response.data;
        } else if (response.stores && Array.isArray(response.stores)) {
          storesData = response.stores;
        } else if (response.result && Array.isArray(response.result)) {
          storesData = response.result;
        }
      }
      
      setStores(storesData);
    } catch (err) {
      setError(`Failed to fetch stores: ${err.message}`);
      setStores([]); // Ensure stores is always an array
      console.error('Error fetching stores:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date for MySQL
  const formatDateForMySQL = (date = new Date()) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Create store
  const createStore = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const currentDateTime = formatDateForMySQL();
      
      const storeData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
        created_at: currentDateTime,
        updated_at: currentDateTime,
        status: formData.status ? 1 : 0
      };

      console.log('Sending store data:', storeData); // Debug log

      await apiCall('create-store', 'POST', storeData);
      
      setCreateStoreModal(false);
      resetForm();
      fetchStores();
      alert('Store created successfully!');
    } catch (err) {
      setError(`Failed to create store: ${err.message}`);
      console.error('Error creating store:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update store
  const updateStore = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const storeData = {
        store_id: selectedStore.id || selectedStore.store_id,
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
        updated_at: formatDateForMySQL(),
        status: formData.status ? 1 : 0
      };

      console.log('Sending update data:', storeData); // Debug log

      await apiCall('update-store', 'POST', storeData);
      
      setEditStoreModal(false);
      setSelectedStore(null);
      resetForm();
      fetchStores();
      alert('Store updated successfully!');
    } catch (err) {
      setError(`Failed to update store: ${err.message}`);
      console.error('Error updating store:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete store
  const deleteStore = async (store) => {
    // if (!confirm('Are you sure you want to delete this store?')) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const deleteData = {
        store_id: store.id || store.store_id
      };

      console.log('Sending delete data:', deleteData); // Debug log
      
      await apiCall('delete-store', 'POST', deleteData);
      
      fetchStores();
      alert('Store deleted successfully!');
    } catch (err) {
      setError(`Failed to delete store: ${err.message}`);
      console.error('Error deleting store:', err);
    } finally {
      setLoading(false);
    }
  };

  // Form helpers
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      email: '',
      status: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openEditModal = (store) => {
    console.log('Selected store for editing:', store); // Debug log
    setSelectedStore(store);
    setFormData({
      name: store.name || '',
      description: store.description || '',
      address: store.address || '',
      city: store.city || '',
      state: store.state || '',
      country: store.country || '',
      phone: store.phone || store.contact || '',
      email: store.email || '',
      status: store.status === 'Active' || store.status === true || store.status === 1
    });
    setEditStoreModal(true);
  };

  // Fetch stores on component mount
  useEffect(() => {
    fetchStores();
  }, []);

  // Form validation
  const isFormValid = () => {
    return formData.name && formData.address && formData.phone && formData.email &&
           formData.city && formData.state && formData.country;
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Store Management</h1>
        <button
          onClick={() => setCreateStoreModal(true)}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 w-full sm:w-auto justify-center"
        >
          <span>➕</span>
          <span>Add New Store</span>
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-start">
            <span className="flex-1 pr-4">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}
      
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(stores) && stores.length === 0 && !loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No stores found. Click "Add New Store" to create one.
                  </td>
                </tr>
              ) : Array.isArray(stores) ? (
                stores.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{store.description || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{store.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{store.city || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{store.phone || store.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{store.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        store.status === 'Active' || store.status === true
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {store.status === 'Active' || store.status === true ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openEditModal(store)}
                          className="text-green-600 hover:text-green-800 p-1"
                          disabled={loading}
                          title="Edit Store"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => deleteStore(store)}
                          className="text-red-600 hover:text-red-800 p-1"
                          disabled={loading}
                          title="Delete Store"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-red-500">
                    Error: Invalid data format received from server
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {Array.isArray(stores) && stores.length === 0 && !loading ? (
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
            No stores found. Click "Add New Store" to create one.
          </div>
        ) : Array.isArray(stores) ? (
          stores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{store.name}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    {store.description && (
                      <div className="sm:col-span-2">
                        <span className="font-medium text-gray-700">Description:</span> {store.description}
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <span className="font-medium text-gray-700">Address:</span> {store.address}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">City:</span> {store.city || '-'}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Contact:</span> {store.phone || store.contact}
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-medium text-gray-700">Email:</span> {store.email}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      store.status === 'Active' || store.status === true
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {store.status === 'Active' || store.status === true ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col gap-2 justify-end">
                  <button 
                    onClick={() => openEditModal(store)}
                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 p-2 rounded-lg transition-colors"
                    disabled={loading}
                    title="Edit Store"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => deleteStore(store)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 p-2 rounded-lg transition-colors"
                    disabled={loading}
                    title="Delete Store"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-red-500">
            Error: Invalid data format received from server
          </div>
        )}
      </div>

      {/* Create Store Modal */}
      {createStoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Store</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Store Name *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
                rows="2"
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Store Address *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
                rows="2"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Contact Number *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex items-center space-x-3 md:col-span-2">
                <input 
                  type="checkbox" 
                  id="status" 
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="rounded" 
                />
                <label htmlFor="status" className="text-sm text-gray-700">Active Status</label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setCreateStoreModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={createStore}
                disabled={!isFormValid() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                {loading ? 'Saving...' : 'Save Store'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Store Modal */}
      {editStoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Store</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Store Name *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
                rows="2"
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Store Address *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
                rows="2"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Contact Number *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex items-center space-x-3 md:col-span-2">
                <input 
                  type="checkbox" 
                  id="editStatus" 
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="rounded" 
                />
                <label htmlFor="editStatus" className="text-sm text-gray-700">Active Status</label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setEditStoreModal(false);
                  setSelectedStore(null);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={updateStore}
                disabled={!isFormValid() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                {loading ? 'Updating...' : 'Update Store'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreManagementTab;