'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Orders,ShopItems}) {
      // define association here
      this.belongsTo(Orders,{as:'order',foreignKey:'orderId'});
      this.belongsTo(ShopItems,{as:'shopItem',foreignKey:'shopItemId'});
    }
  }
  OrderItem.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItems',
  });
  return OrderItem;
};