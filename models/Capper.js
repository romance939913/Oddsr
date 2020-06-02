const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CapperSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  wins: {
    type: Number,
    required: true
  },
  losses: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Capper = mongoose.model('cappers', CapperSchema);

module.exports = Capper;