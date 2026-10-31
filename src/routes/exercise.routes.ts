/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Məşq hərəkətlərinin (Exercise) idarə olunması
 */

/**
 * @swagger
 * /api/exercise:
 *   get:
 *     summary: Mövcud hərəkətlərin siyahısını gətirir
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Hərəkətlərin siyahısı
 *   post:
 *     summary: Yeni hərəkət əlavə edir
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bench Press"
 *               description:
 *                 type: string
 *                 example: "Sinə əzələləri üçün əsas hərəkət"
 *     responses:
 *       201:
 *         description: Hərəkət uğurla yaradıldı
 */

import express from "express";
import * as exerciseController from "../controllers/exercise.controller";

const router = express.Router();

router.post("/create", exerciseController.createExercise);
router.get("/getExercises", exerciseController.getExercise);

export default router;
