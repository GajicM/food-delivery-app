const express = require('express');
const { sequelize, Bills,Users,Shops } = require('../models');
const { billSchema} = require('../models/schemas/billSchema');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
  

    Bills.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
  
}); 



route.get('/:id', (req, res) => {

    Bills.findOne({ where: { id: req.params.id } } )
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
        isPaid: req.body.isPaid,
        totalCost:req.body.totalCost
    };
    console.log(obj);
    try{
    await   billSchema.validateAsync(obj, { abortEarly: false });
    obj={
        isPaid: req.body.isPaid,
        totalCost:req.body.totalCost,
        shopId:req.body.shopId,
        userId:req.body.userId
    }
    Users.findOne({where:{id:req.body.userId}}).then(usr=>
    {
        Shops.findOne({where:{id:req.body.shopId}}).then(shp=> {
            if(shp===null || usr===null)
            return res.status(404).json({msg:"wrong fks"});
            Bills.create(obj).then( rows => {
                res.json({ rows: rows });
            }).catch( err => {console.log(err);return res.status(500).json(err);} );
        });
  
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
                isPaid: req.body.isPaid,
                totalCost:req.body.totalCost
            }
            await billSchema.validateAsync(dataValid, { abortEarly: false });
        
            Bills.findOne({ where: { id: req.params.id } })
            .then( bll => {
                bll.isPaid=req.body.isPaid;
                bll.totalCost=req.body.totalCost;
                bll.save()
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
        Bills.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;