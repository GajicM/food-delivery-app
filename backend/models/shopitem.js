'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Items,OrderItems,Shops}) {
      // define association here
      this.belongsTo(Items,{as:"item",foreignKey:'itemId'});
      this.hasMany(OrderItems,{as:'orderItems'});
      this.belongsTo(Shops,{as:'shop',foreignKey:'shopId'});
    }
  }
  ShopItem.init({
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShopItems',
  });
  return ShopItem;
};