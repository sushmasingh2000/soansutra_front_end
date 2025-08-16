
import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { apiConnectorGet, apiConnectorPost } from '../../utils/ApiConnector';
import { endpoint } from '../../utils/APIRoutes';
import toast from 'react-hot-toast';
import { enCryptData } from '../../utils/Secret';

const StoreManagementTab = () => {
  const [stores, setStores] = useState([]);
  const [createStoreModal, setCreateStoreModal] = useState(false);
  const [editStoreModal, setEditStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);
  
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

  // Fetch stores
  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint?.get_store);
      setStores(response?.data?.result || []);
    } catch (err) {
      toast.error('Error fetching stores:', err);
    } finally {
      setLoading(false);
    }
  };

  const createStore = async () => {
    try {
      setLoading(true);
      const storeData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
      };

   const response = await apiConnectorPost(endpoint?.create_store,{
        payload: enCryptData(storeData)
      });
      setCreateStoreModal(false);
      resetForm();
      fetchStores();
      toast(response?.data?.message);
    } catch (err) {
      toast.error('Error creating store:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update store
  const updateStore = async () => {
    try {
      setLoading(true);
      const storeData = {
        store_id: selectedStore.store_id,
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
      };
  const response =  await apiConnectorPost(endpoint?.update_store, {
    payload:enCryptData(storeData)
  });
      setEditStoreModal(false);
      setSelectedStore(null);
      resetForm();
      fetchStores();
      toast(response?.data?.message);
    } catch (err) {
      toast.error('Error updating store:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete store
  const deleteStore = async (store) => {
    if (!window.confirm('Are you sure you want to delete this store?')) return;
    try {
      setLoading(true);
      const deleteData = {
        store_id: store.store_id
      };
    const res =   await apiConnectorPost(endpoint?.delete_store, {
      payload: enCryptData(deleteData ),
    });
      fetchStores();
      toast(res?.data?.message);
    } catch (err) {
      toast.error('Error deleting store:', err);
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