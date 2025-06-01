const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    expires: null
  }
});

module.exports = mongoose.model('Visit', visitSchema); 