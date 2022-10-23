const { productsModel } = require('../../models');
const { productSchema, idSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = productSchema.validate(name);

  if (error && error.details[0].type === 'any.required') {
    return { type: 'NAME_NOT_FOUND', message: '"name" is required' };
  }
  if (error && error.details[0].type === 'string.min') {
    return {
      type: 'NAME_NOT_LENGTH',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

const validateNewSale = async (newSale) => {
  const checkProducts = newSale.map(async ({ productId }) =>
    productsModel.findById(productId));

  const invalidProducts = (
    await Promise.all(checkProducts)
  ).some((product) => product === undefined);

  if (invalidProducts) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }

  const invalidQuantites = newSale.some(({ quantity }) => quantity < 1);

  if (invalidQuantites) {
    return {
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
  validateId,
};
