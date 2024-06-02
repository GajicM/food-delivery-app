const Joi = require('joi');


const shopItemSchema = Joi.object({
    price:Joi.number().required()

});

module.exports={shopItemSchema};