import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { enCryptData } from "../../utils/Secret";

const CreateUserModal = ({ isOpen, onClose, onSuccess, notifications }) => {
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    roleId: "",
    store_id: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToEncrypt = {
        ...formData,
        status: 1, // Always set to 1 as required
      };
      const response = await apiConnectorPost(endpoint?.create_user, {
        payload: enCryptData(dataToEncrypt)
      });
      toast(response?.data?.message)
      onSuccess(response?.data?.result);
      onClose();
      setFormData({
        username: "",
        password: "",
        email: "",
        roleId: "",
        store_id: "",
      });
    } catch (error) {
      toast.error(" CREATE USER - Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      fetchRoles();
      fetchStores();
    }
  }, [isOpen]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await apiConnectorGet(endpoint?.get_role);
      setRoles(response?.data?.result || []);
    } catch (error) {
      toast.error("Error fetching roles");
    } finally {
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await apiConnectorGet(endpoint?.get_store);
      setStores(response?.data?.result || []);
    } catch (error) {
      toast.error("Error fetching stores");
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
              Role *
            </label>
            <select
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store *
            </label>
            <select
              name="store_id"
              value={formData.store_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Store</option>
              {stores.map((store) => (
                <option key={store.store_id} value={store.store_id}>
                  {store.name}
                </option>
              ))}
            </select>
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
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// EditUserModal Component
const EditUserModal = ({ isOpen, onClose, onSuccess, user }) => {
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    roleId: "",
    store_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
      fetchStores();
    }
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "",
        email: user.email || "",
        roleId: user.roleId || user.role_id || "",
        store_id: user.store_id || "",
      });
    }
  }, [user]);

  const fetchRoles = async () => {
    try {
      const response = await apiConnectorGet(endpoint?.get_role);
      setRoles(response?.data?.result || []);
    } catch (error) {
      toast.error("Error fetching roles");
    }
  };

  const fetchStores = async () => {
    try {
      const response = await apiConnectorGet(endpoint?.get_store);
      setStores(response?.data?.result || []);
    } catch (error) {
      toast.error("Error fetching stores");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = user.userId;
      const dataToEncrypt = {
        userId: userId,
        username: formData.username,
        email: formData.email,
        roleId: formData.roleId,
        status: 1,
        store_id: formData.store_id,
      };
      const response = await apiConnectorPost(endpoint?.update_user, {
        payload: enCryptData(dataToEncrypt),
      });
      toast(response?.data?.message);
      onSuccess(response?.data?.result);
      onClose();
    } catch (error) {
      toast.error("UPDATE USER - Error:", error);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md"
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
              placeholder="Enter new password or leave blank"
              className="w-full px-3 py-2 border rounded-md"
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
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Role dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>

          {/* Store dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store *
            </label>
            <select
              name="store_id"
              value={formData.store_id}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Store</option>
              {stores.map((store) => (
                <option key={store.store_id} value={store.store_id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Main UserManagementTab Component
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null); // Track which user is being deleted

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint?.get_user);
      setUsers(response?.data?.result || []);
    } catch (error) {
      toast.error(" Fetch users error:", error);
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

  const handleDeleteUser = async (user, username) => {
    const userId = user.id || user.userId || user._id || user.user_id;
    if (!userId) {
      toast(
        "Delete Failed",
        "User ID not found",
        "Cannot delete user without a valid ID. Please refresh the page and try again."
      );
      return;
    }
    if (
      !window.confirm(`Are you sure you want to delete user "${username}"?`)
    ) {
      return;
    }
    try {
      setDeleteLoading(userId);
      const response = await apiConnectorGet(
        `${endpoint?.delete_user}?userId=${userId}`
      );
      toast(response?.data?.msg);
      await fetchUsers();
    } catch (error) {
      toast.error("DELETE USER - Caught Error:", error);
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
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
                    {user.roleName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.storeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${user.status === 1 || user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {user.status === 1 || user.status === "Active"
                        ? "Active"
                        : "Inactive"}
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
                        disabled={
                          deleteLoading ===
                          (user.id || user.userId || user._id || user.user_id)
                        }
                      >
                        {deleteLoading ===
                          (user.id || user.userId || user._id || user.user_id) ? (
                          <span className="inline-block animate-spin">⏳</span>
                        ) : (
                          "🗑️"
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
      />
    </div>
  );
};

export default UserManagement;
