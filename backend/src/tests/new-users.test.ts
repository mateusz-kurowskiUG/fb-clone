import { type INewUser } from "../interfaces/NewUser.model";
import { invalidUsers } from "../data/invalidUsers";
import { test, expect } from "bun:test";
import { validUsers } from "../data/validUsers";
import { validateUser } from "../utils/validation";

test.each(invalidUsers)("Validate invalid new user: %p", (user: INewUser) => {
  expect(validateUser(user)).toBeFalsy();
});

test.each(validUsers)("Validate valid new user %p", (user: INewUser) => {
  expect(validateUser(user)).toBeInstanceOf(Object);
});
