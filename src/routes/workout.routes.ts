import express from "express";
import * as workoutController from "../controllers/workout.controller";

const router = express.Router();

router.delete("/:workoutId", workoutController.deleteWorkout);
router.post("/create", workoutController.createWorkout);
router.get("/getWorkouts", workoutController.getWorkouts);

export default router;
