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
  if (error.type) return error;

  await productsModel.updateById(id, { name });

  const result = await productsModel.findById(id);
  return { type: null, message: result };
};

const deleteById = async (id) => {
  const findId = await productsModel.findById(id);
  if (!findId) return { type: 'notFound', message: 'Product not found' };

  await productsModel.deleteById(id);

  const result = await productsModel.findById(id);
  return { type: null, message: result };
};

const searchProduct = async (q) => {
  const result = await productsModel.findBySearch(q);
  return result;
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateById,
  deleteById,
  searchProduct,
};
