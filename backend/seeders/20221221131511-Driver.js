'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Drivers', [{
     firstName: 'Jason',
     lastName: 'Stathman',
     phoneNumber: 693258979,
     licencePlate: 'YO125Re',
     createdAt: new Date(),
     updatedAt: new Date()
     },
     {
      firstName: 'Vin',
      lastName: 'Diesel',
      phoneNumber: 6932589798,
      licencePlate: 'Do128RR',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        firstName: 'Paul',
        lastName: 'Walker',
        phoneNumber: 6932589798,
        licencePlate: 'DE666AD',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
          firstName: 'The',
          lastName: 'Rock',
          phoneNumber: 6932589798,
          licencePlate: "TERAMANA",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
            firstName: 'Che',
            lastName: 'Guevara',
            phoneNumber: 6932589798,
            licencePlate: "OOF12F",
            createdAt: new Date(),
            updatedAt: new Date()
            }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Drivers', null, {});
    
  }
};
