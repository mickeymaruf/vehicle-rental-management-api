import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User fetched successfully!",
    data: {},
  });
};

export const UserController = {
  getUser,
};
