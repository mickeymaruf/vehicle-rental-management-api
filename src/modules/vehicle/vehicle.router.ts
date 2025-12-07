import { Router } from "express";
import { VehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", VehicleController.createVehicle);
router.get("/", VehicleController.getAllVehicle);
router.get("/:vehicleId", VehicleController.getVehicle);
router.put("/:vehicleId", VehicleController.updateVehicle);
router.delete("/:vehicleId", VehicleController.deleteVehicle);

export const VehicleRouter = router;
