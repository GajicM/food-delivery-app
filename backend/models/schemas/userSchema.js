const Joi = require('joi');

const registerSchema = Joi.object({
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
      username: Joi.string().alphanum().min(4).required(),
      admin: Joi.boolean().required(),
      moderator: Joi.boolean().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().lowercase().required(),
});
const loginSchema =Joi.object({
    username: Joi.string().alphanum().min(4).required(),
    password: Joi.string().min(6).required()
});

const updateSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': `"first name" should be a type of 'text'`,
        'string.empty': `"first name" cannot be an empty field`,
        'string.min': `"first name" should have a minimum length of {#limit}`,
        'any.required': `"first name" is a required field`
      }) ,
      lastName:Joi.string().alphanum().min(3).max(30)
});

module.exports = {
    registerSchema : registerSchema,
    updateSchema : updateSchema,
    loginSchema :loginSchema
}