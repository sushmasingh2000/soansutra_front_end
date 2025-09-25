import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const loadCashfreeSdk = () => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) return resolve(window.Cashfree);

      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => resolve(window.Cashfree);
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    // 1️⃣ create order on backend
    let orderData;
    try {
      const resp = await fetch("http://localhost:2000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      orderData = await resp.json();
      if (!resp.ok) throw new Error(orderData.error || "Failed to create order");
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to create order");
      return;
    }

    const { payment_session_id } = orderData;

    // 2️⃣ load Cashfree SDK
    let cashfree;
    try {
      cashfree = await loadCashfreeSdk();
    } catch (err) {
      console.error("Cannot load Cashfree SDK:", err);
      alert("Payment SDK load failed");
      return;
    }

    // 3️⃣ initiate checkout
    try {
      cashfree = cashfree({ mode: "sandbox" }); // sandbox mode
      cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Pay ₹10 (Sandbox)</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit">Pay ₹10</button>
      </form>
    </div>
  );
}

export default App;
