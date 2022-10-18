const { productSchema } = require('./schemas');

const validateNewProduct = (product) => {
  const { error } = productSchema.validate({ product });
  console.log(error);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};
