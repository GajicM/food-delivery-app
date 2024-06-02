'use strict';
const bcrypt=require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
    await queryInterface.bulkInsert('Users', [{
      id:1,
       firstName: 'John',
       lastName: 'Doe',
      email:'JohnDoe@jd.com',
       username:'john',
       admin: true,
        moderator:true,
          password: bcrypt.hashSync('password', 10),
          createdAt:new Date(),
          updatedAt:new Date()
      },
      {
        id:2,
        firstName: 'admin',
        lastName: 'admin',
       email:'admin@jd.com',
        username:'admin',
        admin: true,
         moderator:true,
           password: bcrypt.hashSync('admin', 10),
           createdAt:new Date(),
           updatedAt:new Date()
       },
       {
        id:3,
        firstName: 'Petar',
        lastName: 'Johnson',
       email:'ppp@jd.com',
        username:'petar',
        admin: false,
         moderator:false,
           password: bcrypt.hashSync('petar', 10),
           createdAt:new Date(),
           updatedAt:new Date()
       },
       {
        id:4,
        firstName: 'Aca',
        lastName: 'Bvuckovic',
       email:'acabvuckovic@jd.com',
        username:'aca',
        admin: false,
         moderator:false,
           password: bcrypt.hashSync('acaaca', 10),
           createdAt:new Date(),
           updatedAt:new Date()
       },
       {
        id:5,
        firstName: 'ana',
        lastName: 'anovic',
       email:'anic@jd.com',
        username:'ana',
        admin: false,
         moderator:false,
           password: bcrypt.hashSync('anaana', 10),
           createdAt:new Date(),
           updatedAt:new Date()
       },
      ], {});
   
  },

  async down (queryInterface, Sequelize) {
   
  await queryInterface.bulkDelete('Users', null, {});
  
  }
};
