import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/", auth(), UserController.getUsers);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

export const UserRouter = router;
