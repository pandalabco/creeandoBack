const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { brandService } = require('../services');

const createBrand = catchAsync(async (req, res) => {
  const newBrand = { ...req.body, admins: [req.user.id]};
  const brand = await brandService.createBrand(newBrand);
  res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: 'Success: Brand created', data: brand });
});

const getBrands = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await brandService.queryBrands(filter, options);
  res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Success: All brands', data: result });
});

const getBrand = catchAsync(async (req, res) => {
  const brand = await brandService.getBrandById(req.query.ID);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Success: All brands', data: brand });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await brandService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await brandService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  updateUser,
  deleteUser,
};
