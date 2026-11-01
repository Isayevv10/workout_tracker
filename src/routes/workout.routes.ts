/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Məşqlərin idarə olunması
 */

/**
 * @swagger
 * /api/workouts/getWorkouts:
 *   get:
 *     summary: İstifadəçinin bütün məşqlərini gətirir
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Məşqlərin siyahısı uğurla qaytarıldı
 *       401:
 *         description: Avtorizasiya xətası
 */

/**
 * @swagger
 * /api/workouts/create:
 *   post:
 *     summary: Yeni məşq yaradır
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Ayaq məşqi"
 *               notes:
 *                 type: string
 *                 example: "Çox yaxşı keçdi"
 *     responses:
 *       201:
 *         description: Məşq uğurla yaradıldı
 *       401:
 *         description: Avtorizasiya xətası
 */

/**
 * @swagger
 * /api/workouts/update/{workoutId}:
 *   put:
 *     summary: Məşqi yeniləyir
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yenilənəcək məşqin ID-si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Sinə məşqi (Yeniləndi)"
 *               notes:
 *                 type: string
 *                 example: "Yaxşı idi"
 *     responses:
 *       200:
 *         description: Məşq uğurla yeniləndi
 *       403:
 *         description: İcazə yoxdur (IDOR)
 *       404:
 *         description: Məşq tapılmadı
 */

/**
 * @swagger
 * /api/workouts/{workoutId}:
 *   delete:
 *     summary: Məşqi silir
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Silinəcək məşqin ID-si
 *     responses:
 *       200:
 *         description: Məşq uğurla silindi
 *       403:
 *         description: İcazə yoxdur (IDOR)
 *       404:
 *         description: Məşq tapılmadı
 */

import express from "express";
import * as workoutController from "../controllers/workout.controller";

const router = express.Router();

router.delete("/:workoutId", workoutController.deleteWorkout);
router.post("/create", workoutController.createWorkout);
router.get("/getWorkouts", workoutController.getWorkouts);
router.put("/update/:workoutId", workoutController.updateWorkout);

export default router;
