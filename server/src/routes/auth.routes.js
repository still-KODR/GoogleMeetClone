import express from 'express'
import { googleLoginController, logoutController, meController } from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router=express.Router()
router.post("/google",googleLoginController)
router.post("/logout", logoutController);
router.get("/me", authMiddleware, meController);
export default router