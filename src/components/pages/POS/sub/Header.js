import { useState } from "react";
import AlertDialog from "./AlertDialog";
import ProductGroupSection from "./component/ProductGroupSection";
import ProductSectoin from "./component/ProductSectoin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CropFreeIcon from "@mui/icons-material/CropFree";
export default function POSHeader() {
  const [oepnDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  return (
    <div className=" !text-xs flex items-center justify-between p-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-3 ">
          <label
            className="bg-white/20 hover:bg-white/30 px-2 py-1 text-center rounded cursor-pointer"
            onClick={() => navigate("/admin-dashboard")}
          >
            <ArrowBackIcon fontSize="12" />
          </label>
          <label
            className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded cursor-pointer"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
          >
            <CropFreeIcon fontSize="12" />
          </label>

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
          Store: <b>{localStorage.getItem("store")}</b>
        </span>{" "}
        {/* |
        <span>
          {" "}
          Counter: <b>Counter One</b>
        </span> */}
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
