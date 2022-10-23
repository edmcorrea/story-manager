const { salesModel } = require('../models');
const { validateNewSale, validateId } = require('./validations/validationsInputValues');
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

const createSale = async (sales) => {
  const error = await validateNewSale(sales);
  if (error.type) return error;

  const id = await salesModel.insertNewId();

  const insertSales = sales.map(async (sale) => 
    salesModel.insertSale(id, sale));

  await Promise.all(insertSales);

  return { type: null, message: { id, itemsSold: sales } };
};

const deleteSale = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const affectedRows = await salesModel.remove(id);
  if (affectedRows > 0) return { type: null, message: '' };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const updateById = async (id, itemsUpdated) => {
  const findId = await salesModel.findById(id);
  if (!findId.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const error = await validateNewSale(itemsUpdated);
  if (error.type) return error;

  const updated = await itemsUpdated
    .map((sale) => salesModel.updateById(id, sale));

  await Promise.all(updated);
  
  return { type: null, message: { saleId: id, itemsUpdated } };
};

module.exports = {
  findAll,
  findById,
  createSale,
  deleteSale,
  updateById,
};
