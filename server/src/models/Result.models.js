const mongoose = require('mongoose');

const ResultSchema = new mongoose.schema({
    enrollment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, 
    name: {
        type: String,
        required: true
    }, 
    department: {
        type: String,
        required: true
    },
    sgpa: {
        type: Number,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    result: {
        type: 'String',
        required: true
    }
}, {timestamps: true});

module.exports = new mongoose.model("Result", ResultSchema);