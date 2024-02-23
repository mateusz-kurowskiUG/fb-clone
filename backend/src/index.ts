import express, { Router, json } from "express";
import cors from "cors";
import usersRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";
import { prisma } from "./db/prisma";
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";

prisma
  .$transaction([
    prisma.comment.deleteMany({}),
    prisma.post.deleteMany({}),
    prisma.profile.deleteMany({}),
    prisma.user.deleteMany({})
  ])
  .then(() => {
    console.log("Database cleared");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(cors());
app.use(json());
const port = 3000;
const router = Router();
const specs = swaggerJsDoc(options);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, { explorer: true }));
router.use("/users", usersRouter);
router.use("/auth", authRouter);
app.use("/api", router);
try {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (error) {
  app.listen(port + 1, () => {
    console.log(`Example app listening on port ${port + 1}`);
  });
}
