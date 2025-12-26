import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "https://dietsync.vercel.app",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("User joined room:", userId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
export const emitNotification = (userId, notification) => {
  if (!io) {
    console.error("Socket not initialized");
    return;
  }

  io.to(userId.toString()).emit("notification", notification);
};
export const sendNotification = (userId, notification) => {
  if (io) {
    io.to(userId).emit("notification", notification);
  }
};
