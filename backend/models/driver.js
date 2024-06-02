'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Orders,Schedules}) {
      // define association here
      this.hasMany(Orders,{as:'orders'});
      this.hasMany(Schedules,{as:'schedule'});
    }
  }
  Driver.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    licencePlate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Drivers',
  });
  return Driver;
};