import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { apiConnectorGet, apiConnectorPost } from '../../utils/ApiConnector';
import { endpoint } from '../../utils/APIRoutes';
import { enCryptData } from '../../utils/Secret';

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [editRoleName, setEditRoleName] = useState('');
  const [error, setError] = useState('');

  // Fetch roles from API
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await apiConnectorGet(endpoint?.get_role);
      setRoles(response?.data?.result || []);
    } catch (error) {
      toast.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new role
  const createRole = async () => {
    if (!newRoleName.trim()) {
      toast('Role name is required');
      return;
    }
    setLoading(true);
    try {
      const roleData = { roleName: newRoleName.trim() };
      const response = await apiConnectorPost(endpoint?.create_role, {
        payload: enCryptData(roleData),
      });
      toast(response?.data?.message)
      setNewRoleName('');
      setShowAddModal(false);
      await fetchRoles(); // Refresh the list
    } catch (error) {
      toast.error('Error creating role:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update role
  const updateRole = async () => {
    if (!editRoleName.trim() || !currentRole) {
      toast('Role name is required');
      return;
    }
    setLoading(true);
    try {
      const roleData = {
        roleId: currentRole.id || currentRole._id || currentRole.roleId,
        roleName: editRoleName.trim()
      };
      const response = await apiConnectorPost(endpoint?.update_role, {
        payload: enCryptData(roleData)
      });
      toast(response?.data?.message)
      setEditRoleName('');
      setCurrentRole(null);
      setShowEditModal(false);
      await fetchRoles(); // Refresh the list
    } catch (error) {
      toast.error('Error updating role:', error);
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
    try {
      const roleId = role.id || role._id || role.roleId;
      const response = await apiConnectorGet(`${endpoint?.delete_role}?roleId=${roleId}`, {
      });
      toast(response?.data?.message)
      await fetchRoles(); // Refresh the list
    } catch (error) {
      toast.error('Error deleting role:', error);
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(roles) && roles.length > 0 ? (
              roles.map((role, index) => (
                <tr key={role.id || role._id || role.roleId || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {role.roleName || role.roleName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => openEditModal(role)}
                      className="text-green-600 hover:text-green-900"
                      disabled={loading}>   ✏️   </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     <button
                    onClick={() => deleteRole(role)}
                    className="text-red-600 hover:text-red-900"
                    disabled={loading}
                  >
                    🗑️
                  </button>
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

export default Role;