import { test, expect, describe, afterEach } from "@jest/globals";
import axios, { type AxiosResponse } from "axios";
import { validUsers } from "../../data/validUsers";
import { type INewUser } from "../../interfaces/NewUser.model";
import { type IRegisterResponse } from "../../interfaces/ApiResponses.model";
import type { IUserSanitized } from "../../interfaces/UserSanitized";

const url = "http://localhost:3000/api";
const createUser = async (
  user: INewUser,
): Promise<AxiosResponse<IRegisterResponse>> => {
  const response = await axios.post(`${url}/auth/register`, user);
  return response;
};

const deleteUser = async (user: IUserSanitized) => {
  const response = await axios.delete(`${url}/users/${user.id}`);
  return response;
};
describe.each(validUsers)("Valid User registration test", async (user) => {
  const response = await createUser(user);
  const data = response.data;
  test("New user should have been created", () => {
    expect(response.status).toBe(201);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("lastName");
    expect(data).toHaveProperty("dateOfBirth");
  });
  if (response.status === 201) {
    afterEach(async () => {
      const deleted = await deleteUser(data);
      expect(deleted.status).toBe(200);
    });
  }
});
// describe.each(validUsers)("Invalid User registration test", (user) => {});
