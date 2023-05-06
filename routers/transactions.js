const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions');

router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransaction);
router.post('/', transactionController.createTransaction);

module.exports = router;