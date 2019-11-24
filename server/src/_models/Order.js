const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserOrder'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  amount: {
    type: Number,
    required: 'QTY is required!'
  },
  note: {type: String}
});

const MODEL = mongoose.model('Order', SCHEMA, 'Orders');

module.exports = MODEL;
