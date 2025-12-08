import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/", auth("admin"), UserController.getUsers);
router.put("/:userId", auth("admin", "customer"), UserController.updateUser);
router.delete("/:userId", auth("admin"), UserController.deleteUser);

export const UserRouter = router;
