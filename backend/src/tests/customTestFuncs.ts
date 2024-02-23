import { expect, test } from "@jest/globals";
import type { IUserSanitized } from "../interfaces/UserSanitized";

export const registerTest = (
  user: IUserSanitized | undefined,
  status: number
): void => {
  test("New user should have been created", () => {
    expect(status).toBe(201);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("dateOfBirth");
  });
};
