const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String,
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  website: {
    type: String,
    require: true
  },
  originalPrice: {
    type: String,
    require: true
  },
  discountPrice: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('product', ProductSchema);

// title
// description
// imageUrl
// brand
// website
// originalPrice
// discountPrice
