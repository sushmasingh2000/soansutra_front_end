import React, { useState } from "react";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomTable from "../Shared/CustomTable";
import { useQuery, useQueryClient } from "react-query";
import { Switch } from "@mui/material";

const DeliveryBoy = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const client = useQueryClient();

  const [formData, setFormData] = useState({
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
    () => apiConnectorGet(endpoint.get_delivery_boy),
    usequeryBoolean
  );

  const deliveryBoys = boysData?.data?.result || [];

  const resetForm = () => {
    setFormData({
      name: "",
      password: "",
      email: "",
      mob: "",
      dob: "",
      address: "",
      pin_code: "",
      is_available: true,
    });
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
      const res = await apiConnectorPost(endpoint.create_delivery, payload);
      toast(res?.data?.message);
      if (res?.data?.success) {
        client.refetchQueries("get_delivery_boys");
        setModalOpen(false);
        resetForm();
      }
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (dl_dlv_unique, status_type) => {
    try {
      const payload = {
        dl_dlv_unique,
        status_type,
      };

      const res = await apiConnectorPost(endpoint.update_delivery, payload);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        client.refetchQueries("get_delivery_boys");
      } else {
        toast.error(res?.data?.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating status.");
    }
  };

  const tablehead = [
    "S.No",
    "Name",
    "Email",
    "Mobile",
    "Store",
    "City",
    "Available",
    "Login",
  ];

  const tablerow = deliveryBoys?.data?.map((boy, index) => [
    index + 1,
    boy.dl_dlv_name,
    boy.dl_email,
    boy.dl_mob,
    boy.store_details?.name || "N/A",
    boy.store_details?.city || "N/A",
    <Switch
      checked={boy.dl_is_available === 1}
      onChange={() => toggleAvailability(boy.dl_dlv_unique, "availibility")}
      color="primary"
    />,
    <Switch
      checked={boy.dl_lgn_status === 1}
      onChange={() => toggleAvailability(boy.dl_dlv_unique, "login")}
      color="primary"
    />,

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
              Add Delivery Boy
            </h2>

            {["name", "email", "mob", "dob", "address", "pin_code", "password"].map(
              (field) => (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  placeholder={field.replace("_", " ").toWellFormed()}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              )
            )}

            {/* <div className="flex items-center space-x-2">
              <label>Available:</label>
              <Switch
                checked={formData.is_available}
                onChange={(e) =>
                  setFormData({ ...formData, is_available: e.target.checked })
                }
              />
            </div> */}

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
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryBoy;
