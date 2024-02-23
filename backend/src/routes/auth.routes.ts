import { Router, type Response, type Request } from "express";
import UserTable from "../db/UserTable";
import { validateUser } from "../utils/usersUtils";
import {
  RegisterMessage,
  type IRegisterResponse
} from "../interfaces/ApiResponses.model";
const db = UserTable;
const authRouter = Router();
 /** 
  * @openapi
  * /register:
  * summary: Register a new user
  * description: Register a new user
  *   post:
  *     description: User register
  *     responses:
  *       200:
  *       description: Returns sanitized new user
  *       400:
  *       description: Returns error
  */
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
  const response: IRegisterResponse = {
    data: newUser,
    message: RegisterMessage.SUCCESS,
    result: true
  };
  return res.status(201).json(response);
});
authRouter.post("/login", (req, res) => {});

export default authRouter;
