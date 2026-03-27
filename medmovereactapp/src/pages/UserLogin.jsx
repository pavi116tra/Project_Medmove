import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const UserLogin = () => {
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login-user', formData);
            login(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-container">
            <div className="form-card">
                <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Welcome Back!</h2>
                <p style={{textAlign: 'center', color: '#666', marginBottom: '30px'}}>Login as Patient</p>

                {error && <div style={{color: '#CC0000', marginBottom: '20px', padding: '10px', background: '#FFEEEE', borderRadius: '6px', fontSize: '14px'}}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Phone Number *</label>
                        <input name="phone" type="text" className="form-control" placeholder="Enter phone" required value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password *</label>
                        <input name="password" type={showPassword ? "text" : "password"} className="form-control" placeholder="Enter password" required value={formData.password} onChange={handleChange} />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>

                    <p style={{textAlign: 'right', fontSize: '14px', marginBottom: '20px'}}>
                        <Link to="/forgot-password" style={{color: '#CC0000'}}>Forgot Password?</Link>
                    </p>

                    <button type="submit" className="auth-btn">Login</button>
                    
                    <div style={{marginTop: '30px', textAlign: 'center', fontSize: '14px'}}>
                        Don't have an account? <Link to="/register/user" style={{color: '#CC0000', fontWeight: 'bold'}}>Register</Link>
                    </div>
                    <div style={{marginTop: '10px', textAlign: 'center', fontSize: '14px'}}>
                        Login as <Link to="/login/provider" style={{color: '#CC0000'}}>Provider instead?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
