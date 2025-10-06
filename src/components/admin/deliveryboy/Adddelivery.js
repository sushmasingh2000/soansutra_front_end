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
import { Switch } from "@mui/material";

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
    () => apiConnectorGet(endpoint.get_delivery_boy),
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
        : endpoint.create_delivery;

      const res = await apiConnectorPost(url, payload);
      toast(res?.data?.message);

      if(res?.data?.success){
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
  const toggleAvailability = async (dl_dlv_unique, status_type = "login") => {
    try {
      const payload = {
        dl_dlv_unique,
        status_type, // can be 'login' or 'availibility'
      };
  
      const res = await apiConnectorPost(endpoint.update_delivery, payload);
      if (res?.data?.success) {
        toast.success(res?.data?.message );
        client.refetchQueries("get_delivery_boys");
      } else {
        toast.error(res?.data?.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating status.");
    }
  };
  

  const tablehead = ["S.No", "Name", "Email", "Mobile", "Store", "City" , "Available", 
    // "Actions"
];


  const tablerow = deliveryBoys.data?.map((boy, index) => [
    index + 1,
    boy.dl_dlv_name,
    boy.dl_email,
    boy.dl_mob,
    boy.store_details?.name || "N/A",
    boy.store_details?.city || "N/A",
<Switch
    checked={boy.dl_lgn_status === 1} // or whatever status you're toggling
    onChange={() =>
        toggleAvailability(boy.dl_dlv_unique, "login") // or "availibility"
    }
    color="primary"
  />,

    // <div className="flex gap-2">
    //   <button
    //     onClick={() => handleEdit(boy)}
    //     className="text-blue-600 hover:underline"
    //   >
    //     <Edit />
    //   </button>
    //   <button
    //     onClick={() => handleDelete(boy.dl_reg_id)}
    //     className="text-red-600 hover:underline"
    //   >
    //     <DeleteForever />
    //   </button>
    // </div>,
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
