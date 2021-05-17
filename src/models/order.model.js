const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    purchaseId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Purchase',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
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
      enum: [
        'Confirmando pago',
        'Pago exitoso, alistando producto',
        'Pago parcial, esperando pago completo',
        'Pago rechazado, esperando pago completo',
        'Procesando',
        'Despachada',
        'En transito',
        'Cancelada',
        'Completada',
      ],
      default: 'Confirmando pago',
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
