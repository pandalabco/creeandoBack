const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const purchaseSchema = mongoose.Schema(
  {
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: [],
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
purchaseSchema.plugin(toJSON);
purchaseSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
