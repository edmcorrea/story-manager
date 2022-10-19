const { salesModel } = require('../models');
// const { validateNewProduct } = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale.length) {
    return { type: 'notFound', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

// const createProduct = async (name) => {
//   const error = validateNewProduct(name);
//   if (error.type) return error;

//   const newProductId = await salesModel.insert({ name });
//   const newProduct = await salesModel.findById(newProductId);

//   return { type: null, message: newProduct };
// };

module.exports = {
  findAll,
  findById,
  // createProduct,
};
