import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, 
    semester: {
        type: Number,
        required: true
    },
    subjects: [
        {
            subjectName: {type: String, required: true},
            marks: {
                type: Number, required: true
            }
        }
    ],
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