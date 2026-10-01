import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server xətası baş verdi";

  // Prisma xətası olduqda
  if (err.code === "P2002") {
    statusCode = 400;
    message = "Bu melumat bazada artiq movcuddur";
  }

  console.error("Error:", err);

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
