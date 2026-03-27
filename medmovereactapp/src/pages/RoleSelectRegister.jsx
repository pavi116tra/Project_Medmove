import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const RoleSelectRegister = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <h1 style={{fontSize: '32px', fontWeight: '800'}}>Join MedMove</h1>
            <p style={{color: '#666', marginTop: '10px'}}>Who are you registering as?</p>

            <div className="auth-card-container">
                <div className="role-card" onClick={() => navigate('/register/user')}>
                    <div className="role-icon">🧑⚕️</div>
                    <div className="role-title">I'm a Patient / Family Member</div>
                    <p className="role-desc">Book ambulances for medical trips and manage your health history.</p>
                    <button className="auth-btn">Get Started</button>
                </div>

                <div className="role-card" onClick={() => navigate('/register/provider')}>
                    <div className="role-icon">🚑</div>
                    <div className="role-title">I'm an Ambulance Provider</div>
                    <p className="role-desc">List and manage your ambulances and start receiving bookings.</p>
                    <button className="auth-btn">Register Now</button>
                </div>
            </div>

            <p style={{marginTop: '30px', color: '#444'}}>
                Already have an account? <Link to="/login" style={{color: '#CC0000', fontWeight: '600'}}>Login</Link>
            </p>
        </div>
    );
};

export default RoleSelectRegister;
