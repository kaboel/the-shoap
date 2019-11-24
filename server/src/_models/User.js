const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  }
}, {
  timestamps: true
});

const MODEL = mongoose.model('User', SCHEMA, 'Users');

module.exports = MODEL;
