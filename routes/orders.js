const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/ordersController');

router.post('/', placeOrder);
router.get('/', getOrders);

module.exports = router;
