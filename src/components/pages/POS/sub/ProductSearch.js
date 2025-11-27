import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { endpoint } from "../../../../utils/APIRoutes";
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../../utils/ApiConnector";
import { useQuery } from "react-query";
import Loader from "../../../../Shared/Loader";
import axios from "axios";
import { swalAlert } from "../../../../utils/utilsFun";
import Swal from "sweetalert2";

export default function POSCustomerSection({
  formik,
  getPosDetails,
  setSelectedCustomer,
  selectedCustomer,
}) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  async function getDuePayment() {
    setLoading(true);
    const body = {
      pb_cust_id: selectedCustomer?.customer_id,
    };
    try {
      const res = await apiConnectorPost(endpoint.get_pos_due_payment, body);
      if (res.data?.success) {
        formik.setFieldValue(
          "pb_closing_bal",
          res?.data?.result?.pb_closing_bal || 0
        );
        formik.setFieldValue(
          "pb_billing_date",
          res?.data?.result?.pb_billing_date || null
        );
      } else {
        swalAlert(Swal, "error", res?.data?.message);
      }
    } catch (e) {
      swalAlert(Swal, "error", e?.message);
    }
    setLoading(false);
  }

  const { data, isLoading } = useQuery(
    ["get_customer_dropdown", search],
    () => apiConnectorGet(endpoint?.get_customer_dropdown, { search: search }),
    {
      keepPreviousData: true,
    }
  );

  const customers = data?.data?.result || [];
  useEffect(() => {
    selectedCustomer && getDuePayment();
  }, [selectedCustomer]);
  const inputClass = `
    w-[90px] text-[11px] px-2 py-[3px] 
    border border-gray-300 text-center bg-transparent 
    focus:outline-none focus:border-transparent focus:ring-0 
    appearance-none 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none 
    [type=number]:appearance-none 
  `;

  return (
    <div className="w-full bg-pink-200 border border-pink-400 rounded-md p-1 text-[11px] mb-1">
      <Loader isLoading={isLoading || loading} />
      <div className="grid grid-cols-12 gap-1 items-start">
        {/* Left Buttons */}
        <div className="col-span-2 flex flex-col space-y-0.5">
          {["New A/c", "Search", "Prev. Y", "Next ±"].map((btn) => (
            <button
              key={btn}
              className="bg-white border border-gray-300 py-[1px] text-[10px] rounded hover:bg-pink-50"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Middle Section */}
        <div className="col-span-6">
          {/* Account */}
          <div className="flex items-center mb-[2px]">
            <span className="w-[60px] text-[10px] font-semibold">Cash A/c</span>
            <input
              type="text"
              // value={
              //   selectedCustomer ? selectedCustomer.label : "CASH CUSTOMER"
              // }
              readOnly
              className={`flex-1 border border-gray-300 rounded px-1 py-[1px] text-[10px] bg-white ${inputClass}`}
            />
            <PersonIcon className="text-gray-600 ml-1" fontSize="small" />
          </div>

          {/* Cash A/c */}
          <div className="flex items-center mb-[2px] relative">
            <span className="w-[60px] text-[10px] font-semibold">Account</span>

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value); // 🔹 Search update → API call hota rahega
                setShowList(true); // 🔹 Typing pe list open
              }}
              onFocus={() => setShowList(true)}
              placeholder="Select Customer"
              className="w-full text-[10px] border border-gray-300 rounded px-2 py-[2px] bg-white"
            />

            {/* 🔹 Dropdown List */}
            {showList && customers?.length > 0 && (
              <div className="absolute top-[26px] left-[60px] w-[calc(100%-60px)] bg-white border shadow z-10 max-h-40 overflow-auto text-[10px]">
                {customers.map((item) => (
                  <div
                    key={item.customer_id}
                    onClick={() => {
                      setSelectedCustomer(item);
                      setSearch(item.name); // Selected name input me set
                      setShowList(false);

                      formik.setFieldValue("customer_details", item);
                      getPosDetails("new", item.customer_id);
                    }}
                    className="px-2 py-1 !text-black hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name} | {item?.cl_email} | {item?.cl_phone}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Narration */}
          <div className="flex items-center mb-[2px]">
            <span className="w-[60px] text-[10px] font-semibold">
              Narration
            </span>
            <input
              type="text"
              placeholder="Enter notes..."
              className={`flex-1 border border-gray-300 rounded px-1 py-[1px] text-[10px] bg-white ${inputClass}`}
            />
          </div>

          {/* Customer Info Box */}
          <div className="border border-gray-300 bg-white rounded p-[3px] h-[45px] text-[10px] leading-[12px] overflow-hidden">
            {selectedCustomer ? (
              <>
                <div>
                  <b>ID:</b> {selectedCustomer?.cust_unique_id} | <b>Name:</b>{" "}
                  {selectedCustomer?.name}
                </div>
                <div>
                  <b>Address:</b> {selectedCustomer?.address}
                </div>
                <div>
                  <b>Ph:</b> {selectedCustomer?.cl_phone} | <b>Email:</b>{" "}
                  {selectedCustomer?.cl_email}
                </div>
              </>
            ) : (
              <span className="text-gray-400 italic">
                Select a customer to view details
              </span>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-4">
          {[
            ["Series", "ESTIMATE"],
            ["Date", formik.values?.curr_date],
            ["Bill No", formik.values?.bill_no],
          ].map(([label, val]) => (
            <div className="flex items-center mb-[2px]" key={label}>
              <span className="w-[50px] text-[10px] font-semibold">
                {label}
              </span>
              <input
                type="text"
                value={val}
                readOnly
                className="border border-gray-300 rounded px-1 py-[1px] text-[10px] flex-1 bg-white"
              />
            </div>
          ))}

          {/* Checkboxes */}
          <div className="flex items-center space-x-1 mt-[2px]">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  size="small"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }}
                />
              }
              label={<span className="text-[10px]">Goods Deliver</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  size="small"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }}
                />
              }
              label={<span className="text-[10px]">Final Voucher</span>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
