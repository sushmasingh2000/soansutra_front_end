export default function POSHeader() {
  return (
    <div className="flex items-center justify-between p-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-white/20 rounded">☰</button>
        <div className="flex space-x-3">
          <label><input type="radio" name="mode" /> Dine In</label>
          <label><input type="radio" name="mode" /> Take Away</label>
          <label><input type="radio" name="mode" defaultChecked /> Walk In</label>
          <label><input type="radio" name="mode" /> Delivery</label>
        </div>
      </div>
      <div className="text-sm">
        <span>Salesman: <b>Anandi Behen</b></span> | 
        <span> Counter: <b>Counter One</b></span>
      </div>
    </div>
  );
}
