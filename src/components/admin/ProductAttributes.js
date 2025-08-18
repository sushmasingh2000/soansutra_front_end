import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const ProductAttributes = () => {
  const { product_id } = useParams(); 
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAttr, setSelectedAttr] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: ""
  });

  const fetchAttributes = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(`${endpoint.get_product_attributes}?product_id=${product_id}`);
      setAttributes(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch attributes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) fetchAttributes();
  }, [product_id]);

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "" });
    setSelectedAttr(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.slug) {
      toast.error("Name & slug are required.");
      return;
    }
    setLoading(true);
    const payload = selectedAttr
      ? { attribute_id: selectedAttr.attribute_id, product_id, ...formData }
      : { product_id, ...formData }; // 🟢 Add product_id in both cases

    const endpointUrl = selectedAttr
      ? endpoint.update_product_attributes
      : endpoint.create_product_attributes;

    try {
      const res = await apiConnectorPost(endpointUrl, payload);
      toast.success(res?.data?.message || "Success");
      fetchAttributes();
      setModalOpen(false);
      resetForm();
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (attr) => {
    setSelectedAttr(attr);
    setFormData({
      name: attr.name || "",
      slug: attr.slug || "",
      description: attr.description || ""
    });
    setModalOpen(true);
  };

  const handleDelete = async (attribute_id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.delete_product_attributes}?attribute_id=${attribute_id}`);
      toast.success(res?.data?.message || "Deleted");
      fetchAttributes();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Attributes</h1>
        <button onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Attribute
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr) => (
              <tr key={attr.attribute_id} className="border-t">
                <td className="px-4 py-2">{attr.name}</td>
                <td className="px-4 py-2">{attr.slug}</td>
                <td className="px-4 py-2">{attr.description || "-"}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(attr)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(attr.attribute_id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {attributes.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">No attributes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">{selectedAttr ? "Edit Attribute" : "Add Attribute"}</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button onClick={() => { setModalOpen(false); resetForm(); }}
                disabled={loading}
                className="px-4 py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {loading ? "Saving..." : (selectedAttr ? "Update" : "Save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAttributes;
