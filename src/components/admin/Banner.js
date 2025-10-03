import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit, ToggleOn, ToggleOff } from "@mui/icons-material";
import CustomTable from "./Shared/CustomTable";
import { useQuery, useQueryClient } from "react-query";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const client = useQueryClient();
  const [formData, setFormData] = useState({
    ban_id: "",
    ban_tag: "",
    ban_image: "",
    ban_status: false,
  });
  const { data: bann, isLoading } = useQuery(
    ["get_bann_admin"],
    () => apiConnectorGet(endpoint.get_banner),
    usequeryBoolean
  );
  const banners = bann?.data?.result || [];
  const resetForm = () => {
    setFormData({ ban_id: "", ban_tag: "", ban_image: "", ban_status: false });
    setSelectedBanner(null);
  };

  const handleSubmit = async () => {
    const { ban_tag, ban_image, ban_id } = formData;
    if (!ban_tag || !ban_image) {
      toast.error("Banner tag & image are required.");
      return;
    }

    setLoading(true);
    const formPayload = new FormData();
    formPayload.append("ban_tag", ban_tag);
    formPayload.append("file", ban_image);
    if (selectedBanner) {
      formPayload.append("ban_id", ban_id);
    }

    const apiUrl = selectedBanner ? endpoint.update_banner : endpoint.create_banner;

    try {
      const res = await apiConnectorPost(apiUrl, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res?.data?.message || "Banner saved.");
      client.refetchQueries("get_bann_admin")
      setModalOpen(false);
      resetForm();
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setFormData({
      ban_id: banner.ban_id,
      ban_tag: banner.ban_tag,
      ban_image: banner.ban_image,
      ban_status: banner.ban_status,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.delete_banner}?ban_id=${id}`);
      toast.success(res?.data?.message || "Banner deleted.");
      client.refetchQueries("get_bann_admin")
    } catch {
      toast.error("Delete failed.");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.status_banner}?ban_id=${id}`);
      toast.success(res?.data?.message || "Status updated.");
      client.refetchQueries("get_bann_admin")
    } catch {
      toast.error("Could not change status.");
    }
  };

  const tablehead = ["S.No", "Tag", "Image", "Status", "Actions"];

  const tablerow = banners.map((banner, index) => [
    index + 1,
    banner.ban_tag,
    <img
      src={banner.ban_image}
      alt={banner.ban_tag}
      className="w-16 h-auto rounded"
    />,
    <button onClick={() => toggleStatus(banner.ban_id)}>
      {banner.ban_status === "Active" ? (
        <ToggleOn className="text-green-500" />
      ) : (
        <ToggleOff className="text-gray-400" />
      )}
    </button>,
    <div className="flex gap-2">
      <button onClick={() => handleEdit(banner)} className="text-blue-600 hover:underline">
        <Edit />
      </button>
      <button onClick={() => handleDelete(banner.ban_id)} className="text-red-600 hover:underline">
        <DeleteForever />
      </button>
    </div>,
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Banners</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Banner
        </button>
      </div>

      <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={loading} />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedBanner ? "Edit Banner" : "Add Banner"}
            </h2>
            <input
              type="text"
              name="ban_tag"
              placeholder="Banner Tag"
              value={formData.ban_tag}
              onChange={(e) =>
                setFormData({ ...formData, ban_tag: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, ban_image: e.target.files[0] })
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
                {loading ? "Saving..." : selectedBanner ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
