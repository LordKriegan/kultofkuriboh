const { model, Schema } = require('mongoose');
const userTrade = require('./userTrade.js');
module.exports = model("Trade", new Schema({
    sender: { type: userTrade, required: true },
    reciever: { type: userTrade, required: true },
    accepted: { type: String, required: true },
    sentBy: {
        type: String,
        default: "pending",
        enum: ["accept", "pending", "reject"]
    }
}));

