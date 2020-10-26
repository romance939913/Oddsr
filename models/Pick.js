const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickSchema = new Schema({
    team: {
        type: String,
        required: true
    },
    spread: {
        type: String,
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