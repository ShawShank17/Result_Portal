import mongoose from "mongoose";

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
        type: String, 
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {timestamps: true});

export const Student = mongoose.model("Student", StudentSchema);