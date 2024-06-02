const express = require('express');
const { sequelize, Users } = require('../models');
const { registerSchema,updateSchema} = require('../models/schemas/userSchema');
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
    Users.findAll()
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

    if(payload.admin === false)
    return    res.status(403).json({ msg: "You are not admin"});
    let x;
       Users.findOne({ where: { id: req.params.id } } )
           .then( rows =>x= res.json(rows) )
           .catch( err => res.status(500).json(err) );
       console.log(x);
   }); 


route.post('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.admin); 

    if(payload.admin === false)
    return    res.status(403).json({ msg: "You are not admin"});
    const obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        admin: req.body.admin,
        password: bcrypt.hashSync(req.body.password, 10),
        moderator: req.body.moderator,
        username:req.body.username
    };
    console.log(obj);
    try{
    await registerSchema.validateAsync(obj, { abortEarly: false });

    Users.create(obj).then( rows => {
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
  
    if(payload.admin === false)
    return    res.status(403).json({ msg: "You are not admin"});
    else{
        try{
            
            const dataValid = {
                firstName: req.body.firstName,
                lastName:req.body.lastName
            }
            await updateSchema.validateAsync(dataValid, { abortEarly: false });
        
            Users.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.firstName = req.body.firstName;
                usr.lastName= req.body.lastName;
                usr.admin = req.body.admin;
                usr.moderator = req.body.moderator;
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
   
    if(payload.admin === false)
     return   res.status(403).json({ msg: "You are not admin"});
    else{
        Users.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;