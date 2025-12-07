import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getUsers);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

export const UserRouter = router;
