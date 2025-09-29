import { Dialog } from "@mui/material";
import React, { useState } from "react";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../utils/ApiConnector";
import { endpoint, frontend } from "../utils/APIRoutes";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import copy from "copy-to-clipboard";

import Loader from "../Shared/Loader";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const Distributor = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token")

  const handleClose = () => {
    setOpen(false);
    setName("");
    setCustomer("");
  };
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!", { id: 1 });
  };
  const getDistributorfn = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorPost(endpoint?.get_distributor_name, {
        customer_id: customer,
      });
      setName(res?.data?.result?.[0]?.name || "");
    } catch (e) {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  const RegistrationFn = async () => {
    try {
      if (!customer) {
        return toast("Please Enter User ID");
      }
      const response = await apiConnectorPost(
        endpoint?.distributor_registration,
        {
          cust_id: customer,
        }
      );
      toast(response?.data?.message);
    } catch (e) {
      console.log("something went wrong");
    }
  };

  const { data: get_didtri_dash } = useQuery(
    ["dashbooard_get"],
    () => apiConnectorGet(endpoint.get_distributor_dashboard),
   {
      ...usequeryBoolean,     
      enabled: !!token    
    }
  );

  const dashbooard_get = get_didtri_dash?.data?.result || {};

  const { data, isLoading: profile } = useQuery(
    ["profile_distributor"],
    () => apiConnectorGet(endpoint.get_profile_distributor),
   {
       ...usequeryBoolean,
       enabled: !!token 
     }
  );

  const distri_pro = data?.data?.result?.[0] || {};

  const { data: profile_user } = useQuery(
    ["profile_user"],
    () =>
      apiConnectorGet(endpoint?.get_customer_profile),
    {
    ...usequeryBoolean,
    enabled: !!token 
  }
  );

  const profile_cust = profile_user?.data?.result || [];

  return (
    <>
      <Loader isLoading={loading || profile} />

      <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Distributor</h2>
          <button className="bg-white border-yellow-300 text-black px-4 py-2 rounded-lg text-sm font-medium">
            {distri_pro?.name}
          </button>
        </div>

        {/* Level Info & Add Distributor */}
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold mb-1">
              Level: {dashbooard_get?.u_rank_name || "--"} (
              {(dashbooard_get?.u_clossing_night_comm * 100 || 0).toFixed(2)}%)
            </h2>
            <p className="text-base">
              ID: {dashbooard_get?.u_mlm_unique_id || "--"}
            </p>
          </div>
          <button
            className="bg-[#dbb855] cursor-pointer text-white px-3 py-2 rounded"
            onClick={() => setOpen(true)}
          >
            + Add Distributor
          </button>
        </div>

        {/* Add Distributor Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-lg font-bold"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#dbb855]">
              Add Distributor
            </h2>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                User ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
                />
                <button
                  onClick={getDistributorfn}
                  className="bg-[#dbb855] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Search
                </button>
              </div>
              <input
                type="text"
                value={name || "--"}
                readOnly
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
              />
            </div>
            <button
              onClick={RegistrationFn}
              className="bg-yellow-950 w-full text-white p-2 my-5 rounded"
            >
              Submit
            </button>
          </div>
        </Dialog>

        {/* Business Info Card 1 */}
        <button
          onClick={() => functionTOCopy(frontend + "/sign-up?referral_id=" + profile_cust?.cust_unique_id)}
          className="flex items-center justify-start gap-5 w-full text-left text-sm text-black hover:bg-yellow-50 px-3 py-2 rounded transition-colors"
        >
          <span>Referral Code</span>
          <ClipboardDocumentIcon className="w-5 h-5 text-yellow-600" />
        </button>
        <div className="bg-white border border-yellow-400 rounded-lg p-3 mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">My Direct</span>
            <span>{distri_pro?.mlm_direct_mem || 0}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Total Team</span>
            <span>{Number(dashbooard_get?.total_team)?.toFixed(0, 2) || 0}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Self Business</span>
            <span>₹{Number(dashbooard_get?.total_self_buss)?.toFixed(2) || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Team Business</span>
            <span>₹{Number(dashbooard_get?.total_team_buss)?.toFixed(2) || 0}</span>
          </div>
        </div>

        {/* Business Info Card 2 */}
        <div className="bg-white border border-yellow-400 rounded-lg p-3 mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Direct Customer Business</span>
            <span>₹{dashbooard_get?.total_dir_cust_buss || 0}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Direct Distributors</span>
            <span>{dashbooard_get?.total_dir_distributer || 0}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Total Team Distributors</span>
            <span>{dashbooard_get?.total_team_distributer || 0}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Total Customers</span>
            <span>{dashbooard_get?.total_cust || 0}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold"> Income Wallet</span>
            <span>₹{dashbooard_get?.u_mlm_income_wallet || 0}</span>
          </div>
        </div>

        {/* Today's Business */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 rounded-lg text-center">
            <span className="font-semibold block">Today Self Business</span>
            <span>₹{dashbooard_get?.today_self_buss || 0}</span>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 rounded-lg text-center">
            <span className="font-semibold block">Today Team Business</span>
            <span>₹{dashbooard_get?.today_team_buss || 0}</span>
          </div>
        </div>

        {/* Commission Info */}
        {/* <div className="bg-white border border-yellow-400 rounded-lg p-3 mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Night Commission %</span>
            <span>{(dashbooard_get?.u_clossing_night_comm * 100 || 0).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Instant Commission %</span>
            <span>{(dashbooard_get?.u_clossing_instent_comm * 100 || 0).toFixed(2)}%</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Distributor;
