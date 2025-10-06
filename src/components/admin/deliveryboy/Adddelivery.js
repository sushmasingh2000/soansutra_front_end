import React, { useState } from "react";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit, ToggleOn, ToggleOff } from "@mui/icons-material";
import CustomTable from "../Shared/CustomTable";
import { useQuery, useQueryClient } from "react-query";

const DeliveryBoy = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBoy, setSelectedBoy] = useState(null);
  const client = useQueryClient();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    password: "",
    email: "",
    mob: "",
    dob: "",
    address: "",
    pin_code: "",
    is_available: true,
  });

  const { data: boysData, isLoading } = useQuery(
    ["get_delivery_boys"],
    () => apiConnectorGet(endpoint.get_delivery_boys),
    usequeryBoolean
  );
  const deliveryBoys = boysData?.data?.result || [];

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      password: "",
      email: "",
      mob: "",
      dob: "",
      address: "",
      pin_code: "",
      is_available: true,
    });
    setSelectedBoy(null);
  };

  const handleSubmit = async () => {
    const { name, password, email, mob, dob, address, pin_code } = formData;
    if (!name || !password || !email || !mob || !dob || !address || !pin_code) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    const payload = { ...formData };

    try {
      const url = selectedBoy
        ? endpoint.update_delivery_boy
        : endpoint.create_delivery_boy;

      const res = await apiConnectorPost(url, payload);
      toast.success(res?.data?.message || "Delivery Boy saved.");
      client.refetchQueries("get_delivery_boys");
      setModalOpen(false);
      resetForm();
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (boy) => {
    setSelectedBoy(boy);
    setFormData({ ...boy });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.delete_delivery_boy}?id=${id}`);
      toast.success(res?.data?.message || "Deleted successfully.");
      client.refetchQueries("get_delivery_boys");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const toggleAvailability = async (id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.toggle_delivery_boy}?id=${id}`);
      toast.success(res?.data?.message || "Availability toggled.");
      client.refetchQueries("get_delivery_boys");
    } catch {
      toast.error("Failed to toggle availability.");
    }
  };

  const tablehead = ["S.No", "Name", "Email", "Mobile", "Available", "Actions"];

  const tablerow = deliveryBoys.map((boy, index) => [
    index + 1,
    boy.name,
    boy.email,
    boy.mob,
    <button onClick={() => toggleAvailability(boy.id)}>
      {boy.is_available ? (
        <ToggleOn className="text-green-500" />
      ) : (
        <ToggleOff className="text-gray-400" />
      )}
    </button>,
    <div className="flex gap-2">
      <button onClick={() => handleEdit(boy)} className="text-blue-600 hover:underline">
        <Edit />
      </button>
      <button
        onClick={() => handleDelete(boy.id)}
        className="text-red-600 hover:underline"
      >
        <DeleteForever />
      </button>
    </div>,
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Delivery Boys</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Delivery Boy
        </button>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={isLoading || loading}
      />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedBoy ? "Edit Delivery Boy" : "Add Delivery Boy"}
            </h2>

            {["name", "password", "email", "mob", "dob", "address", "pin_code"].map(
              (field) => (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              )
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
                disabled={loading}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? "Saving..." : selectedBoy ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryBoy;
