// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require('axios');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const generatePaymentLink = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    // const {email,first_name, last_name, document_number,document_type,cellphone,description, total_value} = dataFront;
    const body = {
      first_name: 'Matty',
      last_name: 'Bylin',
      email: 'mattiasbylin@hotmail.com',
      document_number: '1020814132',
      document_type: 1,
      cellphone: 4211111111,
      description: 'Test de wenjoy',
      total_value: 5000,
      response_url: process.env.RESPONSE_URL_WENJOY_DEV,
      private_api_key: process.env.WENJOY_API_KEY_DEV,
      confirmation_url: process.env.CONFIRMATION_URL_WENJOY_DEV,
    };
    axios
      .post(process.env.WENJOY_GEN_PAYMENT_LINK_URL_DEV, body)
      .then((result) => {
        // Do somthing
        resolve(result.data);
      })
      .catch((err) => {
        // Do somthing
        throw new ApiError(httpStatus.BAD_REQUEST, err.data);
      });
  });

module.exports = {
  generatePaymentLink,
};
