import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import * as chatController from "../controllers/chats.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:id", chatController.getMessages);

router.post("/send/:id", chatController.sendMessage);

export default router;