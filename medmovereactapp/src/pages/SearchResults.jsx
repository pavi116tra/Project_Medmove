import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';
import BookingConfirmModal from '../Components/BookingConfirmModal';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pickup, drop, date, time, type } = location.state || {};

  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(0);
  const [filterType, setFilterType] = useState(type?.toLowerCase() || 'all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  useEffect(() => {
    if (!pickup || !drop) {
      navigate('/');
      return;
    }
    fetchAmbulances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  const fetchAmbulances = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://127.0.0.1:5000/api/ambulances/search`,
        {
          params: { pickup, drop, date, time, type: filterType }
        }
      );

      if (response.data.success) {
        setAmbulances(response.data.ambulances);
        setDistance(response.data.distance_km);
      }
    } catch (err) {
      console.error('Search Error:', err);
      setError('Could not fetch ambulances. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setShowModal(true);
  };

  const confirmBooking = (patientDetails) => {
    setShowModal(false);
    navigate('/payment', {
      state: { 
        ambulance: selectedAmbulance, 
        pickup, drop, date, time, 
        distance_km: distance,
        patientDetails
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3>🔍 Finding ambulances near {pickup}...</h3>
        <p>Please wait a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>← Go Back</button>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      {showModal && (
        <BookingConfirmModal 
          ambulance={selectedAmbulance}
          pickup={pickup}
          drop={drop}
          date={date}
          time={time}
          onConfirm={confirmBooking}
          onCancel={() => setShowModal(false)}
        />
      )}
      <div className="summary-bar">
        <div className="route-info">
          <span className="location">📍 {pickup}</span>
          <span className="arrow"> ──→ </span>
          <span className="location">🏥 {drop}</span>
          <span className="meta">
            📅 {date} &nbsp; 🕐 {time} &nbsp; 📏 ~{distance} km
          </span>
        </div>
        <button className="modify-btn" onClick={() => navigate('/')}>✏️ Modify Search</button>
      </div>

      <div className="filter-bar">
        <span>Filter by type:</span>
        {['all', 'basic', 'oxygen', 'icu'].map(t => (
          <button
            key={t}
            className={filterType === t ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilterType(t)}
          >
            {t === 'all' ? 'All Types' :
             t === 'basic' ? '🚑 Basic (BLS)' :
             t === 'oxygen' ? '💨 Oxygen (ALS)' : '🏥 ICU'}
          </button>
        ))}
        <span className="results-count">{ambulances.length} ambulances found</span>
      </div>

      {ambulances.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🚑</div>
          <h3>No ambulances available</h3>
          <p>No {filterType !== 'all' ? filterType : ''} ambulances found for this route.</p>
          <button onClick={() => navigate('/')}>🔍 Search Again</button>
        </div>
      )}

      <div className="cards-grid">
        {ambulances.map(amb => (
          <div key={amb.id} className="ambulance-card">
            <div className="card-top">
              <span className={`type-badge ${amb.type}`}>🚑 {amb.type.toUpperCase()}</span>
              <span className="available-badge">✅ Available</span>
            </div>
            <h3 className="company-name">{amb.company_name}</h3>
            <div className="amb-details">
              <div className="detail-row"><span>🚗 Vehicle</span><span>{amb.vehicle_number}</span></div>
              <div className="detail-row"><span>👨‍⚕️ Driver</span><span>{amb.driver_name}</span></div>
              <div className="detail-row"><span>📍 Based at</span><span>{amb.base_location}</span></div>
              <div className="detail-row"><span>🌍 Service Area</span><span>{amb.service_area}</span></div>
            </div>
            {amb.equipment?.length > 0 && (
              <div className="equipment-tags">
                {amb.equipment.map((eq, i) => <span key={i} className="eq-tag">✅ {eq}</span>)}
              </div>
            )}
            <div className="price-box">
              <div className="price-row"><span>Base Charge</span><span>₹{amb.base_charge}</span></div>
              <div className="price-row"><span>{distance} km × ₹{amb.price_per_km}</span><span>₹{amb.distance_charge}</span></div>
              <div className="price-total"><span>Estimated Total</span><span>₹{amb.estimated_total}</span></div>
            </div>
            <button className="book-btn" onClick={() => handleBookNow(amb)}>Book Now →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
