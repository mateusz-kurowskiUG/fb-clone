import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
  const { email, name, password, lastName } = req.body;
  const validated = validateUser({ email, name, password, lastName });
  if (validated === null) {
    return res.status(400).json({ error: "Invalid user data" });
  }
  const newUser = await db.createUser(validated);
  if (newUser === null) {
    return res.status(500).json({ error: "Internal server error" });
  }
  return res.status(201).json(newUser);
});
authRouter.post("/login", (req, res) => {});

export default authRouter;
