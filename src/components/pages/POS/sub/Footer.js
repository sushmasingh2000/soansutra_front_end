export default function POSFooter() {
  return (
    <div className="grid grid-cols-6 gap-2 p-3 bg-gray-50 border-t text-sm mt-72">
      <div><b>Quantity</b><br />0</div>
      <div><b>Sale Price</b><br />0.00</div>
      <div><b>Tax Amount</b><br />0.00</div>
      <div><b>Discount</b><br />0.00</div>
      <div><b>Flat Discount</b><br />%</div>
      <div><b>Total</b><br />0.00</div>
    </div>
  );
}
