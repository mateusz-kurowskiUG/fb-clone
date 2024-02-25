import type { INewUser } from "../interfaces/NewUser.model";
import type { TUser } from "../types/User.model";
import type { IUserSanitized } from "../interfaces/UserSanitized";
import { validate as validateUUID } from "uuid";
import axios, { type AxiosResponse } from "axios";
import type { IRegisterResponse } from "../interfaces/ApiResponses.model";

export const sanitizeUsers = (users: TUser[]): IUserSanitized[] =>
  users.map((user: TUser) => {
    const { password, role, ...sanitizedUsers } = user;
    return sanitizedUsers;
  });

export const sanitizeUser = (user: TUser): IUserSanitized => {
  const { password, role, ...sanitizedUser } = user;
  return sanitizedUser;
};

export const checkUUID = (id: string): boolean => validateUUID(id);

export const fixPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.replaceAll(" ", "").trim();

export const createUser = async (
  user: INewUser
): Promise<AxiosResponse<IRegisterResponse, any>> => {
  const url = "http://localhost:3000/api";
  try {
    const response = await axios.post<IRegisterResponse>(
      `${url}/auth/register`,
      user
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const deleteUser = async (
  user: IUserSanitized
): Promise<AxiosResponse<any, any>> => {
  const url = "http://localhost:3000/api";
  const response = await axios.delete(`${url}/users/${user.id}`);
  return response;
};
