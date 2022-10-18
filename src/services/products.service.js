const { productsModel } = require('../models');
const { validateNewProduct } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return { type: 'notFound', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const createProduct = async (name) => {
  // console.log(product);
  // const error = validateNewProduct(product);
  // if (error.type) return error;

  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.findById(newProductId);
  console.log(newProduct);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
