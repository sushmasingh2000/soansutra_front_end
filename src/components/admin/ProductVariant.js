import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const ProductVariant = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [variantModal, setVariantModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variants, setVariants] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint.get_product_all);
      setProducts(response?.data?.result?.data || []);
    } catch (err) {
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVariants = async (productId) => {
    try {
      const response = await apiConnectorGet(
        `${endpoint.get_product_variant}?product_id=${productId}`
      );
      setVariants(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch variants.");
    }
  };

  const openVariantModal = async (product) => {
    setSelectedProduct(product);
    await fetchVariants(product.product_id);
    setVariantModal(true);
  };

  const handleDeleteVariant = async (variant_id) => {
    try {
      await apiConnectorGet(
        `${endpoint.delete_product_variant}?variant_id=${variant_id}`
      );
      toast.success("Variant deleted");
      fetchVariants(selectedProduct.product_id);
    } catch (err) {
      toast.error("Error deleting variant");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Variants</h1>

      <div className="bg-white shadow border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                Price
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.product_id} className="border-t">
                <td className="px-4 py-3">{prod.name}</td>
                <td className="px-4 py-3">₹{prod.price}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openVariantModal(prod)}
                  >
                    Manage Variants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {variantModal && (
        <VariantModal
          product={selectedProduct}
          variants={variants}
          setModalOpen={setVariantModal}
          refreshVariants={fetchVariants}
          onDelete={handleDeleteVariant}
        />
      )}
    </div>
  );
};

const VariantModal = ({
  product,
  variants,
  setModalOpen,
  refreshVariants,
  onDelete,
}) => {
  const [form, setForm] = useState({
    sku: "",
    price: "",
    weight: "",
    dimensions: "",
    attributes: [],
  });

  const [newAttr, setNewAttr] = useState({ attribute_id: "", value: "" });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editVariantId, setEditVariantId] = useState(null);

  const resetForm = () => {
    setForm({
      sku: "",
      price: "",
      weight: "",
      dimensions: "",
      attributes: [],
    });
    setNewAttr({ attribute_id: "", value: "" });
    setEditing(false);
    setEditVariantId(null);
  };

  const addAttribute = () => {
    if (newAttr.attribute_id && newAttr.value) {
      setForm((prev) => ({
        ...prev,
        attributes: [...prev.attributes, newAttr],
      }));
      setNewAttr({ attribute_id: "", value: "" });
    }
  };

  const handleCreateVariant = async () => {
    if (!form.price || form.attributes.length === 0) {
      toast.error("Price and at least one attribute are required.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        product_id: product.product_id,
        ...form,
      };
      const res = await apiConnectorPost(
        endpoint.create_product_variant,
        payload
      );
      toast.success(res?.data?.message || "Variant created");
      resetForm();
      refreshVariants(product.product_id);
    } catch (err) {
      toast.error("Error creating variant");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVariant = async () => {
    try {
      setLoading(true);
      const payload = {
        varient_id: editVariantId,
        product_id: product.product_id,
        ...form,
      };

      const res = await apiConnectorPost(
        endpoint.update_product_variant,
        payload
      );
      toast.success(res?.data?.message || "Variant updated");
      resetForm();
      refreshVariants(product.product_id);
    } catch (err) {
      toast.error("Error updating variant");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (variant) => {
    setForm({
      sku: variant.sku || "",
      price: variant.price || "",
      weight: variant.weight || "",
      dimensions: variant.dimensions || "",
      attributes: variant.attributes || [],
    });
    setEditVariantId(variant.varient_id);
    setEditing(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          Variants for: {product.name}
        </h2>

        {/* Existing Variants */}
        <div className="space-y-4 mb-6">
          {variants.length === 0 ? (
            <div className="text-gray-500">No variants available.</div>
          ) : (
            variants.map((variant, idx) => (
              <div
                key={variant.varient_id || idx}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <div>
                    <strong>SKU:</strong> {variant.sku}
                  </div>
                  <div>
                    <strong>Price:</strong> ₹{variant.price}
                  </div>
                  <div>
                    <strong>Status:</strong> {variant.status}
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(variant)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(variant.varient_id)}
                    className="text-red-500 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New or Edit Variant Form */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">
            {editing ? "Edit Variant" : "Add Variant"}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="SKU"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Weight"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Dimensions"
              value={form.dimensions}
              onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
              className="border p-2 rounded"
            />

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Attribute ID"
                value={newAttr.attribute_id}
                onChange={(e) =>
                  setNewAttr({ ...newAttr, attribute_id: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Value"
                value={newAttr.value}
                onChange={(e) =>
                  setNewAttr({ ...newAttr, value: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <button
                onClick={addAttribute}
                className="bg-blue-600 text-white px-3 py-2 rounded"
              >
                ➕
              </button>
            </div>

            {form.attributes.length > 0 && (
              <div className="mt-2 space-y-1 text-sm">
                <strong>Attributes:</strong>
                {form.attributes.map((a, idx) => (
                  <div key={idx}>
                    {a.attribute_id}: {a.value}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 border rounded text-gray-700"
              disabled={loading}
            >
              Clear
            </button>
            <button
              onClick={editing ? handleUpdateVariant : handleCreateVariant}
              disabled={loading || !form.price || form.attributes.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading
                ? "Saving..."
                : editing
                ? "Update Variant"
                : "Add Variant"}
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setModalOpen(false);
              resetForm();
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductVariant;
