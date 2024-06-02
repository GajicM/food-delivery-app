'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Items', [{
      itemName: "Sausage Pasta",
      price: 42.0,
      imgUrl:'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FEdit%2F09-2022-sausage-pasta%2Fsausage-pasta-4',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Bavarian bun",
      price: 623,
      imgUrl:'http://www.msalasi.com/media/k2/items/cache/e2acd849d365015ef08ef5b696dc9e31_XL.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Wendys CheezBurger",
      price: 690,
      imgUrl:'https://dam.kraftheinzcompany.com/adaptivemedia/rendition/195370-3000x2000.jpg?id=093000b4880e99e6cd87fa511235a789145c5a0a&ht=2000&wd=3000&version=1&clid=pim',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Margarita Pizza",
      price: 42.69,
      imgUrl:'https://realfood.tesco.com/media/images/1400x919-MargaritaPizza-555a4065-2573-4b41-bcf3-7193cd095d8f-0-1400x919.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
    {
      itemName: "Hot Dog",
      price: 1520,
      imgUrl:'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_27/1586836/hotdogs-te-square-200702.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Chicken McNuggets 9 komada",
      price: 630,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/fx6jvto0po2vdny8tio3',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Triple Cheeseburger",
      price:560 ,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/kautvafjps8uzuu6k84j',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Double Cheeseburger",
      price: 500,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ememwbjqi6bwn6petczd',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Big Fries",
      price: 350,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/uyvrwehamxwedi9dhr9o',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Mid Fries",
      price: 250,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/me0jmt9cnr7v7cwu0k6z',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Triple Cheeseburger Combo Meal",
      price: 1050,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/hmnqviiljj9dzbti68fh',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Two Chickenburger Pikant Combo Meal",
      price: 1000 ,
      imgUrl:'https://d1kw4i1h0pq0jm.cloudfront.net/GL-RS_5530.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "McFlurry Plazma nugat",
      price: 600,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/nzeo9biytlrhxj76rpnt',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Rol virsla ",
      price: 80,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/niqdlj2krwykcthjnpza',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Somersbi kruska",
      price: 120,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/fbqwpastcyjmctffmusn',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Podloga za pizzu Premia 200g(7251593)",
      price:80 ,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/wenmbs1ijwr7azhtezx0',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Tortica Prestige 500g(7318913)",
      price: 1400,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/dxij8c5wr33eysl0uhk6',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Jaja iz podnog uzgoja 10/1 Premia(7518479)",
      price: 280,
      imgUrl:'https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ssvffkv0e7ql8hd04th4',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Sausage, Egg, & Cheese Croissant",
      price: 700,
      imgUrl:'https://www.wendys.com/sites/default/files/styles/max_650x650/public/2021-05/sausage-egg-cheese-croissant-824_medium_US_en.png?itok=zc2kvJtU',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Dave's Single",
      price:600 ,
      imgUrl:'https://www.wendys.com/sites/default/files/styles/max_650x650/public/2021-05/daves-single.png?itok=J6ttsKQz',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Dave's Double Combo",
      price: 1500,
      imgUrl:'https://www.wendys.com/sites/default/files/styles/max_650x650/public/2022-11/Daves_Double_UK-3.png?itok=BVwWGu1F',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Curry Bean Burger",
      price: 700,
      imgUrl:'https://www.wendys.com/sites/default/files/styles/max_650x650/public/2023-01/pdp-curry-bean-burger.png?itok=n9s4kmcq',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Avocado Chicken Salad",
      price: 500,
      imgUrl:'https://www.wendys.com/sites/default/files/styles/max_650x650/public/2021-05/avocado-chicken-salad-1325_medium_US_en.png?itok=u9CGi7kS',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Cheese Baked Potato",
      price: 600,
      imgUrl:'https://www.wendys.com/sites/default/files/styles/max_650x650/public/2021-05/cheese-potato-172_medium_US_en.png?itok=NXF2OTi5',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Mountain Dew Citrus Soda Pop, 12 oz Cans, 24 Pack",
      price: 1300,
      imgUrl:'https://i5.walmartimages.com/asr/6ad33be7-ea54-47bf-8499-60f2c3016b8c.45ff6ca08f722a9cf6dac80e952c7177.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Doritos Nacho Cheese Flavored Tortilla Chips, Party Size, 14.5 oz Bag",
      price:500 ,
      imgUrl:'https://i5.walmartimages.com/asr/18e7263a-b083-48f0-9264-a743f1a5fa68.9ffc55046b3cb571d9442c51479bb58c.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Cheetos Crunchy Cheese Flavored Snack Chips, 15 oz",
      price:500 ,
      imgUrl:'https://i5.walmartimages.com/asr/b48430ec-e8df-4efc-b56f-81db74fa6327.85ecd1e68b99eebc6df6d64536630623.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Dove Promises Dark Chocolate Candy - 8.46 oz Bag",
      price:800 ,
      imgUrl:'https://i5.walmartimages.com/asr/2b4279c4-0473-4249-b3e0-7dca6e395fec.a532a06340f9edfbe95f070c1f8752af.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "OREO Double Stuf Chocolate Sandwich Cookies, Family Size, 20 oz",
      price: 700,
      imgUrl:'https://i5.walmartimages.com/asr/5fc5d127-96f3-4a42-b80c-b50e58b1d669.ddce17ad023fb5f4a41b9ce772c0f1b0.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Nerds Gummy Clusters Candy Stand Up Bag, 8 Oz",
      price: 300,
      imgUrl:'https://i5.walmartimages.com/asr/e9d886cb-12ca-4bbd-8630-fb8af994bb82.16e5bdf30c026777a8ec50f601fb4333.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Trolli Sour Brite Crawlers Gummi Candy, 5 oz",
      price:400 ,
      imgUrl:'https://i5.walmartimages.com/asr/a9d67375-1232-4434-b08e-dc25ad1d3b9b.81d92f0f76339dd1d78a1017ab01fec8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Sarajevska pita krompir",
      price:150 ,
      imgUrl:'https://skrozdobrapekara.rs/wp-content/uploads/2020/10/sarajevska-pita-krompir.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Sarajveska pita sir",
      price: 150,
      imgUrl:'https://skrozdobrapekara.rs/wp-content/uploads/2017/11/sarajevska-pita-sir.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Baunti pecivo",
      price:80 ,
      imgUrl:'https://skrozdobrapekara.rs/wp-content/uploads/2017/11/baunti-pecivo.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Mrezica visnja",
      price: 80,
      imgUrl:'https://skrozdobrapekara.rs/wp-content/uploads/2023/01/mrezica-visnja9.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Snikers pecivo",
      price: 90,
      imgUrl:'https://skrozdobrapekara.rs/wp-content/uploads/2017/11/snikers-pecivo.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      itemName: "Domaci Hleb",
      price: 80,
      imgUrl:'https://skrozdobrapekara.rs/wp-content/uploads/2021/10/Domaci-hleb.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     

    ], {});
    
    
    
    },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Items', null, {});
  }
};
