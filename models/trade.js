const {model, Schema} = require('mongoose');
const userTrade = require('./userTrade.js');
module.exports = model("Trade", new Schema({
    users: { type: [userTrade], required: true },
    accepted: { type: String, required: true },
    sentBy: { type: String, required: true }
}));

