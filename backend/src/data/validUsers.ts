import type { INewUser } from "../interfaces/NewUser.model";

export const validUsers: INewUser[] = [
  {
    email: "adm@adm.pl",
    lastName: "Kowalski",
    name: "Andrzej",
    password: "Admin123.",
    dateOfBirth: new Date("2002-01-01"),
    countryId: "0fbeb538-fdba-42b6-9b31-9046b5860473",
    phoneNumber: "+48123456789"
  },
  {
    email: "mail@mail.com",
    lastName: "Naj",
    name: "Andrzej",
    password: "Admin123!",
    dateOfBirth: new Date("1996-10-30"),
    countryId: "cc640a95-07fe-4b64-b17e-f53140125096",
    phoneNumber: "+86 886 760 6318"
  },
  {
    email: "mail@mail2.com",
    lastName: "Naj-Kowalski",
    name: "Jan",
    password: "Admin123.",
    dateOfBirth: new Date("1970-12-12"),
    countryId: "ac3424f9-35fe-4f64-8bf2-b737ba31cb93",
    phoneNumber: "+254 373 668 0030"
  },
  {
    email: "mail@mail3.com",
    lastName: "Naj-Kowalski",
    name: "Jan",
    password: "Admin123.1",
    dateOfBirth: new Date("1970-12-12"),
    countryId: "ac3424f9-35fe-4f64-8bf2-b737ba31cb93",
    phoneNumber: "+7 326 756 1970"
  },
  {
    email: "mail@mail4.com",
    lastName: "Naj-Kowalski",
    name: "Jan",
    password: "Admin123.1",
    dateOfBirth: new Date("1970-12-12"),
    countryId: "ac3424f9-35fe-4f64-8bf2-b737ba31cb93",
    phoneNumber: "+48322123123"
  },
  {
    email: "mail@mail5.com",
    lastName: "Naj-Kowalski",
    name: "Jan",
    password: "Admin123.1",
    dateOfBirth: new Date("1970-12-12"),
    countryId: "ac3424f9-35fe-4f64-8bf2-b737ba31cb93",
    phoneNumber: "+48 123 456 789"
  }
];

export const validUsersJSON: INewUser[] = validUsers.map((user) =>
  JSON.parse(JSON.stringify(user))
);
console.log(validUsersJSON);
