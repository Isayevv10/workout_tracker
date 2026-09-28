import prisma from "../config/db";

export class ExerciseService {
  async createExercise(
    name: string,
    muscle_group: string,
    category: string,
    desc?: string,
  ) {
    const normalizeName = (name: string) => {
      return name.toLowerCase().replace(/[-\s]/g, "");
    };

    const existingExercise = await prisma.exercise.findFirst({
      where: {
        name: {
          equals: normalizeName(name),
        },
      },
    });

    if (existingExercise) {
      throw new Error("Bu adda hərəkət artıq mövcuddur");
    }

    const create_exercise = await prisma.exercise.create({
      data: {
        name: normalizeName(name),
        muscle_group,
        category,
        description: desc,
      },
    });

    return create_exercise;
  }

  async getExercises(muscleGroup?: string) {
    const exercises = await prisma.exercise.findMany({
      where: muscleGroup ? { muscle_group: muscleGroup } : undefined,
      orderBy: { id: "asc" },
    });

    return exercises;
  }
}
