const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required!'
  },
  description: {
    type: String,
    required: 'Description is required!'
  },
  price: {
    type: Number,
    required: 'Price is required!'
  },
  duration: {
    type: Number,
    required: 'Duration is required!'
  }
});

const MODEL = mongoose.model('Product', SCHEMA, 'Products');

module.exports = MODEL;
