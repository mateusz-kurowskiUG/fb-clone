import type { IUserSanitized } from "./UserSanitized";

export interface IRegisterResponse {
  data: IUserSanitized | IRegisterError;
}

interface IRegisterError {
  error: RegisterMessage;
}

enum RegisterMessage {
  SUCCESS = "User created successfully",
  ERROR_INVALID_DATA = "Invalid user data",
  ERROR_SERVER = "Internal server error"
}
