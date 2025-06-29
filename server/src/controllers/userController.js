import { User } from "../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from "../middlewares/authMiddleware.js";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "tempsecret";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admn@123";

export const registerUser = async (req, res) => {
    try{
        const {name, email, password, role, adminKey} = req.body;

        //Check for existing user
        const existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({message: "Email already exists"});
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

        return res.status(201).json({message: "User registered successfully", role: user.role});
    }
    catch(err){
        return res.status(500).json({message: err.message});
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

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7*24*60*60*1000
        });

        return res.status(201).json({message: "Logged in successfully", accessToken});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

export const logOutUser = async (req, res) => {
    try{
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(204);
        }
        const user = await User.findOne({refreshToken: token});
        if(!user){
            return res.status(204);
        }
        user.refreshToken = undefined;
        await user.save();
        res.clearCookie('refreshToken');
        res.json({message: 'Logged out successfully'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}