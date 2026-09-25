import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth.types";

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      auth: false,
      message: "Authentication token requestde gelmeyib",
    });
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET!;

  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      id: number;
      email: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Yanlış və ya vaxtı bitmiş token",
    });
  }
};
