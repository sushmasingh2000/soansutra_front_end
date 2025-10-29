import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import CustomTable from "./Shared/CustomTable";
import CustomToPagination from "../../Shared/Pagination";
import toast from "react-hot-toast";

const SubscriptionPlan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState({ cust_id: "" });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");

  // Fetch subscription list
  const { data, isLoading, refetch } = useQuery(
    ["get_subscription", debouncedSearchTerm, startDate, endDate, page],
    () =>
      apiConnectorGet(endpoint.get_subscription_details, {
        search: debouncedSearchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: 10,
      })
  );

  const subscriptionList = data?.data?.result || [];

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch available plans
  const { data: planData } = useQuery(
    ["get_rate_dazzle_plan_subscription"],
    () => apiConnectorGet(endpoint.get_dazzle_subscription_plan),
      usequeryBoolean
  );
  const dazzlePlans = planData?.data?.result || [];

  // Payment handler
  const paymentAdmin = async () => {
    if (!selectedPlan || !selectedCustomer?.cust_id || !totalAmount) {
      alert("Please enter customer ID, select plan, and enter total amount");
      return;
    }

    const req = {
      plan_id: selectedPlan.dz_id,
      cust_id: selectedCustomer.cust_id,
      total_amount: Number(totalAmount),
      installment_id: 0
    };

    try {
      const res = await apiConnectorPost(endpoint.pay_for_subscription_plan_by_admin, req);
      toast(res?.data?.message );
      if (res?.data?.success) {
        setShowModal(false);
        setSelectedCustomer({ cust_id: "" });
        setSelectedPlan(null);
        setTotalAmount("");
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add subscription");
    }
  };

  // Table headers
  const tablehead = [
    "S.No",
    "Name",
    "Customer ID",
    "Plan",
    "Start Date",
    "Commitment Amount",
    "Monthly Amount",
    "Status",
  ];

  // Table rows
  const tablerow = subscriptionList?.data?.map((item, idx) => [
    idx + 1,
    item?.name || "-",
    item?.cust_unique_id || "-",
    item?.dz_descripton || "-",
    item?.start_date ? new Date(item.start_date).toLocaleDateString() : "-",
    `₹${Number(item?.commitment_amount || 0).toLocaleString()}`,
    `₹${Number(item?.monthly_amount || 0).toLocaleString()}`,
    <span
      className={`${item?.status === "Active" ? "text-green-600" : "text-red-500"} font-semibold`}
    >
      {item?.status || "-"}
    </span>,
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subscription Plan Details</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          className="border px-3 py-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div className="md:col-span-3 flex justify-between items-center">
          <h1 className="text-xl font-bold"></h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Plan
          </button>
        </div>
      </div>

      {/* Table */}
      <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />
      <CustomToPagination data={subscriptionList} page={page} setPage={setPage} />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto z-50 p-4">
          <div className="bg-white p-6 rounded w-full max-w-md mt-20">
            <h2 className="text-xl font-bold mb-4">Add Subscription Plan</h2>

            {/* Customer ID */}
            <div className="mb-3">
              <label className="block font-semibold mb-1">Customer ID</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Enter Customer ID"
                value={selectedCustomer?.cust_id || ""}
                onChange={(e) =>
                  setSelectedCustomer({ cust_id: e.target.value })
                }
              />
            </div>

            {/* Total Amount */}
            <div className="mb-3">
              <label className="block font-semibold mb-1">Total Amount</label>
              <input
                type="number"
                className="border px-3 py-2 rounded w-full"
                placeholder="Enter total amount"
                value={totalAmount || ""}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>

              {/* Plan */}
            <div className="mb-3">
              <label className="block font-semibold mb-1">Select Plan</label>
             <select
  className="border px-3 py-2 rounded w-full"
  value={selectedPlan?.dz_id || ""}
  onChange={(e) =>
    setSelectedPlan(
      dazzlePlans.find((p) => p.dz_id === Number(e.target.value))
    )
  }
>
  <option value="">Select Plan</option>
  {dazzlePlans?.map((plan) => (
    <option key={plan.dz_id} value={plan.dz_id}>
      {plan.dz_descripton} 
    </option>
  ))}
</select>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={paymentAdmin}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={!selectedPlan || !selectedCustomer?.cust_id || !totalAmount}
              >
                Add Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlan;
