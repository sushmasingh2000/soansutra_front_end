import React, { useState } from "react";
import { apiConnectorGet } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit, ToggleOn, ToggleOff } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";

const DeliveryList = () => {
  const client = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: deliveryData, isLoading } = useQuery(
    ["get_delivery_boys"],
    () => apiConnectorGet(endpoint.get_delivery_boys)
  );

  const deliveryBoys = deliveryData?.data?.result || [];

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(`${endpoint.delete_delivery_boy}?id=${id}`);
      toast.success(res?.data?.message || "Deleted successfully.");
      client.refetchQueries("get_delivery_boys");
    } catch {
      toast.error("Failed to delete delivery boy.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (id) => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(`${endpoint.update_delivery}?id=${id}`);
      toast.success(res?.data?.message || "Status updated.");
      client.refetchQueries("get_delivery_boys");
    } catch {
      toast.error("Failed to toggle availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Delivery Boys</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deliveryBoys.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">No delivery boys found.</td>
              </tr>
            ) : (
              deliveryBoys.map((boy, index) => (
                <tr key={boy.id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{boy.name}</td>
                  <td className="px-6 py-4">{boy.email}</td>
                  <td className="px-6 py-4">{boy.mob}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleAvailability(boy.id)} title="Toggle Availability">
                      {boy.is_available ? (
                        <ToggleOn className="text-green-500" />
                      ) : (
                        <ToggleOff className="text-gray-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <button onClick={() => toast("Edit functionality coming soon")} title="Edit">
                      <Edit className="text-blue-500" />
                    </button>
                    <button onClick={() => handleDelete(boy.id)} title="Delete">
                      <DeleteForever className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryList;
