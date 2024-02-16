import type { INewUser } from "../../interfaces/NewUser.model";
const thirteenYearsInMs = 13 * 365 * 24 * 60 * 60 * 1000;
export const firstValidDateInMs = new Date().valueOf() - thirteenYearsInMs;
export const firstValidDate = new Date(firstValidDateInMs);

export const validUser: INewUser = {
  dateOfBirth: firstValidDate,
  email: "email@email.com",
  lastName: "Kowalski",
  name: "Andrzej",
  password: "Admin123."
};
