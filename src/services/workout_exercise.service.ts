import prisma from "../config/db";

export class WorkoutExerciseService {
  async addExerciseToWorkout(
    workoutId: number,
    userId: number | undefined,
    data: {
      exerciseId: number;
      order_index?: number;
      sets: {
        set_number: number;
        weight: number;
        reps: number;
        duration_seconds?: number;
      }[];
    },
  ) {
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,

        userId: userId,
      },
    }); // bu meshq bu userId-li istifadechiye aid oldugunu bilmek lazimdir

    console.log(workout);

    if (!workout) {
      throw new Error("Məşq tapılmadı və ya bu əməliyyata icazəniz yoxdur");
    }

    const workoutExercise = await prisma.workoutExercise.create({
      data: {
        workoutId: workoutId,
        exerciseId: data.exerciseId,
        order_index: data.order_index || 0,
        sets: {
          create: data.sets,
        },

        // sets: {
        //   create: data.sets.map((set) => ({
        //     set_number: set.set_number,
        //     weight: set.weight,
        //     reps: set.reps,
        //     duration_seconds: set.duration_seconds || 0,
        //   })),
        // },
      },
    });

    return workoutExercise;
  }
}
