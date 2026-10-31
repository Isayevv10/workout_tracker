// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Workout Tracker API",
      version: "1.0.0",
      description:
        "Express.js, TypeScript və Prisma ilə yazılmış peşəkar Fitness Tracker API sənədləşməsi",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Yerli İnkişaf Serveri (Local Development)",
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
  // Route fayllarının içindəki JSI commentləri (şərhləri) oxuması üçün yol:
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
