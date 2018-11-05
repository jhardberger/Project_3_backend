const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  pop: Number,
  density: Number,
  stateCode: Number,
  placeCode: Number
});


module.exports = mongoose.model('Place', placeSchema);