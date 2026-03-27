import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const RoleSelectLogin = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <h1 style={{fontSize: '32px', fontWeight: '800'}}>Welcome Back</h1>
            <p style={{color: '#666', marginTop: '10px'}}>How do you want to login?</p>

            <div className="auth-card-container">
                <div className="role-card" onClick={() => navigate('/login/user')}>
                    <div className="role-icon">🧑⚕️</div>
                    <div className="role-title">Login as User</div>
                    <p className="role-desc">Access your dashboard to book and track ambulances.</p>
                    <button className="auth-btn">Login</button>
                </div>

                <div className="role-card" onClick={() => navigate('/login/provider')}>
                    <div className="role-icon">🚑</div>
                    <div className="role-title">Login as Provider</div>
                    <p className="role-desc">Manage your fleet and respond to booking requests.</p>
                    <button className="auth-btn">Login</button>
                </div>
            </div>

            <p style={{marginTop: '30px', color: '#444'}}>
                Don't have an account? <Link to="/register" style={{color: '#CC0000', fontWeight: '600'}}>Register</Link>
            </p>
        </div>
    );
};

export default RoleSelectLogin;
