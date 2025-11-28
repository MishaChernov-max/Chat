import { Router } from "express";
import chatController from "../controllers/chat-controller";

const router = Router();

router.post("/", chatController.getChat);

router.get("/chat/:id", chatController.getChatById);

router.get("/:userId", chatController.getAllChats);

export default router;
