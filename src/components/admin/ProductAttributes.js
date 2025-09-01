import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean
} from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Delete, Edit } from "lucide-react";

const ProductAttributes = () => {
  const [searchParams] = useSearchParams();
  const VariantId = searchParams.get("variant_id");
  const ProductId = searchParams.get("product_id");
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAttr, setSelectedAttr] = useState(null);

  const [formData, setFormData] = useState({
    attribute_id: "",
    value: "",
    value_id: ""
  });

  // Fetch all available attributes for dropdown
  const { data } = useQuery(
    ["attribute"],
    () => apiConnectorGet(endpoint.get_product_attributes),
    usequeryBoolean
  );
  const attributeList = data?.data?.result || [];

  // Fetch current attributes for the variant
  const fetchAttributes = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(
        `${endpoint.get_product_attributes_value}?varient_id=${VariantId}`
      );
      setAttributes(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch attributes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (VariantId) fetchAttributes();
  }, [VariantId]);

  const resetForm = () => {
    setFormData({
      attribute_id: "",
      value: "",
      value_id: ""
    });
    setSelectedAttr(null);
  };

  const handleSubmit = async () => {
    const { attribute_id, value, value_id } = formData;

    if (!attribute_id || !value) {
      toast.error("Attribute and value are required.");
      return;
    }

    const payload = {
      product_id: ProductId,
      varient_id: VariantId,
      attributes: [
        {
          attribute_id,
          value,
          value_id
        }
      ]
    };

    setLoading(true);

    try {
      const res = await apiConnectorPost(endpoint.create_update_product_attributes, payload);
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
      attribute_id: attr.attribute_id || "",
      value: attr.value || "",
      value_id: attr.value_id || ""
    });
    setModalOpen(true);
  };

  const handleDelete = async (value_id ) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.delete_product_attributes_value}?value_id=${value_id }`
      );
      toast(res?.data?.message);
      fetchAttributes();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Attributes</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Attribute
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">Attribute</th>
              <th className="px-4 py-3 text-left">Value</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{attr?.attribute_name || ""}</td>
                <td className="px-4 py-2">{attr.value || "-"}</td>
                <td className="px-4 py-2">{attr.un_name || "-"}</td>
                <td className="px-4 py-2">{attr.un_descriptoin || "-"}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(attr)}
                    className="text-blue-600 hover:underline"
                  >
                    <Edit/>
                  </button>
                  <button
                    onClick={() => handleDelete(attr.value_id)}
                    className="text-red-600 hover:underline"
                  >
                    <Delete/>
                  </button>
                </td>
              </tr>
            ))}
            {attributes.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No attributes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedAttr ? "Edit Attribute" : "Add Attribute"}
            </h2>
            <select
              value={formData.attribute_id}
              onChange={(e) =>
                setFormData({ ...formData, attribute_id: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">Select Attribute</option>
              {attributeList.map((option) => (
                <option key={option.attribute_id} value={option.attribute_id}>
                  {option.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Value"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
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
                {loading ? "Saving..." : selectedAttr ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAttributes;
