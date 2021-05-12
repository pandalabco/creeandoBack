const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: 'Nmae is required',
      minlength: [6, 'Muy corto'],
      maxlength: [12, 'Muy largo'],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
    brand: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
