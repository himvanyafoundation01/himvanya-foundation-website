"use client";

import { useState } from "react";

interface PaymentProps {
  amount: number;
  purpose: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function RazorpayButton({
  amount,
  purpose,
  firstName,
  lastName,
  email,
  phone,
}: PaymentProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      // 1. Create order on server
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const orderData = await res.json();

      // 2. Load Razorpay script if not loaded
      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // 3. Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vanya Foundation",
        description: `Donation - ${purpose}`,
        order_id: orderData.id,
        prefill: {
          name: `${firstName} ${lastName}`,
          email,
          contact: phone,
        },
        theme: { color: "#0ea5e9" },
        handler: async function (response: any) {
          // Verify payment on server
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.status === "success") {
            alert("Payment Successful! Thank you for your donation.");
          } else {
            alert("Payment Verification Failed!");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            alert("Payment popup closed.");
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      // Handle payment failures
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      alert("Something went wrong with the payment.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Processing..." : "Donate Now"}
    </button>
  );
}
