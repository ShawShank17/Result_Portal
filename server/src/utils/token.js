import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, ACCESS_SECRET, {expiresIn: '15m'});
};

export const generateRefreshToken = (user) => {
    return jwt.sign({id: user._id}, REFRESH_SECRET, {expiredIn: '7d'});
};
