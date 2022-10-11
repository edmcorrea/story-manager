const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

// const findById = async (passengerId) => {
//   const error = validateId(passengerId);
//   if (error.type) return error;

//   const passenger = await passengerModel.findById(passengerId);
//   if (passenger) return { type: null, message: passenger };
//   return { type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' };
// };

module.exports = {
  findAll,
};
