import { expect, test, describe } from "bun:test";
import { validateUserAsIs } from "../utils/validation";
import updateUserBodies from "../data/userUpdateBodies";
describe.each(updateUserBodies)(
  "update-users",
  (updateBody, expectedResult) => {
    test("validateUserAsIs", () => {
      expect(validateUserAsIs(updateBody)).toEqual(expectedResult);
    });
  }
);
