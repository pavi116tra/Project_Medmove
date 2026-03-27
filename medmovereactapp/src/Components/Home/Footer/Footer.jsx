<<<<<<< HEAD
import React from 'react';
import { Globe, MessageCircle, Camera, Briefcase, Mail, Phone, MapPin, Ambulance } from 'lucide-react';
import medmoveimg from '../../../Assest/medmove_new_logo.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="modern-footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo">
              <img src={medmoveimg} alt="MedMove Logo" style={{ height: '40px' }} />
            </div>
            <p className="brand-description">
              Tamil Nadu's first technology-driven ambulance booking platform. 
              Connecting patients with verified medical transport quickly, safely, and affordably.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Globe size={20} /></a>
              <a href="#" className="social-icon"><MessageCircle size={20} /></a>
              <a href="#" className="social-icon"><Camera size={20} /></a>
              <a href="#" className="social-icon"><Briefcase size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-grid">
            <div className="links-group">
              <h4 className="group-title">Platform</h4>
              <ul>
                <li><a href="/">Search Ambulance</a></li>
                <li><a href="/login/provider">Provider Login</a></li>
                <li><a href="/register/provider">Join as Provider</a></li>
                <li><a href="/search-results">Available Cities</a></li>
              </ul>
            </div>
            
            <div className="links-group">
              <h4 className="group-title">Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Mission</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Release</a></li>
              </ul>
            </div>

            <div className="links-group">
              <h4 className="group-title">Contact</h4>
              <ul className="contact-info">
                <li><Mail size={16} /> <span>support@medmove.in</span></li>
                <li><Phone size={16} /> <span>+91 98765 43210</span></li>
                <li><MapPin size={16} /> <span>Madurai, Tamil Nadu</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">© 2024 MedMove Pvt. Ltd. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
=======
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4 className="footer-title">MEDMOVE</h4>
          <p className="footer-text">
            India's No.1 Online Non-emergency Ambulance Booking App. Providing seamless, safe, and smart transport solutions.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">CONTACT US</h4>
          <p className="footer-list">
            <strong>Phone:</strong> +91 98765 43210<br />
            <strong>Email:</strong> support@medmove.in<br />
            <strong>Address:</strong> 123 Healthcare Plaza, Madurai, Tamil Nadu
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">AVAILABLE IN</h4>
          <p className="footer-list">
            Lucknow | Agra | Ayodhya | Varanasi | Sivakasi | Madurai | Delhi |
            Chennai | Coimbatore | Trichy | Erode | Salem
          </p>
        </div>
      </div>

      <hr />

      <div className="footer-section">
        <h4 className="footer-title">BOOK AMBULANCE</h4>
        <p className="footer-list">
          Patient Transfer | Basic Life Support (BLS) | Advanced Life Support
          (ALS) | Dead Body Transfer | Train Ambulance | Veterinary Ambulance |
          Pet Transfer
        </p>
      </div>

      <hr />

      <div className="footer-links-container">
        <div className="footer-about">
          <h4 className="footer-title">About Our Service</h4>
          <p>
            Book non-emergency ambulances for patients or pets with ease. Enter context, compare rates, and track your ride in real-time.
          </p>
        </div>
        
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 MedMove Pvt. Ltd. All rights reserved.</p>
>>>>>>> 9b0bb0f6bead8cfb6eccdda495159ed02750951c
      </div>
    </footer>
  );
};

export default Footer;
