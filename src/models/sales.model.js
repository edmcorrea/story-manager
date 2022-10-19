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

const insert = async () => 'oi';

module.exports = {
  findAll,
  findById,
  insert,
};
