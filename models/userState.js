const mongoose = require('mongoose');

const userStateSchema = new mongoose.Schema({
  name: String,
  pop: Number,
  density: Number,
  code: Number
});


module.exports = mongoose.model('UserState', userStateSchema);