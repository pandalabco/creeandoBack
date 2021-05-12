const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: Array,
      default: [],
      required: true,
    },
    banner: {
      type: Array,
      default: [],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        default: [],
      },
    ],
    admins: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
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
    payments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Payment',
        default: [],
      },
    ],
    brandEmail: {
      type: String,
      required: true,
      index: true,
    },
    brandCel: {
      type: String,
      required: true,
      index: true,
    },
    brandCity: {
      type: String,
      required: true,
      index: true,
    },
    brandAdress: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
brandSchema.plugin(toJSON);
brandSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
