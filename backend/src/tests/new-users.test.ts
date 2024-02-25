import { type INewUser } from "../interfaces/NewUser.model";
import { invalidUsers } from "../data/invalidUsers";
import { describe, test, expect } from "@jest/globals";
import { validUsers } from "../data/validUsers";
import { validateUser } from "../utils/validation";

describe.each(invalidUsers)("Validate invalid new user", (user: INewUser) => {
  test(`New user should not be valid`, () => {
    expect(validateUser(user)).toBeFalsy();
  });
});

describe.each(validUsers)("Validate valid new user", (user: INewUser) => {
  test("New user should be valid", () => {
    expect(validateUser(user)).toBeInstanceOf(Object);
  });
});
