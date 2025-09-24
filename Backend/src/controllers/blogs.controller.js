import Blog from "../models/blogs.model.js";
import { generateBlogWithGenAI } from "../server.js";

export const getUserBlogs = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const currentUserBlogs = await Blog.find({ author: loggedInUserId });

        return res.status(200).json({
            success: true,
            count: currentUserBlogs.length,
            blogs: currentUserBlogs,
        });

    } catch (error) {
        console.error("Error fetching user blogs:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching blogs.",
        });
    }
}

export const recommendedBlogs = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        const recommendedBlogs = await Blog.find({ author: { $ne: currentUserId } }).populate("author", "fullName email profilePic");

        res.status(200).json({
            success: true,
            blogs: recommendedBlogs
        });

    } catch (error) {
        console.error("Error fetching recommended blogs:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch recommended blogs."
        });
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        if (!title || !content || !tags || !Array.isArray(tags)) {
            return res.status(400).json({
                success: false,
                message: "Title, content, and tags are required. Tags must be an array."
            });
        }

        const newBlog = new Blog({
            title,
            content,
            tags,
            author: req.user._id
        });
        await newBlog.save();

        return res.status(201).json({
            success: true,
            message: "Blog created successfully.",
            blog: newBlog
        });

    } catch (error) {
        console.error("Error creating blog:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the blog."
        });
    }
};

export const generateBlogWithGemini = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required to generate blog."
            });
        }

        const prompt = `Write a detailed blog post on the topic: "${title}".The blog should not be more than 75 words`;
        const response = await generateBlogWithGenAI(prompt);
        return res.status(200).json({
            success: true,
            genAIContent: response
        });

    } catch (error) {
        console.error("Error creating blog:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while generating the blog."
        });
    }
}


