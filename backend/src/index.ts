import express, { Router } from "express";
import usersRouter from "./routes/users.routes";
const app = express();
const port = 3000;
const router = Router();

router.use("/users", usersRouter);

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
