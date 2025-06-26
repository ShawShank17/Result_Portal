const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    enrollmentID: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        name: String, 
        required: [true, "Please Enter Department!"]
    },
    year: {
        type: Number,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model("Student", StudentSchema);