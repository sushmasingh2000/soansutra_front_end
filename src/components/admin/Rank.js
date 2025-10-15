import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";
import CustomTable from "./Shared/CustomTable";

const Rank = () => {
  const [ranks, setRanks] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedRank, setSelectedRank] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    rank_id: "",
    customer_buss: "",
    self_buss: "",
    clossing_night_comm: "",
    clossing_instent_comm: "",
    reward_income: ""
  });

  const fetchRanks = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(endpoint.get_rank_deatils);
      setRanks(res?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch ranks.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateRank = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorPost(endpoint.update_rank_deatils, formData);
      toast.success(res?.data?.message);
      if (res?.data?.success) {
        setEditModal(false);
        fetchRanks();
      }
    } catch (err) {
      toast.error("Error updating rank.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (rank) => {
    setSelectedRank(rank);
    setFormData({
      rank_id: rank.rank_id,
      customer_buss: rank.customer_buss,
      self_buss: rank.self_buss,
      clossing_night_comm: rank.clossing_night_comm,
      clossing_instent_comm: rank.clossing_instent_comm,
      reward_income: rank.reward_income || ""
    });
    setEditModal(true);
  };

  useEffect(() => {
    fetchRanks();
  }, []);

  const tablehead = [
    <span>S.No</span>,
    <span>Rank Name</span>,
    <span>Customer Business</span>,
    <span>Self Business</span>,
    <span>Night Commission</span>,
    <span>Instant Commission</span>,
    <span>Reward Income</span>,
    <span>Actions</span>,
  ]

  const tablerow = ranks.map((rank, index) => [
    <span>{index + 1}</span>,
    <span>{rank.rank_name}</span>,
    <span>{rank.customer_buss}</span>,
    <span>{rank.self_buss}</span>,
    <span>{rank.clossing_night_comm}</span>,
    <span>{rank.clossing_instent_comm}</span>,
    <span>{rank.reward_income ?? "--"}</span>,
    <span>
      <button
        onClick={() => openEditModal(rank)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Edit size={16} />
      </button>
    </span>,
  ])


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rank Management</h1>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />

      {editModal && (
        <EditRankModal
          formData={formData}
          onClose={() => setEditModal(false)}
          onChange={handleInputChange}
          onSubmit={updateRank}
          loading={loading}
        />
      )}
    </div>
  );
};

const EditRankModal = ({ formData, onClose, onChange, onSubmit, loading }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Rank</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            name="customer_buss"
            value={formData.customer_buss}
            onChange={onChange}
            placeholder="Customer Business"
            className="border p-2 rounded"
          />
          <input
            name="self_buss"
            value={formData.self_buss}
            onChange={onChange}
            placeholder="Self Business"
            className="border p-2 rounded"
          />
          <input
            name="clossing_night_comm"
            value={formData.clossing_night_comm}
            onChange={onChange}
            placeholder="Night Commission"
            className="border p-2 rounded"
          />
          <input
            name="clossing_instent_comm"
            value={formData.clossing_instent_comm}
            onChange={onChange}
            placeholder="Instant Commission"
            className="border p-2 rounded"
          />
          <input
            name="reward_income"
            value={formData.reward_income}
            onChange={onChange}
            placeholder="Reward Income"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rank;
