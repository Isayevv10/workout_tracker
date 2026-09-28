import express from "express";
import * as exerciseController from "../controllers/exercise.controller";

const router = express.Router();

router.get("/", exerciseController.getExercise);
router.post("/create", exerciseController.createExercise);
router.delete("/delete", exerciseController.deleteExercise);

export default router;
