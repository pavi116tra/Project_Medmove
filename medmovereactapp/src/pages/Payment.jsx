import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import './Payment.css';
import API_BASE from '../config/api';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const {
    ambulance, pickup, drop,
    date, time, distance_km,
    patientDetails
  } = location.state || {};

  const amount = ambulance?.estimated_total || 0;

  const upiString = `upi://pay?pa=medmove@paytm&pn=MedMove&am=${amount}&cu=INR&tn=MedMove Ambulance Booking`;

  const handleScanned = async () => {
    setScanned(true);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const bookingData = {
        ambulance_id: ambulance.id,
        provider_id: ambulance.provider_id,
        pickup_location: pickup,
        drop_location: drop,
        booking_date: date,
        booking_time: time,
        distance_km,
        
        // Patient details
        patient_name: patientDetails?.patient_name || "Guest",
        patient_age: patientDetails?.patient_age || 0,
        patient_condition: patientDetails?.patient_condition || "",
        need_oxygen: patientDetails?.need_oxygen || false,
        wheelchair: patientDetails?.wheelchair || false,
        special_notes: patientDetails?.special_instructions || "",

        // Fare Breakdown
        base_charge: ambulance.base_charge,
        distance_charge: distance_km * ambulance.price_per_km,
        total_price: amount
      };

      const bookingRes = await axios.post(
        `${API_BASE}/api/bookings/create`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (bookingRes.data.success) {
        await axios.post(
          `${API_BASE}/api/bookings/send-receipt`,
          { booking_id: bookingRes.data.booking.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setPaid(true);
        setLoading(false);
        setTimeout(() => {
          navigate('/booking-success', {
            state: {
              booking: bookingRes.data.booking,
              ambulance, pickup, drop, date, time, amount
            }
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      alert('Payment processing failed. Check console.');
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>💳 Payment</h2>
        <span className="secure-badge">🔒 100% Secure</span>
      </div>

      <div className="amount-box">
        <span>Total Amount</span>
        <span className="amount">₹{amount}</span>
      </div>

      <div className="demo-notice">
        🎓 <strong>Demo Payment</strong> — This is a college project. No real money will be charged.
      </div>

      {!paid && (
        <div className="qr-section">
          <h3>Scan to Pay ₹{amount}</h3>
          <div className="qr-box">
            <QRCodeSVG value={upiString} size={200} fgColor="#CC0000" />
          </div>
          <p className="upi-id">UPI ID: <strong>medmove@paytm</strong></p>
          
          <div className="breakdown">
            <div className="breakdown-row"><span>Base Charge</span><span>₹{ambulance?.base_charge}</span></div>
            <div className="breakdown-row"><span>Distance ({distance_km}km)</span><span>₹{distance_km * ambulance?.price_per_km}</span></div>
            <div className="breakdown-row total"><span>Total</span><span>₹{amount}</span></div>
          </div>

          {!scanned && (
            <button className="scanned-btn" onClick={handleScanned}>
              ✅ I Have Scanned — Confirm Payment
            </button>
          )}

          {loading && (
            <div className="processing">
              <div className="spinner"></div>
              <p>Processing payment...</p>
              <p>Sending receipt to WhatsApp...</p>
            </div>
          )}
        </div>
      )}

      {paid && (
        <div className="paid-success">
          <div className="success-icon">✅</div>
          <h3>Payment Confirmed!</h3>
          <p>Redirecting to success page...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
