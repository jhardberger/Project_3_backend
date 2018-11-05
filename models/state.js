const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
  pop: Number,
  density: Number,
  code: Number
});


module.exports = mongoose.model('State', stateSchema);