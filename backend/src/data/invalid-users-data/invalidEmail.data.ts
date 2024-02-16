import type { INewUser } from "../../../interfaces/NewUser.model";
import { validUser } from "../validData";

const invalidEmail: INewUser[] = [
  { ...validUser, email: "" },
  { ...validUser, email: "email.com" },
  { ...validUser, email: "@.com" },
  { ...validUser, email: ".com" },
  { ...validUser, email: "                      " },
  { ...validUser, email: " " },
  { ...validUser, email: ".com.com" },
  { ...validUser, email: ".comemail@" },
  { ...validUser, email: "email.2@" },
  { ...validUser, email: "mail" },
  { ...validUser, email: "email@com" }
];
export default invalidEmail;
