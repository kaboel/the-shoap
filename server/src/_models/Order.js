const mongoose = require('mongoose');

const CHILD_SCHEMA = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  note: {
    type: mongoose.Schema.Types.String,
  }
});

const PARENT_SCHEMA = mongoose.Schema({
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
  orders: [CHILD_SCHEMA],
  status: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  }
}, {
  timestamps: true
});

const MODEL = mongoose.model('Order', PARENT_SCHEMA, 'Orders');

module.exports = MODEL;
