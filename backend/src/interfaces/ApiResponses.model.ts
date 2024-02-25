import type { IUserSanitized } from "./UserSanitized";

export interface IRegisterResponse {
  data?: IUserSanitized;
  message: RegisterMessage;
  success: boolean;
}

export enum RegisterMessage {
  SUCCESS = "User created successfully",
  ERROR_INVALID_DATA = "Invalid user data",
  ERROR_SERVER = "Internal server error",
  INVALID_COUNTRY = "Invalid country",
  EXISTS = "User already exists"
}

export interface IDeleteUserResponse {
  success: boolean;
  message: string;
}

export enum DeleteUserMessage {
  SUCCESS = "User deleted",
  ERROR = "User does not exist",
  NOT_AUTHORIZED = "Not authorized"
}

export interface IUpdateUserResponse {
  data?: IUserSanitized;
  success: boolean;
  message: string;
}
export enum UpdateUserMessage {
  SUCCESS = "User updated",
  ERROR = "User not found",
  INVALID_REQUEST = "Invalid request",
  NOT_EXISTS = "User does not exist"
}
