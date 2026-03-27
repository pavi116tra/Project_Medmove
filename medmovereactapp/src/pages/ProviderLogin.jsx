import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const ProviderLogin = () => {
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setWarning('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login-provider', formData);
            login(res.data);
            navigate('/provider/dashboard');
        } catch (err) {
            if (err.response?.status === 403) {
                setWarning(err.response.data.message);
            } else {
                setError(err.response?.data?.message || 'Something went wrong');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="form-card">
                <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Login as Ambulance Provider</h2>

                {error && <div style={{color: '#CC0000', marginBottom: '20px', padding: '10px', background: '#FFEEEE', borderRadius: '6px', fontSize: '14px'}}>{error}</div>}
                {warning && <div style={{color: '#856404', marginBottom: '20px', padding: '15px', background: '#FFF3CD', border: '1px solid #FFEEBA', borderRadius: '6px', fontSize: '14px'}}>⚠️ {warning}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Registered Phone Number *</label>
                        <input name="phone" type="text" className="form-control" placeholder="Enter phone" required value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password *</label>
                        <input name="password" type={showPassword ? "text" : "password"} className="form-control" placeholder="Enter password" required value={formData.password} onChange={handleChange} />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>

                    <button type="submit" className="auth-btn">Login as Provider</button>
                    
                    <div style={{marginTop: '30px', textAlign: 'center', fontSize: '14px'}}>
                        New provider? <Link to="/register/provider" style={{color: '#CC0000', fontWeight: 'bold'}}>Register here</Link>
                    </div>
                    <div style={{marginTop: '10px', textAlign: 'center', fontSize: '14px'}}>
                        Login as <Link to="/login/user" style={{color: '#CC0000'}}>User instead?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProviderLogin;
