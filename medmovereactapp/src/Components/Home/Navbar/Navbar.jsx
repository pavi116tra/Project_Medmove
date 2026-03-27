import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import medmoveimg from "../../../Assest/medmove_new_logo.svg"
import { AuthContext } from '../../../context/AuthContext'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, role, user, provider, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={medmoveimg} alt="MedMove Logo" />
        </Link>

        <button 
          className="mobile-menu-icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></div>
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              
              <div 
                className="nav-item-dropdown"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link to="/register" className="nav-link dropdown-toggle">Register</Link>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/register/user" className="dropdown-item">Register as User</Link>
                    <Link to="/register/provider" className="dropdown-item">Register as Provider</Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <span className="nav-link">Hello, {user?.full_name || provider?.company_name}</span>
              <button onClick={handleLogout} className="nav-link" style={{background: 'none', border: 'none', cursor: 'pointer'}}>Logout</button>
            </>
          )}


          <a href="#footer" className="nav-link">Contact</a>
          <Link to="/about" className="nav-link">About Us</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar