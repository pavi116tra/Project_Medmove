import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const UserRegister = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        otp: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [devOtp, setDevOtp] = useState('');
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        if (!formData.phone || formData.phone.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/send-otp', { phone: formData.phone });
            setOtpSent(true);
            if (res.data.dev_otp) {
                setDevOtp(res.data.dev_otp);
            }
            setError('');
        } catch (err) {
            setError('Failed to send OTP. Try again.');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/verify-otp', { phone: formData.phone, otp: formData.otp });
            setIsOtpVerified(true);
            setError('');
        } catch (err) {
            setError('Incorrect or expired OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!isOtpVerified) {
            setError('Please verify your phone number first');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register-user', formData);
            login(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-container">
            <div className="form-card">
                <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Create Your Account</h2>
                <p style={{textAlign: 'center', color: '#666', marginBottom: '30px'}}>(Patient / Family)</p>

                {error && <div style={{color: '#CC0000', marginBottom: '20px', padding: '10px', background: '#FFEEEE', borderRadius: '6px', fontSize: '14px'}}>{error}</div>}
                {devOtp && (
                    <div style={{color: '#856404', marginBottom: '20px', padding: '10px', background: '#FFF3CD', border: '1px solid #FFEEBA', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold'}}>
                        DEV MODE - Your OTP is: {devOtp}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input name="full_name" type="text" className="form-control" placeholder="Enter full name" required value={formData.full_name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Phone Number *</label>
                        <div className="otp-box">
                            <input name="phone" type="text" className="form-control" placeholder="10 digits" disabled={isOtpVerified} value={formData.phone} onChange={handleChange} />
                            {!isOtpVerified && <button type="button" className="otp-verify-btn" onClick={handleSendOtp}>{otpSent ? 'Resend' : 'Send OTP'}</button>}
                        </div>
                    </div>

                    {otpSent && !isOtpVerified && (
                    <div className="form-group">
                        <label>Enter OTP *</label>
                        <div className="otp-box">
                            <input name="otp" type="text" className="form-control" placeholder="6-digit code" value={formData.otp} onChange={handleChange} />
                            <button type="button" className="otp-verify-btn" style={{background: '#008000'}} onClick={handleVerifyOtp}>Verify OTP</button>
                        </div>
                    </div>
                    )}

                    {isOtpVerified && <p style={{color: 'green', fontSize: '14px', marginBottom: '15px'}}>✅ Phone verified</p>}

                    <div className="form-group">
                        <label>Email (Optional)</label>
                        <input name="email" type="email" className="form-control" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password *</label>
                        <input name="password" type={showPassword ? "text" : "password"} className="form-control" placeholder="Min 8 characters" required value={formData.password} onChange={handleChange} />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password *</label>
                        <input name="confirmPassword" type={showPassword ? "text" : "password"} className="form-control" placeholder="Repeat password" required value={formData.confirmPassword} onChange={handleChange} />
                    </div>

                    <button type="submit" className="auth-btn" disabled={!isOtpVerified}>Create Account</button>
                    
                    <div style={{marginTop: '30px', textAlign: 'center', fontSize: '14px'}}>
                        Already have an account? <Link to="/login/user" style={{color: '#CC0000', fontWeight: 'bold'}}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserRegister;
