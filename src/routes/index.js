const express = require('express');

const productsRouter = require('./products.router');
const salesRouter = require('./sales.router');

const routers = express.Router();

routers.use('/products', productsRouter);
routers.use('/sales', salesRouter);

module.exports = routers;