import updateUserBodies from "../data/userUpdateBodies";
import { expect, test, describe } from "bun:test";

describe.each(updateUserBodies)("Update user", (updateBody, expectedResult) => {
  // todo: user is valid
  test.if(true);
  // todo: user is invalid
  test.if(false);
});
