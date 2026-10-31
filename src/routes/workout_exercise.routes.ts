/**
 * @swagger
 * tags:
 *   name: WorkoutExercises
 *   description: Məşq daxilindəki hərəkətlər və setlər (Sets & Reps)
 */

/**
 * @swagger
 * /api/workoutExercise:
 *   post:
 *     summary: Məşqə hərəkət və setlər bağlayır
 *     tags: [WorkoutExercises]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               [workoutId, exerciseId, sets]
 *             properties:
 *               workoutId:
 *                 type: integer
 *                 example: 1
 *               exerciseId:
 *                 type: integer
 *                 example: 2
 *               sets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     reps:
 *                       type: integer
 *                       example: 10
 *                     weight:
 *                       type: number
 *                       example: 80.5
 *     responses:
 *       201:
 *         description: Uğurla əlavə olundu
 *       403:
 *         description: IDOR xətası - Bu məşq sizə aid deyil
 */

import express from "express";
import * as workoutExerciseController from "../controllers/workout_exercise.controller";

const router = express.Router();

router.post(
  "/:workoutId/exercises",
  workoutExerciseController.addExerciseToWorkout,
);

export default router;
