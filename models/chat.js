const {model, Schema} = require('mongoose');
const Message = require('./message.js');
module.exports = model("Chat", new Schema({
    chatId: { type: String, required: true },
    messages: { type: [Message], required: true }
}));