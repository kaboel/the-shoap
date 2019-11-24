const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  order: {
    orderId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    note: {
      type: String,
      required: false
    },
    type: Array,
    required: true
  }
});

const MODEL = mongoose.model('Order', SCHEMA, 'Orders');

module.exports = MODEL;
