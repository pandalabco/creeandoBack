const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    subs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Sub',
      },
    ],
    images: {
      type: Array,
      required: true,
      default: ['https://cree-ando.com/wp-content/uploads/2021/04/Cree-Ando-logo-1.png'],
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
