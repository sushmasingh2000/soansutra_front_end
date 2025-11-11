import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";

export default function AlertDialog({
  className,
  openDialog,
  setOpenDialog,
  header = "Header Content",
  content,
}) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      // ⚙️ Remove all custom styles, let inner form control layout
      PaperProps={{
        sx: {
          all: "unset", // reset inherited MUI Paper styles
        },
      }}
      sx={{
        zIndex: 1000, // keep below SweetAlert2 if needed
      }}
    >
      {/* <div className="flex justify-between items-center px-4 py-2 border-b border-cyan-500/20 bg-[#fbf6f1] !rounded-lg">
        <span></span>
        <span className="font-extrabold text-lg text-[#9932e0] capitalize ">
          {String(header || "")?.toLocaleUpperCase()}
        </span>
        <CancelIcon
          onClick={handleClose}
          className="text-black hover:text-red-400 cursor-pointer"
        />
      </div> */}
      {/* Content */}
      <DialogContent className={`!p-4 ${className}`}>{content}</DialogContent>
    </Dialog>
  );
}
