import React, { useState, useEffect } from "react";
import { endpoint } from "../../utils/APIRoutes";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import toast from "react-hot-toast";
import { Cancel } from "@mui/icons-material";

const Permissions = () => {
  const [activeTab, setActiveTab] = useState("assign");
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");

  const [rolePermissions, setRolePermissions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const totalPages = Math.ceil(rolePermissions.length / limit);
  const paginatedPermissions = rolePermissions.slice(
    (page - 1) * limit,
    page * limit
  );

  // Fetch roles and permissions initially
  useEffect(() => {
    const fetchRolesPermissions = async () => {
      try {
        const [rolesRes, permissionsRes] = await Promise.all([
          apiConnectorGet(endpoint.get_role), // for roles
          apiConnectorGet(endpoint.get_type_role_permission), // or another endpoint for permissions
        ]);
        setRoles(rolesRes.data?.result || []);
        setPermissions(permissionsRes.data?.result || []);
      } catch (error) {
        console.error("Error fetching roles or permissions", error);
      }
    };
    fetchRolesPermissions();
  }, []);

  // Fetch role-permission data
  const fetchRolePermissions = async (roleId) => {
    try {
      const res = await apiConnectorPost(endpoint.get_role_permission, {
        roleId: roleId,
      });
      setRolePermissions(res.data?.result || []);
    } catch (error) {
      console.error("Error fetching role permissions", error);
    }
  };

  // Assign permission
  const handleAssign = async () => {
    if (!selectedRole || !selectedPermission) {
      toast.error("Please select both role and permission");
      return;
    }

    try {
      const response = await apiConnectorPost(endpoint.assign_role_permission, {
        roleId: selectedRole,
        permissionId: selectedPermission,
      });

      toast.success(response?.data?.message || "Permission assigned");
      fetchRolePermissions(selectedRole);
    } catch (err) {
      toast.error("Failed to assign permission");
      console.error("Assignment failed", err);
    }
  };

  // Remove permission
  const handleRemove = async () => {
    if (!selectedRole || !selectedPermission) return toast("Select both");

    try {
      const response = await apiConnectorPost(endpoint.remove_permission, {
        roleId: selectedRole,
        permissionId: selectedPermission,
      });
      toast(response?.data?.message);
      fetchRolePermissions(selectedRole); // refresh data
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  // Remove individual from table
  const removeFromTable = async (permId) => {
    try {
      const response = await apiConnectorPost(endpoint.remove_permission, {
        roleId: selectedRole,
        permissionId: permId,
      });
      toast(response?.data?.message);
      fetchRolePermissions(selectedRole);
    } catch (e) {
      console.error("Failed to remove", e);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {["assign", "remove", "view"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                {tab === "assign"
                  ? "Assign Permissions"
                  : tab === "remove"
                    ? "Remove Permissions"
                    : "View Role Permissions"}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Assign */}
          {activeTab === "assign" && (
            <div>
              <h2 className="text-lg font-medium mb-4">
                Assign Permission to Role
              </h2>
              <div className="space-y-4 max-w-md">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>

                <select
                  onChange={(e) => setSelectedPermission(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option>Select a permission</option>
                  {permissions.map((perm) => (
                    <option key={perm.permissionId} value={perm.permissionId}>
                      {perm.permissionName}
                    </option>
                  ))}
                </select>

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleAssign}
                >
                  Assign Permission
                </button>
              </div>
            </div>
          )}

          {/* Remove */}
          {activeTab === "remove" && (
            <div>
              <h2 className="text-lg font-medium mb-4">
                Remove Permission from Role
              </h2>
              <div className="space-y-4 max-w-md">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>

                <select
                  onChange={(e) => setSelectedPermission(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option>Select a permission</option>
                  {permissions.map((perm) => (
                    <option key={perm.permissionId} value={perm.permissionId}>
                      {perm.permissionName}
                    </option>
                  ))}
                </select>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleRemove}
                >
                  Remove Permission
                </button>
              </div>
            </div>
          )}

          {/* View */}
          {activeTab === "view" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">Role Permissions</h2>
                <select
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    fetchRolePermissions(e.target.value);
                  }}
                  className="border px-2 py-1 rounded"
                >
                  <option>Select Role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-300">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-300">Permission</th>
                      <th className="px-6 py-3 border-b border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPermissions.length > 0 ? (
                      paginatedPermissions.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 border-b border-gray-200">{item.permissionName}</td>
                          <td className="px-6 py-4 border-b border-gray-200">
                            <button
                              onClick={() => removeFromTable(item.permissionId)}
                              className="text-red-600 hover:text-red-800 flex items-center gap-1"
                            >
                              <Cancel fontSize="small" />
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center py-6 text-gray-500">
                          No permissions found for this role.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Permissions;
