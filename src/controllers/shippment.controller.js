const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { coordinadoraService } = require('../services');

const cooHandler = catchAsync(async (req, res) => {
  const envio = await coordinadoraService.cooCotizarCiudades(req.body);
  res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Success: Cotización con coordinadora', data: envio });
});

module.exports = {
  cooHandler,
};
