import React from 'react';
import "./Third.css";
import ambulanceImg from "../../../Assest/model-hospital.jpg"; // Using a professional hospital/ambulance image

const Third = () => {
  return (
    <div className="provider-cta-section">
      <div className="provider-cta-container">
        <div className="provider-cta-image">
          <img src={ambulanceImg} alt="Ambulance Provider" />
          <div className="image-overlay"></div>
        </div>
        <div className="provider-cta-content">
          <div className="cta-text-wrapper">
            <h1>Are You an Ambulance Provider?</h1>
            <p>List your ambulances on MedMove and reach thousands of patients across Tamil Nadu. Grow your service with India's most trusted platform.</p>
            <button className="provider-btn">Register as Provider →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Third;
