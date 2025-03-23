import { Server } from "socket.io";
import handleChatSocket from "./chat.socket.js";

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
  });
  io.on("connection", (socket) => {
    console.log(`id:${socket.id}`);

    handleChatSocket(io,socket)
  });
};

export default initSocket;
