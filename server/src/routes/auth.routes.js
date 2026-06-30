import express from 'express'
import { googleLoginController, meController } from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router=express.Router()
router.post("/google",googleLoginController)
router.get("/me", authMiddleware, meController);
export default router