const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  extraPrice: {
    type: mongoose.Schema.Types.Number,
    required: true
  }
});

const MODEL = mongoose.model('Type', SCHEMA, 'Types');

module.exports = MODEL;
