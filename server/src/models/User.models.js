import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        //select: false
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
}

export const User = mongoose.model("User", UserSchema);