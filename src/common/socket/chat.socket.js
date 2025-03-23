import prisma from "../prisma/init.prisma.js";


const handleChatSocket = (io,socket) => {
    socket.on("join-room", (data) => {
        console.log({ data });
  
        const { user_id_sender, user_id_recipient } = data;
  
        // tạo room id : sắp xếp 2 id lại với nhau
        const roomId = [user_id_sender, user_id_recipient]
          .sort((a, b) => a - b)
          .join("_");
  
        // đảm bảo thoát hết room khi join room mới
        socket.rooms.forEach((roomId) => {
          socket.leave(roomId);
        });
        socket.join(roomId);
      });
  
      socket.on("send-message", async (data) => {
        console.log({ data });
  
        const { message, user_id_sender, user_id_recipient } = data;
  
        const roomId = [user_id_sender, user_id_recipient]
          .sort((a, b) => a - b)
          .join("_");
        io.to(roomId).emit("receive-message", data);
  
        await prisma.chats.create({
          data: {
            message: message,
            user_id_sender: user_id_sender,
            user_id_recipient: user_id_recipient,
          },
        });
      });
  
      // nên lấy danh sách khởi tạo tin nhắn ban đầu bằng api
      // không nên dùng socket như phía dưới
      socket.on("get-list-message", async (data) => {
        console.log({ data });
  
        const { user_id_sender, user_id_recipient } = data;
  
        const chats = await prisma.chats.findMany({
          where: {
            OR: [
              {
                user_id_sender: user_id_sender,
                user_id_recipient: user_id_recipient,
              },
              {
                user_id_sender: user_id_recipient,
                user_id_recipient: user_id_sender,
              },
            ],
          },
        });
  
        socket.emit("get-list-message", chats);
      });
}

export default handleChatSocket
