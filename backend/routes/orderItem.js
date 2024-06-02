const express = require('express');
const { sequelize, OrderItems,Orders,ShopItems,Items } = require('../models');
const { orderItemSchema} = require('../models/schemas/orderItemSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));



route.get('/', (req, res) => {
  

    OrderItems.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
  
}); 

route.get('/ord/:id', (req, res) => {

    OrderItems.findOne({ where: { orderId: req.params.id },include:['shopItem'] } )
    .then( rows =>{console.log(rows);x= res.json(rows) })
    .catch( err =>{console.log(err); res.status(500).json(err)} );
      
}); 


route.get('/:id', (req, res) => {

    OrderItems.findOne({ where: { id: req.params.id } } )
    .then( rows =>x= res.json(rows) )
    .catch( err => res.status(500).json(err) );
      
}); 

route.post('/postOrder',async  (req, res) => {
   
    const token = req.headers['authorization'].split(' ')[1];
    const decoded= jwt.decode(token,{complete:true});
    const payload=decoded.payload;
   
    let obj=[];
   let resp=[];
    try{
        let ord= await  Orders.findOne({where:{id:req.body.order.rows.id}});
        let arr=req.body.items;
      
        let promises=  await  arr.map(async el=>{
        let shi=await ShopItems.findOne({where:{itemId:el.id}})
                if(shi===null || ord===null)
                    return res.status(404).json({msg:"fk doesnt exist"});
                
                      obj = {
                        quantity:el.quant,
                        shopItemId:shi.id,
                        orderId:req.body.order.rows.id
                    };
                    
                        resp.push(obj);
               
                   
                    });
                    console.log('aaaaaa');
                    console.log(promises);
                    Promise.all(promises).then(()=>{OrderItems.bulkCreate(resp).then(rows=>{
                        res.json(req.body);
                    })});
                
                    
          


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
        quantity: req.body.quantity,
    };
    console.log(obj);
    try{
    await orderItemSchema.validateAsync(obj, { abortEarly: false });
    Orders.findOne({where:{id:req.body.orderId}}).then(ord=>{
        ShopItems.findOne({where:{id:req.body.shopItemId}}).then(shi=>{
                if(shi===null || ord===null)
                    return res.status(404).json({msg:"fk doesnt exist"});
                obj = {
                        quantity: req.body.quantity,
                        shopItemId:req.body.shopItemId,
                        orderId:req.body.orderId
                    };
    OrderItems.create(obj).then( rows => {
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
                quantity: req.body.quantity
            }
            await orderItemSchema.validateAsync(dataValid, { abortEarly: false });
        
            OrderItems.findOne({ where: { id: req.params.id } })
            .then( ori => {
                ori.quantity=req.body.quantity;
                ori.save()
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
        OrderItems.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    }
});








module.exports=route;