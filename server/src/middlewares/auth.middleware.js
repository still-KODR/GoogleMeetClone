import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;
