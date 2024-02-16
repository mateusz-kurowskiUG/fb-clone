import { Router, type Response, type Request } from "express";
import UserTable from "../db/UserTable";
import { validateUser } from "../utils/usersUtils";
const db = UserTable;
const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  if (req.body === undefined)
    return res.status(400).json({ error: "Invalid user data" });
  const { email, name, password, lastName, dateOfBirth } = req.body;
  const dateParsed = Date.parse(dateOfBirth);
  const dateObject = new Date(dateParsed);
  const validated = validateUser({
    email,
    name,
    password,
    lastName,
    dateOfBirth: dateObject
  });
  if (validated === false)
    return res.status(400).json({ error: "Invalid user data" });

  const newUser = await db.createUser(validated);
  if (newUser === null)
    return res.status(400).json({ error: "Internal server error" });

  return res.status(201).json(newUser);
});
authRouter.post("/login", (req, res) => {});

export default authRouter;
