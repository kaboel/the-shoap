const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const MODEL = mongoose.model('User', SCHEMA, 'Users');

module.exports = MODEL;
