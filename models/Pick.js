const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickSchema = new Schema({
    betId: {
        type: String,
        required: true
    },
    teams: {
        type: String,
        required: true
    },
    spread: {
        type: Number,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Pick = mongoose.model("picks", PickSchema);

module.exports = Pick;