import User from "../models/user.model.js";
import BlackListToken from "../models/blacklistToken.model.js"
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already used" });
        }

        const hashedPassword = await User.hashPassword(password);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSites: "strict",
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json({ success: true, user: newUser });
    } catch (error) {
        console.error(`Error in signup route:${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email or Password is Incorrect" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email or Password is Incorrect" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSites: "strict",
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json({ success: true, user });

    } catch (error) {
        console.error(`Error in login route:${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUser = async (req, res) => {
    res.status(200).json({ success: true, user: req.user });
}

export const onboarding = async (req, res) => {
    try {
        const loggedinUserId = req.user._id;

        const { fullName, bio } = req.body;
        if (!fullName || !bio) {
            return res.status(400).json({ message: "All fields are required", missingFields: ["fullName", "bio"].filter(field => !req.body[field]) });
        }

        const updatedUser = await User.findByIdAndUpdate(loggedinUserId, {
            fullName,
            bio,
            isOnboarded: true
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, user: updatedUser });

    } catch (error) {
        console.log("Error in onboarding controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    const token = req.cookies.token;

    await BlackListToken.create({ token });

    res.clearCookie("token", {
        httpOnly: true,
        sameSites: "strict",
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ success: true, message: "Logged out Successfully" });
}