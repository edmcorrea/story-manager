const { productService } = require('../services');

const listProducts = async (_req, res) => {
  // const { type, message } = await productService.findAll();
  const { message } = await productService.findAll();

  // if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

// const getProductById = async (req, res) => {
//   const { id } = req.params;
//   const { type, message } = await passengerService.findById(id);

//   if (type) return res.status(errorMap.mapError(type)).json(message);

//   res.status(200).json(message);
// };

module.exports = {
  listProducts,
};
