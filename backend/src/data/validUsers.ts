import type { INewUser } from "../../interfaces/NewUser.model";

export const validUsers: INewUser[] = [
  {
    email: "adm@adm.pl",
    lastName: "Kowalski",
    name: "Andrzej",
    password: "Admin123.",
    dateOfBirth: new Date("2002-01-01")
  },
  {
    email: "mail@mail.com",
    lastName: "Naj",
    name: "Andrzej",
    password: "Admin123!",
    dateOfBirth: new Date("1996-10-30")
  },
  {
    email: "mail@mail2.com",
    lastName: "Naj-Kowalski",
    name: "Jan",
    password: "Admin123.",
    dateOfBirth: new Date("1970-12-12")
  }
];

export const validUsersJSON: INewUser[] = validUsers.map((user) =>
  JSON.parse(JSON.stringify(user))
);
console.log(validUsersJSON);
