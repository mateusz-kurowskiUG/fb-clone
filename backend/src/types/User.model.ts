import type { IUserSanitized } from "../interfaces/UserSanitized";

export type TUser = IUserSanitized & { password: string };
