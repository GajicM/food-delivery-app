'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      
    await queryInterface.bulkInsert('ShopItems', [{
      
      itemId:2,
      shopId:2,
      price:41,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:62,
      itemId:3,
      shopId:4,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:84,
      itemId:4,
      shopId:2,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
    {
      price:96,
      itemId:1,
      shopId:1,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:108,
      itemId:1,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:53,
      itemId:5,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:32,
      shopId:2,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:33,
      shopId:2,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:34,
      shopId:2,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:35,
      shopId:2,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:36,
      shopId:2,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:37,
      shopId:2,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:26,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:25,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:27,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:28,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:29,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:30,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:31,
      shopId:5,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:19,
      shopId:4,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:20,
      shopId:4,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:21,
      shopId:4,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:22,
      shopId:4,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:23,
      shopId:4,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:24,
      shopId:4,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:14,
      shopId:1,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:15,
      shopId:1,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:16,
      shopId:1,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:17,
      shopId:1,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:18,
      shopId:1,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:6,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:7,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:8,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:9,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:10,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:11,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:12,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
     {
      price:0,
      itemId:13,
      shopId:3,
      createdAt:new Date(),
      updatedAt:new Date(),
      
     },
 

    
    
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
   await queryInterface.bulkDelete('ShopItems', null, {});
 
  }
};
