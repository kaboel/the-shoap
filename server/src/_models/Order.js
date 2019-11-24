const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: 'Name is required!'
  },
  phone: {
    type: mongoose.Schema.Types.String,
    required: 'Phone is required!'
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: 'Phone is required!'
  },
  address: {
    type: mongoose.Schema.Types.String,
    required: 'Address is required!'
  },
  orders: {
    type: mongoose.Schema.Types.Array,
    ref: 'Orders'
  },
  status: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  }
}, {
  timestamps: true
});

const MODEL = mongoose.model('CustomerOrder', SCHEMA, 'CustomerOrders');

module.exports = MODEL;
