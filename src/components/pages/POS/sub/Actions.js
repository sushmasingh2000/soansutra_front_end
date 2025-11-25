import { useState } from "react";
import AlertDialog from "./AlertDialog";
import ReceiptForm from "./forms/ReceiptForm";
import AdjustForm from "./forms/AdjustForm";
import GoldBhavForm from "./forms/GoldBhavForm";
import PaymentForm from "./forms/PaymentForm";
import RateBookingForm from "./forms/RateBookingForm";
import SilverBhavForm from "./forms/SilverBhavForm";
import TransferForm from "./forms/TransferForm";

export default function POSActions({formik}) {
  const [oepnDialog, setOpenDialog] = useState(false);

  const actions = [
    { name: "Reciepts", compo: <ReceiptForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Payments", compo: <PaymentForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Adjust", compo: <AdjustForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Metal Rcpt", compo: <RateBookingForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Metal Paid", compo: <RateBookingForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Gold Bhav", compo: <GoldBhavForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Silver Bhav", compo: <SilverBhavForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Transfer", compo: <TransferForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Bal. Adjust", compo: <RateBookingForm formik={formik} setOpenDialog={setOpenDialog}/> },
    { name: "Commission", compo: <RateBookingForm formik={formik} setOpenDialog={setOpenDialog}/> },
  ];
  // 626
  return (
    <div className="flex flex-col space-y-2 p-2 !text-xs ">
      {actions.map((a) => (
        <button
          onClick={() => setOpenDialog(a.name)}
          key={a.name}
          className="bg-white/20 hover:bg-white/30 p-1 rounded"
        >
          {a.name}
        </button>
      ))}

      <AlertDialog
        openDialog={oepnDialog}
        setOpenDialog={setOpenDialog}
        header={oepnDialog}
        content={actions?.find((i) => i?.name == oepnDialog)?.compo}
      />
    </div>
  );
}
