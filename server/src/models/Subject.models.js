import mongoose from "mongoose"; 

const SubjectSchema = new mongoose.Schema({
    subjectID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Subject = mongoose.model("Subject", SubjectSchema);