const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required!'
  },
  phone: {
    type: String,
    required: 'Phone is required!'
  },
  email: {
    type: String,
    required: 'Phone is required!'
  },
  address: {
    type: String,
    required: 'Address is required!'
  }
}, {
  timestamps: true
});

const MODEL = mongoose.model('CustomerOrder', SCHEMA, 'CustomerOrders');

module.exports = MODEL;
