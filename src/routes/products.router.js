const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/search', productsController.queryProduct);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.createNewProduct);

router.put('/:id', productsController.changeName);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
