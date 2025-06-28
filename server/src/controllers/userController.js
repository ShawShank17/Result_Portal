import { User } from "../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "tempsecret";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admn@123";

export const registerUser = async (req, res) => {
    try{
        const {name, email, password, role, adminKey} = req.body;

        //Check for existing user
        const existing = await User.findOne({email});
        if(existing){
            res.status(400).json({message: "Email already exists"});
        }

        //By default, role is student
        let userRole = 'student';
        if(role==='admin'){
            if(admin!==ADMIN_SECRET){
                return res.status(403).json({message: "Unauthorized to register as admin"});
            }
            userRole = 'admin';
        }
        const user = new User({name, email, password, role: userRole});
        await user.save();

        res.status(201).json({message: "User registered successfully", role: user.role});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

//Login
export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({userId: user.id, role: user.role}, JWT_SECRET, {expiresIn: '1d'});
        res.status(201).json({message: "Logged in successfully", token});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}