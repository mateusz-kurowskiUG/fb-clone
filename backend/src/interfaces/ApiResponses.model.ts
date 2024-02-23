import type { IUserSanitized } from "./UserSanitized";

export interface IRegisterResponse {
  data?: IUserSanitized;
  message: RegisterMessage;
  error?: string;
  result: boolean;
}

export enum RegisterMessage {
  SUCCESS = "User created successfully",
  ERROR_INVALID_DATA = "Invalid user data",
  ERROR_SERVER = "Internal server error"
}
