import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    try {
      const decoded = jwt.verify(
        token as string,
        config.JWT_SECRET!
      ) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unauthorized access",
      });
    }
  };
};

export default auth;
