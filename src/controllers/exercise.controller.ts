import express from "express";
import { ExerciseService } from "../services/exercise.service";

const exerciseService = new ExerciseService();

export const createExercise = async (
  req: express.Request,
  res: express.Response,
) => {
  const { name, description, muscle_group, category } = req.body;
  if (!name || !muscle_group || !category) {
    return res.status(400).json({
      success: false,
      message: "Name, muscle_group, and category yazılmalıdır",
    });
  }

  const exercise = await exerciseService.createExercise(
    name,
    muscle_group,
    category,
    description,
  );

  return res.status(201).json({
    message: "Hereket ugurla yaradıldı",
    exercise,
  });
};

export const getExercise = async (
  req: express.Request,
  res: express.Response,
) => {
  const muscleGroup = req.query.muscleGroup as string;
  const exercises = await exerciseService.getExercises(muscleGroup);

  return res.status(200).json({
    exercises,
  });
};

export const deleteExercise = async (
  req: express.Request,
  res: express.Response,
) => {};
