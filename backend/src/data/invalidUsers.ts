import type { INewUser } from "../interfaces/NewUser.model";
import invalidCountryIdUsers from "./invalid-users-data/invalidCountry.data";
import { invalidDoB } from "./invalid-users-data/invalidDoB.data";
import invalidEmail from "./invalid-users-data/invalidEmail.data";
import {
  invalidLastName,
  invalidName
} from "./invalid-users-data/invalidNames.data";

import invalidPassword from "./invalid-users-data/invalidPassword.data";
import invalidPhoneNumberUsers from "./invalid-users-data/invalidPhoneNumber.data";

export const invalidUsers: INewUser[] = [
  ...invalidDoB,
  ...invalidEmail,
  ...invalidPassword,
  ...invalidName,
  ...invalidLastName,
  ...invalidPhoneNumberUsers,
  ...invalidCountryIdUsers
];
