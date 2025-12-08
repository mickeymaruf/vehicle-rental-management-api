import { Router } from "express";
import { VehicleController } from "./vehicle.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth("admin"), VehicleController.createVehicle);
router.get("/", VehicleController.getAllVehicle);
router.get("/:vehicleId", VehicleController.getVehicle);
router.put("/:vehicleId", auth("admin"), VehicleController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), VehicleController.deleteVehicle);

export const VehicleRouter = router;
