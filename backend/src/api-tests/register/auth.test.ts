import { describe, afterEach } from "@jest/globals";
import { validUsers } from "../../data/validUsers";

import { registerTest } from "../../tests/customTestFuncs";
import { createUser, deleteUser } from "../../utils/usersUtils";
import type { INewUser } from "../../interfaces/NewUser.model";

describe.each(validUsers)("Valid User registration test", async (user) => {
  const confirmedUser = user as INewUser;
  const response = await createUser(confirmedUser);
  const { data } = response.data;
  if (data === undefined) throw new Error("User not created");

  registerTest(data, response.status);
  afterEach(async () => {
    if (response.status === 201 && data !== undefined) await deleteUser(data);
  });
});

// describe.each(validUsers)("Invalid User registration test", (user) => {});
