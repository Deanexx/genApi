const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },
    data: {
        type: Array,
        required: [true, "Please provide Data"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("list", listSchema)