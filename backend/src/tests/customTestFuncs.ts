import { expect, test } from "@jest/globals";
import type { IRegisterResponse } from "../interfaces/ApiResponses.model";

export const validRegisterTest = (
  response: IRegisterResponse | undefined,
  status: number
): void => {
  test("New user should have been created", () => {
    expect(status).toBe(201);
    expect(response).toHaveProperty("data");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("result");
    expect(response?.data).toHaveProperty("id");
    expect(response?.data).toHaveProperty("name");
    expect(response?.data).toHaveProperty("email");
    expect(response?.data).toHaveProperty("lastName");
    expect(response?.data).toHaveProperty("dateOfBirth");
  });
};

export const invalidRegisterTest = (data: any, status: number): void => {
  test("New user should not have been created", () => {
    expect(status).toBe(400);
    expect(data).toHaveProperty("error");
    expect(data).toHaveProperty("result");
  });
};
