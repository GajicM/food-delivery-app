const express = require('express');
const { sequelize, ShopItems,Shops,Items } = require('../models');
const { shopItemSchema} = require('../models/schemas/shopItemSchema');
const jwt = require('jsonwebtoken');
const { itemSchema } = require('../models/schemas/itemSchema');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));



route.get('/', (req, res) => {
  

    ShopItems.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
  
}); 
route.get('/items/:id',(req,res)=>{
    ShopItems.findOne({ where: { itemId: req.params.id } } )
    .then( rows =>{ 
        var item;
        var shop;
        var items;
        Items.findOne({where:{id:rows.itemId}}).then(items=>item=items).then(()=>{
            Shops.findOne({where:{id:rows.shopId}}).then(shops=>shop=shops).then(()=>{
                ShopItems.findAll({ where: { shopId: rows.shopId },include:['item','shop'] } ).then((items)=>{
                    var obj={
                        item:item,
                        shop:shop,
                        items:items
                    }
                   return res.json(obj) })
                })
              
            })
        })
   
       
      
    .catch( err => res.status(500).json(err) );


});

route.get('/shops/:id',(req,res)=>{
    ShopItems.findAll({where:{shopId:req.params.id},include:['item','shop']})
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );

})


route.get('/:id', (req, res) => {

    ShopItems.findOne({ where: { id: req.params.id } } )
    .then( rows =>x= res.json(rows) )
    .catch( err => res.status(500).json(err) );
      
}); 


route.post('/', async (req, res) => {
    console.log(req.headers);
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.admin); 

    if(payload.admin === false && payload.moderator===false)
    return    res.status(403).json({ msg: "You are not admin/mod"});
    
    let obj = {
      
        price:req.body.price
    };
    console.log(obj);
    try{
    await   shopItemSchema.validateAsync(obj, { abortEarly: false });
    Items.findOne({where:{id:req.body.itemId}}).then(itm=>{
        Shops.findOne({where:{id:req.body.shopId}}).then(shp=>{
                if(shp===null || itm===null)
                    return res.status(404).json({msg:"fk doesnt exist"});
                obj={
                    price:req.body.price,
                    shopId:req.body.shopId,
                    itemId:req.body.itemId  
                }
            ShopItems.create(obj).then( rows => {
                res.json({ rows: rows });
            }).catch( err => {console.log(err);return res.status(500).json(err);} );
        })


    })
 
}    catch(err){
    console.log(err);
    let fullMsg = "";
    err.details.forEach(element => {
        fullMsg = fullMsg + element.message + "\n";
    });
    const data = {
        msg: fullMsg,
    }
    console.log(fullMsg);
    return res.status(400).json(data);
}
});



route.put('/:id', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.admin);  
  
    if(payload.admin === false && payload.moderator===false)
    return    res.status(403).json({ msg: "You are not admin"});
    else{
        try{
            
            const dataValid = {
                
                price:req.body.price
            }
            await shopItemSchema.validateAsync(dataValid, { abortEarly: false });
        
            ShopItems.findOne({ where: { id: req.params.id } })
            .then( itm => {
              
                itm.price=req.body.price;
                itm.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
        }
        catch(err){
            console.log(err);
            let fullMsg = "";
            err.details.forEach(element => {
                fullMsg = fullMsg + element.message + "\n";
            });
            const data = {
                msg: fullMsg,
            }
            console.log(fullMsg);
            return res.status(400).json(data);
        }
    }
});

route.delete('/:id', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.admin);  
   
    if(payload.admin === false && payload.moderator===false)
     return   res.status(403).json({ msg: "You are not admin"});
    else{
        ShopItems.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;