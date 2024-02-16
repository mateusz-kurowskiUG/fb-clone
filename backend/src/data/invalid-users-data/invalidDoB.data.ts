import type { INewUser } from "../../../interfaces/NewUser.model";
import { firstValidDateInMs, validUser } from "../validData";

export const invalidDoB: INewUser[] = [
  { ...validUser, dateOfBirth: new Date("2023-01-01") },
  { ...validUser, dateOfBirth: new Date("2030-01-01") },
  { ...validUser, dateOfBirth: new Date("2040-01-01") },
  { ...validUser, dateOfBirth: new Date("20-01-01") },
  { ...validUser, dateOfBirth: new Date("2019-02-19") },
  { ...validUser, dateOfBirth: new Date("2020-02-19") },
  { ...validUser, dateOfBirth: new Date("2022-02-19") },
  {
    ...validUser,
    dateOfBirth: new Date(firstValidDateInMs + 24 * 60 * 60 * 1000)
  },
  {
    ...validUser,
    dateOfBirth: new Date(firstValidDateInMs + 24 * 60 * 60 * 1000 * 365)
  },
  {
    ...validUser,
    dateOfBirth: new Date(firstValidDateInMs + 24 * 60 * 60 * 1000 * 365 * 13)
  },
  {
    ...validUser,
    dateOfBirth: new Date(
      firstValidDateInMs + 24 * 60 * 60 * 1000 * 365 * 13 + 1
    )
  }
];
