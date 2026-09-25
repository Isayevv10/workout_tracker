import prisma from "../config/db";

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
}
