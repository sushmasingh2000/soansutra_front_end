import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import CustomTable from "./Shared/CustomTable";

const PaymentMethod = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        pm_name: "",
        pm_type: "",
        pm_status: 1,
        pm_description: "",
    });
    const [loading, setLoading] = useState(false);

    // Fetch payment methods
    const fetchPaymentMethods = async () => {
        setLoading(true);
        try {
            const res = await apiConnectorGet(endpoint.get_payment_method);
            if (res?.data?.success) {
                setPaymentMethods(res.data.result || []);
            } else {
                toast.error("Failed to fetch payment methods");
            }
        } catch {
            toast.error("Failed to fetch payment methods");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    // Handle input changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission to create payment method
    const handleSubmit = async () => {
        if (!formData.pm_name.trim() || !formData.pm_type.trim()) {
            toast.error("Please fill in required fields: Name and Type");
            return;
        }

        try {
            const res = await apiConnectorPost(endpoint.create_payment_method, formData);
            if (res?.data?.success) {
                toast.success(res.data.message || "Payment method created");
                setModalOpen(false);
                setFormData({ pm_name: "", pm_type: "", pm_status: 1, pm_description: "" });
                fetchPaymentMethods();
            } else {
                toast.error(res.data.message || "Failed to create payment method");
            }
        } catch {
            toast.error("Error creating payment method");
        }
    };

    const tablehead = [
        <span>S.No</span>,
        <span>Name</span>,
        <span>Type</span>,
        <span>Status</span>,
        <span>Description</span>,
    ]

    const tablerow = paymentMethods?.map((pm, idx) => [
        <span>{idx + 1}</span>,
        <span>{pm.pm_name}</span>,
        <span>{pm.pm_type}</span>,
        <span>{pm.pm_status === "Active" ? "Active" : "Inactive"}</span>,
        <span>{pm.pm_description || "-"}</span>,
    ])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>

            <div className="flex justify-end">
                <button
                    onClick={() => setModalOpen(true)}
                    className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    + Add Payment Method
                </button>
            </div>

            <CustomTable
          tablehead={tablehead}
          tablerow={tablerow}
          isLoading={loading}
        />

            {/* Modal for adding payment method */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Add Payment Method</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Name *</label>
                                <input
                                    type="text"
                                    name="pm_name"
                                    value={formData.pm_name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                    placeholder="Enter payment method name"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Type *</label>
                                <input
                                    type="text"
                                    name="pm_type"
                                    value={formData.pm_type}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                    placeholder="Enter payment method type"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Status</label>
                                <select
                                    name="pm_status"
                                    value={formData.pm_status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Description</label>
                                <textarea
                                    name="pm_description"
                                    value={formData.pm_description}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                    placeholder="Optional description"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PaymentMethod;
