const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String,
        size: String,
      },
    ],
    payments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Payment',
        default: [],
      },
    ],
    shippments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Shipping',
        default: [],
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    orderStatus: {
      type: String,
      default: 'Confirmando pago',
      enum: ['Confirmando pago', 'Procesando', 'Despachada', 'En transito', 'Cancelada', 'Completada'],
    },
    orderdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
