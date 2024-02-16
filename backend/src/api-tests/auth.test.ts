import { test, expect, describe } from "@jest/globals";
import axios, { type AxiosResponse } from "axios";
import { validUsers } from "../data/validUsers";
import { type INewUser } from "../interfaces/NewUser.model";
import { type IRegisterResponse } from "../interfaces/ApiResponses.model";

const url = "http://localhost:3000/api/auth/";
const createUser = async (
  user: INewUser,
): Promise<AxiosResponse<IRegisterResponse>> => {
  const response = await axios.post(url + "register", user);
  return response;
};

describe.each(validUsers)("Valid User registration test", async (user) => {
  const response = await createUser(user);
  const data = response.status;
  test("New user should have been created", () => {
    expect(response.status).toBe(201);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("lastName");
    expect(data).toHaveProperty("dateOfBirth");
  });
});
describe.each(validUsers)("Invalid User registration test", (user) => {});
