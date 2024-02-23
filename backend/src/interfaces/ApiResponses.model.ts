import type { IUserSanitized } from "./UserSanitized";

export interface IRegisterResponse {
  data?: IUserSanitized;
  message: RegisterMessage;
  result: boolean;
}

export enum RegisterMessage {
  SUCCESS = "User created successfully",
  ERROR_INVALID_DATA = "Invalid user data",
  ERROR_SERVER = "Internal server error"
}
