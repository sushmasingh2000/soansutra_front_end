import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import CustomTable from "./Shared/CustomTable"; // ✅ make sure path is correct

const Collection = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const client = useQueryClient();

  const [formData, setFormData] = useState({
    coll_id: "",
    coll_name: "",
    coll_description: "",
    coll_image: "",
  });

  const { data: coll, isLoading } = useQuery(
    ["get_coll_admin"],
    () => apiConnectorGet(endpoint.get_collection),
    usequeryBoolean
  );
  const Collection = coll?.data?.result || [];

  const resetForm = () => {
    setFormData({
      coll_id: "",
      coll_name: "",
      coll_image: "",
      coll_description: "",
    });
    setSelectedBanner(null);
  };

  const handleSubmit = async () => {
    const { coll_name, coll_image, coll_id, coll_description } = formData;
    if (!coll_name || !coll_image || !coll_description) {
      toast.error("Collection & image are required.");
      return;
    }

    setLoading(true);
    const formPayload = new FormData();
    formPayload.append("coll_name", coll_name);
    formPayload.append("coll_description", coll_description);
    formPayload.append("file", coll_image);
    if (selectedBanner) {
      formPayload.append("coll_id", coll_id);
    }

    const apiUrl = selectedBanner ? endpoint.update_collection : endpoint.create_collection;
    try {
      const res = await apiConnectorPost(apiUrl, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res?.data?.message || "Collection saved.");
      client.refetchQueries("get_coll_admin");
      setModalOpen(false);
      resetForm();
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collection) => {
    setSelectedBanner(collection);
    setFormData({
      coll_id: collection.coll_id,
      coll_name: collection.coll_name,
      coll_description: collection.coll_description,
      file: collection.coll_image,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.delete_collection}?coll_id=${id}`);
      toast(res?.data?.message);
      client.refetchQueries("get_coll_admin");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const tablehead = ["S.No", "Name", "Image", "Actions"];

  const tablerow = Collection.map((item, index) => [
    index + 1,
    item.coll_name,
    <img
      src={item.coll_image}
      alt={item.coll_name}
      className="w-16 h-auto rounded"
    />,
    <div className="flex gap-2">
      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">
        <Edit />
      </button>
      <button onClick={() => handleDelete(item.coll_id)} className="text-red-600 hover:underline">
        <DeleteForever />
      </button>
    </div>,
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Collection</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Collection
        </button>
      </div>

      {/* ✅ CustomTable Integration */}
      <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedBanner ? "Edit Collection" : "Add Collection"}
            </h2>
            <input
              type="text"
              name="coll_name"
              placeholder="Collection"
              value={formData.coll_name}
              onChange={(e) => setFormData({ ...formData, coll_name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, coll_image: e.target.files[0] })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="coll_description"
              placeholder="Description"
              value={formData.coll_description}
              onChange={(e) =>
                setFormData({ ...formData, coll_description: e.target.value })
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

export default Collection;
