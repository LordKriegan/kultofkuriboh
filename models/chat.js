const { Schema, model } = require('mongoose');
const Message = require('./message.js');
module.exports = model("Chat", new Schema({
    roomId: { 
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: (v, cb) => {
                model('Chat').countDocuments({roomId: v}, (err, count) => {
                    if (err) throw err
                    cb(!count, "Room already exists!");
                });
            }
        } 
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: { type: [Message], required: true }
}));