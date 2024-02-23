import swaggerJsDoc from "swagger-jsdoc";
const options: swaggerJsDoc.Options = {
  failOnErrors: true,
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0"
    },
    host: "localhost:3000",
    basePath: "/api"
  },
  apis: ["./src/routes/*.ts"]
};

const swaggerSpecs = swaggerJsDoc(options);

export default swaggerSpecs;
