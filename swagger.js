import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", // ใช้ OpenAPI 3.0
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API สำหรับการจัดการผู้ใช้",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL ของ API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer", // ใช้ Bearer token
          bearerFormat: "JWT", // กำหนดให้รองรับ JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // ใช้ Bearer token สำหรับทุก API endpoint
      },
    ],
  },
  apis: ["./routes/*.js"], // เส้นทางไปยังไฟล์ route ที่มี comment Swagger
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
