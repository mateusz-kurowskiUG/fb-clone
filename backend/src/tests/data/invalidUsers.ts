import type { INewUser } from "../../interfaces/NewUser.model";
import { invalidDoB } from "./invalid-users-data/invalidDoB.data";
import invalidEmail from "./invalid-users-data/invalidEmail.data";
import {
  invalidLastName,
  invalidName
} from "./invalid-users-data/invalidNames.data";

import invalidPassword from "./invalid-users-data/invalidPassword.data";

export const invalidUsers: INewUser[] = [
  ...invalidDoB,
  ...invalidEmail,
  ...invalidPassword,
  ...invalidName,
  ...invalidLastName
];
