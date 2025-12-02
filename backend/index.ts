import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import router from "./router/router";
import cors from "cors";
import messageController from "./controllers/message-controller";
import { onlineUsers } from "./users";
import tokenService from "./service/token-service";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

const FRONTEND_URL = process.env.FRONTENDPORT || "http://localhost:5173";

const FRONTEND_URL_PREVIEW =
  process.env.FRONTENDPORT_PREVIEW || "http://localhost:4173";

app.use(
  cors({
    origin: [FRONTEND_URL, FRONTEND_URL_PREVIEW],
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

const DB_URL =
  "mongodb+srv://root:12345@cluster0.yop9qjf.mongodb.net/chat_db?retryWrites=true&w=majority";
app.use(cookieParser());
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

io.on("connection", async (socket: Socket) => {
  console.log("connection", socket.id);
  const userId = socket.handshake.auth.userId;
  const token = socket.handshake.auth.token;
  const payload = await tokenService.verifyAccessToken(token);
  console.log("payload", payload);
  socket.join(userId);
  console.log(token);
  if (!token) {
    socket.emit("token-error", { invalidToken: token });
  }

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
    participants.forEach((participant) => {
      io.to(participant.toString()).emit("new-message", message);
    });
  });
});

const start = async () => {
  try {
    console.log(process.env.DB_URL, "db_url");
    await mongoose.connect(DB_URL || "mongodb://localhost:27017/auth-app");
  } catch (e) {
    if (e instanceof Error) {
      console.error(" MongoDB connection FAILED:", e.message);
    }
    console.error("Full error:", e);
  }
};

start();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
