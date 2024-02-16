import { Router, type Request, type Response } from "express";
import UserTable from "../db/UserTable";
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
  if (id === "" || id === undefined || id === null) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const user = await db.getUserById(id);
    if (user === null) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
usersRouter.delete("/:id", (req: Request, res: Response) => {});
usersRouter.put("/:id", (req: Request, res: Response) => {});

export default usersRouter;
