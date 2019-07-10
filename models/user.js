const { model, Schema } = require('mongoose');
const Card = require('./card.js');
module.exports = model("User", new Schema({
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    rating: { type: Number, required: true },
    picture: { type: String, default: "/assets/images/defaultUser.png" }, 
    biography: { type: String, maxlength: 500 },
    address: { type: String, required: true },
    pending: { type: [Card] },
    haves: { type: [Card] },
    wants: { type: [Card] },
    chats: { type: [String] },
    trades: { type: [String] }
}));