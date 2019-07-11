const { Schema } = require('mongoose');
const Card = require('./card.js');
module.exports = new Schema({
    cards: { type: [Card], required: true },
    recieved: {
        type: String,
        default: "pending",
        enum: ["accept", "pending", "reject"]
    },
    userId: { type: String, required: true }
});