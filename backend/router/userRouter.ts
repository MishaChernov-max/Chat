import { Router } from "express";
import userController from "../controllers/user-controller";
import { accessTokenMiddleware } from "../middleware/auth";

const router = Router();

router.patch(
  "/me",
  accessTokenMiddleware,
  userController.updateUserInformation
);

router.get("/", accessTokenMiddleware, userController.getUsers);

router.get("/user/:id", accessTokenMiddleware, userController.getUser);

router.get("/search", accessTokenMiddleware, userController.search);

export default router;
