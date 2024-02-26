import { expect, test } from "bun:test";
import { validateUserAsIs } from "../utils/validation";
import updateUserBodies from "../data/userUpdateBodies";
test.each(updateUserBodies)(
  "Validate User Body: %p \n Should return %p",
  (updateBody, expectedResult) => {
    expect(validateUserAsIs(updateBody)).toEqual(expectedResult);
  }
);
