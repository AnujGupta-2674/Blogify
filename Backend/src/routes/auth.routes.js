import express from "express";
import * as authController from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

//Protected Routes
router.get("/me", authMiddleware, authController.getUser);
router.post("/onboarding", authMiddleware, authController.onboarding);

export default router;