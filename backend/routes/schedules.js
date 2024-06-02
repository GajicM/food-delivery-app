const express = require('express');
const { sequelize, Schedules,Drivers } = require('../models');
const { scheduleSchema} = require('../models/schemas/scheduleSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/', (req, res) => {
  

    Schedules.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
  
}); 



route.get('/:id', (req, res) => {

    Schedules.findOne({ where: { id: req.params.id } } )
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
       startTime: req.body.startTime,
        endTime:req.body.endTime
    };
    console.log(obj);
    try{
    await   scheduleSchema.validateAsync(obj, { abortEarly: false });
    Drivers.findOne({where:{id:req.body.driverId}}).then(drv=>{
    if(drv===null || drv===undefined)
        return res.status(404).json({msg:"driverId doesnt exist"});
        obj= {
            startTime: req.body.startTime,
            endTime:req.body.endTime,
            driverId:req.body.driverId
         };
    Schedules.create(obj).then( rows => {
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
                startTime: req.body.startTime,
                endTime:req.body.endTime
            }
            await scheduleSchema.validateAsync(dataValid, { abortEarly: false });
        
            Schedules.findOne({ where: { id: req.params.id } })
            .then( sch => {
                sch.startTime=req.body.startTime;
                sch.endTime=req.body.endTime;
                sch.save()
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
        Schedules.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});



module.exports=route;