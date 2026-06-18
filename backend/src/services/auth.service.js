const User = require('../models/user.model')
const AppError = require('../utils/errors');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');
const bcrypt = require('bcrypt');

const loginUserService = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError('Invalid Credentials', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Invalid credentials', 401);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
};

module.exports = {loginUserService};