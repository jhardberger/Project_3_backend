const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  type: String,
  isCorrect: Number,
  pctDif: Number
});


module.exports = mongoose.model('Answer', answerSchema);