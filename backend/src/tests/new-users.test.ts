import { expect, test, describe } from "@jest/globals";
import { validUsers } from "./data/validUsers";
import { invalidUsers } from "./data/invalidUsers";
import { validateUser } from "../utils/usersUtils";
import { type INewUser } from "../interfaces/NewUser.model";

describe.each(invalidUsers)("Invalid user creation test:", (user: INewUser) => {
  test(`New user should not be valid`, () => {
    expect(validateUser(user)).toBeFalsy();
  });
});

// describe.each(validUsers)("Validate new user", (user: INewUser) => {
//   test("New user should be valid", () => {
//     expect(validateUser(user)).toBeInstanceOf(Object);
//   });
// });

// test("New user is valid", () => {});
// test("New user is not valid", () => {});

// test("User is sanitized", () => {});
// test("User is not sanitized", () => {});
