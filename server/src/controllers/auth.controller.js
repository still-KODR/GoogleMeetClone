import { verifyGoogleToken } from "../services/auth.service.js";

export const googleLoginController = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Google token is required" });
    }

    const { user, token } = await verifyGoogleToken(credential);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      user,
    });
    // throw new Error("Testing Error Middleware");
  } catch (error) {
    next(error);
  }
};

export const meController = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
