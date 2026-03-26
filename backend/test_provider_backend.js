const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const API_URL = 'http://localhost:5000/api';
const SECRET = process.env.JWT_SECRET || 'medmove_secret_key';

// Mock Token for Provider (id: 1)
const token = jwt.sign({ id: 1, role: 'provider' }, SECRET, { expiresIn: '1h' });

async function testBackend() {
    console.log('--- Testing Provider APIs ---');
    const headers = { Authorization: `Bearer ${token}` };

    try {
        // 1. Get Stats
        const stats = await axios.get(`${API_URL}/provider/dashboard-stats`, { headers });
        console.log('✅ Stats:', stats.data.stats);

        // 2. Add Ambulance
        const add = await axios.post(`${API_URL}/provider/ambulances/add`, {
            vehicle_number: 'TN59ZZ9999',
            type: 'icu',
            driver_name: 'Test Driver',
            driver_phone: '9999999999',
            base_location: 'Madurai',
            base_charge: 3000,
            price_per_km: 50,
            equipment: ['Ventilator', 'ECG Monitor']
        }, { headers });
        console.log('✅ Add Ambulance:', add.data.message);

        // 3. Get All
        const list = await axios.get(`${API_URL}/provider/ambulances`, { headers });
        console.log('✅ Fleet Size:', list.data.ambulances.length);

        // 4. Update
        const ambId = add.data.ambulance.id;
        const update = await axios.put(`${API_URL}/provider/ambulances/${ambId}`, {
            driver_name: 'Updated Driver'
        }, { headers });
        console.log('✅ Update Ambulance:', update.data.message);

        // 5. Delete
        const del = await axios.delete(`${API_URL}/provider/ambulances/${ambId}`, { headers });
        console.log('✅ Delete Ambulance:', del.data.message);

    } catch (err) {
        console.error('❌ Test Failed:', err.response?.data || err.message);
    }
}

testBackend();
