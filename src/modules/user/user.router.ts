import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getUser);

export const UserRouter = router;
