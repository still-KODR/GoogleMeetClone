const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ApiError = require("../utils/ApiError")
const asyncHandler = require("./asyncHandler")

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) {
    throw new ApiError(401, "Not authenticated")
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
  const user = await User.findById(decoded.id).select("-refreshToken")

  if (!user) {
    throw new ApiError(401, "User not found")
  }

  if (decoded.tokenVersion !== user.tokenVersion) {
    throw new ApiError(401, "Token has been revoked")
  }

  req.user = user
  next()
})

module.exports = protect;
