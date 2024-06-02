'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Bills', [{
      totalCost: 55 ,
      isPaid:true ,
      createdAt: new Date(),
      updatedAt:new Date(),
      userId:1,
      shopId:1
      },
    {
      totalCost: 55 ,
      isPaid:true ,
      createdAt: new Date(),
      updatedAt:new Date(),
      userId:1,
      shopId:2
      },
    {
      totalCost: 78 ,
      isPaid:true ,
      createdAt: new Date(),
      updatedAt:new Date(),
      userId:1,
      shopId:3
      },
    {
      totalCost: 88 ,
      isPaid:true ,
      createdAt: new Date(),
      updatedAt:new Date(),
      userId:2,
      shopId:3
     },
    {
      totalCost: 46 ,
      isPaid:true ,
      createdAt: new Date(),
      updatedAt:new Date(),
      userId:2,
      shopId:4
    },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('Bills', null, {});
     
  }
};
