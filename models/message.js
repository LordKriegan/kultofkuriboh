const { Schema } = require('mongoose');
module.exports = new Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true }
});