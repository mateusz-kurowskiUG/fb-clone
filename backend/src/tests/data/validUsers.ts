import type { INewUser } from "../../interfaces/NewUser.model";

export const validUsers: INewUser[] = [
  {
    email: "admin@admin.com",
    lastName: "Kowalski",
    name: "Andrzej",
    password: "Admin123.",
    dateOfBirth: new Date("2002-01-01")
  },
  {
    email: "",
    lastName: "Kowalski",
    name: "Andrzej",
    password: "Admin123.",
    dateOfBirth: new Date("2003-11-11")
  },
  {
    email: "",
    lastName: "Kowalski",
    name: "Andrzej",
    password: "Admin123.",
    dateOfBirth: new Date("2000-12-12")
  }
];
