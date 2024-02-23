import { describe, afterEach } from "@jest/globals";
import { validUsers } from "../../data/validUsers";

import {
  invalidRegisterTest,
  validRegisterTest
} from "../../tests/customTestFuncs";
import { createUser, deleteUser } from "../../utils/usersUtils";
import type { INewUser } from "../../interfaces/NewUser.model";
import { invalidUsers } from "../../data/invalidUsers";

describe.each(validUsers)("Valid User registration test", async (user) => {
  const confirmedUser = user as INewUser;
  const response = await createUser(confirmedUser);
  const { status } = response;
  const { data } = response.data;
  if (data === undefined) throw new Error("User not created");

  validRegisterTest(data, response.status);
  afterEach(async () => {
    if (status === 201 && data !== undefined) await deleteUser(data);
  });
});

describe.each(invalidUsers)("Invalid User registration test", async (user) => {
  const confirmedUser = user as INewUser;
  const response = await createUser(confirmedUser);
  const { data, status } = response;
  invalidRegisterTest(data, status);
});
