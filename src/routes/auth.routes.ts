/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: İstifadəçi qeydiyyatı və autentifikasiya idarəetməsi
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *   summary: Yeni istifadəçi qeydiyyatdan keçirir
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             [email, password, name]
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: "123456"
 *             name:
 *               type: string
 *               example: "Elvin Məmmədov"
 *   responses:
 *     201:
 *       description: İstifadəçi uğurla yaradıldı
 *     400:
 *       description: Yanlış məlumatlar və ya e-poçt artıq mövcuddur
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *   summary: Sistemə daxil olmaq üçün JWT token əldə edir
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             [email, password]
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: "123456"
 *   responses:
 *     200:
 *       description: Uğurlu giriş, JWT token qaytarılır
 *     401:
 *       description: Yanlış e-poçt və ya şifrə
 */

import express from "express";
import * as authController from "../controllers/register.controller";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
