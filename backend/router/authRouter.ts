import { Router } from "express";
import userController from "../controllers/user-controller";

const router = Router();

router.post("/registration", userController.registration);

router.post("/login", userController.login);

router.post("/refresh", userController.refresh);

export default router;
