const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  console.log('oi');
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return camelize(result);
};

const findById = async (productId) => {
  try {
    const [[product]] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [productId],
    );
    return camelize(product);
  } catch (error) {
    return error;
  }
};

const addProduct = async (product) => {
  const columns = Object.keys(snakeize(product))
    .map((_elem) => '?')
    .join(', ');
  
  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertProduct }] = await connection.execute(
    `INSERT INTO passengers (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertProduct;
};

module.exports = {
  findAll,
  findById,
  addProduct,
};