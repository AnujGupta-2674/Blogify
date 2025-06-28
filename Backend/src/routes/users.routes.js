import express from "express";
import * as userController from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", userController.getRecommendUsers);
router.get("/friends", userController.getMyFriends);

router.post("/friend-request/:id", userController.sendFriendRequest);

router.get("/friend-requests", userController.getFriendRequests);

router.put("/friend-request/:id/accept", userController.acceptFriendRequest);

router.get("/outgoing-friend-request", userController.getOutgoingFriendReqs);

export default router;