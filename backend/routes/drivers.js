const express = require('express');
const { sequelize, Drivers } = require('../models');
const { driverSchema} = require('../models/schemas/driverSchema');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt=require('bcrypt');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
 //   res.sendFile(path.join(__dirname, '/../static/users/users.html'));
 const token = req.headers['authorization'].split(' ')[1];
 const decoded= jwt.decode(token,{complete:true});
 const payload=decoded.payload;
 console.log(payload.admin); 

 if(payload.admin === false)
   return  res.status(403).json({ msg: "You are not admin"});
 let x;
 Drivers.findAll()
        .then( rows =>x= res.json(rows) )
        .catch( err => res.status(500).json(err) );
    console.log(x);
}); 

route.get('/:id', (req, res) => {
    //   res.sendFile(path.join(__dirname, '/../static/users/users.html'));
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.admin); 

    if(payload.admin === false && payload.moderator===false)
    return    res.status(403).json({ msg: "You are not admin"});
    let x;
    Drivers.findOne({ where: { id: req.params.id } } )
           .then( rows =>x= res.json(rows) )
           .catch( err => res.status(500).json(err) );
       console.log(x);
   }); 


route.post('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.admin); 

    if(payload.admin === false && payload.moderator===false)
    return    res.status(403).json({ msg: "You are not admin"});
    const obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        licencePlate:req.body.licencePlate,
        phoneNumber:req.body.phoneNumber
    };
    console.log(obj);
    try{
    await driverSchema.validateAsync(obj, { abortEarly: false });

    Drivers.create(obj).then( rows => {
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
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                licencePlate:req.body.licencePlate,
                phoneNumber:req.body.phoneNumber
            }
            await driverSchema.validateAsync(dataValid, { abortEarly: false });
        
            Drivers.findOne({ where: { id: req.params.id } })
            .then( drv => {
                drv.firstName = req.body.firstName;
                drv.lastName= req.body.lastName;
                drv.licencePlate = req.body.licencePlate;
                drv.phoneNumber = req.body.phoneNumber;
                usr.save()
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
        Drivers.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;