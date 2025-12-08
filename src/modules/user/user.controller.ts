import { Request, Response } from "express";
import { UserServices } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsers();

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "Failed while retrieving users",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.updateUser(
      req.params.userId!,
      req.body,
      req.user!
    );

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "User not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.deleteUser(req.params.userId!);

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "User not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UserController = {
  getUsers,
  updateUser,
  deleteUser,
};
