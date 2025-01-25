import React, { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import "./payment.css";

const payment = () => {
  // Step 2.2: Set up state for the form inputs
  const [amount, setAmount] = useState(100); // Default amount
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2.3: Configure Flutterwave payment settings
  const config = {
    public_key: "FLWPUBK_TEST-f6edf90e62237e5849871a2f48b3a311-X", // Replace with your Flutterwave Public Key
    tx_ref: Date.now(), // Unique transaction reference
    amount: amount, // Amount to be paid
    currency: "KES", // Currency (KES for Kenyan Shillings)
    payment_options: "card, mobilemoney, ussd", // Payment methods
    customer: {
      email: email, // Customer's email
      phonenumber: phone, // Customer's phone number
      name: "Customer Name", // Customer's name (can be dynamic)
    },
    customizations: {
      title: "Your Business Name",
      description: "Payment for services",
      logo: "https://your-logo-url.com/logo.png", // Replace with your logo URL
    },
  };

  // Step 2.4: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !phone) {
      alert("Please fill in all the details.");
      return;
    }
    alert("Proceeding to payment...");
  };

  // Step 2.5: Configure Flutterwave button with callback
  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response) => {
      console.log(response);
      if (response.status === "successful") {
        alert("Payment successful!");
      } else {
        alert("Payment failed!");
      }
      closePaymentModal(); // Close the modal after payment attempt
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <div className="payment-form-container">
      <h1>Payment Form</h1>
      {/* Step 2.6: Create the payment form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount (KES):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </form>
      {/* Step 2.7: Add the Flutterwave payment button */}
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
};

export default payment;
