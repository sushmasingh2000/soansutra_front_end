import React, { useState } from "react";
import { endpoint } from "../../../utils/APIRoutes";
import { apiConnectorPost } from "../../../utils/ApiConnector";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Withdrawalrequest = () => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const WithdrawalFn = async () => {
        if (!amount || isNaN(amount)) {
            toast.error("Please enter a valid amount");
            return;
        }
    
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `You are requesting a withdrawal of ₹${amount}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dbb855",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit request",
        });
    
        if (!confirm.isConfirmed) {
            return; // User cancelled
        }
    
        setLoading(true);
        try {
            const response = await apiConnectorPost(endpoint?.payout_req, {
                req_amount: Number(amount),
            });
    
            if (response?.data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response?.data?.message,
                    confirmButtonColor: "#dbb855",
                });
                setAmount("");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response?.data?.message,
                    confirmButtonColor: "#dbb855",
                });
            }
        } catch (e) {
            console.error("Something went wrong", e);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="lg:mt-32 mt-10 flex items-center justify-center  px-4">
            <div className="bg-yellow-100 shadow-md rounded-lg w-full max-w-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6 text-[#dbb855]">
                    Withdrawal Request
                </h2>

                <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
                    />

                    <button
                        onClick={WithdrawalFn}
                        disabled={loading}
                        className="bg-yellow-950 w-full text-white p-2 mt-4 rounded hover:bg-yellow-900 disabled:opacity-50 transition"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Withdrawalrequest;
