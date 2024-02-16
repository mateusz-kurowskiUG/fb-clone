import { Router, type Request, type Response } from "express";
import UserTable from "../db/UserTable";
import { checkUUID } from "../utils/usersUtils";

const usersRouter = Router();
const db = UserTable;
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (checkUUID(id) === false)
    return res.status(400).json({ error: "Invalid user ID" });

  try {
    const user = await db.getUserById(id);
    if (user === null) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});
usersRouter.delete("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);

  if (checkUUID(userId) === false)
    return res.status(400).send({ error: "Invalid user ID" });

  const deleteRes = await db.deleteUser(userId);
  if (!deleteRes) return res.status(400).send({ error: "User does not exist" });

  return res.status(200).send({ success: "User deleted" });
});

usersRouter.put("/:id", (req: Request, res: Response) => {});

export default usersRouter;
