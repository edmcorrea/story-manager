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
  const { type, message } = await productService.createProduct(name);

  if (type === 'NAME_NOT_FOUND') return res.status(400).json({ message });

  if (type === 'NAME_NOT_LENGTH') return res.status(422).json({ message });

  res.status(201).json(message);
};

const changeName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateById({
    id,
    name,
  });
  
  if (type === 'NAME_NOT_FOUND') return res.status(400).json({ message });
  
  if (type === 'notFound') return res.status(404).json({ message });
  
  if (type === 'NAME_NOT_LENGTH') return res.status(422).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteById(id);
  if (type === 'notFound') return res.status(404).json({ message });
  res.status(204).end();
};

const queryProduct = async (req, res) => {
  const { q } = req.query;
  const result = await productService.searchProduct(q);
  res.status(200).json(result);
};

module.exports = {
  listProducts,
  getProductById,
  createNewProduct,
  changeName,
  deleteProduct,
  queryProduct,
};
