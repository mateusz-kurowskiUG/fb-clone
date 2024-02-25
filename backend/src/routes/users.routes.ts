import { Router, type Request, type Response } from "express";
import UserTable from "../db/tables/UserTable";
import { checkUUID } from "../utils/usersUtils";
import * as _ from "lodash";
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

  if (!checkUUID(id)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    const user = await db.getUserById(id);
    if (user === null) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
usersRouter.delete("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!checkUUID(userId))
    return res.status(400).send({ message: "Invalid user ID", success: false });
  const deleteRes = await db.deleteUser(userId);
  if (!deleteRes.success) return res.status(400).send(deleteRes);

  return res.status(200).send(deleteRes);
});

usersRouter.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  if (!id || !body || !checkUUID(id))
    return res.status(400).send({ error: "Invalid request", result: false });
  const {
    email,
    name,
    lastName,
    dateOfBirth,
    countryId,
    phoneNumber,
    password
  } = body;
  const userParams = {
    email,
    name,
    lastName,
    dateOfBirth,
    countryId,
    phoneNumber,
    password
  };
  const filteredUserProps = _.filter(
    userParams,
    (value) => value !== undefined && value !== null && value !== ""
  );
  console.log(filteredUserProps);

  res.status(200).send({ message: "User updated", result: true });
});

export default usersRouter;
