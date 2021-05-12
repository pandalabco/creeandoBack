const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    top: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    shortDesc: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    subs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Sub',
      },
    ],
    quantity: {
      type: [
        {
          color: String,
          size: String,
          num: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    pictures: {
      type: Array,
      required: true,
      default: ['https://cree-ando.com/wp-content/uploads/2021/04/Cree-Ando-logo-1.png'],
    },
    smPictures: {
      type: Array,
      required: true,
      default: ['https://cree-ando.com/wp-content/uploads/2021/04/Cree-Ando-logo-1.png'],
    },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'No',
    },
    color: {
      type: String,
      enum: ['N/A', 'Negro', 'Blanco', 'Azul', 'Verde', 'Rojo', 'Otro'],
      default: 'N/A',
    },
    size: {
      type: String,
      enum: ['Única', '"XS"', 'S', 'M', 'L', 'XL'],
      default: 'Única',
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
