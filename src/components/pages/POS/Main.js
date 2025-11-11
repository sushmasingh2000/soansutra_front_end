import { useFormik } from "formik";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../../../Shared/Loader";
import { apiConnectorPost } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { swalAlert } from "../../../utils/utilsFun";
import POSActions from "./sub/Actions";
import POSFooter from "./sub/Footer";
import POSHeader from "./sub/Header";
import POSPaymentButtons from "./sub/PaymentButtons";
import POSProductSearch from "./sub/ProductSearch";
import POSProductTable from "./sub/ProductTable";
import { useState } from "react";
import moment from "moment";

export default function POSMain() {
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const defaultRow = {
    type: "Gold",
    item: "Ring",
    stamp: "14KT",
    remarks: "",
    unit: "gm",
    pc: "",
    pktWt: "",
    pktLess: "",
    grWt: "",
    less: "",
    netWt: "",
    tunch: "",
    wastage: "",
    rate: "",
    lbr: "",
    on: "Per",
    other: "",
    dis: "",
    fine: "",
    total: "",
  };

  const formik = useFormik({
    initialValues: {
      rows: [defaultRow],
      add_extra_amount: "",
      less_extra_amount: "",
      rate_diff_extra_amount: "",
      round_off_extra_amount: "",
      pb_closing_bal: 0,
      pb_billing_date: null,
      bill_no: 0,
      curr_date: moment(new Date())?.format("YYYY-MM-DD HH:mm:ss"),
    },
    onSubmit: (values) => {
      console.log("✅ POS Table Submitted:", values);
      alert("POS data saved successfully!");
    },
  });
  async function getPosDetails(type, cust) {
    if (!formik.values?.customer_details?.customer_id) {
      return toast("Please select the customer", { id: 1 });
    }
    setLoading(true);
    const body = {
      type: type,
      pb_billing_date: moment(formik.values?.curr_date)?.format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      pb_cust_id: cust || formik.values?.customer_details?.customer_id,
    };
    try {
      const res = await apiConnectorPost(endpoint.get_pos_bill, body);
      if (res.data?.success) {
        formik.setFieldValue("rows", JSON.parse(res?.data?.result?.pb_items));
        formik.setFieldValue(
          "add_extra_amount",
          res?.data?.result?.pb_extra_add
        );
        formik.setFieldValue(
          "customer_details",
          JSON.parse(res?.data?.result?.pb_customer_details)
        );
        formik.setFieldValue(
          "less_extra_amount",
          res?.data?.result?.pb_extra_less
        );
        formik.setFieldValue(
          "rate_diff_extra_amount",
          res?.data?.result?.pb_trade_diff
        );
        formik.setFieldValue(
          "round_off_extra_amount",
          res?.data?.result?.pb_round_off
        );
        formik.setFieldValue(
          "curr_date",
          moment
            .utc(res?.data?.result?.pb_billing_date)
            ?.format("YYYY-MM-DD HH:mm:ss")
        );
        formik.setFieldValue("bill_no", res?.data?.result?.pb_bill_no);
      } else {
        formik.handleReset();
        formik.setFieldValue("curr_date", body?.pb_billing_date);
        formik.setFieldValue("customer_details", {
          customer_id: body?.pb_cust_id,
        });
        swalAlert(Swal, "error", res?.data?.message);
      }
    } catch (e) {
      swalAlert(Swal, "error", e?.message);
    }
    setLoading(false);
  }
  return (
    <div className="h-screen flex flex-col bg-white">
      <Loader isLoading={loading} />

      {/* Header – full width top bar */}
      <div className="">
        <POSHeader />
      </div>

      {/* Body – search + table + actions */}
      <div className="flex flex-1 w-[100%]">
        <div className="flex-1 flex flex-col p-2 w-[85%] overflow-auto">
          <POSProductSearch
            formik={formik}
            getPosDetails={getPosDetails}
            setSelectedCustomer={setSelectedCustomer}
            selectedCustomer={selectedCustomer}
          />
          <div className="h-[18rem] overflow-y-auto">
            <POSProductTable formik={formik} defaultRow={defaultRow} />
          </div>

          <div className="!w-full !flex !justify-end">
            <POSFooter formik={formik} />
          </div>
          <POSPaymentButtons formik={formik} getPosDetails={getPosDetails} setSelectedCustomer={setSelectedCustomer}/>
        </div>

        {/* Right side actions */}
        <div className="w-28 bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          <POSActions formik={formik} />
        </div>
      </div>
    </div>
  );
}
