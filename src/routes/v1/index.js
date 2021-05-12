const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const brandRoute = require('./brand.route');
const cartRoute = require('./cart.route');
const categoryRoute = require('./category.route');
const couponRoute = require('./coupon.route');
const orderRoute = require('./order.route');
const paymentRoute = require('./payment.route');
const productRoute = require('./product.route');
const purchaseRoute = require('./purchase.route');
const shippmentRoute = require('./shippment.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/brand',
    route: brandRoute,
  },
  {
    path: '/cart',
    route: cartRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/coupon',
    route: couponRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/purchase',
    route: purchaseRoute,
  },
  {
    path: '/shippment',
    route: shippmentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
