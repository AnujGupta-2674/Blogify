import express from "express";
import * as blogsController from "../controllers/blogs.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', blogsController.getUserBlogs);
router.get('/recommend-blogs', blogsController.recommendedBlogs);

router.post("/new-blog",blogsController.createBlog);

export default router;