import { create } from "zustand"
import { useSocketStore } from "./useSocketStore.jsx";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    messages: [],

    getMessages: async (userId) => {
        try {
            const res = await axiosInstance.get(`/chats/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    sendMessage: async (messageData) => {
        const { messages } = get()
        try {
            const res = await axiosInstance.post(`/chats/send/${messageData.selectedUserId}`, messageData);
            set({ messages: [...messages, res.data] })

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: (selectedUserId) => {
        const socket = useSocketStore.getState().socket;
        if (!socket) return;


        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUserId;
            console.log("Socket Message:", newMessage);
            if (!isMessageSentFromSelectedUser) return;

            set({ messages: [...get().messages, newMessage] });
        });
    },


    unsubscribeFromMessages: () => {
        const socket = useSocketStore.getState().socket;
        socket.off("newMessage");
    },

}))