import express from "express";
import { AuthRequest } from "../types/auth.types";
import { WorkoutExerciseService } from "../services/workout_exercise.service";

const workoutExerciseService = new WorkoutExerciseService();

export const addExerciseToWorkout = async (
  req: AuthRequest,
  res: express.Response,
) => {
  try {
    const workoutId = parseInt(String(req.params.workoutId));
    const userId = req.user?.id;
    const { exerciseId, order_index, sets } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const workout_exercise = await workoutExerciseService.addExerciseToWorkout(
      workoutId,
      userId,
      { exerciseId, sets, order_index },
    );

    return res.status(201).json({
      message: "Hərəkət və setlər məşqə uğurla əlavə edildi",
      data: workout_exercise,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
