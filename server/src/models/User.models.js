const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please Enter Department!"]
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);