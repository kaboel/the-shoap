const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

const MODEL = mongoose.model('Product', SCHEMA, 'Products');

module.exports = MODEL;
