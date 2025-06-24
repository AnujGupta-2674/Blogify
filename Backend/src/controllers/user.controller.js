import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";

export const getRecommendUsers = async (req, res) => {
    try {
        const currentUser = req.user;
        const currentUserId = req.user._id;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, //exclude current user
                { _id: { $nin: currentUser.friends } }, //exclude current user's friends
                { isOnboarded: true } //only include users who are onboarded
            ]
        });

        res.status(200).json(recommendedUsers);

    } catch (error) {
        console.error("Error fetching recommended users:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMyFriends = async (req, res) => {
    try {
        const userFriends = await User.findById(req.user._id).populate("friends", "-password -__v -createdAt -updatedAt");

        res.status(200).json(userFriends);

    } catch (error) {
        console.error("Error fetching friends:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendFriendRequest = async (req, res) => {
    const currentUserId = req.user._id;
    const { id: recipientId } = req.params;
    try {
        //Check if the sender and recipient are not the same user
        if (currentUserId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself." });
        }

        //Check if the recipient user exists
        const recipientUser = await User.findById(recipientId);
        if (!recipientUser) {
            return res.status(404).json({ message: "Recipient user not found." });
        }

        //Check if the recipient and user are already friends
        if (recipientUser.friends.includes(currentUserId)) {
            return res.status(400).json({ message: "You are already friends with this user." });
        }

        //Check if the existing friend request exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: currentUserId, recipient: recipientId },
                { sender: recipientId, recipient: currentUserId }
            ]
        });
        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already exists." });
        }

        //After all this check passed create a new friend request
        const newFriendRequest = new FriendRequest({
            sender: currentUserId,
            recipient: recipientId,
        });
        await newFriendRequest.save();

        res.status(201).json({
            newFriendRequest
        });

    } catch (error) {
        console.error("Error sending friend request:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getFriendRequests = async (req, res) => {
    try {
        const incomingReqs = await FriendRequest.find({ recipient: req.user._id, status: 'pending' }).populate('sender', '-password -__v -createdAt -updatedAt');

        const acceptedReqs = await FriendRequest.find({ sender: req.user._id, status: 'accepted' }).populate('recipient', '-password -__v -createdAt -updatedAt');

        res.status(200).json({ incomingReqs, acceptedReqs });
    } catch (error) {
        console.error("Error fetching friend requests:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const acceptFriendRequest = async (req, res) => {
    const { id: requestId } = req.params;
    try {
        //Check if friend request exists
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found." });
        }

        //Check khi jisse request bheji gayi he vohi logged in user he
        if (friendRequest.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request." });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //Add each user to each others users array
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({ message: "Friend request accepted" });

    } catch (error) {
        console.error("Error accepting friend request:", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

export const getOutgoingFriendReqs = async (req, res) => {
    try {
        const outgoingReqs = await FriendRequest.find({ sender: req.user._id, status: 'pending' }).populate('recipient', "fullName profilePic");

        res.status(200).json(outgoingReqs);

    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}