const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const updatePayment = catchAsync(async (req, res) => {
  const payment = await paymentService.updatePayment(req.body);
  res.status(httpStatus.CREATED).json({
    code: httpStatus.OK,
    message: 'Success: purchase created and wenjoy link provided',
    data: payment,
  });
});

module.exports = {
  updatePayment,
};
