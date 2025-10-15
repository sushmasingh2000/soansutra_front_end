import React, { useEffect, useState } from "react";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import CustomTable from "./Shared/CustomTable";

const PurityMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const client = useQueryClient();
  const [formData, setFormData] = useState({
    pur_master_mat_id: "",
    pur_stamp_name: "",
    pur_purity_percent: 100,
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
      pur_master_mat_id: "",
      pur_stamp_name: "",
      pur_purity_percent: 100,
    });
    setSelectedMaterial(null);
  };

  const { data } = useQuery(
    ["purity_materail"],
    () => apiConnectorGet(endpoint.get_material_purity),
    usequeryBoolean
  );

  const purity = data?.data?.result || [];

  const handleSubmit = async () => {
    const { pur_master_mat_id, pur_stamp_name, pur_purity_percent } = formData;

    if (!pur_master_mat_id || !pur_stamp_name || !pur_purity_percent) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    const payload = selectedMaterial
      ? { pur_id: selectedMaterial.pur_id, ...formData }
      : { ...formData };

    const endpointUrl = selectedMaterial
      ? endpoint.update_material_purity
      : endpoint.create_material_purity;

    try {
      const res = await apiConnectorPost(endpointUrl, payload);
      toast.success(res?.data?.message || "Operation successful.");
      if (res?.data?.success) {
        client.refetchQueries("purity_materail")
        setModalOpen(false);
        resetForm();
        // refetch purity list
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
      pur_master_mat_id: material.ma_material_id || "",
      pur_stamp_name: material.pur_stamp_name || "",
      pur_purity_percent: material.pur_purity_percent || 100,
    });
    setModalOpen(true);
  };
  const tablehead = [
    <span>S.No</span>,
    <span>Master Material</span>,
    <span>Stamp Name</span>,
    <span>Purity</span>,
    <span>Actionn</span>,
  ]

  const tablerow = purity.map((material, index) => [
    <span>{index + 1}</span>,
    <span> {material.ma_material_name || "--"}
    </span>,
    <span>{material.pur_stamp_name || "--"}</span>,
    <span>
      {material.pur_purity_percent || "--"}%
    </span>,

    <span className="px-4 py-2 space-x-2">
      <button
        onClick={() => handleEdit(material)}
        className="text-blue-600 hover:underline"
      >
        <Edit />
      </button>
    </span>
  ])
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Materials</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Material
        </button>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />


      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedMaterial ? "Edit Material" : "Add Material"}
            </h2>
            <select
              name="pur_master_mat_id"
              value={formData.pur_master_mat_id}
              onChange={(e) =>
                setFormData({ ...formData, pur_master_mat_id: e.target.value })
              }
              className="w-full border p-2 rounded"
            >
              <option value="">-- Select Material --</option>
              {materials.map((mat) => (
                <option key={mat.ma_material_id} value={mat.ma_material_id}>
                  {mat.ma_material_name}
                </option>
              ))}
            </select>

            {/* Purity Stamp Name */}
            <input
              type="text"
              name="pur_stamp_name"
              placeholder="Purity Stamp Name"
              value={formData.pur_stamp_name}
              onChange={(e) =>
                setFormData({ ...formData, pur_stamp_name: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            {/* Purity Percent */}
            <input
              type="number"
              name="pur_purity_percent"
              placeholder="Purity (%)"
              value={formData.pur_purity_percent}
              onChange={(e) =>
                setFormData({ ...formData, pur_purity_percent: e.target.value })
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
                {loading ? "Saving..." : selectedMaterial ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurityMaterial;
