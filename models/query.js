const mongoose = require('mongoose');

const { Schema } = mongoose;

const querySchema = new Schema({
  term: {
    type: String,
    required: true,
  },
  when: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Query', querySchema);
