import type { INewUser } from "../../../interfaces/NewUser.model";
import { validUser } from "../validData";

export const invalidName: INewUser[] = [
  { ...validUser, name: "" },
  { ...validUser, name: "a".repeat(51) },
  { ...validUser, name: " " },
  { ...validUser, name: "            " },
  { ...validUser, name: "a123123213" },
  { ...validUser, name: "1234567890" },
  { ...validUser, name: "User123!" },
  { ...validUser, name: "User!" },
  { ...validUser, name: "Mateusz!" },
  { ...validUser, name: "Mateusz123" },
  { ...validUser, name: "Mateusz123!" },
  { ...validUser, name: "1234" }
];
export const invalidLastName: INewUser[] = [
  { ...validUser, lastName: "" },
  { ...validUser, lastName: "a".repeat(51) },
  { ...validUser, lastName: " " },
  { ...validUser, lastName: "            " },
  { ...validUser, lastName: "a123123213" },
  { ...validUser, lastName: "1234567890" },
  { ...validUser, lastName: "User123!" },
  { ...validUser, lastName: "User!" },
  { ...validUser, lastName: "Mateusz!" },
  { ...validUser, lastName: "Mateusz123" },
  { ...validUser, lastName: "Mateusz123!" }
];
