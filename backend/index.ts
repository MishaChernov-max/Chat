import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import router from "./router/router";
import cors from "cors";
import chatModel from "./models/chat-model";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const onlineUsers: string[] = [];

app.use(express.json());
app.use("/api", router);

io.on("connection", async (socket) => {
  const userId = socket.handshake.auth.userId;
  onlineUsers.push(userId);
  socket.broadcast.emit("new-user-online", userId);
  socket.emit("get-users-online", onlineUsers);
  socket.on("disconnect", () => {
    const index = onlineUsers.indexOf(userId);
    if (index > -1) {
      onlineUsers.splice(userId, 1);
    }
    io.emit("disconnect-user", userId);
  });

  socket.on("get-history", async (roomId) => {
    const chat = await chatModel.findOne({ roomId: roomId });
    if (chat) {
      socket.emit("history", chat);
    } else {
      const newChat = await chatModel.create({
        roomId: roomId,
        messages: [],
      });
      socket.emit("history", newChat);
    }
  });

  socket?.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("typing-start", ({ roomId, userId }) => {
    socket.to(roomId).emit("user-typing", { userId });
  });

  socket.on("typing-stop", ({ roomId, userId }) => {
    socket.to(roomId).emit("user-stop", { userId });
  });

  socket.on("message", async (messagePayload) => {
    const { roomId, message } = messagePayload;
    const chat = await chatModel.findOne({ roomId: roomId });
    if (chat) {
      chat.messages.push(message);
      await chat.save();
      io.to(roomId).emit("new-message", chat);
      //Логика уведомления
      const messagesLength = chat.messages.length - 1;
      const userId = chat.messages[messagesLength].id;
      const notification = { roomId: roomId, to: userId };
      io.to(roomId).emit("notification", notification);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
