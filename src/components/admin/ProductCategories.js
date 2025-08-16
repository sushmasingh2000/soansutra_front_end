import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { domain, endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const ProductCategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewCategoryModal, setViewCategoryModal] = useState(false);
  const [viewCategoryData, setViewCategoryData] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", file: null });
  };

  const isFormValid = () => {
    return formData.name && formData.description;
  };

  const createCategory = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (formData.file) form.append("file", formData.file);

      const res = await apiConnectorPost(endpoint.category_product, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res?.data?.message || "Category created");
      setCreateCategoryModal(false);
      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error("Error creating category.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCategoryById = async (categoryId) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.get_product_categroy_by_id}?product_category_id=${categoryId}`
      );
      return res?.data?.result;
    } catch (err) {
      toast.error("Failed to fetch category by ID.");
      return null;
    }
  };

  const updateCategory = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("product_category_id", selectedCategory?.product_category_id);
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (formData.file) form.append("file", formData.file);

      const res = await apiConnectorPost(endpoint.upddate_product, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res?.data?.message || "Category updated");
      setEditCategoryModal(false);
      setSelectedCategory(null);
      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error("Error updating category.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (category) => {
    try {
      setLoading(true);
      const payload = { product_category_id: category.product_category_id };
      const res = await apiConnectorPost(endpoint.delete_product_category, payload);
      toast.success(res?.data?.message || "Category deleted");
      fetchCategories();
    } catch (err) {
      toast.error("Error deleting category.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || "",
      description: category.description || "",
      file: null,
    });
    setEditCategoryModal(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleViewCategory = async (category) => {
    const data = await fetchCategoryById(category.product_category_id);
    if (data) {
      setViewCategoryData(data);
      setViewCategoryModal(true);
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Product Categories
          </h1>
          <button
            onClick={() => setCreateCategoryModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add New Category</span>
          </button>
        </div>

        <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
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
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category.product_category_id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <img
                        src={
                          category.cat_image ||
                          "https://via.placeholder.com/80?text=No+Image"
                        }
                        alt={category.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewCategory(category)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          👁️
                        </button>

                        <button
                          onClick={() => openEditModal(category)}
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteCategory(category)}
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
          {Array.isArray(categories) && categories.length === 0 && !loading ? (
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
              No categories found. Click "Add New Store" to create one.
            </div>
          ) : Array.isArray(categories) ? (
            categories.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-lg shadow-sm border p-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {store.name}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      {store.description && (
                        <div className="sm:col-span-2">
                          <span className="font-medium text-gray-700">
                            Description:
                          </span>{" "}
                          {store.description}
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <span className="font-medium text-gray-700">Img:</span>{" "}
                        <img
                          src={
                            store.cat_image ||
                            "https://via.placeholder.com/80?text=No+Image"
                          }
                          alt={store.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 justify-end">
                    <button
                      onClick={() => openEditModal(store)}
                      className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 p-2 rounded-lg transition-colors"
                      disabled={loading}
                      title="Edit Store"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteCategory(store)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 p-2 rounded-lg transition-colors"
                      disabled={loading}
                      title="Delete Store"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-red-500">
              Error: Invalid data format received from server
            </div>
          )}
        </div>
        {/* view modal */}
        {viewCategoryModal && viewCategoryData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">View Category</h2>

              <div className="grid grid-cols-1 gap-4 text-sm text-gray-800">
                <div>
                  <strong>Name:</strong> {viewCategoryData.name}
                </div>
                <div>
                  <strong>Description:</strong> {viewCategoryData.description}
                </div>
                <div>
                  <strong>Image:</strong>
                  <br />
                  <img
                    src={
                      viewCategoryData.cat_image ||
                      "https://via.placeholder.com/100?text=No+Image"
                    }
                    alt="category"
                    className="w-32 h-32 object-cover rounded mt-2"
                  />
                </div>
                <div>
                  <strong>Created At:</strong>{" "}
                  {new Date(viewCategoryData.created_at).toLocaleString()}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setViewCategoryModal(false);
                    setViewCategoryData(null);
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
        {createCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Category Name *"
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
                    setCreateCategoryModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={createCategory}
                  disabled={!isFormValid() || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Category"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Store Modal */}
        {editCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Category Name *"
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
                    setEditCategoryModal(false);
                    setSelectedCategory(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={updateCategory}
                  disabled={!isFormValid() || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Category"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ProductCategoriesTab;
