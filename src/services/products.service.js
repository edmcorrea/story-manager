const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  // console.log(id);
  const product = await productsModel.findById(id);
  if (!product) {
    return { type: 'notFound', message: 'Product not found' };
  }
  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
};