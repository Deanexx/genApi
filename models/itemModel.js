const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    type: {
        type: String,
        enum: {
            values: [
                "Sake",
                "Hard Liquor - Vodka",
                "Hard Liquor - Whiskey",
                "Hard Liquor - Vodka",
                "Hard Liquor - Gin",
                "Hard Liquor - Cognac",
                "Juice",
                "Fruit",
                "Keg Beer",
                "Botle Beer",
                "Syrup",
                "Dish",
                "Wine - White",
                "Wine - Red",
                "Mixers"
            ]
        },
        required: [true, "Only use selected values"]
    },
    val: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("bar", itemSchema)