const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.user.email);
  res.status(httpStatus.CREATED).json({ code: httpStatus.OK, message: 'me', data: user });
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(httpStatus.CREATED).json({ code: httpStatus.OK, message: 'Success: All users', data: result });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  res.status(httpStatus.CREATED).json({ code: httpStatus.OK, message: 'usuario actualizado exitosamente', data: user });
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.body.id, req.body);
  res.status(httpStatus.CREATED).json({ code: httpStatus.OK, message: 'usuario actualizado exitosamente', data: user });
});

const updateUserByEmail = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  res.status(httpStatus.CREATED).json({ code: httpStatus.OK, message: 'usuario actualizado exitosamente', data: user });
});

const addBrandAdmin = catchAsync(async (req, res) => {
  const user = await userService.addBrandAdmin(req.user.id, req.body);
  res.status(httpStatus.CREATED).json({ code: httpStatus.OK, message: 'usuario actualizado exitosamente', data: user });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  updateUserByEmail,
  getMe,
  getUsers,
  getAllUsers,
  getUser,
  updateUser,
  updateUserById,
  addBrandAdmin,
  deleteUser,
};
