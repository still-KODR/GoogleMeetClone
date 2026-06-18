const express = require("express");
const passport = require("passport");
const { protect } = require("../middlewares/auth.middleware");

const { validateLogin } = require("../middlewares/validators/auth.validator");
const { loginController, googleCallbackController, refreshTokenController, logoutController, getMeController } = require("../controllers/auth.controller");

const router = express.Router();

// Routes
router.post('/login', validateLogin, loginController);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed` }),
  googleCallbackController
);

router.post('/refresh', refreshTokenController);
router.post('/logout', logoutController);
router.get('/me', protect, getMeController);

module.exports = router;
