import type { INewUser } from "../types/NewUser.model";
import { except, jest, test } from "@jest/globals";
const user: INewUser = {
  email: "",
  name: "",
  password: "",
  lastName: ""
};
test("New user is valid", () => {});
test("New user is not valid", () => {});

test("User is sanitized", () => {});
test("User is not sanitized", () => {});
