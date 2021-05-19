const express = require('express');
const auth = require('../../middlewares/auth');
const purchaseController = require('../../controllers/purchase.controller');

const router = express.Router();

router.post('/createPurchase', auth('getUsers'), purchaseController.createPurchase);

module.exports = router;
