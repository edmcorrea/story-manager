const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const productSchema = Joi.string().min(5).required();
const quantitySchema = Joi.number().integer().min(1).required();

const addSale = Joi.object({
  productId: idSchema,
  quantity: quantitySchema,
});
module.exports = {
  idSchema,
  productSchema,
  addSale,
};