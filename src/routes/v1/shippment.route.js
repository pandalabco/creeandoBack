const express = require('express');
// const auth = require('../../middlewares/auth');
const shippmentController = require('../../controllers/shippment.controller');

const router = express.Router();

// Generar envios mongo.
// Coordinadora
router.post('/coo', shippmentController.cooHandler);

module.exports = router;
