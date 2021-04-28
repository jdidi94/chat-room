const mongoose = require("mongoose");


mongoose.Promise = global.Promise;
const  MessageSchema = new mongoose.Schema({
    send: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    message: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },

},{ timestamps: true });
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;