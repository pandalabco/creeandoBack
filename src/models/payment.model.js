const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    purchase_id: {
      type: String,
      default: '',
    },
    purchase_link: {
      type: String,
      default: '',
    },
    purchase_description: {
      type: String,
      default: '',
    },
    purchase_total_value: {
      type: String,
      default: '',
    },
    purchase_current_value: {
      type: String,
      default: '',
    },
    purchase_state: {
      type: String,
      default: '',
    },
    purchase_signature: {
      type: String,
      default: '',
    },
    purchaseId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Purchase',
    },
    shippments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Shipping',
        default: [],
      },
    ],
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        default: [],
      },
    ],
    payedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
