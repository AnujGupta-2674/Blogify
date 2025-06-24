import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/auth.routes.js";
import blogsRoutes from "./routes/blogs.routes.js";
import chatsRoutes from "./routes/chat.routes.js";

const app = express();
const port = process.env.PORT || 5001;

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true, // Allow credentials (cookies, authorization headers, etc.
    }
));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/chats", chatsRoutes);


//Listening
app.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
    connectToDB();
});