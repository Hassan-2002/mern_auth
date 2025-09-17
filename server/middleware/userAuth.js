import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, please log in again' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        const userId = decoded.id; 
        console.log(userId)
        req.userId = userId;
        if (userId) {
            req.userId = userId;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
        }
    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ success: false, message: 'Token verification failed' });
    }
};

export default userAuth;