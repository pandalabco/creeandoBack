const express = require('express');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.post('/update', paymentController.updatePayment);

module.exports = router;
