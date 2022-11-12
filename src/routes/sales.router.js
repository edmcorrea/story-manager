const express = require('express');
const { salesController } = require('../controllers');
const validateSaleInput = require('../middlewares/validateSaleInput');

const router = express.Router();

router.get('/', salesController.listSales);

router.get('/:id', salesController.getSaleById);

router.post('/', validateSaleInput, salesController.createNewSale);

router.put('/:id', validateSaleInput, salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
