import { Router, type Response, type Request } from "express";
import UserTable from "../db/tables/UserTable";
import { validateUser } from "../utils/usersUtils";
import {
  RegisterMessage,
  type IRegisterResponse
} from "../interfaces/ApiResponses.model";
const db = UserTable;
const authRouter = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserSanitized:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The user's UUID
 *          email:
 *            type: string
 *            description: The user's email
 *          name:
 *            type: string
 *            description: The user's name
 *          lastName:
 *            type: string
 *            description: The user's last name
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: The date the user was created
 *      RegisterMessage:
 *       type: string
 *       enum:
 *          - User created successfully
 *          - Invalid user data
 *          - Internal server error
 *      NewUserBody:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: The user's email
 *          name:
 *            type: string
 *            description: The user's name
 *          lastName:
 *            type: string
 *            description: The user's last name
 *          password:
 *            type: string
 *            description: The user's password
 *          dateOfBirth:
 *            type: string
 *            format: date-time
 *            description: The user's date of birth
 *        required:
 *          - email
 *            - name
 *               - lastName
 *                - password
 *                - dateOfBirth
 */

/**
 * @swagger
 * tags:
 * name: Auth
 * description: The authentication API
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register a new user
 *    tags: [Auth]
 *    description: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *              $ref: '#/components/schemas/UserSanitized'
 *    responses:
 *      201:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/UserSanitized'
 *                message:
 *                  $ref: '#/components/schemas/RegisterMessage'
 *                result:
 *                  type: boolean
 *      400:
 *        description: Invalid user data
 */
authRouter.post("/register", async (req: Request, res: Response) => {
  if (req.body === undefined)
    return res.status(400).json({ error: "Invalid user data", result: false });
  const {
    email,
    name,
    password,
    lastName,
    dateOfBirth,
    countryId,
    phoneNumber
  } = req.body;
  if (typeof dateOfBirth !== "string")
    return res.status(400).json({ error: "Invalid user data", result: false });
  const dateParsed = Date.parse(dateOfBirth);

  const dateObject = new Date(dateParsed);
  const validated = validateUser({
    email,
    name,
    password,
    lastName,
    dateOfBirth: dateObject,
    countryId,
    phoneNumber
  });
  if (validated === false)
    return res.status(400).json({ error: "Invalid user data", result: false });

  const newUser = await db.createUser(validated);
  if (newUser === null)
    return res
      .status(400)
      .json({ error: "Something went wrong", result: false });
  const response: IRegisterResponse = {
    data: newUser,
    message: RegisterMessage.SUCCESS,
    result: true
  };
  return res.status(201).json(response);
});
authRouter.post("/login", (req, res) => {});

export default authRouter;
