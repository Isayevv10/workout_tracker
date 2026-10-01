import express from "express";
import * as workoutExerciseController from "../controllers/workout_exercise.controller";

const router = express.Router();

router.post(
  "/:workoutId/exercises",
  workoutExerciseController.addExerciseToWorkout,
);

export default router;
