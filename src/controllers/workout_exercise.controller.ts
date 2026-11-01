import express from "express";
import { AuthRequest } from "../types/auth.types";
import { WorkoutExerciseService } from "../services/workout_exercise.service";

const workoutExerciseService = new WorkoutExerciseService();

export const addExerciseToWorkout = async (
  req: AuthRequest,
  res: express.Response,
) => {
  const workoutId = parseInt(String(req.params.workoutId));
  const userId = req.user?.id;
  const { exerciseId, order_index, sets } = req.body;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!exerciseId || !sets || !Array.isArray(sets) || sets.length === 0) {
    return res.status(400).json({
      message: "exeriseId ve set melumatlari daxil edilmelidir",
    });
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
};

export const deleteExerciseFromWorkout = async (
  req: AuthRequest,
  res: express.Response,
) => {
  const relationId = parseInt(String(req.params.relationId));
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!relationId) {
    return res.status(400).json({
      message: "RelationId daxil edilmelidir",
    });
  }

  await workoutExerciseService.deleteExerciseFromWorkout(relationId, userId);

  return res.status(200).json({
    success: true,
    message: "Meshqe aid etdiyiniz hereket uğurla silindi",
  });
};
