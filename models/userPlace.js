const mongoose = require('mongoose');

const userPlaceSchema = new mongoose.Schema({
  name: String,
  pop: Number,
  density: Number,
  stateCode: Number,
  placeCode: Number
});


module.exports = mongoose.model('UserPlace', userPlaceSchema);