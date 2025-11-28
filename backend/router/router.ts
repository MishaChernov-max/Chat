import { Router } from "express";
import chatRouter from "./chatRouter";
import messageRouter from "./messageRouter";
import userRouter from "./userRouter";
import authRouter from "./authRouter";

const router = Router();

router.use("/chats", chatRouter);

router.use("/messages", messageRouter);

router.use("/users", userRouter);

router.use("/auth", authRouter);

export default router;
