import express from "express";
import * as exerciseController from "../controllers/exercise.controller";

const router = express.Router();

router.post("/create", exerciseController.createExercise);
router.get("/getExercises", exerciseController.getExercise);

export default router;
