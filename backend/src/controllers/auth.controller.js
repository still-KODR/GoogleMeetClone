const { loginUserService } = require("../services/auth.service");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const AppError = require("../utils/errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUserService(email, password);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: 'Logged in' });
  } catch (err) {
    next(err);
  }
};

const googleCallbackController = async (req, res, next) => {
  try {
    const accessToken  = generateAccessToken(req.user);
    const refreshToken = generateRefreshToken(req.user);

    req.user.refreshToken = refreshToken;
    await req.user.save();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,       
      sameSite: 'Lax',
      path: '/',
      maxAge: 15 * 60 * 1000,           
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,   
    });

    res.redirect(`${process.env.CLIENT_URL}/home`);
  } catch (err) {
    next(err);
  }
};

const refreshTokenController =  async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new AppError('No refresh token', 401);

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== token) {
      throw new AppError('Invalid refresh token', 403);
    }

    const newAccessToken = generateAccessToken(user);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      await User.findOneAndUpdate(
        { refreshToken: token },
        { refreshToken: null }
      );
    }

    res.clearCookie('refreshToken', { path: '/' });
    res.clearCookie('accessToken', { path: '/' });
    res.status(200).json({ success: true, message: 'Logged out' });
  } catch (err) {
    next(err);
  }
}

const getMeController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) throw new AppError("User not found", 404);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports = { loginController, googleCallbackController, refreshTokenController, logoutController, getMeController };