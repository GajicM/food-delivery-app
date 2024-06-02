const Joi = require('joi');


const locationSchema = Joi.object({
    StreetAddress: Joi.string().min(3).max(128).required()
       


    })



module.exports={locationSchema};