const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/ambulances', ambulanceRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('MedMove Backend API is running...');
});

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully');
        if (require.main === module) {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

module.exports = app;
