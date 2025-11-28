import { Router } from "express";
import messageController from "../controllers/message-controller";

const router = Router();

router.get("/", messageController.getMessages);

export default router;
