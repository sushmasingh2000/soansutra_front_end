export default function POSHeader() {
  return (
    <div className="flex items-center justify-between p-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-white/20 rounded">☰</button>
        <div className="flex space-x-3">
          <label className="bg-white/20 hover:bg-white/30 p-2 rounded">Detailed</label>
          <label className="bg-white/20 hover:bg-white/30 p-2 rounded"> Daily Balance</label>
          <label className="bg-white/20 hover:bg-white/30 p-2 rounded"> Summary</label>
          <label className="bg-white/20 hover:bg-white/30 p-2 rounded"> Daily Transaction</label>
          <label className="bg-white/20 hover:bg-white/30 p-2 rounded"> Gold Book</label>
          <label className="bg-white/20 hover:bg-white/30 p-2 rounded"> Cash Book</label>
          <label className="bg-white/20 hover:bg-white/30 p-2 rounded"> Silver Book</label>

        </div> 
      </div>
      <div className="text-sm">
        <span>Salesman: <b>Anandi Behen</b></span> | 
        <span> Counter: <b>Counter One</b></span>
      </div>
    </div>
  );
}
