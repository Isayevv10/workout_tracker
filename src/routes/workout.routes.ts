/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Məşqlərin idarə olunması (CRUD)
 */

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: İstifadəçiyə məxsus bütün məşqləri gətirir
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Məşqlərin siyahısı uğurla qaytarıldı
 *       401:
 *         description: Token səhvdir və ya yoxdur
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
 *                 example: "Ayaq və kürək məşqi"
 *               notes:
 *                 type: string
 *                 example: "Çox ağır məşq idi"
 *     responses:
 *       201:
 *         description: Məşq uğurla yaradıldı
 *       401:
 *         description: Avtorizasiya xətası
 */

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: ID-ə görə xüsusi məşqi gətirir
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Məşqin ID nömrəsi
 *     responses:
 *       200:
 *         description: Məşq tapıldı
 *       403:
 *         description: IDOR qoruması - Bu məşqə baxmaq icazəniz yoxdur
 *       404:
 *         description: Məşq tapılmadı
 *   put:
 *     summary: Məşqi yeniləyir
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yenilənəcək məşqin ID nömrəsi
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
 *                 example: "Əla keçdi"
 *     responses:
 *       200:
 *         description: Məşq uğurla yeniləndi
 *       403:
 *         description: İcazə yoxdur (IDOR)
 *   delete:
 *     summary: Məşqi silir
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Silinəcək məşqin ID nömrəsi
 *     responses:
 *       200:
 *         description: Məşq uğurla silindi
 *       403:
 *         description: İcazə yoxdur (IDOR)
 */

import express from "express";
import * as workoutController from "../controllers/workout.controller";

const router = express.Router();

router.delete("/:workoutId", workoutController.deleteWorkout);
router.post("/create", workoutController.createWorkout);
router.get("/getWorkouts", workoutController.getWorkouts);
router.put("/update/:workoutId", workoutController.updateWorkout);

export default router;
