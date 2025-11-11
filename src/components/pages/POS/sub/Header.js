import { Avatar } from "@mui/material";
import { useState } from "react";
import AlertDialog from "./AlertDialog";
import ProductSectoin from "./component/ProductSectoin";
import ProductGroupSection from "./component/ProductGroupSection";
import ReceiptForm from "./forms/ReceiptForm";
import PaymentForm from "./forms/PaymentForm";
import AdjustForm from "./forms/AdjustForm";
import GoldBhavForm from "./forms/GoldBhavForm";
import SilverBhavForm from "./forms/SilverBhavForm";
import TransferForm from "./forms/TransferForm";
import RateBookingForm from "./forms/RateBookingForm";
export default function POSHeader() {
  const [oepnDialog, setOpenDialog] = useState(false);
  return (
    <div className=" !text-xs flex items-center justify-between p-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-3 ">
          <label
            className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded cursor-pointer"
            onClick={() => setOpenDialog("P")}
          >
            P
          </label>
          <label
            className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded cursor-pointer"
            onClick={() => setOpenDialog("G")}
          >
            G
          </label>
          <label className="bg-white/20 hover:bg-white/30 p-1 rounded">
            Detailed
          </label>

          <label className="bg-white/20 hover:bg-white/30 p-1 rounded">
            {" "}
            Daily Balance
          </label>
          <label className="bg-white/20 hover:bg-white/30 p-1 rounded">
            {" "}
            Summary
          </label>
          <label className="bg-white/20 hover:bg-white/30 p-1 rounded">
            {" "}
            Daily Transaction
          </label>
          <label className="bg-white/20 hover:bg-white/30 p-1 rounded">
            {" "}
            Gold Book
          </label>
          <label className="bg-white/20 hover:bg-white/30 p-1 rounded">
            {" "}
            Cash Book
          </label>
          <label className="bg-white/20 hover:bg-white/30 p-1 rounded">
            {" "}
            Silver Book
          </label>
        </div>
      </div>
      <div className="text-sm">
        <span>
          Salesman: <b>Anandi Behen</b>
        </span>{" "}
        |
        <span>
          {" "}
          Counter: <b>Counter One</b>
        </span>
      </div>

      <AlertDialog
        openDialog={oepnDialog}
        setOpenDialog={setOpenDialog}
        header={oepnDialog === "P" ? "Master Items" : "Master Group"}
        content={
          oepnDialog === "P" ? <ProductSectoin /> : <ProductGroupSection />
        }
        className={"!w-[50vw]"}
      />
    </div>
  );
}
