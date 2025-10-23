import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomTable from "./Shared/CustomTable";

const ProductUnits = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [units, setUnits] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    un_name: "",
    un_slug: "",
    un_description: "",
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint.get_product_categroy);
      setCategories(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch units based on selected category
  const fetchUnits = async () => {
    if (!selectedCategoryId) return;
    try {
      setLoading(true);
      const res = await apiConnectorGet(
        `${endpoint.get_product_unitt}?un_category=${selectedCategoryId}`
      );
      setUnits(res?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch units.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => formData.un_name && formData.un_slug;

  const resetForm = () => {
    setFormData({ un_name: "", un_slug: "", un_description: "" });
    setSelectedUnit(null);
  };

  const createUnit = async () => {
    try {
      setLoading(true);
      const payload = {
        un_category: selectedCategoryId,
        ...formData,
      };
      const res = await apiConnectorPost(endpoint.create_product_unitt, payload);
      toast.success(res?.data?.message || "Unit created successfully.");
      setCreateModal(false);
      resetForm();
      fetchUnits();
    } catch (err) {
      toast.error("Error creating unit.");
    } finally {
      setLoading(false);
    }
  };

  const updateUnit = async () => {
    try {
      setLoading(true);
      const payload = {
        un_id: selectedUnit.un_id,
        un_category: selectedCategoryId,
        ...formData,
      };
      const res = await apiConnectorPost(endpoint.update_product_unitt, payload);
      toast.success(res?.data?.message || "Unit updated successfully.");
      setEditModal(false);
      resetForm();
      fetchUnits();
    } catch (err) {
      toast.error("Error updating unit.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUnit = async (un_id) => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(endpoint.delete_product_unitt, { un_id });
      toast.success(res?.data?.message || "Unit deleted successfully.");
      fetchUnits();
    } catch (err) {
      toast.error("Error deleting unit.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (unit) => {
    setSelectedUnit(unit);
    setFormData({
      un_name: unit.un_name,
      un_slug: unit.un_slug,
      un_description: unit.description || "",
    });
    setEditModal(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchUnits();
  }, [selectedCategoryId]);

  const tablehead = [
    <span>
      Name
    </span>,
    <span>
      Slug
    </span>,
    <span>
      Description
    </span>,
    <span>
      Actions
    </span>,
  ]

  const tablerow =
    units.map((unit) => [
      <span>
        {unit.un_name}
      </span>,
      <span>
        {unit.un_slug}
      </span>,
      <span>
        {unit.description}
      </span>,
      <span>
        <div className="flex space-x-2">
          <button
            onClick={() => openEditModal(unit)}
            className="text-green-600 hover:text-green-800"
          >
            ✏️
          </button>
          <button
            onClick={() => deleteUnit(unit.un_id)}
            className="text-red-600 hover:text-red-800"
          >
            🗑️
          </button>
        </div>
      </span>
    ])

  return (
    <div className="p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Category
        </label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-40"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.product_category_id} value={cat.product_category_id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Units</h1>
        <button
          onClick={() => setCreateModal(true)}
          disabled={!selectedCategoryId}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          <span>➕</span>
          <span>Add New Unit</span>
        </button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />
      {/* Create Modal */}
      {createModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Unit</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="un_name"
                value={formData.un_name}
                onChange={handleInputChange}
                placeholder="Unit Name *"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="un_slug"
                value={formData.un_slug}
                onChange={handleInputChange}
                placeholder="Slug *"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <textarea
                name="un_description"
                value={formData.un_description}
                onChange={handleInputChange}
                placeholder="Description"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setCreateModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={createUnit}
                disabled={!isFormValid() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Unit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Unit</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="un_name"
                value={formData.un_name}
                onChange={handleInputChange}
                placeholder="Unit Name *"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="un_slug"
                value={formData.un_slug}
                onChange={handleInputChange}
                placeholder="Slug *"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <textarea
                name="un_description"
                value={formData.un_description}
                onChange={handleInputChange}
                placeholder="Description"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setEditModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={updateUnit}
                disabled={!isFormValid() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Unit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUnits;
