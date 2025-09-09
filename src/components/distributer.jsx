import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../utils/ApiConnector";
import { endpoint } from "../utils/APIRoutes";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const Distributor = () => {
  const [open, setOpen] = useState(false);
const [name , setName] = useState(false);
const [customer , setCustomer] = useState("");
const [loading , setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setName("")
    setCustomer("")
  };
  // Random values for demonstration
  const level = "Level 1(3%)";
  const distributorId = "DIST-12345";
  const myDirect = 15;
  const totalTeam = 150;
  const selfBusiness = 5000;
  const teamBusiness = 25000;
  const totalDirectTeamBusiness = 30000;
  const totalTeamBusiness = 100000;
  const todaySelfBusiness = 200;
  const todayTeamBusiness = 1500;

  const getDistributorfn =async()=>{
    try{
      setLoading(true);
      const res = await apiConnectorPost(endpoint?.get_distributor_name, {
        customer_id  : customer
      })
      setLoading(false);
      setName(res?.data?.result?.[0]?.name)
    }
    catch(e){
      console.log("something went wrong")
    }
    setLoading(false);
  }


 const RegistrationFn = async ()=>{
  try{
    const response = await apiConnectorPost(endpoint?.distributor_registration,{
      cust_id:customer
    })
    toast(response?.data?.message)
  }
    catch(e){
    console.log("something went wrong")
    }
 }

 const { data } = useQuery(
  ["profile_distributor"],
  () => apiConnectorGet(endpoint.get_profile_distributor),
  usequeryBoolean
);

const distri_pro = data?.data?.result?.[0] || [];
console.log(distri_pro) 

  return (
    <>
   
      <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full  mx-auto text-sm">
        {/* Level and Distributor ID */}


        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Distributer</h2>
          <button className="bg-white border-yellow-300 text-black px-4 py-2 rounded-lg text-sm font-medium">
            Shiv Ji Maurya
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <div className="">
            <h2 className="text-lg font-bold mb-1"> Level: {distri_pro?.mlm_curr_level}</h2>
            <p className="text-base"> ID: {distri_pro?.mlm_unique_id}</p>
          </div>
          <div className="">
            <p
              className=" mb-1  bg-[#dbb855] cursor-pointer w-fit text-white p-2 rounded"
              onClick={() => setOpen(true)}
            >
              + Add Distributor
            </p>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
            {/* Close Icon */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-lg font-bold"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#dbb855]">
              Add Distributor
            </h2>

            {/* Search Section */}
            <div className="flex flex-col gap-4">
              <label
                htmlFor="userId"
                className="text-sm font-medium text-gray-700"
              >
                Enter User ID
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="e.g. 12345"
                  value={customer}
                  onChange={(e)=>setCustomer(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
                />

                <button className="bg-[#dbb855] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                onClick={getDistributorfn}>
                  Search
                </button>
              </div>
              <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={name}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
                />
            </div>
            <div className="flex justify-end ">
            <button className="bg-yellow-950 text-white p-1 my-5 rounded" onClick={RegistrationFn}>Submit</button>
            </div>
          </div>
        </Dialog>

        {/* First Card */}
        <div className="bg-white border border-yellow-400 rounded-lg p-3 mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">My Direct</span>
            <span>{myDirect}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Total Team</span>
            <span>{totalTeam}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Self Business</span>
            <span>${selfBusiness}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Team Business</span>
            <span>${teamBusiness}</span>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-white border border-yellow-400 rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Total Direct Team Business</span>
            <span>${totalDirectTeamBusiness}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="font-semibold">Total Team Business</span>
            <span>${totalTeamBusiness}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 rounded-lg text-center">
              <span className="font-semibold block">Today Self Business</span>
              <span>${todaySelfBusiness}</span>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 rounded-lg text-center">
              <span className="font-semibold block">Today Team Business</span>
              <span>${todayTeamBusiness}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Distributor;
