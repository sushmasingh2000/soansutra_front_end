import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import CustomTable from "./Shared/CustomTable";
import CustomToPagination from "../../Shared/Pagination";
import { Edit, Lock } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader";

const Installment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setloading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showModal, setShowModal] = useState(false);
   const [selectedInstallment, setSelectedInstallment] = useState(null);

const openModal = (item) => {
    setSelectedInstallment(item);
    setShowModal(true);
};

const closeModal = () => {
    setSelectedInstallment(null);
    setShowModal(false);
};


    const { data, isLoading , refetch } = useQuery(
    ["get_installment" , debouncedSearchTerm, startDate, endDate, page ],
    () => apiConnectorGet(endpoint.get_installment , {
        search: debouncedSearchTerm,
                start_date: startDate,
                end_date: endDate,
                page: page,
                count: 10,
    }),
    usequeryBoolean
  );

  const installmentList = data?.data?.result || [];

  const paymentAdmin = async () => {
    const req ={
         plan_id: selectedInstallment.mast_plan_id,
        installment_id: selectedInstallment.installment_id,
        cust_id: selectedInstallment.cust_unique_id,
        total_amount: Number(selectedInstallment.amount_due || 0) + Number(selectedInstallment.penalty_accrued || 0)
    }
    setloading(true)
     try {
          const res=   await apiConnectorPost(endpoint.pay_for_subscription_plan_by_admin, req);
                toast(res?.data?.message) 
          setloading(false)
                if(res?.data?.success){
                  closeModal();
                  refetch()
                }         
          } 
          catch (error) {
              console.error(error);
              alert("Failed to update payment.");
          }
          setloading(false)
  }
                       


  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
}, [searchTerm]);

  const tablehead = [
    <span>S.No</span>,
    <span>Name</span>,
    <span>Custome Id</span>,
    <span>Installlment Id</span>,
    <span>Plan</span>,
    <span>Due Date</span>,
    <span>Amount Due</span>,
    <span>Penality Amount</span>,
    <span>Paid Amount</span>,
    <span>Status</span>,
     <span>Action</span>, 

  ];

  // ✅ Table rows
  const tablerow = installmentList?.data?.map((item, idx) => [
    <span>{idx + 1}</span>,
    <span>{item?.name || "-"}</span>,
    <span>{item?.cust_unique_id}</span>,
    <span>{item?.install_unique}</span>,
    <span>{item?.dz_descripton || "-"}</span>,
    <span>{new Date(item?.due_date).toLocaleDateString()}</span>,
    <span>₹{Number(item?.amount_due).toLocaleString()}</span>,
    <span>₹{Number(item?.penalty_accrued).toLocaleString()}</span>,
    <span>₹{Number(item?.paid_amount).toLocaleString()}</span>,
    <span
      className={`${
        item?.payment_status === "Pending"
          ? "text-red-500"
          : "text-green-600 font-semibold"
      }`}
    >
      {item?.payment_status}
   </span>,
    <span>
        {item?.payment_status === "Pending" || item?.payment_status === "Overdue"  ? (
            <button
                onClick={() => openModal(item)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
                <Edit/>
            </button>
        ) : (
            <button disabled className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed">
              <Lock/>
            </button>
        )}
    </span>,
  ]);


  return (
    <div className="p-6">
      <Loader isLoading={loading}/>
      <h1 className="text-2xl font-bold mb-4">Installment Details</h1>
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
            </div>

      <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />
      <CustomToPagination data={installmentList} page={page} setPage={setPage}/>
      {showModal && selectedInstallment && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Update Installment</h2>
            <p><strong>Name:</strong> {selectedInstallment.name}</p>
            <p><strong>Customer ID:</strong> {selectedInstallment.cust_unique_id}</p>
            <p><strong>Plan:</strong> {selectedInstallment.mast_plan_id || "-"}</p>
            <p><strong>Amount Due:</strong> ₹{Number(selectedInstallment.amount_due).toLocaleString()}</p>
            <p><strong>Penalty:</strong> ₹{Number(selectedInstallment.penalty_accrued).toLocaleString()}</p>
            <p>  <strong>Total Amount:</strong> ₹{Number(selectedInstallment.amount_due) + Number(selectedInstallment.penalty_accrued).toLocaleString()}</p>
            <div className="mt-4 flex justify-end gap-2">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                 onClick={paymentAdmin}   
                >
                    Mark as Paid
                </button>
            </div>
        </div>
    </div>
)}

    </div>
  );
};

export default Installment;
