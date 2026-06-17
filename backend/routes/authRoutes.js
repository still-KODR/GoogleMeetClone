const express = require("express")
const { googleLogin, refreshAccessToken, getMe, logout } = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/google", googleLogin)
router.post("/refresh", refreshAccessToken)
router.get("/me", protect, getMe)
router.post("/logout", logout)

module.exports = router;
