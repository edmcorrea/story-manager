const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, 
    sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id=sp.sale_id
    ORDER BY saleId;`,
  );
  return camelize(result);
};

const findById = async (saleId) => {
  try {
    const [sale] = await connection.execute(
      `SELECT s.date, 
      sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id=sp.sale_id
      WHERE id = ?;`,
      [saleId],
    );
    return camelize(sale);
  } catch (error) {
    return error;
  }
};

const insertNewId = async () => {  
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUE ()',
  );

  return camelize(insertId);
};

const insertSale = async (id, sales) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, ...Object.values(sales)],
  );
  return camelize(id);
};

const remove = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insertNewId,
  insertSale,
  remove,
};
