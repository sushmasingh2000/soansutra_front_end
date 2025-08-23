import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { Delete, Edit } from "lucide-react";

const VariantMaterialModal = ({ variant, units, onClose }) => {
  const [materials, setMaterials] = useState([]);
  const [material_products, setMaterialProducts] = useState([]);
  const [Mastmaterials, setMastMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    master_mat_id: "",
    material_id: "",
    percentage: "",
    weight: "",
    unit: "",
    variant_material_id: null,
  });
  const fetchProductMaterials = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(endpoint.get_material);
      setMaterialProducts(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch materials.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMaterials();
    fetchProductMaterials(); // <== This loads the dropdown
  }, [variant]);

  useEffect(() => {
    if (variant?.varient_id) {
      fetchMaterials();
    }
  }, [variant]);
  const fetchMasterMaterials = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(endpoint.get_master_material);
      setMastMaterials(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch materials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterMaterials();
  }, [])

  const fetchMaterials = async () => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.get_variant_material}?variant_id=${variant.varient_id}`
      );
      setMaterials(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch materials");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const isEdit = !!formData.variant_material_id;
    const payload = {
      variant_id: variant.varient_id,
      ...formData,
    };

    try {
      const res = await apiConnectorPost(
        isEdit
          ? endpoint.update_variant_material
          : endpoint.create_variant_material,
        payload
      );
      toast.success(res?.data?.message);
      fetchMaterials();
      setFormData({
        material_id: "",
        percentage: "",
        weight: "",
        unit: "",
        variant_material_id: null,
      });
    } catch {
      toast.error("Failed to save material");
    }
  };

  const handleEdit = (material) => {
    setFormData({
       master_mat_id: material.master_mat_id,
      material_id: material.material_id,
      percentage: material.percentage || "",
      weight: material.weight || "",
      unit: material.unit || "",
      variant_material_id: material.variant_material_id,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.delete_variant_material}?variant_material_id=${id}`
      );
      toast.success(res?.data?.message);
      fetchMaterials();
    } catch {
      toast.error("Failed to delete material");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Materials for Variant: {variant.varient_sku}
      </h2>

      {/* Form */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <select
          name="master_mat_id"
          value={formData.master_mat_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Master Material</option>
          {Mastmaterials.map((item) => (
            <option key={item.ma_material_id} value={item.ma_material_id}>
              {item.ma_material_name}
            </option>
          ))}
        </select>

        <select
          name="material_id"
          value={formData.material_id}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select Material</option>
          {material_products
            .filter(mat => String(mat.master_mat_id) === String(formData.master_mat_id))
            .map((mat) => (
              <option key={mat.material_id} value={mat.material_id}>
                {mat.material_name}
              </option>
            ))}

        </select>


        <input
          name="percentage"
          placeholder="Percentage"
          value={formData.percentage}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          className="border p-2"
        />
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select Unit</option>
          {units.map((u) => (
            <option key={u.un_id} value={u.un_id}>
              {u.un_name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {formData.variant_material_id ? "Update" : "Add"} Material
      </button>

      {/* Materials List */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Material</th>
            <th className="border px-2 py-1">Percentage</th>
            <th className="border px-2 py-1">Weight</th>
            <th className="border px-2 py-1">Unit</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat.variant_material_id}>
              <td className="border px-2 py-1 text-center">{mat.material_name}</td>
              <td className="border px-2 py-1 text-center">{mat.percentage}</td>
              <td className="border px-2 py-1 text-center">{mat.weight}</td>
              <td className="border px-2 py-1 text-center">{mat.unit}</td>
              <td className="border px-2 py-1 text-center space-x-2">
                <button
                  onClick={() => handleEdit(mat)}
                  className="text-blue-600 hover:underline"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(mat.variant_material_id)}
                  className="text-red-600 hover:underline"
                >
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onClose}
        className="mt-6 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        Close
      </button>
    </div>
  );
};

export default VariantMaterialModal;
