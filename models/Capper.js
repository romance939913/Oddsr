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
  bio: {
    type: String,
  },
  sports: {
    type: String
  },
  wins: {
    type: Number,
    required: true,
    default: 0
  },
  losses: {
    type: Number,
    required: true,
    default: 0
  },
  pushes: {
    type: Number,
    required: true,
    default: 0
  },
  picks: {
    type: Array,
    required: true,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Capper = mongoose.model('cappers', CapperSchema);

module.exports = Capper;