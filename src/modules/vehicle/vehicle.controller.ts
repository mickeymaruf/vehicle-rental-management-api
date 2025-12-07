import { Request, Response } from "express";
import { VehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehicleServices.createVehicle(req.body);

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "Failed while creating vehicle",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle created successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehicleServices.getAllVehicle();

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "Failed while retrieving vehicles",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehicleServices.getVehicle(req.params.vehicleId!);

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "Failed while retrieving Vehicle",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehicleServices.updateVehicle(
      req.params.vehicleId!,
      req.body
    );

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "Vehicle not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await VehicleServices.deleteVehicle(req.params.vehicleId!);

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "Failed while deleting vehicle",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const VehicleController = {
  createVehicle,
  getAllVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
