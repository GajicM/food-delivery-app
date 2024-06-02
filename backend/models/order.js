'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Drivers,OrderItems}) {
      // define association here
      this.belongsTo(Users,{as:"user",foreignKey:"userId",targetKey:'id'});
      this.belongsTo(Drivers,{as:'driver',foreignKey:'driverId'});
      this.hasMany(OrderItems,{as:'orderItems'});
    }
  }
  Order.init({
    isDelivered: DataTypes.BOOLEAN,
    TotalCost: DataTypes.DOUBLE,
    Time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Order;
};