import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint, rupees } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import moment from "moment";
import CustomTable from "./Shared/CustomTable";

const CouponPriceRange = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [SelectedRange, setSelectedRange] = useState(null);
  const client = useQueryClient();
  const [formData, setFormData] = useState({
    range_title: "",
    range_initial_amnt: 0,
    range_final_amnt: 0,
  });

  const { data: price_range } = useQuery(
    ["get_range"],
    () => apiConnectorGet(endpoint.get_coupon_range),
    usequeryBoolean
  );
  const price_range_data = price_range?.data?.result || [];

  const resetForm = () => {
    setFormData({
      range_title: "",
      range_initial_amnt: "",
      range_final_amnt: "",
    });
    setSelectedRange(null);
  };

  const handleSubmit = async () => {
    const { range_title, range_initial_amnt, range_final_amnt } = formData;

    if (!range_title || !range_initial_amnt || !range_final_amnt) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    const payload = SelectedRange
      ? { range_id: SelectedRange.range_id, ...formData }
      : { ...formData };

    const endpointUrl = SelectedRange
      ? endpoint.update_coupon_range
      : endpoint.create_coupon_range;

    try {
      const res = await apiConnectorPost(endpointUrl, payload);
      toast(res?.data?.message);
      if (res?.data?.success) {
        client.refetchQueries("get_range")
        setModalOpen(false);
        resetForm();
      }
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (material) => {
    setSelectedRange(material);
    setFormData({
      range_title: material.range_title || "",
      range_initial_amnt: material.range_initial_amnt || "",
      range_final_amnt: material.range_final_amnt || "",
    });
    setModalOpen(true);
  };
  const tablehead = [
    <span>S.No</span>,
    <span> Name</span>,
    <span>Price</span>,
    <span>Final Price</span>,
    <span>Status</span>,
    <span>Actions</span>,

  ]

  const tablerow = price_range_data.map((item, index) => [
    <span className="px-4 py-2">{index + 1}</span>,
    <span className="px-4 py-2">
      {item.range_title || "--"}
    </span>,
    <span className="px-4 py-2">{item.range_initial_amnt || "--"} </span>,
    <span className="px-4 py-2">{item.range_final_amnt || "--"} </span>,
    <span className="px-4 py-2">{item.range_created_at ? moment(item?.range_created_at)?.format("DD-MM-YYYY") : "--"} </span>
    ,
    <span className="px-4 py-2 space-x-2">
      <button
        onClick={() => handleEdit(item)}
        className="text-blue-600 hover:underline"
      >
        <Edit />
      </button>
    </span>

  ])
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Coupon Price Range</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Coupon Price Range
        </button>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">
              {SelectedRange ? "Edit Price Range" : "Add Price Range"}
            </h2>

            <input
              type="text"
              name="range_title"
              placeholder="Price Range Title"
              value={formData.range_title}
              onChange={(e) =>
                setFormData({ ...formData, range_title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="range_initial_amnt "
              placeholder="Intial Price"
              value={formData.range_initial_amnt}
              onChange={(e) =>
                setFormData({ ...formData, range_initial_amnt: e.target.value })
              }
              className="w-full border p-2 rounded"
            />


            <input
              type="number"
              name="range_final_amnt "
              placeholder="Material Value"
              value={formData.range_final_amnt}
              onChange={(e) =>
                setFormData({ ...formData, range_final_amnt: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

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
                {loading ? "Saving..." : SelectedRange ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponPriceRange;
