const express = require('express');
const auth = require('../../middlewares/auth');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.get('/allProducts', productController.getProducts);
router.post('/newProduct', auth('getUsers'), productController.createProduct);
router.get('/allProductsByBrand', auth('getUsers'), productController.getProductByBrand);
router.get('/productsById', auth('getUsers'), productController.getProductById);

module.exports = router;
