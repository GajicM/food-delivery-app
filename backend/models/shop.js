'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ShopItems,Locations,Bills}) {
      // define association here
      
      this.hasMany(ShopItems,{as:'shopItems'});
      this.hasMany(Locations,{as:'locations'});
      this.hasMany(Bills,{as:"bill"});
    }
  }
  Shop.init({
    ShopName: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shops',
  });
  return Shop;
};