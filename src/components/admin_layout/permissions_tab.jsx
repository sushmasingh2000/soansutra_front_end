
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { endpoint } from '../../utils/APIRoutes';


// Helper function to get token from localStorage
const getToken = () => {
  const token = localStorage.getItem('authToken');
  console.log('Token from localStorage:', token); // Debug log
  return token;
};

// Helper function to create headers
const getHeaders = () => {
  const token = getToken();
  if (!token) {
    console.error('No token found in localStorage');
    throw new Error('Authentication token not found');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// API functions
const fetchRoles = async () => {
  try {
    const response = await fetch(endpoint?.get_role, {
      method: 'GET',
      headers: getHeaders()
    });
    
    console.log('Roles API Response Status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Roles API Error:', errorData);
      throw new Error(`Failed to fetch roles: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Roles API Response:', data);
    return data;
  } catch (error) {
    console.error('Roles API Error:', error);
    throw error;
  }
};

const fetchPermissions = async () => {
  try {
    const response = await fetch(endpoint?.get_role_permission, {
      method: 'GET',
      headers: getHeaders()
    });
    
    console.log('Permissions API Response Status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Permissions API Error:', errorData);
      throw new Error(`Failed to fetch permissions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Permissions API Response:', data);
    return data;
  } catch (error) {
    console.error('Permissions API Error:', error);
    throw error;
  }
};

const assignPermissionToRole = async ({ roleId, permissionId }) => {
  try {
    // Convert to numbers to ensure correct data type
    const numericRoleId = parseInt(roleId);
    const numericPermissionId = parseInt(permissionId);
    
    console.log('Assigning permission - RoleId:', numericRoleId, 'PermissionId:', numericPermissionId);
    
    const response = await fetch(`${endpoint?.assign_role_permission}?roleId=${numericRoleId}&permissionId=${numericPermissionId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    console.log('Assign Permission API Response Status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Assign Permission API Error:', errorData);
      throw new Error(`Failed to assign permission: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Assign Permission API Response:', data);
    return data;
  } catch (error) {
    console.error('Assign Permission API Error:', error);
    throw error;
  }
};

const removePermissionFromRole = async ({ roleId, permissionId }) => {
  try {
    // Convert to numbers to ensure correct data type
    const numericRoleId = parseInt(roleId);
    const numericPermissionId = parseInt(permissionId);
    
    console.log('Removing permission - RoleId:', numericRoleId, 'PermissionId:', numericPermissionId);
    
    const response = await fetch(`${endpoint?.remove_permission}?roleId=${numericRoleId}&permissionId=${numericPermissionId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    console.log('Remove Permission API Response Status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Remove Permission API Error:', errorData);
      throw new Error(`Failed to remove permission: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Remove Permission API Response:', data);
    return data;
  } catch (error) {
    console.error('Remove Permission API Error:', error);
    throw error;
  }
};

const fetchRolePermissions = async () => {
  try {
    const response = await fetch(endpoint?.get_role_permission, {
      method: 'GET',
      headers: getHeaders()
    });
    
    console.log('Role Permissions API Response Status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Role Permissions API Error:', errorData);
      throw new Error(`Failed to fetch role permissions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Role Permissions API Response:', data);
    return data;
  } catch (error) {
    console.error('Role Permissions API Error:', error);
    throw error;
  }
};

// New function to fetch role permissions for a specific role
const fetchRolePermissionsByRoleId = async (roleId) => {
  try {
    const response = await fetch(`${endpoint?.get_role_permission}?roleId=${roleId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    console.log('Role Permissions by RoleId API Response Status:', response.status);
    console.log('Fetching role permissions for roleId:', roleId);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Role Permissions by RoleId API Error:', errorData);
      throw new Error(`Failed to fetch role permissions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Role Permissions by RoleId API Response:', data);
    return data;
  } catch (error) {
    console.error('Role Permissions by RoleId API Error:', error);
    throw error;
  }
};

// Validation schemas
const assignPermissionSchema = Yup.object().shape({
  roleId: Yup.number().required('Role is required').positive('Invalid role'),
  permissionId: Yup.number().required('Permission is required').positive('Invalid permission')
});

const removePermissionSchema = Yup.object().shape({
  roleId: Yup.number().required('Role is required').positive('Invalid role'),  
  permissionId: Yup.number().required('Permission is required').positive('Invalid permission')
});

// Notification component
const Notification = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-lg z-50`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  );
};

const PermissionsTab = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('assign');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [notification, setNotification] = useState(null);
  const [selectedRoleIdForRemove, setSelectedRoleIdForRemove] = useState('');

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Fetch roles
  const { data: rolesData, isLoading: rolesLoading, error: rolesError } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    onError: (error) => {
      showNotification(`Error fetching roles: ${error.message}`, 'error');
    }
  });

  // Fetch permissions
  const { data: permissionsData, isLoading: permissionsLoading, error: permissionsError } = useQuery({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
    onError: (error) => {
      showNotification(`Error fetching permissions: ${error.message}`, 'error');
    }
  });

  // Fetch role permissions
  const { data: rolePermissionsData, isLoading: rolePermissionsLoading, error: rolePermissionsError, refetch: refetchRolePermissions } = useQuery({
    queryKey: ['rolePermissions'],
    queryFn: fetchRolePermissions,
    onError: (error) => {
      showNotification(`Error fetching role permissions: ${error.message}`, 'error');
    }
  });

  // Fetch role permissions for remove dropdown (only when role is selected)
  const { data: rolePermissionsForRemoveData, isLoading: rolePermissionsForRemoveLoading } = useQuery({
    queryKey: ['rolePermissionsForRemove', selectedRoleIdForRemove],
    queryFn: () => fetchRolePermissionsByRoleId(selectedRoleIdForRemove),
    enabled: !!selectedRoleIdForRemove && activeTab === 'remove',
    onError: (error) => {
      showNotification(`Error fetching role permissions for removal: ${error.message}`, 'error');
    }
  });

  // Assign permission mutation
  const assignPermissionMutation = useMutation({
    mutationFn: assignPermissionToRole,
    onSuccess: (data) => {
      showNotification(data.message || 'Permission assigned successfully!', 'success');
      queryClient.invalidateQueries(['rolePermissions']);
      assignFormik.resetForm();
    },
    onError: (error) => {
      showNotification(`Error assigning permission: ${error.message}`, 'error');
    }
  });

  // Remove permission mutation
  const removePermissionMutation = useMutation({
    mutationFn: removePermissionFromRole,
    onSuccess: (data) => {
      showNotification(data.message || 'Permission removed successfully!', 'success');
      queryClient.invalidateQueries(['rolePermissions']);
      queryClient.invalidateQueries(['rolePermissionsForRemove']);
      removeFormik.resetForm();
      setSelectedRoleIdForRemove('');
    },
    onError: (error) => {
      showNotification(`Error removing permission: ${error.message}`, 'error');
    }
  });

  // Form for assigning permissions
  const assignFormik = useFormik({
    initialValues: {
      roleId: '',
      permissionId: ''
    },
    validationSchema: assignPermissionSchema,
    onSubmit: async (values) => {
      console.log('Form submission values:', values);
      await assignPermissionMutation.mutateAsync(values);
    }
  });

  // Form for removing permissions
  const removeFormik = useFormik({
    initialValues: {
      roleId: '',
      permissionId: ''
    },
    validationSchema: removePermissionSchema,
    onSubmit: async (values) => {
      console.log('Remove form submission values:', values);
      
      // Find the actual roleId from roles data
      const selectedRole = safeRoles.find(role => {
        const roleId = role.roleId || role.id || role._id;
        return roleId == values.roleId;
      });
      
      // Find the actual permissionId from role permissions data
      const rolePermissionsForRemove = rolePermissionsForRemoveData?.result || rolePermissionsForRemoveData?.data || [];
      const selectedPermission = rolePermissionsForRemove.find(rp => {
        const permissionId = rp.permissionId || rp.permission?.id || rp.permission?._id;
        return permissionId == values.permissionId;
      });
      
      const finalRoleId = selectedRole ? (selectedRole.roleId || selectedRole.id || selectedRole._id) : values.roleId;
      const finalPermissionId = selectedPermission ? (selectedPermission.permissionId || selectedPermission.permission?.id || selectedPermission.permission?._id) : values.permissionId;
      
      console.log('Final values for removal:', { roleId: finalRoleId, permissionId: finalPermissionId });
      
      await removePermissionMutation.mutateAsync({
        roleId: finalRoleId,
        permissionId: finalPermissionId
      });
    }
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle role selection change in remove form
  const handleRemoveRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    setSelectedRoleIdForRemove(selectedRoleId);
    removeFormik.setValues({
      roleId: selectedRoleId,
      permissionId: ''
    });
  };

  // Extract data from API responses
  const roles = rolesData?.result || rolesData?.data || [];
  const permissions = permissionsData?.result || permissionsData?.data || [];
  const rolePermissions = rolePermissionsData?.result || rolePermissionsData?.data || [];
  
  // Add safety check to ensure arrays
  const safeRoles = Array.isArray(roles) ? roles : [];
  const safePermissions = Array.isArray(permissions) ? permissions : [];
  const safeRolePermissions = Array.isArray(rolePermissions) ? rolePermissions : [];
  
  // Get permissions for remove dropdown - filter by selected role
  const rolePermissionsForRemove = rolePermissionsForRemoveData?.result || rolePermissionsForRemoveData?.data || [];
  const safeRolePermissionsForRemove = Array.isArray(rolePermissionsForRemove) ? rolePermissionsForRemove : [];
  const filteredPermissionsForRemove = safeRolePermissionsForRemove.filter(rp => {
    const rpRoleId = rp.roleId || rp.role?.roleId || rp.role?.id || rp.role?._id;
    return rpRoleId == selectedRoleIdForRemove;
  });
  
  const totalPages = Math.ceil(safeRolePermissions.length / limit);
  const paginatedRolePermissions = safeRolePermissions.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('assign')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'assign' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Assign Permissions
            </button>
            <button
              onClick={() => setActiveTab('remove')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'remove' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Remove Permissions
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'view' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              View Role Permissions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'assign' && (
            <div>
              <h2 className="text-lg font-medium mb-4">Assign Permission to Role</h2>
              <form onSubmit={assignFormik.handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    name="roleId"
                    value={assignFormik.values.roleId}
                    onChange={(e) => {
                      console.log('Selected role value:', e.target.value);
                      assignFormik.handleChange(e);
                    }}
                    onBlur={assignFormik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={rolesLoading}
                  >
                    <option value="">Select a role</option>
                    {safeRoles.map(role => {
                      const roleId = role.roleId || role.id || role._id;
                      const roleName = role.roleName || role.name;
                      console.log('Role mapping:', { roleId, roleName, originalRole: role });
                      return (
                        <option key={roleId} value={roleId}>
                          {roleName}
                        </option>
                      );
                    })}
                  </select>
                  {rolesLoading && <div className="text-xs text-gray-500 mt-1">Loading roles...</div>}
                  {rolesError && <div className="text-xs text-red-500 mt-1">Error loading roles</div>}
                  {assignFormik.touched.roleId && assignFormik.errors.roleId && (
                    <div className="text-red-500 text-xs mt-1">{assignFormik.errors.roleId}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permission *</label>
                  <select
                    name="permissionId"
                    value={assignFormik.values.permissionId}
                    onChange={(e) => {
                      console.log('Selected permission value:', e.target.value);
                      assignFormik.handleChange(e);
                    }}
                    onBlur={assignFormik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={permissionsLoading}
                  >
                    <option value="">Select a permission</option>
                    {safePermissions.map(permission => {
                      const permissionId = permission.id || permission._id || permission.permissionId;
                      const permissionName = permission.permissionName || permission.name;
                      console.log('Permission mapping:', { permissionId, permissionName, originalPermission: permission });
                      return (
                        <option key={permissionId} value={permissionId}>
                          {permissionName}
                          {permission.description && ` - ${permission.description}`}
                        </option>
                      );
                    })}
                  </select>
                  {permissionsLoading && <div className="text-xs text-gray-500 mt-1">Loading permissions...</div>}
                  {permissionsError && <div className="text-xs text-red-500 mt-1">Error loading permissions</div>}
                  {assignFormik.touched.permissionId && assignFormik.errors.permissionId && (
                    <div className="text-red-500 text-xs mt-1">{assignFormik.errors.permissionId}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={!assignFormik.isValid || assignFormik.isSubmitting || assignPermissionMutation.isPending}
                >
                  {assignPermissionMutation.isPending ? 'Assigning...' : 'Assign Permission'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'remove' && (
            <div>
              <h2 className="text-lg font-medium mb-4">Remove Permission from Role</h2>
              <form onSubmit={removeFormik.handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    name="roleId"
                    value={removeFormik.values.roleId}
                    onChange={handleRemoveRoleChange}
                    onBlur={removeFormik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={rolesLoading}
                  >
                    <option value="">Select a role</option>
                    {safeRoles.map(role => {
                      const roleId = role.roleId || role.id || role._id;
                      const roleName = role.roleName || role.name;
                      return (
                        <option key={roleId} value={roleId}>
                          {roleName}
                        </option>
                      );
                    })}
                  </select>
                  {rolesLoading && <div className="text-xs text-gray-500 mt-1">Loading roles...</div>}
                  {rolesError && <div className="text-xs text-red-500 mt-1">Error loading roles</div>}
                  {removeFormik.touched.roleId && removeFormik.errors.roleId && (
                    <div className="text-red-500 text-xs mt-1">{removeFormik.errors.roleId}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permission *</label>
                  <select
                    name="permissionId"
                    value={removeFormik.values.permissionId}
                    onChange={(e) => {
                      console.log('Selected permission value (remove):', e.target.value);
                      removeFormik.handleChange(e);
                    }}
                    onBlur={removeFormik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!selectedRoleIdForRemove || rolePermissionsForRemoveLoading}
                  >
                    <option value="">
                      {!selectedRoleIdForRemove 
                        ? 'First select a role' 
                        : rolePermissionsForRemoveLoading 
                        ? 'Loading permissions...'
                        : 'Select a permission to remove'
                      }
                    </option>
                    {filteredPermissionsForRemove.map(rolePermission => {
                      const permissionId = rolePermission.permissionId || rolePermission.permission?.id || rolePermission.permission?._id;
                      const permissionName = rolePermission.permissionName || rolePermission.permission?.permissionName || rolePermission.permission?.name;
                      return (
                        <option key={permissionId} value={permissionId}>
                          {permissionName}
                          {rolePermission.permission?.description && ` - ${rolePermission.permission.description}`}
                        </option>
                      );
                    })}
                  </select>
                  {selectedRoleIdForRemove && rolePermissionsForRemoveLoading && (
                    <div className="text-xs text-gray-500 mt-1">Loading permissions for selected role...</div>
                  )}
                  {selectedRoleIdForRemove && !rolePermissionsForRemoveLoading && filteredPermissionsForRemove.length === 0 && (
                    <div className="text-xs text-orange-500 mt-1">No permissions assigned to this role</div>
                  )}
                  {removeFormik.touched.permissionId && removeFormik.errors.permissionId && (
                    <div className="text-red-500 text-xs mt-1">{removeFormik.errors.permissionId}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  disabled={!removeFormik.isValid || removeFormik.isSubmitting || removePermissionMutation.isPending || !selectedRoleIdForRemove}
                >
                  {removePermissionMutation.isPending ? 'Removing...' : 'Remove Permission'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'view' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Role Permissions</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => refetchRolePermissions()}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Refresh
                  </button>
                  <span className="text-sm text-gray-600">Show:</span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    {[5, 10, 20, 50].map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              {rolePermissionsLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedRolePermissions?.length > 0 ? (
                          paginatedRolePermissions.map((rp, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {rp.roleName || rp.role?.roleName || rp.role?.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {rp.permissionName || rp.permission?.permissionName || rp.permission?.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <button
                                  onClick={() => {
                                    const roleId = rp.roleId || rp.role?.roleId || rp.role?.id || rp.role?._id;
                                    const permissionId = rp.permissionId || rp.permission?.id || rp.permission?._id;
                                    
                                    setSelectedRoleIdForRemove(roleId);
                                    removeFormik.setValues({
                                      roleId: roleId,
                                      permissionId: permissionId
                                    });
                                    setActiveTab('remove');
                                  }}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                              No role permissions found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-700">
                        Page {page} of {totalPages} ({safeRolePermissions.length} total)
                      </span>
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Debug information - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>Roles data type: {typeof roles}, Array: {Array.isArray(roles).toString()}, Length: {Array.isArray(roles) ? roles.length : 'N/A'}</p>
          <p>Permissions data type: {typeof permissions}, Array: {Array.isArray(permissions).toString()}, Length: {Array.isArray(permissions) ? permissions.length : 'N/A'}</p>
          <p>Role Permissions data type: {typeof rolePermissions}, Array: {Array.isArray(rolePermissions).toString()}, Length: {Array.isArray(rolePermissions) ? rolePermissions.length : 'N/A'}</p>
          <p>Selected Role ID for Remove: {selectedRoleIdForRemove}</p>
          <p>Filtered Permissions for Remove: {filteredPermissionsForRemove.length}</p>
          <p>Current form values (assign): {JSON.stringify(assignFormik.values)}</p>
          <p>Current form values (remove): {JSON.stringify(removeFormik.values)}</p>
        </div>
      )}
    </div>
  );
};

export default PermissionsTab;