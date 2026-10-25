import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  workoutRouter,
  authRouter,
  exerciseRouter,
  workout_exercise,
} from "./routes";
import { verifyToken } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { apiLimiter, authLimiter } from "./middlewares/rateLimiter";

dotenv.config();

const app: Application = express();

app.set("trust proxy", 1);

// 1. Ümumi bütün /api sorğularına limit tətbiq edirik
app.use("/api", apiLimiter);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/workouts", verifyToken, workoutRouter);
app.use("/api/exercise", verifyToken, exerciseRouter);
app.use("/api/workoutExercise", verifyToken, workout_exercise);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

export default app;
