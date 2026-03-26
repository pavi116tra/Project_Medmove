'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Provider, { foreignKey: 'provider_id' });
      Booking.belongsTo(models.Ambulance, { foreignKey: 'ambulance_id' });
      Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Booking.init({
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickup_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drop_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    booking_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'rejected'),
      defaultValue: 'pending'
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ambulance_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
