const { productSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = productSchema.validate(name);

  const { type } = error.details[0];

  if (error && type === 'any.required') {
    return { type: 'NAME_NOT_FOUND', message: '"name" is required' };
  }
  if (error && type === 'string.min') {
    return {
      type: 'NAME_NOT_LENGTH',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};
