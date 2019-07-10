const { model, Schema } = require('mongoose');
const Card = require('./card.js');
module.exports = model("User", new Schema({
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: (v, cb) => {
                model('User').countDocuments({ email: v }, function (err, count) {
                    if (err) {
                        throw err;
                    }
                    // If `count` is greater than zero, "invalidate"
                    cb(!count, "Email already exists!");
                });
            }
        }
    },
    rating: { type: Number, required: true },
    picture: { type: String, default: "/assets/images/defaultUser.png" },
    biography: { type: String, default: "This user does not have a biography.", maxlength: 500 },
    address: { type: String, required: true },
    pending: { type: [Card] },
    haves: { type: [Card] },
    wants: { type: [Card] },
    chats: { type: [String] },
    trades: { type: [String] }
}));