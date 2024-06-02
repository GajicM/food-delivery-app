const Joi = require('joi');


const orderSchema = Joi.object({
    TotalCost: Joi.number().required().messages({
    }),
    isDelivered:Joi.boolean(),
    Time:Joi.date()
    
   
});

module.exports={orderSchema};