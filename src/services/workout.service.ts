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

  async updateWorkout(
    userId: number,
    workoutId: string,
    data: { title: string; notes: string },
  ) {
    // 1. Məşqin bu istifadəçiyə aid olub-olmadığını yoxlayırıq (IDOR qoruması)
    const existingWorkout = await prisma.workout.findFirst({
      where: {
        userId: userId,
        id: Number(workoutId),
      },
    });

    if (!existingWorkout) {
      const error: any = new Error(
        "Məşq tapılmadı və ya yeniləməyə icazəniz yoxdur",
      );
      error.statusCode = 404;
      throw error;
    }

    const updatedWorkout = await prisma.workout.update({
      where: { id: Number(workoutId) },
      data: {
        title: data.title,
        ...(data.notes != undefined && { notes: data.notes }),
      },
    });

    return updatedWorkout;
  }
}
