'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Drivers}) {
      // define association here
      this.belongsTo(Drivers,{as:'drivers',foreignKey:'driverId'});
    }
  }
  Schedule.init({
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Schedules',
  });
  return Schedule;
};