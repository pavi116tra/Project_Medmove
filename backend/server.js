const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/ambulances', ambulanceRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('MedMove Backend API is running...');
});

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Database synced successfully');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            console.log(`📡 Network access on http://0.0.0.0:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error syncing database:', err);
    });

module.exports = app;
