import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import LoginModal from "../../LoginModal/LoginModal";
import "./Firstdetail.css";
import workhome from "../../../Assest/work-from-home.png";
import calender from "../../../Assest/calendar.png";
import destinationIcon from "../../../Assest/destination.png";
import ambulanceIcon from "../../../Assest/medcab-nav-icon.png"; // Using an existing icon
import search from "../../../Assest/search-interface-symbol.png";

const Firstdetail = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [ambulanceType, setAmbulanceType] = useState("Basic");

  const locations = [
    "Chennai", "Madurai", "Coimbatore", "Trichy", "Salem", 
    "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur"
  ];

  const handleSearch = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!source.trim()) return alert("Please enter your location");
    if (!destination.trim()) return alert("Please enter destination");

    navigate('/search-results', {
      state: {
        pickup: source.trim(),
        drop: destination.trim(),
        date,
        time,
        type: ambulanceType
      }
    });
  };

  // Format date for display: 19 July, 2025
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="home1-details">
      <div className="details-des">
        <div className="des-text">
          {/* Source */}
          <div className="des-box des1">
            <img src={workhome} alt="source" />
            <div className="input-group">
                <label>Your Location</label>
                <input 
                    type="text" 
                    list="locations-list"
                    value={source} 
                    onChange={(e) => setSource(e.target.value)} 
                    placeholder="Enter city..."
                />
            </div>
          </div>

          {/* Destination */}
          <div className="des-box des2">
            <img src={destinationIcon} alt="destination" />
            <div className="input-group">
                <label>Destination</label>
                <input 
                    type="text" 
                    list="locations-list"
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                    placeholder="Enter city..."
                />
            </div>
          </div>

          {/* Date and Time */}
          <div className="des-box des3">
            <div className="date-time-field">
              <div className="date-time-top">
                <span className="field-label">Date & Time</span>
              </div>
              <div className="date-time-inputs">
                <input
                  type="date"
                  className="date-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  className="time-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Ambulance Type */}
          <div className="des-box des4">
            <img src={ambulanceIcon} alt="ambulance" />
            <div className="input-group">
                <label>Ambulance Type</label>
                <select 
                    value={ambulanceType} 
                    onChange={(e) => setAmbulanceType(e.target.value)}
                    className="ambulance-select"
                >
                    <option value="Basic">Basic (BLS)</option>
                    <option value="Oxygen">Oxygen (ALS)</option>
                    <option value="ICU">ICU / Ventilator</option>
                </select>
            </div>
          </div>
        </div>
      </div>

      <datalist id="locations-list">
        {locations.map((loc) => (
            <option key={loc} value={loc} />
        ))}
      </datalist>

      {/* Search Button */}
      <button className="search-btn" onClick={handleSearch}>
        <img src={search} alt="search" />
        <span>Search Ambulance</span>
      </button>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleSearch}
      />
    </div>
  );
};

export default Firstdetail;
