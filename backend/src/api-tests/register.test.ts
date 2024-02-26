import { describe, afterEach } from "bun:test";
import { validUsers } from "../data/validUsers";

import {
  invalidRegisterTest,
  validRegisterTest
} from "../tests/customTestFuncs";
import { createUser, deleteUser } from "../utils/usersUtils";
import { invalidUsers } from "../data/invalidUsers";

describe.each(validUsers)("Valid User registration test", async (user) => {
  const response = await createUser(user);
  const { data, status } = response;
  if (data === undefined) throw new Error("User not created");

  validRegisterTest(data, response.status);
  afterEach(async () => {
    if (status === 201 && data.data !== undefined) await deleteUser(data.data);
  });
});

describe.each(invalidUsers)("Invalid User registration test", async (user) => {
  const response = await createUser(user);
  const { data, status } = response;
  invalidRegisterTest(data, status);
});
