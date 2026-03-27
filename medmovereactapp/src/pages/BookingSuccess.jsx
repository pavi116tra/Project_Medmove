import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingSuccess.css';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    booking, ambulance,
    pickup, drop, date, time, amount
  } = location.state || {};

  return (
    <div className="success-page">
      <div className="success-header">
        <div className="checkmark">✅</div>
        <h1>Booking Confirmed!</h1>
        <p>Your ambulance has been booked successfully. Receipt sent to your WhatsApp!</p>
      </div>

      <div className="booking-id-box">
        <span>Booking ID</span>
        <strong>#MED{String(booking?.id).padStart(4,'0')}</strong>
      </div>

      <div className="confirm-card">
        <h3>🚑 Ambulance Details</h3>
        <div className="confirm-row"><span>Company</span><span>{ambulance?.company_name}</span></div>
        <div className="confirm-row"><span>Vehicle</span><span>{ambulance?.vehicle_number}</span></div>
        <div className="confirm-row"><span>Driver</span><span>{ambulance?.driver_name}</span></div>
        <div className="confirm-row"><span>Driver Phone</span><span>{ambulance?.driver_phone}</span></div>
      </div>

      <div className="confirm-card">
        <h3>📍 Trip Details</h3>
        <div className="confirm-row"><span>Pickup</span><span>{pickup}</span></div>
        <div className="confirm-row"><span>Drop</span><span>{drop}</span></div>
        <div className="confirm-row"><span>Date & Time</span><span>{date} at {time}</span></div>
        <div className="confirm-row total"><span>Amount Paid</span><span>₹{amount}</span></div>
      </div>

      <div className="whatsapp-notice">
        📱 Receipt sent to your WhatsApp number!
      </div>

      <div className="success-buttons">
        <button onClick={() => navigate('/')} className="home-btn">Back to Home</button>
      </div>
    </div>
  );
};

export default BookingSuccess;
