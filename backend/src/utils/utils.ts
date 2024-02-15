import type { TUser } from "../types/User.model";
import type { TUserSanitized } from "../types/UserSanitized";

export const sanitizeUsers = (users: TUser[]): TUserSanitized[] =>
  users.map((user: TUser) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

export const sanitizeUser = (user: TUser): TUserSanitized => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
