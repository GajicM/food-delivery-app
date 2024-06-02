const Joi = require('joi');

const driverSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': `"first name" should be a type of 'text'`,
        'string.empty': `"first name" cannot be an empty field`,
        'string.min': `"first name" should have a minimum length of {#limit}`,
        'any.required': `"first name" is a required field`
      }),
      lastName: Joi.string().alphanum().min(3).max(30).messages({
        'string.base': `"last name" should be a type of 'text'`,
        'string.min': `"last name" should have a minimum length of {#limit}`,
      }),
      licencePlate:Joi.string().required(),
      phoneNumber:Joi.number().required()
});

module.exports = {
    driverSchema
}