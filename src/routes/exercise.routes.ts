/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Məşq hərəkətlərinin idarə olunması
 */

/**
 * @swagger
 * /api/exercise/getExercises:
 *   get:
 *     summary: Mövcud hərəkətlərin siyahısını gətirir
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Hərəkətlərin siyahısı uğurla qaytarıldı
 *       401:
 *         description: Avtorizasiya xətası
 */

/**
 * @swagger
 * /api/exercise/create:
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
 *       401:
 *         description: Avtorizasiya xətası
 */
import express from "express";
import * as exerciseController from "../controllers/exercise.controller";

const router = express.Router();

router.post("/create", exerciseController.createExercise);
router.get("/getExercises", exerciseController.getExercise);

export default router;
