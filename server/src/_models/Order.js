const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserOrder'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  amount: {
    type: Number,
    required: 'QTY is required!'
  },
  note: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
});

const MODEL = mongoose.model('Order', SCHEMA, 'Orders');

module.exports = MODEL;
