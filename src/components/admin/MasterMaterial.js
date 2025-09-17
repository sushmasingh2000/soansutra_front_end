import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint, rupees } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";

const MasterMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [formData, setFormData] = useState({
    ma_material_name: "",
    ma_price: "",
    ma_unit: "cr",
    ma_value: "",
    ma_sell_value: "",
    ma_sell_price: "",
    ma_sell_tax_percentage: "",
    ma_buy_tax_percentage: "",
    ma_buy_making_price_type: "",
    ma_buy_making_price: "",
  });

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(endpoint.get_master_material);
      setMaterials(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch materials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const resetForm = () => {
    setFormData({
      ma_material_name: "",
      ma_price: "",
      ma_unit: "ct",
      ma_value: "",
      ma_sell_value: "",
      ma_sell_price: "",
      ma_sell_tax_percentage: "",
      ma_buy_tax_percentage: "",
      ma_buy_making_price: "",
      ma_buy_making_price_type: ""
    });
    setSelectedMaterial(null);
  };

  const handleSubmit = async () => {
    const { ma_material_name, ma_price, ma_unit, ma_value, ma_sell_value, ma_sell_price, ma_sell_tax_percentage, ma_buy_tax_percentage, ma_buy_making_price, ma_buy_making_price_type } = formData;

    if (!ma_material_name || !ma_price || !ma_unit || !ma_value || !ma_sell_value || !ma_sell_price || !ma_sell_tax_percentage
      || !ma_buy_tax_percentage || !ma_buy_making_price || !ma_buy_making_price_type) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    const payload = selectedMaterial
      ? { ma_material_id: selectedMaterial.ma_material_id, ...formData }
      : { ...formData };

    const endpointUrl = selectedMaterial
      ? endpoint.update_master_material
      : endpoint.create_master_material;

    try {
      const res = await apiConnectorPost(endpointUrl, payload);
      toast(res?.data?.message);
      if (res?.data?.success) {
        fetchMaterials();
        setModalOpen(false);
        resetForm();
      }
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (material) => {
    setSelectedMaterial(material);
    setFormData({
      ma_material_name: material.ma_material_name || "",
      ma_price: Number(material.ma_price) || "",
      ma_unit: material.ma_unit || "ct",
      ma_value: material.ma_value || "",
      ma_sell_price: material.ma_sell_price || "",
      ma_sell_value: material.ma_sell_value || "",
      ma_sell_tax_percentage: material.ma_sell_tax_percentage || "",
      ma_buy_tax_percentage: material.ma_buy_tax_percentage || "",
      ma_buy_making_price: material.ma_buy_making_price || "",
      ma_buy_making_price_type: material.ma_buy_making_price_type === "Flat" ? 1 : 2 || ""
    });
    setModalOpen(true);
  };

  const handleDelete = async (ma_material_id) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.delete_master_material}?ma_material_id=${ma_material_id}`
      );
      toast(res?.data?.message);
      fetchMaterials();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Materials</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Master Material
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-scroll">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Buy Price</th>
              <th className="px-4 py-3 text-left">Buy Value</th>
              <th className="px-4 py-3 text-left">🌕 Buy Tax(%)</th>
              <th className="px-4 py-3 text-left">🌕 Sell Price</th>
              <th className="px-4 py-3 text-left">🌕 Sell Value</th>
              <th className="px-4 py-3 text-left">🌕 Sell Tax(%)</th>
              <th className="px-4 py-3 text-left">Buy Making Price </th>
              <th className="px-4 py-3 text-left"> Buy Making Price Type </th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr
                key={material.ma_material_id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {material.ma_material_name || "--"}
                </td>

                <td className="px-4 py-2">{material.ma_price || "--"} {rupees}</td>
                <td className="px-4 py-2">{material.ma_value || "--"}  {material.ma_unit || "--"}</td>
                <td className="px-4 py-2">  {material.ma_buy_tax_percentage || "--"} </td>
                <td className="px-4 py-2">  {material.ma_sell_price || "--"} </td>
                <td className="px-4 py-2">  {material.ma_sell_value || "--"} </td>
                <td className="px-4 py-2">  {material.ma_sell_tax_percentage || "--"} </td>
                <td className="px-4 py-2">  {material.ma_buy_making_price || "--"} </td>
                <td className="px-4 py-2">  {material.ma_buy_making_price_type || "--"} </td>

                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(material)}
                    className="text-blue-600 hover:underline"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(material.ma_material_id)}
                    className="text-red-600 hover:underline"
                  >
                    <DeleteForever />
                  </button>
                </td>
              </tr>
            ))}
            {materials.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No materials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedMaterial ? "Edit Material" : "Add Material"}
            </h2>
            <div className="grid lg:grid-cols-3 grid-cols-2 place-content-center gap-6">
              <div>
                <label>Material Name</label>
                <input
                  type="text"
                  name="ma_material_name"
                  placeholder="Material Name"
                  value={formData.ma_material_name}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_material_name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label> Buy Material Price</label>
                <input
                  type="number"
                  name="ma_price"
                  placeholder="Material Price"
                  value={formData.ma_price}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_price: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label>Material Unit</label>
                <select
                  name="ma_unit"
                  value={formData.ma_unit}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_unit: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Material Name</option>
                  <option value="ct">ct</option>
                  <option value="g">g</option>
                </select>
              </div>
              <div>
                <label>Buy Material Value</label>
                <input
                  type="number"
                  name="ma_value"
                  placeholder="Material Value"
                  value={formData.ma_value}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_value: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Buy Tax (%)</label>
                <input
                  type="number"
                  name="ma_buy_tax_percentage"
                  placeholder="Buy Tax Percentage"
                  value={formData.ma_buy_tax_percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_buy_tax_percentage: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Buy Making  Price</label>
                <input
                  type="number"
                  name="ma_buy_making_price"
                  placeholder="Buy Making  Price"
                  value={formData.ma_buy_making_price}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_buy_making_price: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
             

              <div>
                <label> Sell Material Price</label>
                <input
                  type="number"
                  name="ma_sell_price"
                  placeholder="Sell Material Price"
                  value={formData.ma_sell_price}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_sell_price: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label>Sell Material Value</label>
                <input
                  type="number"
                  name="ma_sell_value"
                  placeholder="Sell Material Value"
                  value={formData.ma_sell_value}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_sell_value: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                /> </div>

              <div>
                <label>Sell  Tax (%)</label>
                <input
                  type="number"
                  name="ma_sell_tax_percentage"
                  placeholder="Sell Tax Percentage"
                  value={formData.ma_sell_tax_percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, ma_sell_tax_percentage: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                /> </div>
            </div>

             <div className="flex flex-col w-fit">
                <label>Buy Making  Price Type</label>
                <select 
                name="ma_buy_making_price_type"
                 value={formData.ma_buy_making_price_type}
                   onChange={(e) =>
                    setFormData({ ...formData, ma_buy_making_price_type: e.target.value })
                  }
                   className="p-3 border rounded">
                  <option value="">Select Buy Making  Price Type </option>
                  <option value="1">Flat</option>
                  <option value="2">Percentage</option>
                </select>
              </div>

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
                {loading ? "Saving..." : selectedMaterial ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterMaterial;
