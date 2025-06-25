import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token provided');
    req.user = null;
    return next();
  }
  try {
    console.log('Token:', token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;