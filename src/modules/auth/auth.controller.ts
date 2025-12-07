import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.createUser(req.body);

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "User registration failed",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User registered successfully",
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

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await AuthServices.loginUser(email, password);

    if (!result) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const AuthController = {
  createUser,
  loginUser,
};
