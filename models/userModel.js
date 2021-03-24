const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Provide login"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide password"]
    }
})

module.exports = mongoose.model('user', userSchema);