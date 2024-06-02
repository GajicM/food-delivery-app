const Joi = require('joi');


const orderItemSchema = Joi.object({
    quantity: Joi.number().required()
       


    })



module.exports={orderItemSchema};