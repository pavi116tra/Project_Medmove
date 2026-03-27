const axios = require('axios');
require('dotenv').config();

// Mock OTP utility for development
const sendOTP = async (phone, otp) => {
    console.log(`[MOCK OTP] Sending ${otp} to ${phone}`);
    
    // In production, integrate with MSG91 or Fast2SMS
    /*
    const response = await axios.post('https://api.msg91.com/api/v5/otp', {
        template_id: 'your_template_id',
        mobile: `91${phone}`,
        authkey: process.env.OTP_SERVICE_API_KEY,
        otp: otp
    });
    return response.data;
    */
    
    return { success: true, message: 'OTP sent successfully (Mock)' };
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { sendOTP, generateOTP };
