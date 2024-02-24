import type { INewUser } from "../../interfaces/NewUser.model";
import { validUser } from "../validData";

const invalidPassword: INewUser[] = [
  { ...validUser, password: "abcdefg" },
  { ...validUser, password: "ABCDEFG" },
  { ...validUser, password: "123456" },
  { ...validUser, password: "@$!%*?&." },
  { ...validUser, password: "Ab1$" },
  { ...validUser, password: "Ab1pass" },
  { ...validUser, password: "abcdefg123" },
  { ...validUser, password: "abc123#" },
  { ...validUser, password: "" },
  { ...validUser, password: "              " },
  { ...validUser, password: "a".repeat(51) },
  { ...validUser, password: "abc123#" }
];
export default invalidPassword;
