const { model, Schema } = require('mongoose');
const Card = require('./card.js');
const User = new Schema({
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: (v, cb) => {
                model('User').countDocuments({ email: v }, (err, count) => {
                    if (err) {
                        throw err;
                    }
                    // If `count` is greater than zero, "invalidate"
                    cb(!count, "Email already exists!");
                });
            }
        }
    },
    rating: { type: Number, default: 1000 },
    picture: { type: String, default: "/assets/images/defaultUser.png" },
    biography: { type: String, default: "This user does not have a biography.", maxlength: 500 },
    address: { type: String, required: true },
    haves: { type: [Card] },
    wants: { type: [Card] },
    chats: { type: [String], ref: "Chat" },
    trades: { type: [String] }
})
module.exports = model("User", User);