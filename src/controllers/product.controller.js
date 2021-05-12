const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Success: Product created', data: product });
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Success: All products', data: result });
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.query.ID);
  res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Success: All products', data: product });
});

const getProductByBrand = catchAsync(async (req, res) => {
  const product = await productService.getProductByBrand(req.query.ID);
  res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Success: All products', data: product });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductByBrand,
  updateUser,
  deleteUser,
};
