import { create } from "zustand"
import { io } from "socket.io-client"

export const useSocketStore = create((set, get) => ({
    socket: null,
    onlineUsers: [],

    connectToSocket: async (authUser) => {
        if (!authUser || get().socket?.connected) return;

        const socket = io({
            query: {
                userId: authUser._id
            },
            withCredentials: true
        });

        socket.connect();

        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: async () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null });
        }
    }

}));