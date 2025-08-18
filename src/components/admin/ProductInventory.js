import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import { Trash2, Edit } from "lucide-react";

const ProductInventory = () => {
  const [searchParams] = useSearchParams();
  const defaultVariantId = searchParams.get("variant_id");

  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [inventory, setInventory] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(defaultVariantId || "");

  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    inventory_id: null,
    quantity: "",
    reserved_quantity: "",
    minimum_quantity: "",
    batch_number: "",
    expiry_date: "",
    barcode: "",
    updated_by: "Admin",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) fetchVariants(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedVariant) fetchInventory(selectedVariant);
  }, [selectedVariant]);

  const fetchProducts = async () => {
    try {
      const res = await apiConnectorGet(endpoint.get_product_all);
      setProducts(res?.data?.result?.data || []);
    } catch {
      toast.error("Failed to fetch products.");
    }
  };

  const fetchVariants = async (productId) => {
    try {
      const res = await apiConnectorGet(`${endpoint.get_product_variant}?product_id=${productId}`);
      setVariants(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch variants.");
    }
  };

  const fetchInventory = async (variantId) => {
    try {
      const res = await apiConnectorGet(`${endpoint.get_product_inventory}?varient_id=${variantId}`);
      const inv = res?.data?.result?.[0] || null;
      setInventory(inv);
    } catch {
      toast.error("Failed to fetch inventory.");
    }
  };

  const openModalForAddUpdate = () => {
    if (!selectedVariant) return toast.error("Please select a variant.");

    const inv = inventory || {};
    setFormData({
      inventory_id: inv.inventory_id || null,
      quantity: inv.quantity || "",
      reserved_quantity: inv.reserved_quantity || "",
      minimum_quantity: inv.minimum_quantity || "",
      batch_number: inv.batch_number || "",
      expiry_date: inv.expiry_date?.split("T")[0] || "",
      barcode: inv.barcode || "",
      updated_by: "Admin",
    });
    setModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await apiConnectorPost(endpoint.delete_product_inventory, {
        inventory_id: inventory.inventory_id,
      });
      toast.success(res?.data?.message || "Deleted successfully.");
      setInventory(null);
    } catch {
      toast.error("Failed to delete inventory.");
    }
  };

  const handleSubmit = async () => {
    const payload = { ...formData };

    try {
      const res = await apiConnectorPost(endpoint.update_product_inventory, payload);
      toast.success(res?.data?.message);
      setModalOpen(false);
      fetchInventory(selectedVariant);
    } catch {
      toast.error("Failed to update inventory.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Inventory</h1>

      {/* Product Select */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Product</label>
        <select
          className="w-full border p-2"
          value={selectedProduct}
          onChange={(e) => {
            setSelectedProduct(e.target.value);
            setSelectedVariant("");
            setInventory(null);
          }}
        >
          <option value="">-- Select Product --</option>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Variant Select */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Select Variant</label>
        <select
          className="w-full border p-2"
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
        >
          <option value="">-- Select Variant --</option>
          {variants.map((variant) => (
            <option key={variant.varient_id} value={variant.varient_id}>
              {variant.varient_sku}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      {selectedVariant && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={openModalForAddUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {inventory ? "Update Inventory" : "Add Inventory"}
          </button>

          {inventory && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
        </div>
      )}

      {/* Inventory Info */}
      {inventory && (
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Current Inventory</h2>
          <ul className="text-sm space-y-1">
            <li>Quantity: {inventory.quantity}</li>
            <li>Reserved: {inventory.reserved_quantity}</li>
            <li>Minimum: {inventory.minimum_quantity}</li>
            <li>Batch #: {inventory.batch_number || "N/A"}</li>
            <li>Expiry: {inventory.expiry_date?.split("T")[0] || "N/A"}</li>
            <li>Barcode: {inventory.barcode || "N/A"}</li>
          </ul>
        </div>
      )}

      {/* Add/Update Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-lg font-bold mb-4">
          {formData.inventory_id ? "Update Inventory" : "Add Inventory"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2"
            type="number"
          />
          <input
            name="reserved_quantity"
            placeholder="Reserved Quantity"
            value={formData.reserved_quantity}
            onChange={handleChange}
            className="border p-2"
            type="number"
          />
          <input
            name="minimum_quantity"
            placeholder="Minimum Quantity"
            value={formData.minimum_quantity}
            onChange={handleChange}
            className="border p-2"
            type="number"
          />
          <input
            name="batch_number"
            placeholder="Batch Number"
            value={formData.batch_number}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            name="expiry_date"
            type="date"
            value={formData.expiry_date}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            name="barcode"
            placeholder="Barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setModalOpen(false)}
            className="mr-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductInventory;
