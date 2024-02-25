import { expect, test } from "@jest/globals";
import type { IRegisterResponse } from "../interfaces/ApiResponses.model";

export const validRegisterTest = (
  response: IRegisterResponse | undefined,
  status: number
): void => {
  test("New user should have been created", () => {
    console.log(response);

    expect(status).toBe(201);
    expect(response?.success).toBe(true);
    expect(response).toHaveProperty("data");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("success");
    expect(response?.data).toHaveProperty("id");
    expect(response?.data).toHaveProperty("name");
    expect(response?.data).toHaveProperty("email");
    expect(response?.data).toHaveProperty("lastName");
    expect(response?.data).toHaveProperty("dateOfBirth");
    expect(response?.data).toHaveProperty("countryId");
    expect(response?.data).toHaveProperty("phoneNumber");
  });
};

export const invalidRegisterTest = (
  data: IRegisterResponse,
  status: number
): void => {
  test("New user should not have been created", () => {
    expect(status).toBe(400);
    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("success");
    expect(data.success).toBe(false);
  });
};
