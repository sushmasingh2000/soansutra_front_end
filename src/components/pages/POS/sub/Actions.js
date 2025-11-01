export default function POSActions() {
  const actions = [
    "Reciepts",  "Payments", "Adjust", "Metal Rcpt",
    "Metal Paid", "Gold Bhav", "Silver Bhav", "Transfer" , "Bal. Adjust" , "Commission",
  ];
// 626
  return (
    <div className="flex flex-col space-y-2 p-2">
      {actions.map((a) => (
        <button key={a} className="bg-white/20 hover:bg-white/30 p-2 rounded">
          {a}
        </button>
      ))}

      {/* <div className="mt-auto p-2 text-sm">
        <div>Order No: <b>CB8807FC</b></div>
        <div>Total Amount: <b>₹5300</b></div>
        <button className="w-full bg-red-500 mt-2 p-2 rounded">Last Bill Print</button>
      </div> */}
    </div>
  );
}
