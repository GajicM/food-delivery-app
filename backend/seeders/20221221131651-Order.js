'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Orders', [{
      isDelivered:true ,
      TotalCost: 423,
      Time:new Date(),
      createdAt:new Date() ,
      updatedAt:new Date(),
      userId:1,
      driverId:1},
      {
        isDelivered:false ,
        TotalCost: 89,
        Time:new Date(),
        createdAt:new Date() ,
        updatedAt:new Date(),
        userId:1,
        driverId:3
      },
      {
        isDelivered:true ,
        TotalCost: 56,
        Time:new Date(),
        createdAt:new Date() ,
        updatedAt:new Date(),
        userId:2,
        driverId:2
      },
      {
        isDelivered:true ,
        TotalCost: 420,
        Time:new Date(),
        createdAt:new Date() ,
        updatedAt:new Date(),
        userId:3,
        driverId:1
      },
      {
        isDelivered:true ,
        TotalCost: 420,
        Time:new Date(),
        createdAt:new Date() ,
        updatedAt:new Date(),
        userId:4,
        driverId:5}
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Orders', null, {});
     
  }
};
