const express = require('express');
const { sequelize, Shops } = require('../models');
const { shopSchema} = require('../models/schemas/shopSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));



route.get('/', (req, res) => {
  

    Shops.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
  
}); 



route.get('/:id', (req, res) => {

    Shops.findOne({ where: { id: req.params.id } } )
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
    
    const obj = {
        ShopName: req.body.ShopName,
        imgUrl: req.body.imgUrl
    };
    console.log(obj);
    try{
    await shopSchema.validateAsync(obj, { abortEarly: false });

    Shops.create(obj).then( rows => {
        res.json({ rows: rows });
    }).catch( err => {console.log(err);return res.status(500).json(err);} );
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
                ShopName: req.body.ShopName,
                imgUrl: req.body.imgUrl
            }
            await shopSchema.validateAsync(dataValid, { abortEarly: false });
        
            Shops.findOne({ where: { id: req.params.id } })
            .then( shp => {
                shp.ShopName=req.body.ShopName;
                shp.imgUrl=req.body.imgUrl
                shp.save()
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
        Shops.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;