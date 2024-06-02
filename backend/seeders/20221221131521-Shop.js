'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Shops', [{
        ShopName: 'IDEjA',
        imgUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Idea_Logo.svg/2560px-Idea_Logo.svg.png',
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        ShopName: 'Skroz Dobra Pekara',
        imgUrl:'https://skrozdobrapekara.rs/wp-content/uploads/2020/05/logo-sajt-full.png',
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        ShopName: 'McDeez',
        imgUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png',
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        ShopName: 'Wendys',
        imgUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Wendy%27s_full_logo_2012.svg/640px-Wendy%27s_full_logo_2012.svg.png',
        createdAt:new Date(),
        updatedAt: new Date()
      },
      {
        ShopName: 'WallMart',
        imgUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2560px-Walmart_logo.svg.png',
        createdAt:new Date(),
        updatedAt: new Date()
      }
     
    
    
    
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Shops', null, {});
     
  }
};
