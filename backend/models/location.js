'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shops}) {
      // define association here
      this.belongsTo(Shops,{as:'shop',foreignKey:'shopId',onDelete:"SET NULL"});
    }
  }
  Location.init({
    StreetAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Locations',
  });
  return Location;
};