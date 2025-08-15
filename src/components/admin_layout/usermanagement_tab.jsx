import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

// Notification Component
const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification.autoClose !== false) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, notification.duration || 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: '✅'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: '❌'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: '⚠️'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'ℹ️'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: '📢'
        };
    }
  };

  const styles = getNotificationStyles(notification.type);

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-3 shadow-lg transform transition-all duration-300 ease-in-out`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <span className="text-lg">{styles.icon}</span>
        </div>
        <div className="flex-1">
          <h4 className={`${styles.text} font-semibold text-sm mb-1`}>
            {notification.title}
          </h4>
          <div className={`${styles.text} text-sm`}>
            {notification.message}
          </div>
          {notification.details && (
            <div className={`${styles.text} text-xs mt-2 opacity-75`}>
              {notification.details}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 ml-3">
          <button
            onClick={() => onClose(notification.id)}
            className={`${styles.text} hover:opacity-75 text-lg font-bold`}
          >
            ×
          </button>
        </div>
      </div>
      {notification.autoClose !== false && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-current h-1 rounded-full transition-all ease-linear"
              style={{
                width: '100%',
                animation: `shrink ${notification.duration || 5000}ms linear forwards`
              }}
            ></div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Notification Container
const NotificationContainer = ({ notifications, onClose }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

// Custom hook for notifications
const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date().toISOString()
    };
    
    setNotifications(prev => {
      // Prevent duplicate notifications with same message
      const isDuplicate = prev.some(n => 
        n.message === newNotification.message && 
        n.type === newNotification.type &&
        Date.now() - new Date(n.timestamp).getTime() < 1000 // Within 1 second
      );
      
      if (isDuplicate) {
        return prev;
      }
      
      // Keep only last 5 notifications to prevent memory issues
      const updated = [...prev, newNotification];
      return updated.slice(-5);
    });
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const showSuccess = (title, message, details = null) => {
    return addNotification({
      type: 'success',
      title,
      message,
      details,
      duration: 4000
    });
  };

  const showError = (title, message, details = null) => {
    return addNotification({
      type: 'error',
      title,
      message,
      details,
      autoClose: false // Error messages don't auto-close
    });
  };

  const showWarning = (title, message, details = null) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      details,
      duration: 6000
    });
  };

  const showInfo = (title, message, details = null) => {
    return addNotification({
      type: 'info',
      title,
      message,
      details,
      duration: 5000
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

// Encryption function
const enCryptData = (data) => {
  try {
    if (!data) return null;
    const secret = 'kljhdskjhdghjdfklsghdslkkjldfghds8934574jhbnj345b4kjhdyufdbnr345h34u5nbmebfhdui';
    if (!secret) throw new Error("Missing encryption key");
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secret
    ).toString();
    return encrypted;
  } catch (error) {
    console.log(error);
    return error.message || null;
  }
};

// API configuration
const API_CONFIG = {
  baseUrl: 'https://sonashutra-backend-code.onrender.com/',
  prefix: 'api/v1'
};

// Get full API URL
const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseUrl}${API_CONFIG.prefix}/${endpoint}`;
};

// Get auth token from localStorage (you'll need to set this after admin login)
const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || 'demo-token';
};

// CreateUserModal Component
const CreateUserModal = ({ isOpen, onClose, onSuccess, notifications }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    roleId: '',
    store_id: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      // Prepare data for encryption
      const dataToEncrypt = {
        ...formData,
        status: 1 // Always set to 1 as required
      };

      // Encrypt the data
      const encryptedPayload = enCryptData(dataToEncrypt);
      
      if (!encryptedPayload || typeof encryptedPayload !== 'string') {
        throw new Error('Failed to encrypt data');
      }

      const apiUrl = getApiUrl('create-user');

      const requestBody = {
        payload: encryptedPayload
      };

      console.log('🚀 CREATE USER - API URL:', apiUrl);
      console.log('🚀 CREATE USER - Request:', requestBody);

      // Make API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      console.log('📊 CREATE USER - API Response:', result);

      // Check for success/error based on different possible response structures
      const isSuccess = response.ok && 
                       (result.success === true || 
                        result.error === false || 
                        result.status === 'success' ||
                        result.message?.toLowerCase().includes('success'));

      if (!isSuccess) {
        const errorMessage = result.message || result.error || result.msg || 'Failed to create user';
        throw new Error(errorMessage);
      }

      // Show success notification with API response
      const successMessage = result.message || result.msg || 'User created successfully';
      const apiDetails = result.data ? JSON.stringify(result.data) : 'User creation completed';
      
      notifications.showSuccess(
        'User Created Successfully!',
        successMessage,
        apiDetails
      );

      onSuccess(result);
      onClose();
      setFormData({
        username: '',
        password: '',
        email: '',
        roleId: '',
        store_id: ''
      });
    } catch (error) {
      console.error('❌ CREATE USER - Error:', error);
      
      // Show error notification with actual error message
      notifications.showError(
        'Failed to Create User',
        error.message || 'An unexpected error occurred',
        `API Error: ${error.message || 'Unknown error occurred'}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role ID *
            </label>
            <input
              type="text"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store ID *
            </label>
            <input
              type="text"
              name="store_id"
              value={formData.store_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// EditUserModal Component
const EditUserModal = ({ isOpen, onClose, onSuccess, user, notifications }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    roleId: '',
    store_id: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '', // Don't pre-fill password for security
        email: user.email || '',
        roleId: user.roleId || user.role_id || '',
        store_id: user.store_id || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const userId = user.id || user.userId || user._id;
      
      if (!userId) {
        throw new Error('User ID not found. Please refresh the page and try again.');
      }

      // Prepare data for encryption
      const dataToEncrypt = {
        userId: userId,
        username: formData.username,
        email: formData.email,
        roleId: formData.roleId || formData.role_id,
        status: 1,
        store_id: formData.store_id
      };

      // Only include password if provided
      if (formData.password && formData.password.trim() !== '') {
        dataToEncrypt.password = formData.password;
      }

      // Encrypt the data
      const encryptedPayload = enCryptData(dataToEncrypt);
      
      if (!encryptedPayload || typeof encryptedPayload !== 'string') {
        throw new Error('Failed to encrypt data');
      }

      const apiUrl = getApiUrl('update-user-by-id');

      const requestBody = {
        payload: encryptedPayload
      };

      console.log('🚀 UPDATE USER - API URL:', apiUrl);
      console.log('🚀 UPDATE USER - Request:', requestBody);

      // Make API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      console.log('📊 UPDATE USER - API Response:', result);

      // Check for success/error based on different possible response structures
      const isSuccess = response.ok && 
                       (result.success === true || 
                        result.error === false || 
                        result.status === 'success' ||
                        result.message?.toLowerCase().includes('success'));

      if (!isSuccess) {
        const errorMessage = result.message || result.error || result.msg || 'Failed to update user';
        throw new Error(errorMessage);
      }

      // Show success notification with API response
      const successMessage = result.message || result.msg || 'User updated successfully';
      const apiDetails = result.data ? JSON.stringify(result.data) : 'User update completed';

      notifications.showSuccess(
        'User Updated Successfully!',
        successMessage,
        apiDetails
      );

      onSuccess(result);
      onClose();
    } catch (error) {
      console.error('❌ UPDATE USER - Error:', error);
      
      // Show error notification with actual error message
      notifications.showError(
        'Failed to Update User',
        error.message || 'An unexpected error occurred',
        `API Error: ${error.message || 'Unknown error occurred'}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password (leave blank to keep current)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password or leave blank"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role ID *
            </label>
            <input
              type="text"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store ID *
            </label>
            <input
              type="text"
              name="store_id"
              value={formData.store_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main UserManagementTab Component
const UserManagementTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null); // Track which user is being deleted
  
  // Use notifications hook
  const notifications = useNotifications();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const apiUrl = getApiUrl('get-user');

      console.log('🚀 FETCH USERS - API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      console.log('📊 FETCH USERS - API Response:', result);

      // Check for success/error based on different possible response structures
      const isSuccess = response.ok && 
                       (result.success === true || 
                        result.error === false || 
                        result.status === 'success' ||
                        !result.message?.toLowerCase().includes('error'));

      if (!isSuccess) {
        const errorMessage = result.message || result.error || result.msg || 'Failed to fetch users';
        throw new Error(errorMessage);
      }

      // Check different possible data structures
      let usersData = [];
      if (result.data) {
        usersData = result.data;
      } else if (result.users) {
        usersData = result.users;
      } else if (Array.isArray(result)) {
        usersData = result;
      } else if (result.result) {
        usersData = result.result;
      }

      // Log user data to see the structure and available ID fields
      console.log('👥 FETCH USERS - Users Data:', usersData);
      if (usersData.length > 0) {
        console.log('👤 FETCH USERS - First User Object:', usersData[0]);
        console.log('🆔 FETCH USERS - Available ID fields:', {
          id: usersData[0].id,
          userId: usersData[0].userId,
          _id: usersData[0]._id,
          user_id: usersData[0].user_id
        });
      }

      setUsers(Array.isArray(usersData) ? usersData : []);
      
      // Show success notification with API response
      if (Array.isArray(usersData) && usersData.length > 0) {
        const successMessage = result.message || `Successfully loaded ${usersData.length} user(s)`;
        notifications.showInfo(
          'Users Loaded',
          successMessage,
          `API Response: ${result.message || 'Data loaded successfully'}`
        );
      }
    } catch (error) {
      console.error('❌ Fetch users error:', error);
      
      // Show error notification with actual API error
      notifications.showError(
        'Failed to Load Users',
        error.message || 'Unable to fetch users from server',
        `API Error: ${error.message || 'Network or server error occurred'}`
      );
      
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle user creation success
  const handleCreateSuccess = () => {
    fetchUsers(); // Refresh user list
  };

  // Handle user update success
  const handleUpdateSuccess = () => {
    fetchUsers(); // Refresh user list
    setSelectedUser(null);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUserModal(true);
  };

  // Handle delete user - FIXED VERSION with GET method and query parameter
  const handleDeleteUser = async (user, username) => {
    // Extract userId from user object properly
    const userId = user.id || user.userId || user._id || user.user_id;
    
    console.log('🔍 DELETE USER - User Object:', user);
    console.log('🔍 DELETE USER - Extracted User ID:', userId);
    console.log('🔍 DELETE USER - Username:', username);
    
    if (!userId) {
      notifications.showError(
        'Delete Failed',
        'User ID not found',
        'Cannot delete user without a valid ID. Please refresh the page and try again.'
      );
      return;
    }

    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      return;
    }

    try {
      setDeleteLoading(userId); // Set loading state for this specific user
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      // Build the delete API URL with userId as query parameter (GET method)
      const apiUrl = `${getApiUrl('delete-user')}?userId=${userId}`;
      
      console.log('🚀 DELETE USER - API URL:', apiUrl);
      console.log('🚀 DELETE USER - Method: GET');
      console.log('🚀 DELETE USER - User ID:', userId);

      // Make the delete API call with GET method and userId as query parameter
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📊 DELETE USER - Response Status:', response.status);
      console.log('📊 DELETE USER - Response OK:', response.ok);
      console.log('📊 DELETE USER - Response Content-Type:', response.headers.get('content-type'));

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // If not JSON, get text response (likely HTML error page)
        const textResponse = await response.text();
        console.log('📊 DELETE USER - Text Response:', textResponse);
        
        // If we get HTML response, it's likely a 404 or server error
        if (textResponse.includes('<!DOCTYPE') || textResponse.includes('<html>')) {
          throw new Error(`API endpoint not found or server error (Status: ${response.status})`);
        }
        
        // Try to parse as JSON anyway in case it's malformed
        try {
          result = JSON.parse(textResponse);
        } catch (parseError) {
          throw new Error(`Invalid response format. Expected JSON but got: ${textResponse.substring(0, 100)}...`);
        }
      }
      
      console.log('📊 DELETE USER - Parsed Response:', result);

      // Check for success/error based on different possible response structures
      const isSuccess = response.ok && 
                       (result.success === true || 
                        result.error === false || 
                        result.status === 'success' ||
                        result.message?.toLowerCase().includes('success') ||
                        result.message?.toLowerCase().includes('deleted') ||
                        result.msg?.toLowerCase().includes('success') ||
                        result.msg?.toLowerCase().includes('deleted'));

      console.log('✅ DELETE USER - Is Success:', isSuccess);

      if (!isSuccess) {
        // Extract error message from various possible response structures
        const errorMessage = result.message || result.error || result.msg || result.data?.message || `Delete failed with status: ${response.status}`;
        console.error('❌ DELETE USER - Error Message:', errorMessage);
        throw new Error(errorMessage);
      }

      // Extract success message from API response
      const successMessage = result.message || result.msg || result.data?.message || `User "${username}" deleted successfully`;
      const apiDetails = result.data ? JSON.stringify(result.data) : `User ID: ${userId}`;
      
      console.log('✅ DELETE USER - Success Message:', successMessage);

      // Show success notification with actual API response message
      notifications.showSuccess(
        'User Deleted Successfully!',
        successMessage,
        `API Response: ${apiDetails}`
      );

      // Refresh user list after successful deletion
      await fetchUsers();

    } catch (error) {
      console.error('❌ DELETE USER - Caught Error:', error);
      console.error('❌ DELETE USER - Error Details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      // Show error notification with actual API error message
      notifications.showError(
        'Failed to Delete User',
        error.message || 'An unexpected error occurred while deleting the user',
        `API Error: ${error.message || 'Network or server error occurred'}`
      );
    } finally {
      setDeleteLoading(null); // Clear loading state
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications.notifications}
        onClose={notifications.removeNotification}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => setCreateUserModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.roleId || user.role_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.store_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 1 || user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 1 || user.status === 'Active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-green-600 hover:text-green-800 disabled:opacity-50"
                        title="Edit User"
                        disabled={deleteLoading === user.id}
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user, user.username)}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        title="Delete User"
                        disabled={deleteLoading === (user.id || user.userId || user._id || user.user_id)}
                      >
                        {deleteLoading === (user.id || user.userId || user._id || user.user_id) ? (
                          <span className="inline-block animate-spin">⏳</span>
                        ) : (
                          '🗑️'
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={createUserModal}
        onClose={() => setCreateUserModal(false)}
        onSuccess={handleCreateSuccess}
        notifications={notifications}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={editUserModal}
        onClose={() => {
          setEditUserModal(false);
          setSelectedUser(null);
        }}
        onSuccess={handleUpdateSuccess}
        user={selectedUser}
        notifications={notifications}
      />
    </div>
  );
};

export default UserManagementTab;