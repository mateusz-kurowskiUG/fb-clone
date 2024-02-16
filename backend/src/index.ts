import express, { Router, json } from "express";
import usersRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";

const app = express();
app.use(json());
const port = 3000;
const router = Router();
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
