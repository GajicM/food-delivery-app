'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Schedules', [{
      startTime: new Date(),
      endTime: new Date(),
      driverId:1,
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
      startTime: new Date() ,
      endTime: new Date(),
      driverId:2,
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
      startTime: new Date(),
      endTime: new Date(),
      driverId:3,
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
      startTime: new Date(),
      endTime: new Date() ,
      driverId:3,
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
      startTime: new Date(),
      endTime: new Date() ,
      driverId:1,
      createdAt:new Date(),
      updatedAt:new Date()
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Schedules', null, {});
    
  }
};
