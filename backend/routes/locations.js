const express = require('express');
const { sequelize, Locations,Shops } = require('../models');
const { locationSchema} = require('../models/schemas/locationSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/', (req, res) => {
  

    Locations.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
  
}); 



route.get('/:id', (req, res) => {

    Locations.findOne({ where: { id: req.params.id } } )
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
        StreetAddress: req.body.StreetAddress,
    };
  
    try{
    await locationSchema.validateAsync(obj, { abortEarly: false });
       obj={
            StreetAddress: req.body.StreetAddress,
            shopId:req.body.shopId
        };
    Shops.findOne({ where: { id: req.body.shopId } }).then(shp=>{
            if(shp===null || shp===undefined)
                return res.status(404).json({msg:"shopId doesnt exist"});
            Locations.create(obj).then( rows => {
            res.json({ rows: rows });
            }).catch( err => {console.log(err);return res.status(500).json(err);} );
    })
    }catch(err){
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
                StreetAddress: req.body.StreetAddress
            }
            await locationSchema.validateAsync(dataValid, { abortEarly: false });
        
           Locations.findOne({ where: { id: req.params.id } })
            .then( loc => {
                loc.StreetAddress=req.body.StreetAddress;
                loc.save()
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
        Locations.findOne({ where: { id: req.params.id }})
            .then( loc => {
                loc.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;