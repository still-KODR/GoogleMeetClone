const jwt = require('jsonwebtoken');
const AppError = require('../utils/errors');

const protect = (req, res, next) => {
  const token = req.cookies.accessToken; // ← from cookie now

  if (!token) return next(new AppError('Not authenticated', 401));

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch {
    return next(new AppError('Token expired or invalid', 401));
  }
};

module.exports = { protect };