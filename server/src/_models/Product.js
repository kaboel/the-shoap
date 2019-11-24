const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: 'Name is required!'
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: 'Description is required!'
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: 'Price is required!'
  },
  duration: {
    type: mongoose.Schema.Types.String,
    required: 'Duration is required!'
  }
});

const MODEL = mongoose.model('Product', SCHEMA, 'Products');

module.exports = MODEL;
