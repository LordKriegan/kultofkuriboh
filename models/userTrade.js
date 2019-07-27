const { Schema } = require('mongoose');
const Card = require('./card.js');
module.exports = new Schema({
    cards: { type: [Card], required: true },
    recieved: {
        type: String,
        default: "pending",
        enum: ["yes", "pending", "no"]
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});