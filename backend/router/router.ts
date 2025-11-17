import { Router } from "express";
import userController from "../controllers/user-controller";
import mongoose from "mongoose";
import { accessTokenMiddleware } from "../middleware/auth";
import messageController from "../controllers/message-controller";
import userChatCounterController from "../controllers/user-chat-counter-controller";
import chatController from "../controllers/chat-controller";

const DB_URL =
  "mongodb+srv://root:12345@cluster0.yop9qjf.mongodb.net/chat_db?retryWrites=true&w=majority";

const router = Router();

router.post("/registration", userController.registration);

router.get(
  "/chats/initialData",
  userChatCounterController.sendChatsInitialData
);

router.post("/chat", chatController.getChat);

router.get("/chats/:userId", chatController.getAllChats);

router.get("/chat/:id", chatController.getChatById);

router.post("/createMessage", messageController.createMessageRest);

router.get("/getMessages", messageController.getMessages);

router.get("/activate/:link", userController.activate);

router.get("/users", accessTokenMiddleware, userController.getUsers);

router.get("/user/:id", accessTokenMiddleware, userController.getUser);

router.get("/search", accessTokenMiddleware, userController.search);

router.post("/login", userController.login);

router.post("/registration", userController.registration);

router.post("/refresh", userController.refresh);

// router.post("/mark-as-read", userChatCounterController.markMessagesAsRead);

// router.post("/createGroup", accessTokenMiddleware, groupController.createGroup);

// router.patch("/addMember", accessTokenMiddleware, groupController.addMember);

// router.get("/groups", accessTokenMiddleware, groupController.getGroups);

// router.get("/group", accessTokenMiddleware, groupController.getGroup);

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

export default router;
