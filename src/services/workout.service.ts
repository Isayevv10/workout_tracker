import prisma from "../config/db";
import { deleteWorkout } from "../controllers/workout.controller";

export class WorkoutService {
  async createWorkout(userId: number, title: string, notes: string) {
    const workout = await prisma.workout.create({
      data: {
        userId,
        title,
        notes,
      },
    });

    return workout;
  }

  async getUserWorkouts(userId: number) {
    const user_workouts = await prisma.workout.findMany({
      where: { userId },

      include: {
        workoutExercises: {
          include: {
            exercise: true,
            sets: true,
          },
        },
      },

      orderBy: { date: "desc" },
    });

    return user_workouts;
  }

  async deleteWorkout(userId: number, workoutId: string) {
    const existingWorkout = await prisma.workout.findFirst({
      where: {
        userId: userId,
        id: Number(workoutId),
      },
    });

    if (!existingWorkout) {
      const error: any = new Error(
        "Məşq tapılmadı və ya silməyə icazəniz yoxdur",
      );
      error.statusCode = 404;
      throw error;
    }

    await prisma.workout.delete({
      where: { id: Number(workoutId) },
    });

    return true;
  }
}
