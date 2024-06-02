'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Shops}) {
      // define association here
      this.belongsTo(Users, {as: 'user', foreignKey:'userId'});
      this.belongsTo(Shops,{as:'shop',foreignKey:'shopId'});
      
    }
  }
  Bill.init({
    totalCost: DataTypes.DECIMAL,
    isPaid: DataTypes.BOOLEAN
   

  }, {
    sequelize,
    modelName: 'Bills',
  });
  return Bill;
};