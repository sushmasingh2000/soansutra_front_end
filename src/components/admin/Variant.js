import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const VariantModal = ({
  product,
  variant,
  units,
  onClose,
  refreshVariants,
}) => {
  const [form, setForm] = useState({
    sku: "",
    price: "",
    weight: "",
    dimensions: "",
    attributes: [],
  });
  const [attributesList, setAttributesList] = useState([]);
  const [newAttr, setNewAttr] = useState({ attribute_id: "", value: "" });
  const [loading, setLoading] = useState(false);

  const editing = Boolean(variant);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await apiConnectorGet(endpoint.get_product_attributes);
        setAttributesList(res?.data?.result || []);
      } catch {
        toast.error("Failed to fetch attributes");
      }
    };
    fetchAttributes();
  }, []);

  useEffect(() => {
    if (editing) {
      // Populate form with variant data
      setForm({
        sku: variant.varient_sku || "",
        price: variant.varient_price || "",
        weight: variant.varient_weight || "",
        making_price: variant.making_price || "",
        dimensions:
          units.find(
            (u) =>
              u.un_name === variant.unit_name || u.un_slug === variant.unit_slug
          )?.un_id || "",
        attributes: variant.attributes || [],
      });
    } else {
      resetForm();
    }
  }, [variant, units]);

  const resetForm = () => {
    setForm({
      sku: "",
      price: "",
      weight: "",
      making_price: "",
      dimensions: "",
      attributes: [],
    });
    setNewAttr({ attribute_id: "", value: "" });
  };

  const addAttribute = () => {
    if (!newAttr.attribute_id || !newAttr.value) {
      toast.error("Select attribute and enter value");
      return;
    }

    // Prevent duplicate attribute_id
    if (form.attributes.some((a) => a.attribute_id === newAttr.attribute_id)) {
      toast.error("Attribute already added");
      return;
    }

    setForm((prev) => ({
      ...prev,
      attributes: [...prev.attributes, newAttr],
    }));
    setNewAttr({ attribute_id: "", value: "" });
  };

  const removeAttribute = (attrId) => {
    setForm((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((a) => a.attribute_id !== attrId),
    }));
  };

  const handleSave = async () => {
    // if (!form.price || form.attributes.length === 0) {
    //   toast.error("Price and at least one attribute are required.");
    //   return;
    // }

    setLoading(true);
    const payload = {
      product_id: product.product_id,
      sku: form.sku,
      price: form.price,
      weight: form.weight,
      making_price: form.making_price,
      dimensions: form.dimensions,
      attributes: form.attributes,
    };

    try {
      let res;
      if (editing) {
        res = await apiConnectorPost(endpoint.update_product_variant, {
          variant_id: variant.varient_id,
          ...payload,
        });
      } else {
        res = await apiConnectorPost(endpoint.create_product_variant, payload);
      }

      toast(res?.data?.message);
      if (res?.data?.success) {
        refreshVariants();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to save variant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "Edit Variant" : "Add Variant"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          placeholder="Making Price"
          value={form.making_price}
          onChange={(e) => setForm({ ...form, making_price: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Weight"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={form.dimensions}
          onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Dimension Unit</option>
          {units.map((unit) => (
            <option key={unit.un_id} value={unit.un_id}>
              {unit.un_name} ({unit.un_slug})
            </option>
          ))}
        </select>
      </div>

      {/* Attributes section */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Attributes</h3>

        {!editing && (
          <div className="flex gap-2 mb-3">
            <select
              value={newAttr.attribute_id}
              onChange={(e) =>
                setNewAttr((prev) => ({
                  ...prev,
                  attribute_id: e.target.value,
                }))
              }
              className="border p-2 rounded flex-1"
            >
              <option value="">Select Attribute</option>
              {attributesList.map((attr) => (
                <option key={attr.attribute_id} value={attr.attribute_id}>
                  {attr.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Value"
              value={newAttr.value}
              onChange={(e) =>
                setNewAttr((prev) => ({ ...prev, value: e.target.value }))
              }
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={addAttribute}
              className="bg-blue-600 text-white px-3 rounded"
              type="button"
            >
              ➕
            </button>
          </div>
        )}

        {form.attributes.length === 0 && (
          <p className="text-gray-500">No attributes added yet.</p>
        )}

        <ul className="list-disc ml-5">
          {form.attributes.map((attr) => {
            const attrName =
              attributesList.find((a) => a.attribute_id === attr.attribute_id)
                ?.name || attr.attribute_id;
            return (
              <li
                key={attr.attribute_id}
                className="flex justify-between items-center"
              >
                <span>
                  {attrName}: {attr.value}
                </span>
                {!editing && (
                  <button
                    onClick={() => removeAttribute(attr.attribute_id)}
                    className="text-red-500 ml-2"
                    type="button"
                  >
                    ✖
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 border rounded text-gray-700"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="button"
        >
          {loading ? "Saving..." : editing ? "Update Variant" : "Add Variant"}
        </button>
      </div>
    </div>
  );
};

export default VariantModal;
