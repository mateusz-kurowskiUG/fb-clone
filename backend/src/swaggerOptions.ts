export const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "proj1",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html"
      },
      contact: {
        name: "MKurowski",
        url: "https://mkurowski.com",
      }
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.ts"]
};
