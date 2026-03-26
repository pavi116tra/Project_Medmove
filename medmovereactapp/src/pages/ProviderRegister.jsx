import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const ProviderRegister = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        company_name: '',
        owner_name: '',
        phone: '',
        otp: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        service_area: 'Chennai',
        license_number: '',
        license_number: ''
    });

    const [files, setFiles] = useState({
        license_doc: null,
        id_proof: null
    });

    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [devOtp, setDevOtp] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
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
            setError('Failed to send OTP.');
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

    const nextStep = () => {
        if (step === 1) {
            if (!isOtpVerified) {
                setError('Please verify your phone number first');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }
        setError('');
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (files.license_doc) data.append('license_doc', files.license_doc);
        if (files.id_proof) data.append('id_proof', files.id_proof);

        try {
            await axios.post('http://localhost:5000/api/auth/register-provider', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Submission failed');
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="form-card" style={{textAlign: 'center'}}>
                    <div style={{fontSize: '60px', color: '#008000', marginBottom: '20px'}}>✅</div>
                    <h2>Application Submitted!</h2>
                    <p style={{marginTop: '20px', color: '#666', lineHeight: '1.6'}}>
                        Your application is under review. Admin will approve within 24 hours. 
                        You will receive an SMS notification.
                    </p>
                    <button className="auth-btn" style={{marginTop: '30px'}} onClick={() => navigate('/login/provider')}>Go to Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="form-card">
                <div className="step-wizard">
                    <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                        <div className="step-dot">1</div>
                        Company
                    </div>
                    <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-dot">2</div>
                        Documents
                    </div>
                </div>

                <h3 style={{marginBottom: '20px', textAlign: 'center'}}>Step {step} of 2</h3>

                {error && <div style={{color: '#CC0000', marginBottom: '20px', padding: '10px', background: '#FFEEEE', borderRadius: '6px'}}>{error}</div>}
                {devOtp && (
                    <div style={{color: '#856404', marginBottom: '20px', padding: '10px', background: '#FFF3CD', border: '1px solid #FFEEBA', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>
                        DEV MODE - Your OTP is: {devOtp}
                    </div>
                )}

                {step === 1 && (
                    <>
                        <div className="form-group"><label>Company Name *</label><input name="company_name" className="form-control" onChange={handleChange} value={formData.company_name} required /></div>
                        <div className="form-group"><label>Owner Name *</label><input name="owner_name" className="form-control" onChange={handleChange} value={formData.owner_name} required /></div>
                        <div className="form-group">
                            <label>Phone Number *</label>
                            <div className="otp-box">
                                <input name="phone" className="form-control" disabled={isOtpVerified} onChange={handleChange} value={formData.phone} required />
                                {!isOtpVerified && <button type="button" className="otp-verify-btn" onClick={handleSendOtp}>{otpSent ? 'Resend' : 'Send OTP'}</button>}
                            </div>
                        </div>
                        {otpSent && !isOtpVerified && (
                            <div className="form-group"><div className="otp-box"><input name="otp" className="form-control" placeholder="6-digit" onChange={handleChange} value={formData.otp} /><button type="button" className="otp-verify-btn" style={{background: 'green'}} onClick={handleVerifyOtp}>Verify</button></div></div>
                        )}
                        {isOtpVerified && <p style={{color: 'green', fontSize: '13px'}}>✅ Phone verified</p>}
                        <div className="form-group"><label>Email *</label><input name="email" type="email" className="form-control" onChange={handleChange} value={formData.email} required /></div>
                        <div className="form-group"><label>Password *</label><input name="password" type="password" className="form-control" onChange={handleChange} value={formData.password} required /></div>
                        <div className="form-group"><label>Confirm Password *</label><input name="confirmPassword" type="password" className="form-control" onChange={handleChange} value={formData.confirmPassword} required /></div>
                        <button type="button" className="auth-btn" onClick={nextStep}>Next Step →</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="form-group"><label>Full Address *</label><input name="address" className="form-control" onChange={handleChange} value={formData.address} required /></div>
                        <div className="form-group">
                            <label>Service Area (District) *</label>
                            <select name="service_area" className="form-control" onChange={handleChange} value={formData.service_area}>
                                <option value="Chennai">Chennai</option>
                                <option value="Coimbatore">Coimbatore</option>
                                <option value="Madurai">Madurai</option>
                                <option value="Salem">Salem</option>
                            </select>
                        </div>
                        <div className="form-group"><label>License Number *</label><input name="license_number" className="form-control" onChange={handleChange} value={formData.license_number} required /></div>
                        <div className="form-group"><label>Upload License Document *</label><input name="license_doc" type="file" className="form-control" onChange={handleFileChange} required /></div>
                        <div className="form-group"><label>Upload ID Proof *</label><input name="id_proof" type="file" className="form-control" onChange={handleFileChange} required /></div>
                        <div style={{display: 'flex', gap: '15px'}}>
                            <button type="button" className="auth-btn" style={{background: '#333'}} onClick={prevStep}>← Back</button>
                            <button type="button" className="auth-btn" onClick={handleSubmit}>Submit Application</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProviderRegister;
