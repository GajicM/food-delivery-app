const Joi = require('joi');


const shopSchema = Joi.object({
    ShopName: Joi.string().min(1).max(45).required().messages({
        'string.base': `"shop name" should be a type of 'text'`,
        'string.empty': `"shop name" cannot be an empty field`,
        'string.min': `"shop name" should have a minimum length of {#limit}`,
        'any.required': `"shop name" is a required field` 
    }),
    imgUrl:Joi.string()

});

module.exports={shopSchema};