const { salesService } = require('../services');

const listSales = async (_req, res) => {
  // const { type, message } = await productService.findAll();
  const { message } = await salesService.findAll();

  // if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type === 'notFound') return res.status(404).json({ message });

  res.status(200).json(message);
};

const createNewSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.createSale(sales);

  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });

  if (type === 'INVALID_VALUE') return res.status(422).json({ message });

  res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);
  if (type === 'INVALID_VALUE') return res.status(422).json({ message });
  if (type === 'SALE_NOT_FOUND') return res.status(404).json({ message });

  res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itemsUpdated = req.body;
  const { type, message } = await salesService.updateById(id, itemsUpdated);

  if (type === 'PRODUCT_NOT_FOUND' || type === 'SALE_NOT_FOUND') {
    return res.status(404).json({ message });
  }

  if (type === 'INVALID_VALUE') return res.status(422).json({ message });

  res.status(200).json(message);
};

module.exports = {
  listSales,
  getSaleById,
  createNewSale,
  deleteSale,
  updateSale,
};
