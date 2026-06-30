import { Server } from "socket.io";
import { env } from "../config/env.js";
import authenticateSocket from "./auth.socket.js";
import registerRoomEvents from "./room.socket.js";
let io;
export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
  });
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);
    registerRoomEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });
  return io;
};
export const getIO = () => io;
