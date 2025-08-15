import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const RolePermissionsTab = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [editRoleName, setEditRoleName] = useState('');
  const [error, setError] = useState('');

  // Environment variables
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'https://sonashutra-backend-code.onrender.com/';
  const API_PREFIX = import.meta.env.VITE_APP_API_PREFIX || 'api/v1';
  const BODY_SECRET = import.meta.env.VITE_APP_BODY_SECRET || 'kljhdskjhdghjdfklsghdslkkjldfghds8934574jhbnj345b4kjhdyufdbnr345h34u5nbmebfhdui';

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

  // Get token from localStorage or sessionStorage
  const getAuthToken = () => {
    // Try different possible storage keys for the admin token
    const possibleKeys = [
      'adminToken',
      'authToken', 
      'token',
      'userToken',
      'accessToken',
      'admin_token',
      'superAdminToken'
    ];

    for (const key of possibleKeys) {
      const token = localStorage.getItem(key) || sessionStorage.getItem(key);
      if (token) {
        console.log(`Found token in ${key}:`, token);
        return token;
      }
    }

    // If no token found, check if there's any token-like item in localStorage
    console.log('All localStorage items:', { ...localStorage });
    console.log('All sessionStorage items:', { ...sessionStorage });
    
    return null;
  };

  // Fetch roles from API
  const fetchRoles = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login as admin first.');
      }

      const response = await fetch(`${BASE_URL}${API_PREFIX}/get-role`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch roles: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Ensure we always set an array - handle all possible response structures
      let rolesData = [];
      
      if (Array.isArray(data)) {
        rolesData = data;
      } else if (data && typeof data === 'object') {
        // Try different possible array locations in response
        if (Array.isArray(data.roles)) {
          rolesData = data.roles;
        } else if (Array.isArray(data.data)) {
          rolesData = data.data;
        } else if (Array.isArray(data.result)) {
          rolesData = data.result;
        } else if (Array.isArray(data.items)) {
          rolesData = data.items;
        } else if (Array.isArray(data.list)) {
          rolesData = data.list;
        }
      }
      
      console.log('Processed roles data:', rolesData);
      setRoles(rolesData || []);
      
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError(error.message);
      setRoles([]); // Ensure roles is always an array even on error
    } finally {
      setLoading(false);
    }
  };

  // Create new role
  const createRole = async () => {
    if (!newRoleName.trim()) {
      setError('Role name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const roleData = { roleName: newRoleName.trim() };
      const encryptedPayload = enCryptData(roleData);

      if (!encryptedPayload) {
        throw new Error('Failed to encrypt data');
      }

      const response = await fetch(`${BASE_URL}${API_PREFIX}/create-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ payload: encryptedPayload }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create role: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Role created:', result);
      
      setNewRoleName('');
      setShowAddModal(false);
      await fetchRoles(); // Refresh the list
    } catch (error) {
      console.error('Error creating role:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update role
  const updateRole = async () => {
    if (!editRoleName.trim() || !currentRole) {
      setError('Role name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const roleData = { 
        roleId: currentRole.id || currentRole._id || currentRole.roleId,
        roleName: editRoleName.trim() 
      };
      const encryptedPayload = enCryptData(roleData);

      if (!encryptedPayload) {
        throw new Error('Failed to encrypt data');
      }

      const response = await fetch(`${BASE_URL}${API_PREFIX}/update-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ payload: encryptedPayload }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update role: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Role updated:', result);
      
      setEditRoleName('');
      setCurrentRole(null);
      setShowEditModal(false);
      await fetchRoles(); // Refresh the list
    } catch (error) {
      console.error('Error updating role:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete role
  const deleteRole = async (role) => {
    if (!window.confirm(`Are you sure you want to delete the role "${role.name || role.roleName}"?`)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const roleId = role.id || role._id || role.roleId;
      const response = await fetch(`${BASE_URL}${API_PREFIX}/delete-role?roleId=${roleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete role: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Role deleted:', result);
      
      await fetchRoles(); // Refresh the list
    } catch (error) {
      console.error('Error deleting role:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (role) => {
    setCurrentRole(role);
    setEditRoleName(role.name || role.roleName || '');
    setShowEditModal(true);
  };

  // Load roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  // Debug info
  console.log('Current roles state:', roles, 'Type:', typeof roles, 'Is Array:', Array.isArray(roles));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Role</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          disabled={loading}
        >
          ➕ Add New Role
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError('')}
            className="float-right text-red-700 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2">Loading...</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(roles) && roles.length > 0 ? (
              roles.map((role, index) => (
                <tr key={role.id || role._id || role.roleId || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {role.name || role.roleName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.description || 'No description'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.permissions || '0'} permissions
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      role.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {role.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">👁️</button>
                      <button 
                        onClick={() => openEditModal(role)}
                        className="text-green-600 hover:text-green-900"
                        disabled={loading}
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteRole(role)}
                        className="text-red-600 hover:text-red-900"
                        disabled={loading}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  {loading ? 'Loading roles...' : error ? 'Error loading roles' : 'No roles found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Add New Role</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  placeholder="Enter role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={createRole}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Role'}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewRoleName('');
                    setError('');
                  }}
                  className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Edit Role</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  placeholder="Enter role name"
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={updateRole}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Role'}
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditRoleName('');
                    setCurrentRole(null);
                    setError('');
                  }}
                  className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissionsTab;