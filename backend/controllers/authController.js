const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const User = require("../models/User")
const ApiError = require("../utils/ApiError")
const asyncHandler = require("../middleware/asyncHandler")

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const generateAccessToken = (userId, tokenVersion) => {
  return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  })
}

const generateRefreshToken = (userId, tokenVersion) => {
  return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  })
}

const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge,
})

const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body

  if (!credential) {
    throw new ApiError(400, "Google credential is required")
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()
  const { sub: googleId, name, email, picture } = payload

  let user = await User.findOne({ googleId })

  if (!user) {
    user = await User.create({ googleId, name, email, picture })
  } else {
    user.name = name
    user.picture = picture
    await user.save()
  }

  const accessToken = generateAccessToken(user._id, user.tokenVersion)
  const refreshToken = generateRefreshToken(user._id, user.tokenVersion)

  user.refreshToken = refreshToken
  await user.save()

  res.cookie("accessToken", accessToken, cookieOptions(15 * 60 * 1000))
  res.cookie("refreshToken", refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000))

  res.json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    },
  })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken

  if (!token) {
    throw new ApiError(401, "Refresh token not found")
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
  const user = await User.findById(decoded.id)

  if (!user || user.refreshToken !== token) {
    throw new ApiError(401, "Invalid refresh token")
  }

  const newAccessToken = generateAccessToken(user._id, user.tokenVersion)
  const newRefreshToken = generateRefreshToken(user._id, user.tokenVersion)

  user.refreshToken = newRefreshToken
  await user.save()

  res.cookie("accessToken", newAccessToken, cookieOptions(15 * 60 * 1000))
  res.cookie("refreshToken", newRefreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000))

  res.json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    },
  })
})

const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      picture: req.user.picture,
    },
  })
})

const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      await User.findByIdAndUpdate(decoded.id, {
        refreshToken: null,
        $inc: { tokenVersion: 1 },
      })
    } catch (err) {
      console.error("Refresh token cleanup failed:", err.message)
    }
  }

  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")

  res.json({ success: true, message: "Logged out" })
})

module.exports = { googleLogin, refreshAccessToken, getMe, logout };
