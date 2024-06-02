'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Bills,Orders}) {
      // define association here
      this.hasMany(Bills,{as:'bills'});
      this.hasMany(Orders,{as:'orders'});
    }
  }
  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
      validate: {
        isEmail : {msg :"must be a valid email"}
      }
    },
    password:{
      type:DataTypes.STRING,
      minSize:4,
      maxSize:16
    },
    admin: DataTypes.BOOLEAN,
    moderator:DataTypes.BOOLEAN,
    username:{
      type:DataTypes.STRING,
      minSize:4,
      allowNull:false,

    }
  }, {
    defaultScope:{
      attributes:{exclude:'email'}
    },
    sequelize,
    modelName: 'Users',
  });
  return Users;
};




