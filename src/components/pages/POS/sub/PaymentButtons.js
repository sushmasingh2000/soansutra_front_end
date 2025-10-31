export default function POSPaymentButtons() {
  const buttons = [
    "Multiple Pay (F12)", "Redeem Credit", "Hold (F6)",
    "Apply Offer (F2)", "Pay Later (F11)", "UPI (F5)",
    "Card (F3)", "Cash (F4)", "Hold & Print (F7)"
  ];

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-t mt-2">
      {buttons.map((b) => (
        <button
          key={b}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded hover:opacity-90"
        >
          {b}
        </button>
      ))}
    </div>
  );
}
