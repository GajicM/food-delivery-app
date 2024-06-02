const express = require('express');
const { sequelize, Orders,Users,Drivers } = require('../models');
const { orderSchema} = require('../models/schemas/orderSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));



route.get('/', (req, res) => {
  

    Orders.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
  
}); 



route.get('/:id', (req, res) => {

    Orders.findOne({ where: { id: req.params.id } } )
    .then( rows =>x= res.json(rows) )
    .catch( err => res.status(500).json(err) );
      
}); 



route.post('/postOrder', async (req, res) => {
  
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.userId); 
    let arr=req.body;
    let tc=0;
    arr.forEach(el=>{
        tc+=el.price*el.quant;
    })
    console.log(tc);
    let obj = {
        isDelivered: false,
        TotalCost:tc,
        Time:new Date()
    };
    try{
    await   orderSchema.validateAsync(obj, { abortEarly: false });
    Users.findOne({where:{id:payload.userId}}).then(usr=>{
       
                if(usr===null)
                    return res.status(404).json({msg:"user doesnt exist"});

                obj = {
                    isDelivered:false,
                    TotalCost:tc,
                    Time:new Date(),
                    userId:usr.id,
                    driverId:1
                        };
    Orders.create(obj).then( rows => {
        res.json({ rows: rows });
    }).catch( err => {console.log(err);return res.status(500).json(err);} );

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

route.post('/', async (req, res) => {
    console.log(req.headers);
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
    console.log(payload.admin); 

    if(payload.admin === false && payload.moderator===false)
    return    res.status(403).json({ msg: "You are not admin/mod"});
    
    let obj = {
        isDelivered: req.body.isDelivered,
        TotalCost:req.body.TotalCost,
        Time:req.body.Time
    };
    console.log(obj);
    try{
    await   orderSchema.validateAsync(obj, { abortEarly: false });
    Users.findOne({where:{id:req.body.userId}}).then(usr=>{
        Drivers.findOne({where:{id:req.body.driverId}}).then(drv=>{
                if(usr===null || drv===null)
                    return res.status(404).json({msg:"fk doesnt exist"});
                     obj = {
                        isDelivered: req.body.isDelivered,
                        TotalCost:req.body.TotalCost,
                        Time:req.body.Time,
                        userId:req.body.userId,
                        driverId:req.body.driverId
                    };
    Orders.create(obj).then( rows => {
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
                isDelivered: req.body.isDelivered,
                TotalCost:req.body.TotalCost,
                Time:req.body.Time
            }
            await orderSchema.validateAsync(dataValid, { abortEarly: false });
        
            Orders.findOne({ where: { id: req.params.id } })
            .then( ord => {
                ord.isDelivered= req.body.isDelivered,
                ord.TotalCost=req.body.TotalCost,
                ord.Time=req.body.Time
                ord.save()
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
        Orders.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;