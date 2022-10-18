const { productService } = require('../services');

const listProducts = async (_req, res) => {
  // const { type, message } = await productService.findAll();
  const { message } = await productService.findAll();

  // if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type === 'notFound') return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(message);
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;

  // const { type, message } = await productService.createProduct(product);
  const { message } = await productService.createProduct(name);
  // if(type) return res.status(errorMap.mapError(type)).json(message);
  res.status(201).json(message);
};

module.exports = {
  listProducts,
  getProductById,
  createNewProduct,
};
