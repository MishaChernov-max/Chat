import express, { NextFunction } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import router from "./router/router";
import cors from "cors";
import messageController from "./controllers/message-controller";
import { onlineUsers } from "./users";
import tokenService from "./service/token-service";
import groupModel from "./models/group-model";
import chatService from "./service/chat-service";
import chatController from "./controllers/chat-controller";
import { ObjectId } from "mongoose";

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

app.use(express.json());
app.use("/api", router);

io.use(async (socket: Socket, next) => {
  try {
    const accessToken = socket.handshake.auth.token;
    const decoded = await tokenService.verifyAccessToken(accessToken);
    console.log("decoded", decoded);
    next();
  } catch (e) {
    socket.emit("token-error", { invalidToken: socket.handshake.auth.token });
  }
});

const userSocket: Record<string, string> = {};

io.on("connection", async (socket) => {
  console.log("connection", socket.id);
  const userId = socket.handshake.auth.userId;
  const token = socket.handshake.auth.token;
  const payload = await tokenService.verifyAccessToken(token);
  console.log("payload", payload);
  // userSocket[payload._id] = socket.id;
  socket.join(userId);
  console.log(token);
  if (!token) {
    socket.emit("token-error", { invalidToken: token });
  }
  socket.on("register", (userId) => {
    // Здесь должна быть ваша логика аутентификации (например, проверка JWT)
    console.log(`Регистрируем пользователя ${userId} для сокета ${socket.id}`);
    userSocket[userId] = socket.id;
  });

  socket.broadcast.emit("new-user-online", userId);
  socket.emit("get-users-online", onlineUsers);
  socket.on("disconnect", () => {
    const index = onlineUsers.indexOf(userId);
    if (index > -1) {
      onlineUsers.splice(userId, 1);
    }
    io.emit("disconnect-user", userId);
  });

  socket.on("message", async (messagePayload) => {
    const message = await messageController.createMessage(messagePayload);
    const participants = message.chat.participants;
    console.log("participants", participants);
    console.log("Получилось такое сообщение для отправки клиенту", message);
    console.log("userSocket", userSocket);

    participants.forEach((participant) => {
      console.log("participant", participant);
      socket
        .to(userSocket[participant.toString()])
        .emit("new-message", message);
    });
  });

  // socket.on("get-history", async (roomId) => {
  //   messageController.getHistory(socket, roomId);
  // });

  // socket?.on("join-room", (roomId) => {
  //   socket.join(roomId);
  // });

  // socket.on("typing-start:direct", ({ roomId, userId }) => {
  //   const participiants = roomId.split("_");
  //   const receivedId = participiants.find((p: string) => p !== userId);
  //   socket.to(receivedId).emit("user-typing:direct", { userId });
  // });

  // socket.on("typing-start:group", async ({ roomId, userId }) => {
  //   const group = await groupModel.findOne({ _id: roomId });
  //   if (group) {
  //     console.log("ОТправляю событие печати в группу", group);
  //     group.participiants.forEach((u) => {
  //       socket
  //         .to(u._id.toString())
  //         .emit("user-typing:group", { roomId, userId });
  //     });
  //   }
  // });

  // socket.on("typing-stop:group", async ({ roomId, userId }) => {
  //   const group = await groupModel.findOne({ _id: roomId });
  //   if (group) {
  //     console.log("ОТправляю событие печати в группу", group);
  //     group.participiants.forEach((u) => {
  //       socket.to(u._id.toString()).emit("user-stop:group", { roomId, userId });
  //     });
  //   }
  // });

  // socket.on("typing-stop:direct", ({ roomId, userId }) => {
  //   const participiants = roomId.split("_");
  //   const receivedId = participiants.find((p: string) => p !== userId);
  //   socket.to(receivedId).emit("user-stop:direct", { userId });
  // });

  // socket.on("create-message", async (messagePayload) => {
  //   const message = await messageController.createMessage(messagePayload);
  //   const participants = await chatService.getParticipants(
  //     messagePayload.chatId
  //   );
  //   participants?.forEach((p) =>
  //     io.to(p.toString()).emit("new-message", message)
  //   );
  // });

  // socket.on("message-delete", async (messageId) => {
  //   const message = await messageController.deleteMessage(messageId);
  //   if (message?.chatId) {
  //     const participants = await chatService.getParticipants(
  //       message.chatId.toString()
  //     );
  //     participants?.forEach((p) =>
  //       io.to(p.toString()).emit("message-deletd", message)
  //     );
  //   }
  // });

  // socket.on("message-edit", async (messagePayload) => {
  //   const { text, messageId } = messagePayload;
  //   const message = await messageController.editMessage(messageId, text);
  //   if (message?.chatId) {
  //     const participants = await chatService.getParticipants(
  //       message.chatId.toString()
  //     );
  //     participants?.forEach((p) =>
  //       io.to(p.toString()).emit("message-edited", message)
  //     );
  //   }
  // });

  // socket.on("message-delete", async (message) => {
  //   const { roomId, messageId, type } = message;
  //   await messageController.deleMessage(io, roomId, messageId, type);
  // });

  // socket?.on("message-forward", async (message) => {
  //   await messageController.forwardMessage(io, userId, message);
  // });

  // socket?.on("edit-message", async (message) => {
  //   await messageController.editMessage(io, message);
  // });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
