import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";

const SubCategory = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubsubcategories] = useState([]);
  const [createSubcategoryModal, setCreateSubcategoryModal] = useState(false);
  const [editSubcategoryModal, setEditSubcategoryModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [viewSubcategoryModal, setViewSubcategoryModal] = useState(false);
  const [viewSubcategoryData, setViewSubcategoryData] = useState(null);

  const resetForm = () => {
    setFormData({
      sub_cat_name: "",
      sub_cat_des: "",
      sub_cat_image: "",
      file: null,
    });
  };
  

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });
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
  // Fetch all subsubcategories
  const fetchSubsubcategories = async (categoryId) => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(
        `${endpoint.get_product_subcategory}?product_category_id=${categoryId}`
      );
      setSubsubcategories(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch subcategories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubsubcategories(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create subcategory
  const createSubcategory = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category.");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("product_category_id", selectedCategoryId); // ✅ category ID
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (formData.file) form.append("file", formData.file);

      const res = await apiConnectorPost(endpoint.sub_category_product, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res?.data?.message || "Subcategory created");
      setCreateSubcategoryModal(false);
      resetForm();
      fetchSubsubcategories(selectedCategoryId); // reload for current category
    } catch (err) {
      toast.error("Error creating subcategory.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategory by ID
  const fetchSubcategoryById = async (id) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.get_product_subcategory_by_id}?product_subcategory_id=${id}`
      );
      return res?.data?.result;
    } catch (err) {
      toast.error("Failed to fetch subcategory by ID.");
      return null;
    }
  };

  // Update subcategory
  const updateSubcategory = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category.");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append(
        "product_subcategory_id",
        selectedSubcategory?.product_subcategory_id
      );
      form.append("product_category_id", selectedCategoryId); // ✅ category ID
      form.append("name", formData.sub_cat_name);
      form.append("description", formData.sub_cat_des);

      if (formData.file) form.append("file", formData.file);

      const res = await apiConnectorPost(
        endpoint.update_product_subcategory,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res?.data?.message || "Subcategory updated");
      setEditSubcategoryModal(false);
      resetForm();
      fetchSubsubcategories(selectedCategoryId); // reload for current category
    } catch (err) {
      toast.error("Error updating subcategory.");
    } finally {
      setLoading(false);
    }
  };

  // Delete subcategory
  const deleteSubcategory = async (subcategory) => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(` ${endpoint.delete_product_subcategory}?product_subcategory_id=${subcategory.product_subcategory_id},` );
      toast.success(res?.data?.message || "Subcategory deleted");
      fetchSubsubcategories();
    } catch (err) {
      toast.error("Error deleting subcategory.");
    } finally {
      setLoading(false);
    }
  };
  const openEditModal = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSelectedCategoryId(subcategory.product_category_id);

    setFormData({
      sub_cat_name: subcategory.sub_cat_name || "",
      sub_cat_des: subcategory.sub_cat_des || "",
      sub_cat_image: subcategory.sub_cat_image || "",
      file: null,
    });

    setEditSubcategoryModal(true);
  };

  const handleViewCategory = async (category) => {
    const data = await fetchSubcategoryById(category.product_category_id);
    if (data) {
      setViewSubcategoryData(data);
      setViewSubcategoryModal(true);
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Product SubCategories
          </h1>
          <button
            onClick={() => setCreateSubcategoryModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add New SubCategory</span>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category:
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option
                key={cat.product_category_id}
                value={cat.product_category_id}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-scroll">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Sub Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subcategories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No subcategories found.
                  </td>
                </tr>
              ) : (
                subcategories.map((subcategory) => (
                  <tr
                    key={subcategory.product_subcategory_id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subcategory.sub_cat_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {subcategory.sub_cat_des}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                     <img
                        src={
                          subcategory.sub_cat_image ||
                          "https://via.placeholder.com/80?text=No+Image"
                        }
                        alt={subcategory.sub_cat_name}
                        className="w-20 h-20 object-cover rounded mt-1"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewCategory(subcategory)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => openEditModal(subcategory)}
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteSubcategory(subcategory)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.product_subcategory_id}
              className="bg-white rounded-lg shadow-sm border p-4"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {subcategory.sub_cat_name}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    {subcategory.sub_cat_des && (
                      <div className="sm:col-span-2">
                        <span className="font-medium text-gray-700">
                          Description:
                        </span>{" "}
                        {subcategory.sub_cat_des}
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <span className="font-medium text-gray-700">Image:</span>{" "}
                      <img
                        src={
                          subcategory.sub_cat_image ||
                          "https://via.placeholder.com/80?text=No+Image"
                        }
                        alt={subcategory.sub_cat_name}
                        className="w-20 h-20 object-cover rounded mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col gap-2 justify-end">
                  <button
                    onClick={() => openEditModal(subcategory)}
                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 p-2 rounded-lg transition-colors"
                    disabled={loading}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteSubcategory(subcategory)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 p-2 rounded-lg transition-colors"
                    disabled={loading}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* view modal */}
        {viewSubcategoryModal && viewSubcategoryData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">SubCategory Details</h2>

      <div className="grid grid-cols-1 gap-4 text-sm text-gray-800">
        {/* Subcategory Info */}
        <div>
          <strong>Subcategory ID:</strong> {viewSubcategoryData.product_subcategory_id}
        </div>
        <div>
          <strong>Subcategory Name:</strong> {viewSubcategoryData.sub_cat_name}
        </div>
        <div>
          <strong>Description:</strong> {viewSubcategoryData.sub_cat_des}
        </div>
        <div>
          <strong>Store ID:</strong> {viewSubcategoryData.store_id}
        </div>
        <div>
          <strong>Subcategory Image:</strong>
          <br />
          <img
            src={
              viewSubcategoryData.sub_cat_image ||
              "https://via.placeholder.com/100?text=No+Image"
            }
            alt="subcategory"
            className="w-32 h-32 object-cover rounded mt-2"
          />
        </div>
        <div>
          <strong>Created At:</strong>{" "}
          {new Date(viewSubcategoryData.sub_cat_created).toLocaleString()}
        </div>
        <div>
          <strong>Updated At:</strong>{" "}
          {new Date(viewSubcategoryData.sub_cat_updated).toLocaleString()}
        </div>

        <hr className="my-4" />

        {/* Category Info */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Category Details</h3>

        <div>
          <strong>Category ID:</strong> {viewSubcategoryData.category_details?.["`product_category_id`"]}
        </div>
        <div>
          <strong>Category Name:</strong> {viewSubcategoryData.category_details?.["`name`"]}
        </div>
        <div>
          <strong>Category Description:</strong> {viewSubcategoryData.category_details?.["`description`"]}
        </div>
        <div>
          <strong>Category Image:</strong>
          <br />
          <img
            src={
              viewSubcategoryData.category_details?.["`cat_image`"] ||
              "https://via.placeholder.com/100?text=No+Image"
            }
            alt="category"
            className="w-32 h-32 object-cover rounded mt-2"
          />
        </div>
        <div>
          <strong>Category Created At:</strong>{" "}
          {new Date(viewSubcategoryData.category_details?.["`created_at`"]).toLocaleString()}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => {
            setViewSubcategoryModal(false);
            setViewSubcategoryData(null);
          }}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        {/* Create Store Modal */}
        {createSubcategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                Add New SubCategory
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.product_category_id}
                      value={cat.product_category_id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Sub Category Name *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description *"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setCreateSubcategoryModal(false);
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={createSubcategory}
                    // disabled={!isFormValid() || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Category"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Store Modal */}
        {editSubcategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Edit SubCategory</h2>

              <div className="grid grid-cols-1 gap-4">
                {/* Category Dropdown */}
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.product_category_id}
                      value={cat.product_category_id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>

                {/* SubCategory Name */}
                <input
                  type="text"
                  name="sub_cat_name"
                  value={formData.sub_cat_name || ""}
                  onChange={handleInputChange}
                  placeholder="Subcategory Name *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Description */}
                <textarea
                  name="sub_cat_des"
                  value={formData.sub_cat_des || ""}
                  onChange={handleInputChange}
                  placeholder="Description *"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Image Preview (if exists) */}
                {formData.sub_cat_image && (
                  <img
                    src={formData.sub_cat_image}
                    alt="Subcategory"
                    className="w-24 h-24 object-cover rounded"
                  />
                )}

                {/* Upload New Image */}
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setEditSubcategoryModal(false);
                    setSelectedSubcategory(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={updateSubcategory}
                //   disabled={!isFormValid() || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update SubCategory"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SubCategory;
