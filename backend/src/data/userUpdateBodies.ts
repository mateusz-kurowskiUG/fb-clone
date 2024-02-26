import type { IUpdateUserBody } from "../interfaces/UpdateUserBody";
// TODO: SPLIT INTO VALID AND INVALID
const updateUserBodies: IUpdateUserBody[][] = [
  [{ countryId: "string" }, {}],
  [{ countryId: "" }, {}],
  [
    { countryId: "a8f0bd96-50db-481c-8bc2-c6df0bbbea9f" },
    { countryId: "a8f0bd96-50db-481c-8bc2-c6df0bbbea9f" }
  ],
  [{}, {}],
  [{ email: "string" }, {}],
  [{ phoneNumber: "string" }, {}],
  [
    { name: "string", lastName: "string", password: "string" },
    { name: "string", lastName: "string" }
  ],
  [{ dateOfBirth: new Date("2020-01-01") }, {}],
  [
    { dateOfBirth: new Date("2000-01-01") },
    { dateOfBirth: new Date("2000-01-01") }
  ],
  [
    {
      countryId: "a8f0bd96-50db-481c-8bc2-c6df0bbbea9f",
      email: "string",
      name: "string",
      lastName: "string",
      dateOfBirth: new Date("2000-01-01"),
      phoneNumber: "string",
      password: "string"
    },
    {
      countryId: "a8f0bd96-50db-481c-8bc2-c6df0bbbea9f",
      name: "string",
      lastName: "string",
      dateOfBirth: new Date("2000-01-01")
    }
  ],
  [{ phoneNumber: "12345" }, {}],
  [{ phoneNumber: "1234567890" }, {}],
  [
    { phoneNumber: "+4812345678901" },
    {
      phoneNumber: "+4812345678901"
    }
  ],
  [{ phoneNumber: "+123" }, {}]
];
export default updateUserBodies;
