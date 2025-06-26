const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subjectID: {
        type: String,
        required: true
    },
    enrollment: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = new mongoose.model("Subject", SubjectSchema);