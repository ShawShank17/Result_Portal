import express from 'express';
import {
    registerUser,
    loginUser,
    logOutUser
} from '../controllers/userController.js'
import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js';
//import { generateAccessToken } from '../utils/token.js';
import { refreshAccessToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logOutUser);
router.post('/refresh-token', refreshAccessToken);

export default router;