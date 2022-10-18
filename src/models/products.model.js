const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
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

const insert = async (name) => {
  console.log('product', name);
  const columns = Object.keys(snakeize(name))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(name)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(name)],
  );
  // console.log(insertId);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};