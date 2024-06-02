const Joi = require('joi');


const billSchema = Joi.object({
    totalCost: Joi.number().required().messages({
    }),
    isPaid:Joi.boolean()

});

module.exports={billSchema};