import { Router } from "express";
import userController from "../controllers/user-controller";
import mongoose from "mongoose";

const DB_URL =
  "mongodb+srv://root:12345@cluster0.yop9qjf.mongodb.net/chat_db?retryWrites=true&w=majority";

const router = Router();

router.post("/registration", userController.registration);

router.get("/activate/:link", userController.activate);

router.get("/users", userController.getUsers);

router.get("/user/:id", userController.getUser);

router.get("/search", userController.search);

router.post("/login", userController.login);

router.patch("/userData", userController.setUserName);

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
