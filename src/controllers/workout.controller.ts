import express from "express";
import { WorkoutService } from "../services/workout.service";
import { AuthRequest } from "../types/auth.types";

const workoutService = new WorkoutService();

export const createWorkout = async (
  req: AuthRequest,
  res: express.Response,
) => {
  const userId = req.user?.id;
  const { title, notes } = req.body;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Məşq başlığı (title) vacibdir" });
  }

  const workout = await workoutService.createWorkout(userId, title, notes);

  return res.status(201).json({
    success: true,
    message: "Məşq uğurla yaradıldı",
    workout,
  });
};

export const getWorkouts = async (req: AuthRequest, res: express.Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const all_workouts = await workoutService.getUserWorkouts(userId);

  return res.status(200).json({
    success: "true",
    data: all_workouts,
  });
};
