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
  const error = validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateById = async ({ id, name }) => {
  const findId = await productsModel.findById(id);
  if (!findId) return { type: 'notFound', message: 'Product not found' };

  const error = validateNewProduct(name);
  console.log(error);
  if (error.type) return error;

  console.log(id, name);

  await productsModel.updateById(id, { name });

  const result = await productsModel.findById(id);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateById,
};
