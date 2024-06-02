'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
      username:{
        type:Sequelize.STRING,
        allowNull:false,
        minSize: 4
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique : true,
        validate: {
          isEmail : {msg :"must be a valid email"}
        }
      },
      password:{
        type:Sequelize.STRING,
        minSize:4,
        maxSize:16
      },
      admin:{
        type:Sequelize.BOOLEAN
      },
      moderator:{type:Sequelize.BOOLEAN},

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};