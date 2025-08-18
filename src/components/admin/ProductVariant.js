import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import VariantModal from "./Variant";

const ProductVariant = () => {
  const location = useLocation();
  const product = location?.state?.product;
  const [variants, setVariants] = useState([]);
  const [units, setUnits] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  useEffect(() => {
    if (product?.product_id) {
      fetchVariants();
      fetchUnits();
    }
  }, [product]);

  const fetchVariants = async () => {
    try {
      const response = await apiConnectorGet(
        `${endpoint.get_product_variant}?product_id=${product.product_id}`
      );
      setVariants(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch variants.");
    }
  };

  const fetchUnits = async () => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.get_product_unitt}?un_category=${product.product_category_id}`
      );
      setUnits(res?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch units");
    }
  };

  const handleDeleteVariant = async (variant_id) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.delete_product_variant}?variant_id=${variant_id}`
      );
      toast(res?.data?.message);
      if (res?.data?.success) {
        fetchVariants();
      }
    } catch (err) {
      toast.error("Error deleting variant");
    }
  };

  const openModalForEdit = (variant) => {
    setEditingVariant(variant);
    setModalIsOpen(true);
  };

  const openModalForCreate = () => {
    setEditingVariant(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!product) {
    return <div className="p-6 text-red-500">Product data not found!</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product : {product?.name}</h1>

      <button
        onClick={openModalForCreate}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Variant
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">SKU</th>
            <th className="border px-4 py-2 text-left">Price (₹)</th>
            <th className="border px-4 py-2 text-left">Weight</th>
            <th className="border px-4 py-2 text-left">Dimension Unit</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No variants found.
              </td>
            </tr>
          ) : (
            variants.map((variant) => (
              <tr key={variant.varient_id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{variant.varient_sku}</td>
                <td className="border px-4 py-2">{variant.varient_price}</td>
                <td className="border px-4 py-2">{variant.varient_weight}</td>
                <td className="border px-4 py-2">{variant.unit_name || "N/A"}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => openModalForEdit(variant)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVariant(variant.varient_id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Create/Edit Variant */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="bg-white p-6 max-w-5xl mx-auto mt-20 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <VariantModal
          product={product}
          variant={editingVariant}
          units={units}
          onClose={closeModal}
          refreshVariants={fetchVariants}
        />
      </ReactModal>
    </div>
  );
};

export default ProductVariant;
