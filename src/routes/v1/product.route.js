const express = require('express');
const auth = require('../../middlewares/auth');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.get('/allProducts', productController.getProducts);
router.post('/newProduct', auth('getUsers'), productController.createProduct);
router.get('/allProductsByBrand', productController.getProductByBrand);
router.get('/productsById', productController.getProductById);
router.get('/coordinadora', productController.coordinadora);

module.exports = router;
