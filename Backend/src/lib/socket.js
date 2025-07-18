import { Server } from 'socket.io';
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "https://blogify-d0ba.onrender.com",
        credentials: true
    }
});



export function getUserSocketId(userId) {
    return userSocketMap[userId];
};

//Isme online Users ka map banayenge
const userSocketMap = {};  //{userId:socketId}


io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        delete userSocketMap[userId];
    });
});

export { io, app, server };