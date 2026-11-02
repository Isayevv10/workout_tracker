import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Workout Tracker API",
      version: "1.0.0",
      description:
        "Express.js, TypeScript və Prisma ilə yazılmış Fitness Tracker API sənədləşməsi",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT tokeninizi daxil edin (Məsələn: Bearer <token>)",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  // Route fayllarinin ichindeki JSI commentleri (sherhleri) oxumasi uchun yol:
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
