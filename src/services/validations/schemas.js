const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const productSchema = Joi.string().min(3).required();
// const dateSchema = Joi.string().min(3).required();

module.exports = {
  idSchema,
  productSchema,
};