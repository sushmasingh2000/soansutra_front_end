import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { Edit } from "@mui/icons-material";
import CustomToPagination from "../../Shared/Pagination";
import { useQuery, useQueryClient } from "react-query";

const RequestDemo = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequestDemo, setSelectedRequestDemo] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    const client = useQueryClient();
    const [formData, setFormData] = useState({
        dc_id: "",
        dc_status: 4,
        dc_description: "",
    });

    // Map status strings
    const statusMap = {
        Pending: "Pending",
        Processing: "Processing",
        Rejected: "Rejected",
        Success: "Success",
    };

    const { data } = useQuery(
        ["demo_call", search, page],
        () => apiConnectorGet(`${endpoint.get_demo_call}?page=${page}&&search=${search}&&count=10`),
        usequeryBoolean
    );
    const demoCalls = data?.data?.result || []

    const resetForm = () => {
        setFormData({
            dc_id: "",
            dc_status: 4,
            dc_description: "",
        });
        setSelectedRequestDemo(null);
    };

    // Submit update to demo call
    const handleSubmit = async () => {
        const { dc_id, dc_status, dc_description } = formData;
        if (!dc_id) {
            toast.error("Missing demo call ID.");
            return;
        }
        try {
            setLoading(true);
            const res = await apiConnectorPost(endpoint.update_demo_call, {
                dc_id,
                dc_status,
                dc_description,
            });
            toast(res?.data?.message);
            setModalOpen(false);
            resetForm();
            client.refetchQueries("demo_call")
        } catch {
            toast.error("Update failed.");
        } finally {
            setLoading(false);
        }
    };

    // Edit selected call
    const handleEdit = (call) => {
        setSelectedRequestDemo(call);
        setFormData({
            dc_id: call.dc_id,
            dc_status: call.dc_status,
            dc_description: call.dc_description || "",
        });
        setModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Request Demo Call</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-sm border border-gray-300 rounded px-4 py-2"
                    />
                </div>

            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left">S.No</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Contact No .</th>
                            <th className="px-4 py-3 text-left">Description</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demoCalls?.data?.map((call, index) => (
                            <tr key={call.dc_id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">
                                    {call.customer_details?.name || "--"}
                                </td>
                                <td className="px-4 py-2">
                                    {call.customer_details?.cl_email || "--"}
                                </td>
                                <td className="px-4 py-2">
                                    {statusMap[call.dc_status] || call.dc_status}
                                </td>
                                <td className="px-4 py-2">
                                    {statusMap[call.dc_contact_no] || call.dc_contact_no}
                                </td>
                                <td className="px-4 py-2">{call.dc_description || "—"}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(call)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        <Edit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {demoCalls.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-4 text-center text-gray-500">
                                    No demo calls found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for editing call */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                        <h2 className="text-xl font-semibold">
                            {selectedRequestDemo ? "Update Demo Call" : "New Entry"}
                        </h2>

                        <label className="block text-sm font-medium">Status</label>
                        <select
                            value={formData.dc_status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dc_status: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Success">Success</option>
                        </select>

                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            value={formData.dc_description}
                            onChange={(e) =>
                                setFormData({ ...formData, dc_description: e.target.value })
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
                                {loading ? "Saving..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <CustomToPagination data={demoCalls} setPage={setPage} page={page} />
        </div>
    );
};

export default RequestDemo;
