const Joi = require('joi');


const scheduleSchema = Joi.object({
  
    startTime:Joi.date(),
    endTime:Joi.date().greater(Joi.ref('startTime')).required()


});

module.exports={scheduleSchema};