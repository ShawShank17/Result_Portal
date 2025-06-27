import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    enrollment:{
        type: String,
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

export const Result = mongoose.model("Result", ResultSchema);