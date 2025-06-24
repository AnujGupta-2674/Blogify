import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages)

    } catch (error) {
        console.log(`Error in getMessages controller:${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const newMessage = new Message({
            senderId,
            receiverId,
            text
        });
        await newMessage.save();

        res.status(201).json(newMessage);

        //Realtime Functionality to be added using socket
    } catch (error) {
        console.log(`Error in sendMessage controller ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
