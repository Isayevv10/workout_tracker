/**
 * @swagger
 * tags:
 *   name: WorkoutExercises
 *   description: Məşqə hərəkət və setlərin əlavə olunması
 */

/**
 * @swagger
 * /api/workoutExercise/{workoutId}/exercises:
 *   post:
 *     summary: Xüsusi məşqə hərəkət və setlər əlavə edir
 *     tags: [WorkoutExercises]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hərəkətin əlavə olunacağı məşqin ID-si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               [exerciseId, sets]
 *             properties:
 *               exerciseId:
 *                 type: integer
 *                 example: 1
 *                 description: Əlavə ediləcək hərəkətin (Exercise) ID-si
 *               sets:
 *                 type: array
 *                 description: Hərəkət üçün təkrarlar və çəkilər siyahısı
 *                 items:
 *                   type: object
 *                   required:
 *                     [reps, weight]
 *                   properties:
 *                     reps:
 *                       type: integer
 *                       example: 10
 *                       description: Təkrar sayı
 *                     weight:
 *                       type: number
 *                       example: 75.5
 *                       description: Qaldırılan çəki (kq)
 *     responses:
 *       201:
 *         description: Hərəkət və setlər məşqə uğurla bağlandı
 *       400:
 *         description: Yanlış məlumat formatı
 *       403:
 *         description: İcazə xətası (IDOR - Bu məşq başqasına məxsusdur)
 *       404:
 *         description: Məşq və ya hərəkət tapılmadı
 */

import express from "express";
import * as workoutExerciseController from "../controllers/workout_exercise.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: WorkoutExercises
 *   description: Məşqə hərəkət və setlərin əlavə olunması / idarə edilməsi
 */

/**
 * @swagger
 * /api/workoutExercise/{workoutId}/exercises:
 *   post:
 *     summary: Xüsusi məşqə hərəkət və setlər əlavə edir
 *     tags: [WorkoutExercises]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hərəkətin əlavə olunacağı məşqin ID-si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exerciseId
 *               - sets
 *             properties:
 *               exerciseId:
 *                 type: integer
 *                 example: 1
 *                 description: Əlavə ediləcək hərəkətin (Exercise) ID-si
 *               order_index:
 *                 type: integer
 *                 example: 0
 *                 description: Məşq içində hərəkətin sıra nömrəsi
 *               sets:
 *                 type: array
 *                 description: Hərəkət üçün setlərin siyahısı
 *                 items:
 *                   type: object
 *                   required:
 *                     - set_number
 *                     - reps
 *                     - weight
 *                   properties:
 *                     set_number:
 *                       type: integer
 *                       example: 1
 *                       description: Setin nömrəsi (məsələn, 1, 2, 3)
 *                     reps:
 *                       type: integer
 *                       example: 10
 *                       description: Təkrar sayı
 *                     weight:
 *                       type: number
 *                       example: 75.5
 *                       description: Qaldırılan çəki (kq)
 *                     duration_seconds:
 *                       type: integer
 *                       example: 0
 *                       description: Saniyə ilə müddət (əgər varsa)
 *     responses:
 *       201:
 *         description: Hərəkət və setlər məşqə uğurla bağlandı
 *       400:
 *         description: Yanlış məlumat formatı
 *       401:
 *         description: Autentifikasiya xətası (Token yoxdur və ya etibarsızdır)
 *       403:
 *         description: İcazə xətası (Bu məşq başqasına məxsusdur)
 *       404:
 *         description: Məşq və ya hərəkət tapılmadı
 */

router.post(
  "/:workoutId/exercises",
  workoutExerciseController.addExerciseToWorkout,
);

/**
 * @swagger
 * /api/workoutExercise/{relationId}:
 *   delete:
 *     summary: Məşqə əlavə edilmiş hərəkəti (əlaqəni) silir
 *     tags: [WorkoutExercises]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: relationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Silinəcək WorkoutExercise qeydinin ID-si
 *     responses:
 *       200:
 *         description: Hərəkət məşqdən uğurla silindi
 *       400:
 *         description: Yanlış relationId formatı
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Bu əməliyyata icazəniz yoxdur (IDOR qoruması)
 *       404:
 *         description: Məşq hərəkəti tapılmadı
 */
router.delete(
  "/:relationId/exercise",
  workoutExerciseController.deleteExerciseFromWorkout,
);

export default router;
