'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Provider.hasMany(models.Ambulance, { foreignKey: 'provider_id' });
      Provider.hasMany(models.Booking, { foreignKey: 'provider_id' });
    }
  }
  Provider.init({
    company_name: DataTypes.STRING,
    owner_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    address: DataTypes.TEXT,
    service_area: DataTypes.STRING,
    license_number: DataTypes.STRING,
    license_doc_url: DataTypes.STRING,
    id_proof_url: DataTypes.STRING,
    bank_account: DataTypes.STRING,
    ifsc_code: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    account_holder_name: DataTypes.STRING,
    is_approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Provider',
  });
  return Provider;
};