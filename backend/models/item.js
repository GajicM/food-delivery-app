'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ShopItems}) {
      // define association here
      this.hasMany(ShopItems,{as:'shopItem'});
    }
  }
  Item.init({
    itemName: DataTypes.STRING,
    price: DataTypes.NUMBER,
    imgUrl: DataTypes.STRING,
    quant:{
      type:DataTypes.NUMBER,
      defaultValue:1
    }
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Item;
};