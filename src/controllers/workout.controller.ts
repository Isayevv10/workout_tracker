import express from "express";
import { WorkoutService } from "../services/workout.service";
import { AuthRequest } from "../types/auth.types";

const workoutService = new WorkoutService();

export const createWorkout = async (
  req: AuthRequest,
  res: express.Response,
) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server xətası baş verdi" });
  }
};

export const getWorkouts = async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const all_workouts = await workoutService.getUserWorkouts(userId);

    return res.status(200).json({
      success: "true",
      data: all_workouts,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, message: "Server xətası baş verdi" });
  }
};
