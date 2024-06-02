'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    
      await queryInterface.bulkInsert('Locations', [{
       StreetAddress: "Nedodjija BB,Beograd",
       shopId: 1,
       createdAt:new Date(),
       updatedAt:new Date()
     },
     {
      StreetAddress: "Nedodjija SB,Beograd",
      shopId: 1,
      createdAt:new Date(),
      updatedAt:new Date()
    }
  ,{
    StreetAddress: "Terazije,Beograd",
    shopId: 2,
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    StreetAddress: "Town Square 16, USOFA",
    shopId: 3,
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    StreetAddress:"loc",
    shopId: 4,
    createdAt:new Date(),
    updatedAt:new Date()
  }], {});
   
  },

  async down (queryInterface, Sequelize) {
   
   await queryInterface.bulkDelete('Locations', null, {});
   
  }
};
