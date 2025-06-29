import jwt from 'jsonwebtoken';
//import { generateRefreshToken, generateAccessToken } from '../utils/token';

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

//Middleware to verify token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //Expected: Bearer token
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Access denied. No Token Provided"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, ACCESS_SECRET);
        req.user = decoded; //Add user info to request
        next();
    }
    catch(err){
        res.status(403).json({message: "Invalid or expired token"});
    }
};

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ id: user._id, role: user.role }, REFRESH_SECRET, { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  await user.save();
  return refreshToken;
};

export const refreshAccessToken = async (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = (req, res, next) => {
    if(req.user?.role!=='admin'){
        return res.status(403).json({message: "Admin access required."});
    }
    next();
}