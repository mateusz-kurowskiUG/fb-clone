import type { INewUser } from "../types/NewUser.model";
import type { TUser } from "../types/User.model";
import type { IUserSanitized } from "../types/UserSanitized";

export const sanitizeUsers = (users: TUser[]): IUserSanitized[] =>
  users.map((user: TUser) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

export const sanitizeUser = (user: TUser): IUserSanitized => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const validateUser = (user: INewUser): INewUser | null => {};
