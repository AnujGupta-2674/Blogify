import User from "../models/user.model.js";
import BlackListToken from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const isBlackListed = await BlackListToken.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid" });
        }
        console.log(decoded);
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in prtectedRoute middleware", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}