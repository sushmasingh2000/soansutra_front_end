import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../../../Shared/Loader";
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../../utils/ApiConnector";
import { endpoint } from "../../../../utils/APIRoutes";
import { swalAlert } from "../../../../utils/utilsFun";
import AlertDialog from "./AlertDialog";
import PrintOptionsForm from "./forms/PrintOptionsForm";
import toast from "react-hot-toast";

export default function POSPaymentButtons({
  formik,
  getPosDetails,
  setSelectedCustomer,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const cellInput =
    "w-[90px] h-[20px] border border-gray-300 text-right bg-white text-[10px] px-2 focus:outline-none focus:ring-0";

  const totalTotal =
    formik?.values.rows?.reduce((a, b) => a + Number(b?.total || 0), 0) || 0;
  const totalReceipt = Number(
    formik?.values?.receipt?.reduce(
      (a, b) => a + Number(b?.amount || 0),
      0 || 0
    ) || 0
  );
  const totalPayment = Number(
    formik?.values?.payment?.reduce(
      (a, b) => a + Number(b?.amount || 0),
      0 || 0
    ) || 0
  );

  const netBalance =
    totalTotal -
    totalReceipt +
    totalPayment +
    Number(formik?.values?.add_extra_amount || 0) -
    Number(formik?.values?.less_extra_amount || 0) +
    Number(formik.values.pb_closing_bal || 0);

  // ✅ Save Button Function
  const handleSave = async () => {
    const isSelectedItems = formik.values.rows?.filter((k) => k?.total) || [];
    console.log(formik?.values?.payment?.length);
    if (
      (formik?.values?.payment?.length == 0 || !formik?.values?.payment) &&
      (formik?.values?.receipt?.length == 0 || !formik?.values?.receipt) &&
      isSelectedItems?.length == 0
    ) {
      toast("There is no any item selected.", { id: 1 });
      return;
    }
    setLoading(true);
    try {
      const body = {
        pb_cust_id: formik?.values?.customer_details?.customer_id,
        pb_bill_no: formik?.values?.bill_no,
        pb_billing_date: formik?.values?.curr_date,
        pb_closing_bal: netBalance,
        pb_total_sale: totalTotal,
        pb_return: 0,
        pb_last_bal: 0,
        pb_extra_add: Number(formik?.values?.add_extra_amount || 0),
        pb_extra_less: Number(formik?.values?.less_extra_amount || 0),
        pb_trade_diff: 0,
        pb_round_off: 0,
        pb_adjustment: 0,
        pb_net_balance: netBalance,
        pb_net_with_tax: netBalance,
        pb_customer_details: JSON.stringify(
          formik?.values?.customer_details || {}
        ),
        pb_receipt: JSON.stringify(formik?.values?.receipt || [{}]),
        pb_payment: JSON.stringify(formik?.values?.payment || [{}]),
        pb_items: JSON.stringify(
          formik.values.rows?.filter((k) => k?.total) || [{}]
        ),
      };

      const res = await apiConnectorPost(endpoint.insert_pos_bill, body);

      if (res.data?.success) {
        swalAlert(Swal, "success", res?.data?.message, () =>
          setOpenDialog("Save")
        );
      } else {
        swalAlert(Swal, "error", res?.data?.message);
      }
    } catch (e) {
      swalAlert(Swal, "error", e?.message);
    }
    setLoading(false);
  };

  // ✅ Cancel Button Function
  const handleCancel = () => {
    setOpenDialog("Cancel");
  };

  // ✅ Ledger Button Function
  const handleLedger = () => {
    setOpenDialog("Ledger");
  };

  // ✅ Delete Button Function
  const handleDelete = () => {
    swalAlert(Swal, "warning", "Are you sure to delete this bill?");
  };

  // ✅ New Button Function
  const handleNew = async () => {
    setLoading(true);

    try {
      const res = await apiConnectorGet(endpoint.get_new_pos_bill_no);
      if (res.data?.success) {
        setSelectedCustomer(null);
        formik.handleReset();
        formik.setFieldValue(
          "bill_no",
          Number(res?.data?.result?.pb_bill_no || 0) + 1
        );
      } else {
        swalAlert(Swal, "error", res?.data?.message);
      }
    } catch (e) {
      swalAlert(Swal, "error", e?.message);
    }
    setLoading(false);
  };

  // ✅ Print Button Function
  const handlePrint = () => {
    setOpenDialog("Print");
  };

  // ✅ Prev Button Function
  const handlePrev = () => {
    getPosDetails && getPosDetails("prev");
  };
  const handleFirst = () => {
    getPosDetails && getPosDetails("first");
  };

  // ✅ Next Button Function
  const handleNext = () => {
    getPosDetails && getPosDetails("next");
  };
  const handleLast = () => {
    getPosDetails && getPosDetails("new");
  };

  // ✅ Export Button Function
  const handleExport = () => {
    swalAlert(Swal, "info", "Export functionality coming soon.");
  };

  // ✅ Import Button Function
  const handleImport = () => {
    swalAlert(Swal, "info", "Import functionality coming soon.");
  };

  // ✅ Common Button UI Class
  const buttonClass =
    "flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-1 rounded hover:opacity-90";

  return (
    <div className="flex flex-wrap gap-2 p-1 !text-xs bg-gray-10 border-t mt-1">
      <Loader isLoading={loading} />

      {/* ✅ Individual Buttons */}
      <button onClick={handleSave} className={buttonClass}>
        Save
      </button>
      <button onClick={handleCancel} className={buttonClass}>
        Cancel
      </button>
      <button onClick={handleLedger} className={buttonClass}>
        Ledger
      </button>
      <button onClick={handleDelete} className={buttonClass}>
        Delete
      </button>
      <button onClick={handleNew} className={buttonClass}>
        New
      </button>
      <button onClick={handlePrint} className={buttonClass}>
        Print
      </button>
      <button onClick={handleFirst} className={buttonClass}>
        First
      </button>
      <button onClick={handlePrev} className={buttonClass}>
        Prev
      </button>
      <button onClick={handleNext} className={buttonClass}>
        Next
      </button>
      <button onClick={handleLast} className={buttonClass}>
        Last
      </button>
      <button onClick={handleExport} className={buttonClass}>
        Export
      </button>
      <button onClick={handleImport} className={buttonClass}>
        Import
      </button>

      {/* ✅ Net Total Field */}
      <div>
        Net Total:{" "}
        <input
          type="text"
          className={cellInput}
          value={totalTotal?.toFixed(2)}
          readOnly
        />
      </div>

      {/* ✅ Dialog */}
      <AlertDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        header={openDialog}
        content={<PrintOptionsForm formik={formik} />}
      />
    </div>
  );
}
