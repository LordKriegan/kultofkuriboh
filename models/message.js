const { Schema } = require('mongoose');

module.exports = new Schema({
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true }
});