'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('OrderItems', [{
      quantity:2,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId:1,
      shopItemId:2
     },
     {
      quantity:3,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId:1,
      shopItemId:3
     },
     {
      quantity:5,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId:2,
      shopItemId:1
     },
     {
      quantity:1,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId:2,
      shopItemId:4
     },
    {
      quantity:5,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId:3,
      shopItemId:3
     }
    ,{
      quantity:4,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId:1,
      shopItemId:5
     }], {});
   
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('OrderItems', null, {});
   
  }
};
